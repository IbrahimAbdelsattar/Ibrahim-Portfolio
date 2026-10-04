import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  images?: string[]; // Optional array for multiple images
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active image index when project changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  // Lock body scroll + close on Escape when open
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

  if (!project || typeof document === "undefined") return null;

  // Use images array if available, otherwise fallback to single image wrapped in array
  const displayImages = project.images || [project.image];
  const currentImage = displayImages[activeImageIndex] || project.image;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 dark:bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content — bottom sheet on mobile, centered dialog on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 30 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-5xl glass-panel rounded-t-3xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col md:flex-row max-h-[92dvh] sm:max-h-[88vh] overflow-y-auto md:overflow-hidden scroll-smooth-touch"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2.5 sm:p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground bg-card/85 backdrop-blur-xl border border-border rounded-full transition-all hover:scale-105 shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Image Presentation (Centered with Ambient Glow, No Dead Space) */}
            <div className="w-full md:w-1/2 shrink-0 relative flex flex-col justify-center items-center bg-muted/30 dark:bg-black/40 p-4 sm:p-6 md:p-8 overflow-hidden min-h-[260px] md:min-h-full border-b md:border-b-0 md:border-r border-border/50">
              {/* Ambient Blurred Glow Backdrop matching image colors */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <img
                  src={currentImage}
                  alt=""
                  className="w-full h-full object-cover blur-3xl scale-125 opacity-25 dark:opacity-30 select-none"
                />
                <div className="absolute inset-0 bg-background/50 dark:bg-black/50 backdrop-blur-[2px]" />
              </div>

              {/* Main Image in Premium Frame */}
              <div className="relative z-10 w-full flex items-center justify-center">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 group max-h-[50vh] md:max-h-[60vh] flex items-center justify-center bg-card/40">
                  <ResponsiveImage
                    src={currentImage}
                    alt={`${project.title} - preview`}
                    sizes="(min-width: 1024px) 500px, (min-width: 768px) 50vw, 100vw"
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-auto max-h-[50vh] md:max-h-[60vh] object-contain block transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              {/* Multiple Image Thumbnails if more than 1 image */}
              {displayImages.length > 1 && (
                <div className="relative z-10 flex items-center justify-center gap-2 mt-4 px-2 overflow-x-auto max-w-full">
                  {displayImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`View image ${idx + 1}`}
                      className={`relative rounded-lg overflow-hidden border-2 transition-all w-14 h-10 shrink-0 ${
                        activeImageIndex === idx
                          ? "border-primary shadow-md scale-105"
                          : "border-border/60 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side: Details */}
            <div className="w-full md:w-1/2 p-5 sm:p-6 md:p-8 md:overflow-y-auto md:max-h-[88vh] custom-scrollbar bg-card/50 backdrop-blur-sm pb-safe flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3 pr-12">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-snug">
                    {project.title}
                  </h2>
                </div>
                
                {/* Links */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[140px]">
                      <Button variant="default" className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </Button>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[140px]">
                      <Button variant="outline" className="w-full gap-2 border-primary/20 hover:bg-primary/10">
                        <Github className="w-4 h-4" />
                        Source Code
                      </Button>
                    </a>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Reviews / Rating */}
                  <div className="flex items-center gap-2 text-yellow-500">
                    <span className="text-sm font-medium">★★★★★</span>
                    <span className="text-sm text-muted-foreground">(5.0)</span>
                  </div>

                  {/* About Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">About the project</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                      {project.description}
                    </p>
                  </div>

                  {/* Skills / Technologies */}
                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-foreground uppercase tracking-wider">Skills & Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;
