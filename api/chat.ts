import { buildAssistantContext, IBRAHIM_SYSTEM_PROMPT } from "../src/data/ibrahimKnowledge.ts";
import type { ConversationTurn } from "../src/data/ibrahimKnowledge.ts";
import { readSseData } from "../src/lib/sse.ts";
import { CHAT_HISTORY_CHARS, CHAT_HISTORY_TURNS, CHAT_MAX_MESSAGE_CHARS, CHAT_MAX_OUTPUT_TOKENS,
  CHAT_MAX_REQUEST_BYTES, CHAT_PROVIDER_TIMEOUT_MS } from "../src/lib/chatLimits.ts";

type ChatEnvironment = Record<string, string | undefined>;
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

function waitForRetry(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const finish = () => { signal.removeEventListener("abort", abort); resolve(); };
    const timer = setTimeout(finish, ms);
    const abort = () => { clearTimeout(timer); signal.removeEventListener("abort", abort); reject(signal.reason); };
    signal.addEventListener("abort", abort, { once: true });
    if (signal.aborted) abort();
  });
}

// Log only recognized error identifiers, never upstream text, credentials, or conversations.
const providerFailureReasons = new Set([
  "customer_verification_required", "insufficient_funds", "quota_for_entity_exceeded",
  "rate_limit_exceeded", "invalid_api_key", "authentication_error", "model_not_found",
]);
async function providerFailureReason(response: Response): Promise<string | undefined> {
  try {
    const body = await response.json() as {
      error?: { code?: unknown; type?: unknown }; code?: unknown; type?: unknown;
    } | null;
    return [body?.error?.code, body?.error?.type, body?.code, body?.type]
      .find((value): value is string => typeof value === "string" && providerFailureReasons.has(value));
  } catch { return undefined; }
}

function parseReply(raw: string): unknown {
  if (/^data:/m.test(raw)) {
    return raw.split(/\r?\n/).reduce((reply, line) => {
      if (!line.startsWith("data:")) return reply;
      const payload = line.slice(5).trim();
      if (!payload || payload === "[DONE]") return reply;
      const data = JSON.parse(payload);
      if (data.error) throw new Error("Provider stream error");
      const content = data.choices?.[0]?.delta?.content ?? data.choices?.[0]?.message?.content;
      return reply + (typeof content === "string" ? content : "");
    }, "");
  }
  return JSON.parse(raw).choices?.[0]?.message?.content;
}

/** Forward only visible text; provider metadata/reasoning/errors stay on the server. */
function streamReply(response: Response, controller: AbortController, cleanup: () => void, provider: string): Response {
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(sink) {
      const emit = (event: object) => sink.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      let text = "", completed = false;
      try {
        sink.enqueue(encoder.encode(": connected\n\n"));
        if (response.headers.get("content-type")?.includes("text/event-stream") && response.body) {
          for await (const data of readSseData(response.body, controller.signal)) {
            if (data === "[DONE]") { completed = true; break; }
            const event = JSON.parse(data);
            if (event.error || event.choices?.[0]?.finish_reason === "error") throw new Error("Provider stream failed");
            const delta = event.choices?.[0]?.delta?.content;
            if (typeof delta === "string" && delta) { text += delta; emit({ type: "delta", text: delta }); }
            if (event.choices?.[0]?.finish_reason === "stop") completed = true;
          }
        } else {
          const reply = parseReply(await response.text());
          if (typeof reply === "string") { text = reply; emit({ type: "delta", text: reply }); completed = true; }
        }
        if (!completed || !text.trim()) throw new Error("Incomplete provider stream");
        emit({ type: "done" });
        sink.close();
      } catch {
        if (!controller.signal.aborted) console.warn("portfolio_chat_provider_unavailable", { provider, reason: "stream_interrupted" });
        try { emit({ type: "error" }); sink.close(); } catch { /* The visitor disconnected. */ }
      } finally { cleanup(); }
    },
    cancel() { controller.abort(); cleanup(); },
  });
  return new Response(body, { headers: {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-store, no-transform",
    "X-Accel-Buffering": "no",
  } });
}

export async function fetchChat(request: Request, env: ChatEnvironment = process.env): Promise<Response> {
  if (request.method === "GET") return json({ status: "ready", persona: "Ibrahim Abdelsattar" });
  if (request.method !== "POST") return new Response(null, { status: 405, headers: { Allow: "GET, POST" } });
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) return json({ error: "Origin not allowed" }, 403);
    } catch { return json({ error: "Origin not allowed" }, 403); }
  }
  if (!request.headers.get("content-type")?.includes("application/json")) return json({ error: "Use JSON" }, 415);
  let body: { message?: unknown; history?: unknown; stream?: unknown };
  try {
    if (Number(request.headers.get("content-length") ?? 0) > CHAT_MAX_REQUEST_BYTES) return json({ error: "Message too large" }, 413);
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > CHAT_MAX_REQUEST_BYTES) return json({ error: "Message too large" }, 413);
    body = JSON.parse(raw);
    if (!body || typeof body !== "object") return json({ error: "Invalid request" }, 400);
  } catch { return json({ error: "Invalid JSON" }, 400); }
  if (typeof body.message !== "string" || !body.message.trim() || body.message.length > CHAT_MAX_MESSAGE_CHARS)
    return json({ error: `Message must contain 1–${CHAT_MAX_MESSAGE_CHARS} characters` }, 400);
  const message = body.message.trim();
  if (body.stream !== undefined && typeof body.stream !== "boolean") return json({ error: "Invalid stream option" }, 400);
  const streaming = body.stream === true;
  const rawHistory = body.history ?? [];
  if (!Array.isArray(rawHistory) || rawHistory.length > CHAT_HISTORY_TURNS || rawHistory.some(turn =>
    !turn || !["user", "assistant"].includes(turn.role) || typeof turn.content !== "string" || turn.content.length > CHAT_HISTORY_CHARS
  )) return json({ error: "Invalid conversation history" }, 400);
  const history: ConversationTurn[] = rawHistory.map(turn => ({ role: turn.role, content: turn.content }));

  // OpenRouter is exclusive when configured: use the owner's selected model,
  // without falling back to stale credentials or a different paid model.
  const openRouterKey = env.OPENROUTER_API_KEY?.trim();
  const openRouterModel = env.OPENROUTER_MODEL?.trim();
  const openRouterFallback = env.OPENROUTER_FALLBACK_MODEL?.trim();
  if (openRouterKey && !openRouterModel)
    return json({ error: "OpenRouter model is not configured" }, 503);
  if (openRouterKey && openRouterFallback && !openRouterFallback.endsWith(":free") && openRouterFallback !== "openrouter/free")
    return json({ error: "The automatic fallback must be a free model" }, 503);
  // Legacy providers remain available for installations without OpenRouter.
  const omniKey = env.OMNIROUTE_API_KEY?.trim();
  const omniUrl = env.OMNIROUTE_API_URL?.trim();
  const omniModel = env.OMNIROUTE_MODEL?.trim();
  if (!openRouterKey && omniKey) {
    try {
      if (!omniUrl || !omniModel || new URL(omniUrl).protocol !== "https:") throw new Error("Invalid configuration");
    } catch { return json({ error: "Chatbot endpoint or model is not configured correctly" }, 503); }
  }
  // Retain the incoming real Gateway integration, with refreshed platform OIDC.
  const runtimeOidc = env.VERCEL === "1" ? request.headers.get("x-vercel-oidc-token") : null;
  const gatewayKey = env.AI_GATEWAY_API_KEY || runtimeOidc || env.VERCEL_OIDC_TOKEN;
  const providers = openRouterKey ? [openRouterModel!, ...(openRouterFallback && openRouterFallback !== openRouterModel ? [openRouterFallback] : [])]
    .map(model => ({ name: "openrouter", url: "https://openrouter.ai/api/v1/chat/completions", key: openRouterKey, model })) : [
    ...(omniKey && omniUrl && omniModel ? [{ name: "omniroute", url: omniUrl, key: omniKey, model: omniModel }] : []),
    ...(gatewayKey ? [{ name: "vercel", url: "https://ai-gateway.vercel.sh/v1/chat/completions",
      key: gatewayKey, model: env.AI_GATEWAY_MODEL || "google/gemini-3.1-flash-lite" }] : []),
  ];
  if (!providers.length) return json({ error: "Chatbot is not configured" }, 503);
  const deadline = Date.now() + CHAT_PROVIDER_TIMEOUT_MS;
  let timedOut = false;
  let authenticationFailed = false;
  let busy = false;
  let rateLimited = false;
  let retryAfter = 3;
  for (const [index, provider] of providers.entries()) {
    const remaining = deadline - Date.now();
    if (remaining < 500 || request.signal.aborted) break;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), index === 0 && providers.length > 1 ? Math.min(8000, remaining) : remaining);
    let streamOwnsTimer = false;
    try {
      const options = {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${provider.key}` },
        body: JSON.stringify({ model: provider.model, temperature: 0.2, max_tokens: CHAT_MAX_OUTPUT_TOKENS,
          messages: [{ role: "system", content: `${IBRAHIM_SYSTEM_PROMPT}\n\nVERIFIED PUBLIC EVIDENCE:\n${buildAssistantContext(message, history, true)}` },
            ...history, { role: "user", content: message }], stream: streaming,
          ...(provider.name === "openrouter" ? { reasoning: { enabled: false }, provider: { sort: "latency" } } : {}),
        }),
        signal: AbortSignal.any([request.signal, controller.signal]),
      };
      let response = await fetch(provider.url, options);
      // Give an overloaded free endpoint time to recover. Retry only before any
      // text is delivered, with cancellation and the existing overall deadline.
      for (const delay of provider.name === "openrouter" ? (providers.length > 1 && index === 0 ? [300] : [300, 900, 1800]) : []) {
        if (![502, 503, 504].includes(response.status) || deadline - Date.now() < delay + 1000) break;
        await response.body?.cancel();
        await waitForRetry(delay, options.signal);
        response = await fetch(provider.url, options);
      }
      if (response.ok) {
        if (streaming) {
          streamOwnsTimer = true;
          return streamReply(response, controller, () => clearTimeout(timer), provider.name);
        }
        const reply = parseReply(await response.text());
        if (typeof reply === "string" && reply.trim()) return json({ reply: reply.trim(), isLive: true, source: "ai" });
        console.warn("portfolio_chat_provider_unavailable", { provider: provider.name, reason: "empty_reply" });
      } else {
        authenticationFailed ||= [401, 403].includes(response.status);
        busy ||= [502, 503, 504].includes(response.status);
        rateLimited ||= response.status === 429;
        const hint = Number(response.headers.get("retry-after"));
        if (response.status === 429 && Number.isFinite(hint) && hint > 0) retryAfter = Math.min(Math.ceil(hint), 86400);
        const reason = await providerFailureReason(response);
        console.warn("portfolio_chat_provider_unavailable", {
          provider: provider.name, status: response.status, ...(reason ? { reason } : {}),
        });
        if (provider.name === "openrouter" && [401, 403].includes(response.status)) break;
      }
    } catch (error) {
      timedOut ||= controller.signal.aborted || (error instanceof Error && error.name === "AbortError");
      if (!request.signal.aborted) console.warn("portfolio_chat_provider_unavailable", {
        provider: provider.name, reason: timedOut ? "timeout" : "connection_or_invalid_reply",
      });
    } finally { if (!streamOwnsTimer) clearTimeout(timer); }
  }
  // Generation failures are errors, never local profile text presented as AI.
  if (authenticationFailed) return json({ error: "The AI service is currently unavailable.", code: "PROVIDER_AUTH_FAILED" }, 502);
  if (rateLimited || busy) {
    const response = json({ error: rateLimited ? "The AI provider is temporarily rate limited." : "The AI provider is temporarily busy.",
      code: rateLimited ? "PROVIDER_RATE_LIMITED" : "PROVIDER_BUSY", retryAfter }, rateLimited ? 429 : 503);
    response.headers.set("Retry-After", String(retryAfter));
    return response;
  }
  return json({ error: timedOut ? "The AI provider timed out." : "The AI provider returned no usable answer." }, timedOut ? 504 : 502);
}

// Share the deployed Web handler with Vite's Node middleware and CLI checks.
interface NodeRequest {
  method?: string;
  body?: unknown;
  url?: string;
  headers?: Record<string, string | string[] | undefined>;
  signal?: AbortSignal;
}
interface NodeResponse {
  setHeader(name: string, value: string): unknown;
  status(code: number): NodeResponse;
  json(body: unknown): unknown;
  write?(chunk: Uint8Array): boolean;
  end?(): unknown;
  flushHeaders?(): unknown;
  once?(event: string, callback: () => void): unknown;
  off?(event: string, callback: () => void): unknown;
  destroyed?: boolean;
}
export async function handleChat(req: NodeRequest, res: NodeResponse, env: ChatEnvironment = process.env) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(req.headers ?? {})) if (value !== undefined) headers.set(name, Array.isArray(value) ? value.join(",") : value);
  if (!headers.has("content-type")) headers.set("content-type", "application/json");
  const method = req.method ?? "GET";
  const origin = `http://${headers.get("host") || "localhost"}`;
  const request = new Request(new URL(req.url || "/api/chat", origin), {
    method, headers,
    signal: req.signal,
    ...(method !== "GET" && method !== "HEAD" ? { body: typeof req.body === "string" ? req.body : JSON.stringify(req.body) ?? "" } : {}),
  });
  const response = await fetchChat(request, env);
  response.headers.forEach((value, name) => res.setHeader(name, value));
  if (response.headers.get("content-type")?.includes("text/event-stream") && response.body && res.write && res.end) {
    res.status(response.status);
    res.flushHeaders?.();
    const reader = response.body.getReader();
    const disconnect = () => { void reader.cancel().catch(() => {}); };
    res.once?.("close", disconnect);
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done || res.destroyed) break;
        if (!res.write(value) && res.once) await new Promise<void>(resolve => {
          const finish = () => { res.off?.("drain", finish); res.off?.("close", finish); resolve(); };
          res.once!("drain", finish); res.once!("close", finish);
        });
      }
    } finally {
      res.off?.("close", disconnect);
      await reader.cancel().catch(() => {}); reader.releaseLock();
      if (!res.destroyed) res.end();
    }
    return;
  }
  const raw = await response.text();
  return res.status(response.status).json(raw ? JSON.parse(raw) : null);
}

export default { fetch: (request: Request) => fetchChat(request) };
