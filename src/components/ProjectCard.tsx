import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight, Lock, GitFork } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectCover from "./project/ProjectCover";
import TechBadge from "./project/TechBadge";
import ProjectStatusBadge from "./project/ProjectStatusBadge";
import type { Project } from "@/data/types";
import TiltCard3D from "./3d/TiltCard3D";

interface ProjectCardProps extends Project {
  index: number;
}

/**
 * One card for every project in the archive.
 *
 * The action bar only renders links that actually resolve: `githubUrl` is set
 * exclusively for public repositories, so a private repo degrades to a plain
 * "Source private" note instead of a button that 404s for a visitor.
 */
const ProjectCard = ({ index, ...project }: ProjectCardProps) => {
  const reducedMotion = useReducedMotionPreference();
  const visibleTech = project.technologies.slice(0, 4);
  const overflow = project.technologies.length - visibleTech.length;
  const hasLive = Boolean(project.liveUrl);
  const hasSource = Boolean(project.githubUrl);

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "80px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.25) }}
      className="h-full"
    >
      <TiltCard3D maxTilt={5} scale={1.01} glare className="h-full group rounded-3xl">
        <div
          className={`glass-card rounded-3xl overflow-hidden flex flex-col justify-between h-full relative ${
            project.tier === "flagship"
              ? "border-primary/50 shadow-[0_4px_30px_rgba(46,94,153,0.18)] hover:shadow-[0_12px_40px_rgba(123,164,208,0.2)] ring-1 ring-primary/40"
              : "border-border/60 hover:border-primary/50"
          }`}
        >
          <div>
            <div className="relative h-44 sm:h-48 overflow-hidden bg-card/40">
              <ProjectCover
                src={project.image}
                alt={project.title}
                interactive
                className="absolute inset-0 w-full h-full"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-card via-card/25 to-transparent pointer-events-none"
              />

              <div className="absolute top-3 left-3 right-3 z-10 flex items-start justify-between gap-2">
                {project.tier === "flagship" ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/25 backdrop-blur-xl border border-primary/50 px-2.5 py-1 text-[11px] font-semibold text-white">
                    Featured
                  </span>
                ) : project.sourceKind === "fork" ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-background/90 border border-border px-2.5 py-1 text-[11px] font-medium text-foreground">
                    <GitFork className="h-3 w-3" aria-hidden="true" /> Fork
                  </span>
                ) : (
                  <span />
                )}
                <ProjectStatusBadge status={project.status} className="backdrop-blur-xl" />
              </div>
            </div>

            <div className="p-5 sm:p-6 pb-2">
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {project.title}
                </h3>
                <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                  {project.year}
                </span>
              </div>

              <p className="text-xs font-medium text-primary/80 mb-2">{project.category}</p>
              <p className="font-mono text-[10px] text-muted-foreground break-all mb-3" title={project.repository}>
                {project.repository}
              </p>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                {project.tagline}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {visibleTech.map((tech) => (
                  <TechBadge key={tech} tech={tech} compact />
                ))}
                {overflow > 0 && (
                  <span className="px-2 py-0.5 text-xs font-medium rounded-lg text-muted-foreground bg-muted/30">
                    +{overflow}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 pt-3 mt-3 border-t border-border/40 flex items-center gap-2.5 bg-card/25 backdrop-blur-sm relative">
            <Link
              to={`/projects/${project.id}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl min-h-[38px] px-3 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 transition-all"
            >
              Case study
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="sr-only"> for {project.title}</span>
            </Link>

            {hasLive && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Open ${project.title} live`}
                className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl border border-primary/40 hover:border-primary text-primary hover:bg-primary/10 min-h-[38px] px-3 text-xs font-medium transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                Live
              </a>
            )}

            {hasSource ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`View ${project.title} source on GitHub`}
                className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl border border-border/80 hover:border-primary/50 hover:bg-primary/10 min-h-[38px] px-3 text-xs font-medium transition-all"
              >
                <Github className="w-3.5 h-3.5" aria-hidden="true" />
                Code
              </a>
            ) : (
              project.sourcePrivate && (
                <span
                  title="Source code is not publicly available"
                  className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl border border-border/60 min-h-[38px] px-3 text-xs text-muted-foreground"
                >
                  <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                  Private
                </span>
              )
            )}
          </div>
        </div>
      </TiltCard3D>
    </motion.article>
  );
};

export default ProjectCard;
