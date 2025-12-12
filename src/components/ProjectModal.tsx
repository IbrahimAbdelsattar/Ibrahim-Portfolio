import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
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
  if (!project) return null;

  // Use images array if available, otherwise fallback to single image wrapped in array
  const displayImages = project.images || [project.image];

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
            className="relative w-full max-w-5xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-muted-foreground hover:text-foreground bg-background/50 backdrop-blur-md rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Image Gallery */}
            <div className="w-full md:w-3/5 bg-black/40 overflow-y-auto custom-scrollbar flex flex-col">
              {displayImages.map((img, idx) => (
                <div key={idx} className="w-full">
                  <img
                    src={img}
                    alt={`${project.title} - view ${idx + 1}`}
                    className="w-full h-auto block"
                  />
                </div>
              ))}
            </div>

            {/* Right Side: Details */}
            <div className="w-full md:w-2/5 p-6 md:p-8 overflow-y-auto custom-scrollbar bg-card/50 backdrop-blur-sm border-l border-border/50">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                    {project.title}
                  </h2>
                </div>
                
                {/* Links */}
                <div className="flex gap-3 mb-6">
                  {/* Live URL button removed */}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="outline" className="w-full gap-2 border-primary/20 hover:bg-primary/10">
                        <Github className="w-4 h-4" />
                        Source Code
                      </Button>
                    </a>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Reviews / Rating Placeholder (from image design) */}
                  <div className="flex items-center gap-2 text-yellow-500">
                    <span className="text-sm font-medium">★★★★★</span>
                    <span className="text-sm text-muted-foreground">(5.0)</span>
                  </div>

                  {/* About Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">About the project</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
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
    </AnimatePresence>
  );
};

export default ProjectModal;
