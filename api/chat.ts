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
    // Legacy build-prefixed keys are read ONLY on the server, never in the browser bundle.
    const key = process.env.OMNIROUTE_API_KEY || process.env.VITE_OMNIROUTE_API_KEY;
    if (key) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 7500);
      try {
        const response = await fetch("https://omniroute.dawrly.space/v1/chat/completions", {
          method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
          body: JSON.stringify({ model: process.env.OMNIROUTE_MODEL || "gh/gpt-4o-mini", temperature: 0.25, max_tokens: 700,
            messages: [{ role: "system", content: `${IBRAHIM_SYSTEM_PROMPT}\n\nVERIFIED PUBLIC EVIDENCE:\n${buildAssistantContext(message, history)}` },
              ...history, { role: "user", content: message }], stream: false }),
          signal: AbortSignal.any([request.signal, controller.signal]),
        });
        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (typeof reply === "string" && reply.trim()) return json({ reply: reply.trim(), source: "ai" });
        }
      } catch { /* Keep verified profile answers available when the provider cannot respond. */ }
      finally { clearTimeout(timer); }
    }
    return json({ reply: getAssistantResponse(message, history), source: "profile" });
  },
};
