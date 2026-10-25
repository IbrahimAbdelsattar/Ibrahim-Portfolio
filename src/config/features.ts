// Keep the assistant out of the UI until a provider passes live verification.
// Set VITE_CHATBOT_ENABLED=true in Vercel and redeploy to restore it.
export const chatbotEnabled = import.meta.env.VITE_CHATBOT_ENABLED === "true";
