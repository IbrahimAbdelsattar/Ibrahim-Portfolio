import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Building2 } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  year?: string;
  image: string;
}

interface CertificationModalProps {
  certification: Certification | null;
  isOpen: boolean;
  onClose: () => void;
}

const CertificationModal = ({ certification, isOpen, onClose }: CertificationModalProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!certification) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/70 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 40 }}
            transition={{ duration: 0.28 }}
            className="relative w-full max-w-4xl glass-panel rounded-t-3xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-y-auto scroll-smooth-touch max-h-[92dvh] sm:max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close certification"
              className="absolute top-3 right-3 z-10 p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground bg-card/70 backdrop-blur-xl border border-white/10 dark:border-white/10 rounded-full transition-all hover:scale-105"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="w-full bg-black/40 overflow-hidden flex items-center justify-center p-3 sm:p-4 pt-14 sm:pt-4">
                <img
                src={certification.image}
                alt={certification.title}
                loading="lazy"
                decoding="async"
                className="max-w-full max-h-[60dvh] sm:max-h-[70vh] w-auto object-contain rounded-lg shadow-xl"
                />
            </div>

            {/* Details — inline (not floating overlay) for mobile readability */}
            <div className="px-4 sm:px-6 py-4 sm:py-5 pb-safe border-t border-border/50 bg-card/70 backdrop-blur-md">
              <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">{certification.title}</h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs sm:text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {certification.issuer}</span>
                {certification.year && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {certification.year}</span>}
              </div>
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
};

export default CertificationModal;
