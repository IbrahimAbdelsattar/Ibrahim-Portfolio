import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Sparkles, RefreshCw, ChevronRight, ShieldAlert, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendChatMessage, ChatMessage } from "@/services/chatService";
import { ChatMessageContent } from "@/components/chat/ChatMessageContent";
import profileImg from "@/assets/profile-main.jpg";

const suggestedPrompts = [
  "🚀 Top RAG & GenAI projects",
  "💼 Work experience at Minders & HAMS.AI",
  "🛠️ Technical skills & ML stack",
  "🎓 Education, GPA & Certifications",
  "🇪🇬 كلمني عن خبراتك ومشاريعك بالعربي",
  "📩 How can I contact or hire Ibrahim?",
];

const INITIAL_WELCOME_TEXT = `👋 **Hi there! I am Ibrahim's Official AI Assistant.**

Ask me anything about Ibrahim Abdelsattar:
- 🚀 **Flagship Projects:** [SupplyMind AI](https://github.com/IbrahimAbdelsattar/SupplyMindAI), [MR-NLP Robust RAG Chatbot](https://github.com/IbrahimAbdelsattar/MR-NLP-Robust-RAG-Chatbot), Arabic Dialect Sentiment, Audio AI, Fraud Detection.
- 💼 **Work Experience:** ML Instructor at *Minders*, AI Engineer Intern at *HAMS.AI*, AI Trainee at *DEPI*, Freelance Consulting.
- 🎓 **Education:** MTI University (Bachelor of CS & AI, GPA **3.5 / 4.0**).
- 🛠️ **Tech Stack:** Python, PyTorch, LangChain, Vector DBs, Docker, FastAPI, SQL.
- 📩 **Contact & Hiring:** Direct email & LinkedIn availability for remote and on-site roles.

How can I help you today?`;

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
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative group flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-primary via-blue-600 to-secondary text-white shadow-2xl hover:shadow-primary/50 transition-all cursor-pointer border border-white/20"
            >
              <div className="relative">
                <Bot className="w-6 h-6 animate-bounce" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-background animate-pulse" />
              </div>
              <span className="font-semibold text-sm hidden sm:inline-block">Ask Ibrahim AI</span>
              <Sparkles className="w-4 h-4 opacity-80" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chatbot Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[440px] h-[600px] max-h-[85vh] glass-panel rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
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
                    <h3 className="font-bold text-foreground text-sm">Ibrahim's AI Assistant</h3>
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>GPT-4o-mini & OmniRoute AI</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Reset conversation"
                  className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-card/60 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-card/60 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm custom-scrollbar bg-card/30 backdrop-blur-md">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        msg.isSecurityWarning
                          ? "bg-red-500/20 border border-red-500/30"
                          : "bg-primary/20 border border-primary/30"
                      }`}
                    >
                      {msg.isSecurityWarning ? (
                        <ShieldAlert className="w-4 h-4 text-red-400" />
                      ) : (
                        <Cpu className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  )}

                  <div
                    className={`max-w-[84%] p-3.5 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none shadow-md"
                        : msg.isSecurityWarning
                        ? "bg-red-500/10 border border-red-500/30 text-red-200 rounded-tl-none"
                        : "bg-secondary/40 border border-border text-foreground rounded-tl-none shadow-sm"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      <ChatMessageContent text={msg.text} />
                    )}

                    <span className="text-[10px] opacity-60 block text-right mt-1.5">
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-foreground" />
                    </div>
                  )}
                </div>
              ))}

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
            <div className="p-2.5 bg-card/50 backdrop-blur-xl border-t border-white/10 dark:border-white/10 flex flex-wrap gap-1.5 overflow-x-auto max-h-24">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-full glass-card hover:border-primary/40 text-primary transition-all text-left flex items-center gap-1 cursor-pointer"
                >
                  <span>{prompt}</span>
                  <ChevronRight className="w-3 h-3 opacity-60" />
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-card/60 backdrop-blur-xl border-t border-white/10 dark:border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask Ibrahim AI anything about his work, projects..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-full glass-input text-sm"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim()}
                className="rounded-full shrink-0 h-10 w-10 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
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
