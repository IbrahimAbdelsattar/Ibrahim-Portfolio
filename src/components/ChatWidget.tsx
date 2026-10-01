import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import profileImg from "@/assets/profile-main.jpg";

const loadChat = () => import("./IbrahimChatbot");
const Chat = lazy(loadChat);

/** Load the conversation UI only when wanted; preserve its state after closing. */
const ChatWidget = () => {
  const [opened, setOpened] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const preload = () => { void loadChat().then(() => setReady(true)); };
  const open = () => { setOpened(true); setIsOpen(true); preload(); };
  return <>
    {(!isOpen || !ready) && <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pb-safe">
      <motion.button type="button" onClick={open} onPointerEnter={preload} onFocus={preload}
        aria-label="Open AI assistant chat" aria-expanded={isOpen} aria-busy={isOpen && !ready}
        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        className="flex items-center gap-3 px-4 py-3 min-h-[52px] rounded-full bg-primary text-primary-foreground shadow-xl border border-primary/30">
        <img src={profileImg} alt="Ibrahim" className="w-7 h-7 rounded-full object-cover border border-primary-foreground/20" />
        <span className="font-semibold text-sm hidden sm:inline">{isOpen && !ready ? "Opening chat…" : "Ask Ibrahim"}</span>
        <Sparkles className="w-4 h-4" aria-hidden="true" />
      </motion.button>
    </div>}
    {opened && <Suspense fallback={null}><Chat isOpen={isOpen} onClose={() => setIsOpen(false)} /></Suspense>}
  </>;
};
export default ChatWidget;
