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

/**
 * Removes dashes (-), asterisks (*), and hashtags (#) from chatbot responses
 * while preserving valid URLs, punctuation, and links.
 */
export function stripForbiddenCharacters(text: string): string {
  if (!text) return "";

  // 1. Remove all hashtags '#'
  let cleaned = text.replace(/#/g, "");

  // 2. Remove all asterisks '*'
  cleaned = cleaned.replace(/\*/g, "");

  // 3. Protect URLs so hyphens inside URLs are not corrupted
  const urlPlaceholders: string[] = [];
  cleaned = cleaned.replace(/https?:\/\/[^\s\)]+/g, (match) => {
    urlPlaceholders.push(match);
    return `__URL_PLACEHOLDER_${urlPlaceholders.length - 1}__`;
  });

  // Remove horizontal divider rules: '---', '–—–', etc.
  cleaned = cleaned.replace(/^[-–—]{2,}\s*$/gm, "");

  // Remove bullet dashes at start of lines: '- item', '– item', '— item'
  cleaned = cleaned.replace(/^(\s*)[-–—]\s+/gm, "$1");

  // Replace standalone dashes between words: ' - ', ' – ', ' — ' with clean punctuation
  cleaned = cleaned.replace(/\s+[-–—]+\s+/g, ", ");

  // Remove trailing or standalone dashes at line endings
  cleaned = cleaned.replace(/\s+[-–—]+$/gm, "");

  // Remove leading dashes on any line
  cleaned = cleaned.replace(/^(\s*)[-–—]+/gm, "$1");

  // Restore protected URLs
  cleaned = cleaned.replace(/__URL_PLACEHOLDER_(\d+)__/g, (_, idx) => {
    return urlPlaceholders[parseInt(idx, 10)] || "";
  });

  return cleaned.trim();
}

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
      const rawText = await res.text();
      let reply = "";

      if (rawText.includes("data: ")) {
        const lines = rawText.split("\n");
        const parts: string[] = [];
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("data: ") && trimmed !== "data: [DONE]") {
            try {
              const chunkJson = JSON.parse(trimmed.slice(6));
              const delta = chunkJson.choices?.[0]?.delta?.content;
              const msgContent = chunkJson.choices?.[0]?.message?.content;
              if (delta) parts.push(delta);
              else if (msgContent) parts.push(msgContent);
            } catch {
              // skip unparseable chunk
            }
          }
        }
        reply = parts.join("");
      } else {
        try {
          const data = JSON.parse(rawText);
          reply = data.choices?.[0]?.message?.content || "";
        } catch {
          // ignore
        }
      }

      if (reply && typeof reply === "string" && reply.trim()) {
        return { text: stripForbiddenCharacters(reply.trim()), isLive: true };
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
        return { text: stripForbiddenCharacters(data.reply.trim()), isLive: true };
      }
    }
  } catch {
    // Local backend is not running or unreachable
  }

  // 3. Fallback: Full-coverage local intelligent knowledge engine
  const offlineReply = getAssistantResponse(userQuery);
  return { text: stripForbiddenCharacters(offlineReply), isLive: false };
}
