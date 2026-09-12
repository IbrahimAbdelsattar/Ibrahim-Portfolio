import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Sparkles, RefreshCw, ChevronRight, ShieldAlert, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendChatMessage, ChatMessage } from "@/services/chatService";
import { ChatMessageContent, hasArabic } from "@/components/chat/ChatMessageContent";
import profileImg from "@/assets/profile-main.jpg";

const suggestedPrompts = [
  "👋 إنت مين وإيه خبرتك في الـ AI؟",
  "🚀 كلمني عن مشاريع الـ RAG والـ GenAI بتاعتك",
  "💼 اشتغلت فين قبل كده (Minders & HAMS.AI)؟",
  "🛠️ إيه الـ Tech Stack وأهم المهارات اللي بتشتغل بيها؟",
  "🎓 دراستك في جامعة MTI وتقديرك كام؟",
  "📩 إزاي أقدر اتواصل معاك أو نشتغل سوا؟",
];

const INITIAL_WELCOME_TEXT = `👋 أهلاً بيك يا غالي! أنا إبراهيم عبد الستار.

شغال Data Scientist و AI Specialist ومقيم في القاهرة. 

اتفضل اسألني عن أي حاجة تخص:
🚀 مشاريعي في الذكاء الاصطناعي: [SupplyMind AI](https://github.com/IbrahimAbdelsattar/SupplyMindAI)، و [MR-NLP RAG Chatbot](https://github.com/IbrahimAbdelsattar/MR-NLP-Robust-RAG-Chatbot)، وتحليل اللهجة المصرية، والصوتيات
💼 خبرتي وشغلي: Machine Learning Instructor في Minders، وتدريبي في HAMS.AI و DEPI
🎓 دراستي: هندسة وذكاء اصطناعي في جامعة MTI بتقدير 3.5 من 4.0
🛠️ مهاراتي والـ Tech Stack: Python, PyTorch, LangChain, RAG, Docker, FastAPI
📩 الشغل والتعاون سوا: تقدر تبعتلي في أي وقت ونتكلم!

Or feel free to ask in English, I am happy to chat directly about my AI projects, background, and opportunities!`;

const IbrahimChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: INITIAL_WELCOME_TEXT,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    try {
      const response = await sendChatMessage(messageText, messages);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isSecurityWarning: response.isSecurityWarning,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "Something unexpected happened. Please feel free to reach out directly to Ibrahim via [ibrahimabdelsattar042@gmail.com](mailto:ibrahimabdelsattar042@gmail.com).",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: INITIAL_WELCOME_TEXT,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pb-safe">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              aria-label="Open AI assistant chat"
              className="relative group flex items-center gap-3 px-4 py-3 min-h-[52px] rounded-full bg-gradient-to-r from-primary via-blue-600 to-secondary text-white shadow-2xl hover:shadow-primary/50 transition-all cursor-pointer border border-white/20"
            >
              <div className="relative">
                <img
                  src={profileImg}
                  alt="Ibrahim"
                  className="w-7 h-7 rounded-full object-cover border border-white/50"
                />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-background animate-pulse" />
              </div>
              <span className="font-semibold text-sm hidden sm:inline-block">Chat with Ibrahim</span>
              <Sparkles className="w-4 h-4 opacity-80 text-amber-300" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chatbot Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="fixed z-50 flex flex-col overflow-hidden glass-panel rounded-t-3xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] inset-x-0 bottom-0 h-[82dvh] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[440px] sm:h-[600px] sm:max-h-[85dvh]"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary/15 via-card/50 to-secondary/15 border-b border-white/10 dark:border-white/10 backdrop-blur-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={profileImg}
                    alt="Ibrahim Abdelsattar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-card" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-foreground text-sm">Ibrahim Abdelsattar</h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-medium border border-primary/30">
                      AI Specialist
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    <span className="text-emerald-500 font-medium">Online</span>
                    <span className="opacity-40">•</span>
                    <span>Data Scientist & AI</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground rounded-lg hover:bg-card/60 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground rounded-lg hover:bg-card/60 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-4 text-sm custom-scrollbar scroll-smooth-touch touch-pan-y bg-card/30 backdrop-blur-md overscroll-contain">
              {messages.map((msg) => {
                const isMsgArabic = hasArabic(msg.text);
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.sender === "bot" && (
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden ${
                          msg.isSecurityWarning
                            ? "bg-red-500/20 border border-red-500/30"
                            : "border border-primary/40 shadow-sm"
                        }`}
                      >
                        {msg.isSecurityWarning ? (
                          <ShieldAlert className="w-4 h-4 text-red-400" />
                        ) : (
                          <img
                            src={profileImg}
                            alt="Ibrahim"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    )}

                    <div
                      dir={isMsgArabic ? "rtl" : "ltr"}
                      className={`max-w-[85%] sm:max-w-[84%] p-3 sm:p-3.5 rounded-2xl break-words overflow-wrap-anywhere bidi-text ${
                        isMsgArabic ? "text-right" : "text-left"
                      } ${
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none shadow-md"
                          : msg.isSecurityWarning
                          ? "bg-red-500/10 border border-red-500/30 text-red-200 rounded-tl-none"
                          : "bg-secondary/40 border border-border text-foreground rounded-tl-none shadow-sm"
                      }`}
                    >
                      {msg.sender === "user" ? (
                        <p dir={isMsgArabic ? "rtl" : "ltr"} className="leading-relaxed whitespace-pre-wrap bidi-text">
                          {msg.text}
                        </p>
                      ) : (
                        <ChatMessageContent text={msg.text} />
                      )}

                      <span
                        className={`text-[10px] opacity-60 block mt-1.5 ${
                          isMsgArabic ? "text-left" : "text-right"
                        }`}
                        dir="ltr"
                      >
                        {msg.timestamp}
                      </span>
                    </div>

                    {msg.sender === "user" && (
                      <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-foreground" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex gap-3 justify-start items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-secondary/40 border border-border px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300" />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Suggested Prompts Chips */}
            <div className="p-2 sm:p-2.5 bg-card/50 backdrop-blur-xl border-t border-white/10 dark:border-white/10 flex gap-1.5 overflow-x-auto no-scrollbar scroll-smooth-touch max-h-20 sm:max-h-24 shrink-0">
              {suggestedPrompts.map((prompt, i) => {
                const isPromptArabic = hasArabic(prompt);
                return (
                  <button
                    key={i}
                    dir={isPromptArabic ? "rtl" : "ltr"}
                    onClick={() => handleSend(prompt)}
                    className="px-2.5 py-2 min-h-[36px] shrink-0 text-[11px] font-medium rounded-full glass-card hover:border-primary/40 text-primary transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap bidi-text"
                  >
                    <span dir={isPromptArabic ? "rtl" : "ltr"} className="bidi-text">
                      {prompt}
                    </span>
                    <ChevronRight className={`w-3 h-3 opacity-60 shrink-0 ${isPromptArabic ? "rotate-180" : ""}`} />
                  </button>
                );
              })}
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-2.5 sm:p-3 pb-safe bg-card/60 backdrop-blur-xl border-t border-white/10 dark:border-white/10 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                dir="auto"
                placeholder="ابعت رسالة لإبراهيم... Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                enterKeyHint="send"
                autoComplete="off"
                className="flex-1 min-w-0 px-4 py-3 min-h-[48px] rounded-full glass-input text-base sm:text-sm bidi-text"
              />
              <Button
                type="submit"
                size="icon"
                aria-label="Send message"
                disabled={!input.trim()}
                className="rounded-full shrink-0 h-12 w-12 sm:h-10 sm:w-10 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default IbrahimChatbot;
