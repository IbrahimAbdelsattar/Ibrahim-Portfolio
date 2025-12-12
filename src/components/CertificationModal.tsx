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
  if (!certification) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-muted-foreground hover:text-foreground bg-background/50 backdrop-blur-md rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Full Image */}
            <div className="w-full h-full bg-black/40 overflow-hidden flex items-center justify-center p-4">
                <img
                src={certification.image}
                alt={certification.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-xl"
                />
            </div>

            {/* Bottom/Side: Details (Optional, depends on design, assuming mostly image focus) 
               For a certificate, usually standard layout is Image + details.
               Let's put details in an overlay or just use the image if it's a scan.
               However, keeping consistent with ProjectModal, let's put details on the side or bottom if needed.
               Given the user simply said "display the full certification", a large image is priority.
               I'll overlay title at the bottom of the image area or separate it.
               Let's look at ProjectModal again. It uses 60/40 split. 
               For certificates, the image ratio is usually A4.
               Let's try a simple layout where the image takes center stage, and details are a small footer or overlay.
               Actually, a layout similar to project modal is fine, but maybe image on top for mobile, left for desktop?
               Let's go with a simple centered image modal with a bottom strip for details.
            */}
          </motion.div>
          
          {/* Detailed Caption Overlay (Floating at bottom center) */}
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-8 left-0 right-0 pointer-events-none flex justify-center z-60"
          >
            <div className="bg-card/90 backdrop-blur-md border border-border rounded-full px-6 py-3 shadow-xl flex items-center gap-6 pointer-events-auto">
               <div>
                  <h3 className="text-lg font-bold text-foreground">{certification.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {certification.issuer}</span>
                    {certification.year && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {certification.year}</span>}
                  </div>
               </div>
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
};

export default CertificationModal;
