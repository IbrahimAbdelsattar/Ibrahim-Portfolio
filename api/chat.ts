import { buildAssistantContext, getAssistantResponse, IBRAHIM_SYSTEM_PROMPT } from "../src/data/ibrahimKnowledge.ts";
import type { ConversationTurn } from "../src/data/ibrahimKnowledge.ts";

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
const attempts = new Map<string, { count: number; reset: number }>();

export default {
  async fetch(request: Request): Promise<Response> {
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
    const history: ConversationTurn[] = Array.isArray(body.history) ? body.history.slice(-8).flatMap(turn => {
      if (!turn || !["user", "assistant"].includes(turn.role) || typeof turn.content !== "string") return [];
      return [{ role: turn.role as ConversationTurn["role"], content: turn.content.slice(0, 1200) }];
    }) : [];
    // Credentials stay in the function. Vercel's short-lived OIDC token removes
    // the need to provision another permanent key for the deployed portfolio.
    const omniKey = process.env.OMNIROUTE_API_KEY || process.env.VITE_OMNIROUTE_API_KEY;
    // Vercel injects a refreshed token into each function's request headers;
    // the environment token is for builds/local development, not live requests.
    const runtimeOidc = process.env.VERCEL === "1" ? request.headers.get("x-vercel-oidc-token") : null;
    const gatewayKey = process.env.AI_GATEWAY_API_KEY || runtimeOidc || process.env.VERCEL_OIDC_TOKEN;
    const providers = [
      ...(omniKey ? [{ name: "omniroute", url: "https://omniroute.dawrly.space/v1/chat/completions",
        key: omniKey, model: process.env.OMNIROUTE_MODEL || "gh/gpt-4o-mini" }] : []),
      ...(gatewayKey ? [{ name: "vercel", url: "https://ai-gateway.vercel.sh/v1/chat/completions",
        key: gatewayKey, model: process.env.AI_GATEWAY_MODEL || "google/gemini-3.1-flash-lite" }] : []),
    ];
    const deadline = Date.now() + 8500;
    for (const provider of providers) {
      const remaining = deadline - Date.now();
      if (remaining < 500 || request.signal.aborted) break;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), Math.min(remaining, providers.length > 1 ? 4000 : 8500));
      try {
        const response = await fetch(provider.url, {
          method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${provider.key}` },
          body: JSON.stringify({ model: provider.model, temperature: 0.25, max_tokens: 700,
            messages: [{ role: "system", content: `${IBRAHIM_SYSTEM_PROMPT}\n\nVERIFIED PUBLIC EVIDENCE:\n${buildAssistantContext(message, history)}` },
              ...history, { role: "user", content: message }], stream: false }),
          signal: AbortSignal.any([request.signal, controller.signal]),
        });
        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (typeof reply === "string" && reply.trim()) return json({ reply: reply.trim(), source: "ai" });
          console.warn("portfolio_chat_provider_unavailable", { provider: provider.name, reason: "empty_reply" });
        } else {
          // Log only operational categories, never prompts, credentials or provider bodies.
          console.warn("portfolio_chat_provider_unavailable", { provider: provider.name, status: response.status });
        }
      } catch {
        if (!request.signal.aborted) console.warn("portfolio_chat_provider_unavailable", {
          provider: provider.name, reason: controller.signal.aborted ? "timeout" : "connection",
        });
      }
      finally { clearTimeout(timer); }
    }
    if (!providers.length) console.warn("portfolio_chat_generation_unconfigured");
    return json({ reply: getAssistantResponse(message, history), source: "profile" });
  },
};
