export type ChatLocale = "ar" | "en";

export const chatUi = {
  ar: {
    title: "مساعد إبراهيم", subtitle: "اسأل عن الخبرة والمشاريع", launcher: "اسأل مساعد إبراهيم",
    welcome: "أهلاً بيك! أنا مساعد إبراهيم عبد الستار بالذكاء الاصطناعي.\nاسألني عن مشاريعه، خبرته، مهاراته، دراسته، أو طرق التواصل معاه.",
    placeholder: "اكتب سؤالك هنا…", send: "إرسال", close: "إغلاق المحادثة", reset: "محادثة جديدة",
    typing: "بيجهّز الرد…", suggestions: "ممكن تبدأ بسؤال", retry: "جرّب تاني",
    unavailable: "خدمة الذكاء الاصطناعي مش متاحة دلوقتي. جرّب تاني بعد شوية، أو تواصل مع إبراهيم على ibrahimabdelsattar042@gmail.com.",
    hint: "قدّم سطر جديد باستخدام Shift + Enter", assistant: "مساعد بالذكاء الاصطناعي",
    prompts: ["إيه خبرة إبراهيم؟", "كلمني عن مشاريع RAG", "إيه أهم مهاراته؟", "إزاي أتواصل معاه؟"],
  },
  en: {
    title: "Ibrahim’s assistant", subtitle: "Explore his experience and projects", launcher: "Ask Ibrahim’s assistant",
    welcome: "Hi! I’m Ibrahim Abdelsattar’s AI assistant.\nAsk me about his projects, experience, skills, education, or contact details.",
    placeholder: "Write your question…", send: "Send message", close: "Close chat", reset: "New conversation",
    typing: "Preparing a reply…", suggestions: "A few questions to get started", retry: "Try again",
    unavailable: "The AI service is currently unavailable. Please try again later or contact Ibrahim at ibrahimabdelsattar042@gmail.com.",
    hint: "Shift + Enter for a new line", assistant: "AI assistant",
    prompts: ["What is his experience?", "Tell me about his RAG projects", "What are his main skills?", "How can I contact him?"],
  },
} as const;

export function initialChatLocale(): ChatLocale {
  return typeof navigator !== "undefined" && navigator.language.startsWith("ar") ? "ar" : "en";
}

export function chatLocaleForMessage(text: string, current: ChatLocale): ChatLocale {
  if (/[\u0600-\u06ff]/.test(text)) return "ar";
  // A lone technical acronym should not switch an Arabic conversation to English.
  if (/[A-Za-z]+\s+[A-Za-z]+/.test(text.trim())) return "en";
  return current;
}

export function hasRtlText(text: string): boolean {
  return /[\u0590-\u08ff\ufb1d-\ufdff\ufe70-\ufeff]/.test(text);
}
