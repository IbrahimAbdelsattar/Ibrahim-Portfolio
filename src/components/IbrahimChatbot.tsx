import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles, RefreshCw, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAssistantResponse } from "@/data/ibrahimKnowledge";
import profileImg from "@/assets/profile-main.jpg";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

const suggestedPrompts = [
  "🚀 What are your top AI projects?",
  "💼 Tell me about your work experience",
  "🧠 What is your expertise in RAG & LLMs?",
  "📩 How can I contact or hire Ibrahim?",
];

const IbrahimChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "👋 **Hi there! I'm Ibrahim's AI Assistant.**\n\nAsk me anything about Ibrahim Abdelsattar's AI projects, experience at HAMS.AI & Minders, education, or technical skills!",
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

  const handleSend = (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responseText = getAssistantResponse(messageText);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "👋 **Hi there! I'm Ibrahim's AI Assistant.**\n\nAsk me anything about Ibrahim Abdelsattar's AI projects, experience at HAMS.AI & Minders, education, or technical skills!",
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
              className="relative group flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-primary via-purple-600 to-secondary text-white shadow-2xl hover:shadow-primary/50 transition-all cursor-pointer border border-white/20"
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
            className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-card/95 backdrop-blur-2xl border border-primary/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary/20 via-card to-secondary/20 border-b border-border flex items-center justify-between">
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
                  <p className="text-xs text-muted-foreground">Ask me about my AI work & skills</p>
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
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm custom-scrollbar bg-card/40">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] p-3.5 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none shadow-md"
                        : "bg-secondary/40 border border-border text-foreground rounded-tl-none"
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {msg.text.split("\n").map((line, idx) => {
                        // Simple formatting for bold and links
                        let rendered = line;
                        return (
                          <p key={idx} className={idx > 0 ? "mt-1.5" : ""}>
                            {rendered}
                          </p>
                        );
                      })}
                    </div>
                    <span className="text-[10px] opacity-60 block text-right mt-1">
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
            <div className="p-2.5 bg-card/80 border-t border-border/50 flex flex-wrap gap-1.5 overflow-x-auto max-h-24">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary transition-all text-left flex items-center gap-1"
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
              className="p-3 bg-card border-t border-border flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask Ibrahim AI anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-full bg-secondary/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
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
