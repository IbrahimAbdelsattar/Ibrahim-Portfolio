import type { ConversationTurn } from "@/data/ibrahimKnowledge";

export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  answerSource?: "ai" | "profile";
  isSecurityWarning?: boolean;
}

/** Same-origin API; credentials and provider prompts are kept on the server. */
export async function sendChatMessage(userQuery: string, history: ChatMessage[] = [], signal?: AbortSignal)
  : Promise<{ text: string; isLive: boolean }> {
  const turns: ConversationTurn[] = history.filter(m => m.id !== "welcome").slice(-8)
    .map(m => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text.slice(0, 1200) }));
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch("/api/chat", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userQuery, history: turns }),
      signal: signal ? AbortSignal.any([signal, controller.signal]) : controller.signal,
    });
    if (response.ok && response.headers.get("content-type")?.includes("application/json")) {
      const data = await response.json();
      if (typeof data.reply === "string" && data.reply.trim()) return { text: data.reply.trim(), isLive: data.source === "ai" };
    }
  } catch {
    if (signal?.aborted) throw new DOMException("Request cancelled", "AbortError");
  } finally { clearTimeout(timer); }
  if (signal?.aborted) throw new DOMException("Request cancelled", "AbortError");
  const { getAssistantResponse } = await import("@/data/ibrahimKnowledge");
  return { text: getAssistantResponse(userQuery, turns), isLive: false };
}
