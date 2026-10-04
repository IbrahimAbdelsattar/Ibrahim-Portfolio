import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Bot, ChevronRight, RotateCcw, Sparkles, TriangleAlert, X } from "lucide-react";
import { ChatMessageContent } from "@/components/chat/ChatMessageContent";
import ResponsiveImage from "@/components/ResponsiveImage";
import { chatLocaleForMessage, chatUi, hasRtlText, initialChatLocale } from "@/data/chatUi";
import { sendChatMessage, type ChatMessage } from "@/services/chatService";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";
import type { ChatLocale } from "@/data/chatUi";

const timestamp = (locale: string) => new Date().toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });

interface ChatProps { isOpen: boolean; onClose: () => void; onLocaleChange?: (locale: ChatLocale) => void }
const IbrahimChatbot = ({ isOpen, onClose, onLocaleChange }: ChatProps) => {
  const [locale, setLocale] = useState(initialChatLocale);
  const reducedMotion = useReducedMotionPreference();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [{
    id: "welcome", sender: "bot", text: chatUi[locale].welcome, timestamp: timestamp(locale),
  }]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const requestPending = useRef(false);
  const requestRef = useRef<AbortController | null>(null);
  useEffect(() => () => requestRef.current?.abort(), []);
  const ui = chatUi[locale];
  const direction = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) chatEndRef.current?.scrollIntoView({ behavior: reducedMotion || isTyping ? "instant" : "smooth", block: "end" });
  }, [messages, isOpen, isTyping, reducedMotion]);

  const handleSend = async (textToSend?: string, retry = false) => {
    const messageText = (textToSend ?? input).trim();
    if (!messageText || messageText.length > 2000 || requestPending.current) return;
    requestPending.current = true;
    const controller = new AbortController();
    requestRef.current = controller;
    const nextLocale = chatLocaleForMessage(messageText, locale);
    setLocale(nextLocale);
    onLocaleChange?.(nextLocale);
    const history = retry ? messages.slice(0, -2) : messages;
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(), sender: "user", text: messageText, timestamp: timestamp(nextLocale),
    };
    setMessages(prev => retry ? prev.slice(0, -1) : [
      ...prev.slice(-39).map(m => m.id === "welcome" && prev.length === 1 ? { ...m, text: chatUi[nextLocale].welcome, timestamp: timestamp(nextLocale) } : m), userMsg,
    ]);
    if (!textToSend) setInput("");
    setIsTyping(true);
    try {
      const response = await sendChatMessage(messageText, history, controller.signal);
      if (controller.signal.aborted) return;
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(), sender: "bot", text: response.text, timestamp: timestamp(nextLocale),
      }]);
    } catch {
      if (controller.signal.aborted) return;
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(), sender: "bot", text: chatUi[nextLocale].unavailable,
        timestamp: timestamp(nextLocale), isError: true,
      }]);
    } finally {
      requestPending.current = false;
      requestRef.current = null;
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  const handleReset = () => {
    if (requestPending.current) return;
    setInput("");
    setMessages([{ id: "welcome", sender: "bot", text: ui.welcome, timestamp: timestamp(locale) }]);
    inputRef.current?.focus();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            id="portfolio-chat" role="dialog" aria-modal="false" aria-labelledby="portfolio-chat-title" dir={direction}
            initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }} transition={{ duration: 0.2 }}
            onKeyDown={e => { if (e.key === "Escape") onClose(); }}
            className="fixed z-50 inset-x-2 bottom-2 sm:inset-x-auto sm:bottom-6 sm:right-6 flex h-[min(720px,88dvh)] sm:h-[min(680px,85dvh)] w-auto sm:w-[420px] sm:max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-2xl shadow-black/25"
          >
            <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-gradient-to-br from-primary/10 to-transparent px-4 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <ResponsiveImage src="/assets/profile-main.jpg" alt="" sizes="44px" className="h-11 w-11 shrink-0 rounded-2xl object-cover ring-1 ring-primary/20" />
                <div className="min-w-0">
                  <h2 id="portfolio-chat-title" className="text-sm font-semibold tracking-tight">{ui.title}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">{ui.subtitle}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button onClick={handleReset} disabled={isTyping} aria-label={ui.reset} title={ui.reset}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button onClick={onClose} aria-label={ui.close} title={ui.close}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </header>
            <div role="log" aria-live="polite" aria-relevant="additions" aria-label={ui.title} dir="ltr"
              className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-4 py-5 custom-scrollbar">
              {messages.map((msg, index) => {
                const rtl = hasRtlText(msg.text);
                return (
                  <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.sender === "bot" && (
                      <div className={`mb-5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl ${msg.isError ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
                        {msg.isError ? <TriangleAlert className="h-3.5 w-3.5" /> : <Bot className="h-4 w-4" />}
                      </div>
                    )}
                    <div className="min-w-0 max-w-[86%]">
                      <div dir={rtl ? "rtl" : "ltr"} className={`rounded-2xl px-3.5 py-3 text-sm break-words [overflow-wrap:anywhere] ${
                        msg.sender === "user" ? "rounded-br-md bg-primary text-primary-foreground" : msg.isError
                          ? "rounded-bl-md border border-destructive/20 bg-destructive/5" : "rounded-bl-md border border-border bg-muted/40"
                      }`}>
                        {msg.sender === "user" ? <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p> : <ChatMessageContent text={msg.text} />}
                        {msg.isError && index === messages.length - 1 && (
                          <button disabled={isTyping} onClick={() => handleSend(messages[index - 1]?.text, true)}
                            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium transition hover:bg-muted disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            <RotateCcw className="h-3 w-3" />{ui.retry}
                          </button>
                        )}
                      </div>
                      <p dir="ltr" className={`mt-1.5 px-1 text-[10px] text-muted-foreground ${msg.sender === "user" ? "text-right" : "text-left"}`}>{msg.timestamp}</p>
                    </div>
                  </div>
                );
              })}
              {isTyping && (
                <div role="status" dir={direction} className="flex items-center gap-2 rounded-xl px-1 text-xs text-muted-foreground">
                  <span aria-hidden="true" className="flex gap-1">
                    {[0, 1, 2].map(i => <span key={i} className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" style={{ animationDelay: `${i * 150}ms` }} />)}
                  </span>{ui.typing}
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            {messages.length === 1 && (
              <div className="shrink-0 px-4 pb-4">
                <p className="mb-2 text-xs text-muted-foreground">{ui.suggestions}</p>
                <div className="grid grid-cols-2 gap-2">
                  {ui.prompts.map(prompt => (
                    <button key={prompt} onClick={() => handleSend(prompt)} disabled={isTyping}
                      className="flex min-h-11 items-center justify-between gap-2 rounded-xl border border-border bg-background/50 px-3 py-2.5 text-start text-xs leading-relaxed transition hover:border-primary/40 hover:bg-primary/5 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <span>{prompt}</span><ChevronRight className={`h-3.5 w-3.5 shrink-0 text-muted-foreground ${locale === "ar" ? "rotate-180" : ""}`} />
                    </button>
                  ))}
                </div>
              </div>
            )}
            <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="shrink-0 border-t border-border bg-background/50 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <div className="flex items-end gap-2 rounded-2xl border border-border bg-card p-2 transition focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10">
                <textarea ref={inputRef} dir="auto" rows={2} maxLength={2000} value={input} placeholder={ui.placeholder} aria-label={ui.placeholder}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); handleSend(); } }}
                  className="max-h-32 min-h-12 flex-1 resize-none bg-transparent px-2 py-1.5 text-base sm:text-sm leading-relaxed placeholder:text-muted-foreground focus:outline-none"
                />
                <button type="submit" aria-label={ui.send} disabled={!input.trim() || isTyping}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <ArrowUp className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><Sparkles className="h-3 w-3" />{ui.assistant}</span>
                {input.length > 1600 ? <span dir="ltr">{input.length}/2000</span> : <span className="hidden sm:block">{ui.hint}</span>}
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default IbrahimChatbot;
