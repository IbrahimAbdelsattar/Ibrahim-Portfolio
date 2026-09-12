import { IBRAHIM_SYSTEM_PROMPT, getAssistantResponse } from "@/data/ibrahimKnowledge";

export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  isSecurityWarning?: boolean;
}

const OMNIROUTE_URL = "https://omniroute.dawrly.space/v1/chat/completions";
const OMNIROUTE_API_KEY = "sdRghiYkisbEFfqWYFILzGngUEzUcKQJVrtoGgjVPTvQmZhifAoQNSTaLEtYdoki";
const MODEL_NAME = "gh/gpt-4o-mini";

// Optional local backend URL (if user runs python chatbot_api.py locally on port 8000)
const LOCAL_BACKEND_URL = import.meta.env.VITE_CHATBOT_API_URL || "http://127.0.0.1:8000/api/chat";

export async function sendChatMessage(
  userQuery: string,
  history: ChatMessage[] = []
): Promise<{ text: string; isLive: boolean; isSecurityWarning?: boolean }> {
  // 1. First, try OmniRoute Cloud LLM (GPT-4o-mini)
  try {
    // Build context with system prompt and last 8 conversational turns
    const recentHistory = history.slice(-8).map((m) => ({
      role: m.sender === "user" ? ("user" as const) : ("assistant" as const),
      content: m.text,
    }));

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

    const res = await fetch(OMNIROUTE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OMNIROUTE_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          { role: "system", content: IBRAHIM_SYSTEM_PROMPT },
          ...recentHistory,
          { role: "user", content: userQuery },
        ],
        temperature: 0.5,
        max_tokens: 500,
        stream: false,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content;
      if (reply && typeof reply === "string" && reply.trim()) {
        return { text: reply.trim(), isLive: true };
      }
    }
  } catch (cloudErr) {
    console.warn("OmniRoute cloud API request failed or timed out:", cloudErr);
  }

  // 2. Second, attempt local backend if running
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s quick check

    const res = await fetch(LOCAL_BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userQuery }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.reply) {
        return { text: data.reply.trim(), isLive: true };
      }
    }
  } catch {
    // Local backend is not running or unreachable
  }

  // 3. Fallback: Full-coverage local intelligent knowledge engine
  const offlineReply = getAssistantResponse(userQuery);
  return { text: offlineReply, isLive: false };
}
