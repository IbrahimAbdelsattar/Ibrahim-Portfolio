import { readSseData } from "../lib/sse.ts";
import { CHAT_CLIENT_TIMEOUT_MS, CHAT_HISTORY_CHARS, CHAT_HISTORY_TURNS, CHAT_MAX_MESSAGE_CHARS } from "../lib/chatLimits.ts";

export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  isSecurityWarning?: boolean;
  isError?: boolean;
}

export class ChatServiceError extends Error {
  readonly code: "PROVIDER_BUSY" | "PROVIDER_RATE_LIMITED";
  constructor(code: "PROVIDER_BUSY" | "PROVIDER_RATE_LIMITED") {
    super("The AI provider is temporarily unavailable");
    this.name = "ChatServiceError";
    this.code = code;
  }
}

// Preserve Markdown, Arabic, and URL punctuation; remove only control characters.
export function stripForbiddenCharacters(text: string): string {
  // eslint-disable-next-line no-control-regex -- Intentionally removes non-printing ASCII controls.
  return text.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
}

export async function sendChatMessage(
  userQuery: string,
  history: ChatMessage[] = [],
  signal?: AbortSignal,
  onText?: (text: string) => void,
): Promise<{ text: string; isLive: true; isSecurityWarning?: boolean }> {
  const message = userQuery.trim();
  if (!message || message.length > CHAT_MAX_MESSAGE_CHARS) throw new Error(`Message must contain 1 to ${CHAT_MAX_MESSAGE_CHARS} characters`);
  const recentHistory = history
    .filter(m => m.id !== "welcome" && !m.isError && !m.isSecurityWarning)
    .slice(-CHAT_HISTORY_TURNS)
    .map(m => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text.slice(0, CHAT_HISTORY_CHARS) }));
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CHAT_CLIENT_TIMEOUT_MS);
  const requestSignal = signal ? AbortSignal.any([signal, controller.signal]) : controller.signal;
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: recentHistory, stream: true }),
      signal: requestSignal,
    });
    if (!response.ok) {
      const error = await response.json().catch(() => null);
      if (error?.code === "PROVIDER_BUSY" || error?.code === "PROVIDER_RATE_LIMITED") throw new ChatServiceError(error.code);
      throw new Error("The AI service is unavailable. Please try again later.");
    }
    if (response.headers.get("content-type")?.includes("text/event-stream") && response.body) {
      let text = "", completed = false;
      for await (const data of readSseData(response.body, requestSignal)) {
        const event = JSON.parse(data);
        if (event.type === "error") throw new Error("The AI response was interrupted");
        if (event.type === "done") { completed = true; break; }
        if (event.type !== "delta" || typeof event.text !== "string") throw new Error("Invalid AI stream");
        text += event.text;
        onText?.(stripForbiddenCharacters(text));
      }
      const clean = stripForbiddenCharacters(text);
      if (!completed || !clean) throw new Error("Incomplete AI answer received");
      return { text: clean, isLive: true };
    }
    const data = await response.json();
    if (data.isLive !== true || typeof data.reply !== "string") throw new Error("No live AI answer received");
    const text = stripForbiddenCharacters(data.reply);
    if (!text) throw new Error("Empty AI answer received");
    return { text, isLive: true };
  } finally {
    clearTimeout(timeout);
  }
}
