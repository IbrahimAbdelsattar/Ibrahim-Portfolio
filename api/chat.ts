import { buildAssistantContext, IBRAHIM_SYSTEM_PROMPT } from "../src/data/ibrahimKnowledge.ts";
import type { ConversationTurn } from "../src/data/ibrahimKnowledge.ts";

type ChatEnvironment = Record<string, string | undefined>;
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
const attempts = new Map<string, { count: number; reset: number }>();

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
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (ip) {
    const now = Date.now();
    if (attempts.size > 2000) for (const [key, value] of attempts) if (value.reset < now) attempts.delete(key);
    const entry = attempts.get(ip);
    if (entry && entry.reset > now) { if (entry.count++ >= 30) return json({ error: "Please try again shortly" }, 429); }
    else attempts.set(ip, { count: 1, reset: now + 60_000 });
  }
  let body: { message?: unknown; history?: unknown };
  try {
    if (Number(request.headers.get("content-length") ?? 0) > 16_000) return json({ error: "Message too large" }, 413);
    const raw = await request.text();
    if (raw.length > 16_000) return json({ error: "Message too large" }, 413);
    body = JSON.parse(raw);
    if (!body || typeof body !== "object") return json({ error: "Invalid request" }, 400);
  } catch { return json({ error: "Invalid JSON" }, 400); }
  if (typeof body.message !== "string" || !body.message.trim() || body.message.length > 2000)
    return json({ error: "Message must contain 1–2000 characters" }, 400);
  const message = body.message.trim();
  const rawHistory = body.history ?? [];
  if (!Array.isArray(rawHistory) || rawHistory.length > 8 || rawHistory.some(turn =>
    !turn || !["user", "assistant"].includes(turn.role) || typeof turn.content !== "string" || turn.content.length > 4000
  )) return json({ error: "Invalid conversation history" }, 400);
  const history: ConversationTurn[] = rawHistory.map(turn => ({ role: turn.role, content: turn.content }));

  // OmniRoute uses only server-owned variables; never accept VITE_ credentials.
  const omniKey = env.OMNIROUTE_API_KEY?.trim();
  const omniUrl = env.OMNIROUTE_API_URL?.trim();
  const omniModel = env.OMNIROUTE_MODEL?.trim();
  if (omniKey) {
    try {
      if (!omniUrl || !omniModel || new URL(omniUrl).protocol !== "https:") throw new Error("Invalid configuration");
    } catch { return json({ error: "Chatbot endpoint or model is not configured correctly" }, 503); }
  }
  // Retain the incoming real Gateway integration, with refreshed platform OIDC.
  const runtimeOidc = env.VERCEL === "1" ? request.headers.get("x-vercel-oidc-token") : null;
  const gatewayKey = env.AI_GATEWAY_API_KEY || runtimeOidc || env.VERCEL_OIDC_TOKEN;
  const providers = [
    ...(omniKey && omniUrl && omniModel ? [{ name: "omniroute", url: omniUrl, key: omniKey, model: omniModel }] : []),
    ...(gatewayKey ? [{ name: "vercel", url: "https://ai-gateway.vercel.sh/v1/chat/completions",
      key: gatewayKey, model: env.AI_GATEWAY_MODEL || "google/gemini-3.1-flash-lite" }] : []),
  ];
  if (!providers.length) return json({ error: "Chatbot is not configured" }, 503);
  const deadline = Date.now() + 40_000;
  let timedOut = false;
  let authenticationFailed = false;
  for (const [index, provider] of providers.entries()) {
    const remaining = deadline - Date.now();
    if (remaining < 500 || request.signal.aborted) break;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), index === 0 && providers.length > 1 ? Math.min(8000, remaining) : remaining);
    try {
      const response = await fetch(provider.url, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${provider.key}` },
        body: JSON.stringify({ model: provider.model, temperature: 0.2, max_tokens: 700,
          messages: [{ role: "system", content: `${IBRAHIM_SYSTEM_PROMPT}\n\nVERIFIED PUBLIC EVIDENCE:\n${buildAssistantContext(message, history)}` },
            ...history, { role: "user", content: message }], stream: false }),
        signal: AbortSignal.any([request.signal, controller.signal]),
      });
      if (response.ok) {
        const reply = parseReply(await response.text());
        if (typeof reply === "string" && reply.trim()) return json({ reply: reply.trim(), isLive: true, source: "ai" });
        console.warn("portfolio_chat_provider_unavailable", { provider: provider.name, reason: "empty_reply" });
      } else {
        authenticationFailed ||= [401, 403].includes(response.status);
        console.warn("portfolio_chat_provider_unavailable", { provider: provider.name, status: response.status });
      }
    } catch (error) {
      timedOut ||= controller.signal.aborted || (error instanceof Error && error.name === "AbortError");
      if (!request.signal.aborted) console.warn("portfolio_chat_provider_unavailable", {
        provider: provider.name, reason: timedOut ? "timeout" : "connection_or_invalid_reply",
      });
    } finally { clearTimeout(timer); }
  }
  // Generation failures are errors, never local profile text presented as AI.
  if (authenticationFailed) return json({ error: "The AI service is currently unavailable.", code: "PROVIDER_AUTH_FAILED" }, 502);
  return json({ error: timedOut ? "The AI provider timed out." : "The AI provider returned no usable answer." }, timedOut ? 504 : 502);
}

// Share the deployed Web handler with Vite's Node middleware and CLI checks.
interface NodeRequest {
  method?: string;
  body?: unknown;
  url?: string;
  headers?: Record<string, string | string[] | undefined>;
}
interface NodeResponse {
  setHeader(name: string, value: string): unknown;
  status(code: number): NodeResponse;
  json(body: unknown): unknown;
}
export async function handleChat(req: NodeRequest, res: NodeResponse, env: ChatEnvironment = process.env) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(req.headers ?? {})) if (value !== undefined) headers.set(name, Array.isArray(value) ? value.join(",") : value);
  if (!headers.has("content-type")) headers.set("content-type", "application/json");
  const method = req.method ?? "GET";
  const origin = `http://${headers.get("host") || "localhost"}`;
  const request = new Request(new URL(req.url || "/api/chat", origin), {
    method, headers,
    ...(method !== "GET" && method !== "HEAD" ? { body: typeof req.body === "string" ? req.body : JSON.stringify(req.body) ?? "" } : {}),
  });
  const response = await fetchChat(request, env);
  response.headers.forEach((value, name) => res.setHeader(name, value));
  const raw = await response.text();
  return res.status(response.status).json(raw ? JSON.parse(raw) : null);
}

export default { fetch: (request: Request) => fetchChat(request) };
