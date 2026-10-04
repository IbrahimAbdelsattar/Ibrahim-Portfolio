export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  isSecurityWarning?: boolean;
  isError?: boolean;
}

// Preserve Markdown, Arabic, and URL punctuation; remove only control characters.
export function stripForbiddenCharacters(text: string): string {
  // eslint-disable-next-line no-control-regex -- Intentionally removes non-printing ASCII controls.
  return text.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
}

export async function sendChatMessage(
  userQuery: string,
  history: ChatMessage[] = [],
): Promise<{ text: string; isLive: true; isSecurityWarning?: boolean }> {
  const message = userQuery.trim();
  if (!message || message.length > 2000) throw new Error("Message must contain 1 to 2000 characters");
  const recentHistory = history
    .filter(m => m.id !== "welcome" && !m.isError && !m.isSecurityWarning)
    .slice(-8)
    .map(m => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text }));
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: recentHistory }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error("The AI service is unavailable. Please try again later.");
    const data = await response.json();
    if (data.isLive !== true || typeof data.reply !== "string") throw new Error("No live AI answer received");
    const text = stripForbiddenCharacters(data.reply);
    if (!text) throw new Error("Empty AI answer received");
    return { text, isLive: true };
  } finally {
    clearTimeout(timeout);
  }
}
