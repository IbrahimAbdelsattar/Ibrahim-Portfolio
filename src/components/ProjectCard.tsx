import { motion } from "framer-motion";
import { Github, Eye, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import TiltCard3D from "@/components/3d/TiltCard3D";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  isPinned?: boolean;
  featured?: boolean;
  category?: string;
  index: number;
  onLiveClick?: () => void;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  image,
  githubUrl,
  liveUrl,
  isPinned,
  index,
  onLiveClick,
}: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      className="h-full"
    >
      <TiltCard3D
        maxTilt={5}
        scale={1.02}
        className="h-full group rounded-3xl cursor-pointer"
        onClick={() => onLiveClick?.()}
      >
        <div
          className={`h-full glass-card rounded-3xl overflow-hidden hover-glow flex flex-col justify-between transition-all duration-300 ${
            isPinned
              ? "border-primary/50 shadow-[0_0_25px_rgba(20,184,166,0.18)] ring-1 ring-primary/40"
              : "border-border/60 hover:border-primary/40"
          }`}
        >
          {/* Top Section: Image & Header */}
          <div>
            <div className="relative h-44 sm:h-48 overflow-hidden bg-card/40">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                style={{ backgroundImage: `url(${image})` }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent pointer-events-none"
              />

              {/* Pinned Badge */}
              {isPinned && (
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/25 backdrop-blur-xl border border-primary/50 text-primary-foreground text-xs font-semibold shadow-lg shadow-primary/20 pointer-events-none">
                  <span className="text-sm">📌</span>
                  <span className="text-white font-medium tracking-wide">Pinned</span>
                </div>
              )}

              {/* Quick Image Action Overlay - pointer-events-none on container, auto on buttons */}
              <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 p-4 pointer-events-none opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Source on GitHub"
                    aria-label={`View ${title} source on GitHub`}
                    onClick={(e) => e.stopPropagation()}
                    className="pointer-events-auto rounded-full h-11 w-11 inline-flex items-center justify-center backdrop-blur-xl bg-black/65 border border-white/25 text-white shadow-xl hover:bg-primary hover:border-primary hover:scale-110 active:scale-95 transition-all"
                  >
                    <Github className="w-5 h-5 pointer-events-none" />
                  </a>
                )}
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Live Preview"
                    aria-label={`Open ${title} live preview`}
                    onClick={(e) => e.stopPropagation()}
                    className="pointer-events-auto rounded-full h-11 w-11 inline-flex items-center justify-center backdrop-blur-xl bg-black/65 border border-white/25 text-primary shadow-xl hover:bg-primary hover:text-white hover:scale-110 active:scale-95 transition-all"
                  >
                    <ExternalLink className="w-5 h-5 pointer-events-none" />
                  </a>
                )}
                {onLiveClick && (
                  <button
                    type="button"
                    title="View Full Details"
                    aria-label={`View ${title} full details`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onLiveClick();
                    }}
                    className="pointer-events-auto rounded-full h-11 w-11 inline-flex items-center justify-center backdrop-blur-xl bg-black/65 border border-white/25 text-white shadow-xl hover:bg-primary hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <Eye className="w-5 h-5 pointer-events-none" />
                  </button>
                )}
              </div>
            </div>

            {/* Text Content */}
            <div className="p-5 sm:p-6 pb-2">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                {description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 text-xs font-medium rounded-lg glass-card text-primary/90 border border-primary/15"
                  >
                    {tech}
                  </span>
                ))}
                {technologies.length > 4 && (
                  <span className="px-2 py-0.5 text-xs font-medium rounded-lg text-muted-foreground bg-muted/30">
                    +{technologies.length - 4}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Dedicated Bottom Action Bar - 100% Clickable & Stable */}
          <div className="p-4 sm:p-5 pt-3 mt-3 border-t border-border/40 flex items-center justify-between gap-2.5 bg-card/25 backdrop-blur-sm z-20 relative">
            <Button
              variant="default"
              size="sm"
              className="flex-1 gap-2 rounded-xl text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 transition-all cursor-pointer min-h-[38px]"
              onClick={(e) => {
                e.stopPropagation();
                onLiveClick?.();
              }}
            >
              <Eye className="w-3.5 h-3.5 pointer-events-none" />
              <span>Details</span>
            </Button>

            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Live Website"
                className="shrink-0"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-primary/40 hover:border-primary text-primary hover:bg-primary/10 gap-1.5 text-xs px-3 min-h-[38px] cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 pointer-events-none" />
                  <span>Live</span>
                </Button>
              </a>
            )}

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Source Code"
                className="shrink-0"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-border/80 hover:border-primary/50 text-foreground hover:bg-primary/10 gap-1.5 text-xs px-3 min-h-[38px] cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5 pointer-events-none" />
                  <span>Code</span>
                </Button>
              </a>
            )}
          </div>
        </div>
      </TiltCard3D>
    </motion.div>
  );
};

export default ProjectCard;
