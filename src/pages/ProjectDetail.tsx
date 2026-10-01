import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Lock, Layers, Cpu, Database, Boxes, Plug, User } from "lucide-react";
import Layout from "@/components/Layout";
import ProjectCover from "@/components/project/ProjectCover";
import TechBadge from "@/components/project/TechBadge";
import ProjectStatusBadge from "@/components/project/ProjectStatusBadge";
import { getProjectBySlug } from "@/data/projects";
import type { ProjectArchitecture } from "@/data/types";
import Reveal from "@/components/Reveal";

const ARCHITECTURE_SECTIONS: {
  key: keyof ProjectArchitecture;
  label: string;
  icon: typeof Layers;
}[] = [
  { key: "frontend", label: "Frontend", icon: Layers },
  { key: "backend", label: "Backend", icon: Boxes },
  { key: "ai", label: "AI / ML", icon: Cpu },
  { key: "database", label: "Data", icon: Database },
  { key: "infrastructure", label: "Infrastructure", icon: Boxes },
  { key: "integrations", label: "Integrations", icon: Plug },
];

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  // Per-project document metadata so each case study is independently
  // discoverable and linkable.
  useEffect(() => {
    if (!project) return;
    document.title = `${project.title} — Ibrahim Abdelsattar`;
    const meta = document.querySelector('meta[name="description"]');
    const previous = meta?.getAttribute("content") ?? null;
    meta?.setAttribute("content", project.tagline);
    return () => {
      if (previous !== null) meta?.setAttribute("content", previous);
    };
  }, [project]);

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-4 lg:px-8 py-24 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Project not found</h1>
          <p className="text-muted-foreground mb-8">
            That project is not in the archive. It may have been renamed or removed.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-medium bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all projects
          </Link>
        </div>
      </Layout>
    );
  }

  const architecture = project.architecture ?? {};

  return (
    <Layout>
      <article className="py-10 sm:py-16 overflow-x-clip">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            All projects
          </Link>

          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <ProjectStatusBadge status={project.status} />
              <span className="text-xs font-medium text-primary/80">{project.category}</span>
              <span className="text-xs text-muted-foreground">{project.year}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  Live product
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 font-medium border border-primary/40 text-primary hover:bg-primary/10 transition-all"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  Source code
                </a>
              )}
              {project.sourcePrivate && (
                <span className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 font-medium border border-border text-muted-foreground">
                  <Lock className="w-4 h-4" aria-hidden="true" />
                  Source kept private
                </span>
              )}
            </div>
          </header>

          <Reveal>
            <div className="glass-card rounded-3xl overflow-hidden mb-10">
              <ProjectCover
                src={project.image}
                alt={project.title}
                className="h-56 sm:h-72 w-full"
              />
            </div>
          </Reveal>

          {project.role && (
            <Reveal>
              <div className="flex items-center gap-3 glass-card rounded-2xl px-5 py-4 mb-10">
                <User className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">Role: </span>
                  {project.role}
                </p>
              </div>
            </Reveal>
          )}

          {project.problem && (
            <Reveal>
              <section className="mb-10">
                <h2 className="text-xl font-bold text-foreground mb-3">The problem</h2>
                <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
              </section>
            </Reveal>
          )}

          <Reveal>
            <section className="mb-10">
              <h2 className="text-xl font-bold text-foreground mb-3">Overview</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {project.description}
              </p>
            </section>
          </Reveal>

          {project.highlights.length > 0 && (
            <Reveal>
              <section className="mb-10">
                <h2 className="text-xl font-bold text-foreground mb-4">Key capabilities</h2>
                <ul className="space-y-3">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      />
                      <span className="text-muted-foreground leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}

          {Object.keys(architecture).length > 0 && (
            <Reveal>
              <section className="mb-10">
                <h2 className="text-xl font-bold text-foreground mb-4">Architecture</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {ARCHITECTURE_SECTIONS.map(({ key, label, icon: Icon }) => {
                    const items = architecture[key];
                    if (!items?.length) return null;
                    return (
                      <div key={key} className="glass-card rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                          <h3 className="text-sm font-semibold text-foreground">{label}</h3>
                        </div>
                        <ul className="space-y-1.5">
                          {items.map((item) => (
                            <li
                              key={item}
                              className="text-sm text-muted-foreground before:content-['·'] before:mr-2 before:text-primary"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </section>
            </Reveal>
          )}

          <Reveal>
            <section className="mb-10">
              <h2 className="text-xl font-bold text-foreground mb-4">Technology</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <TechBadge key={tech} tech={tech} />
                ))}
              </div>
            </section>
          </Reveal>

          {project.relatedRepos && project.relatedRepos.length > 0 && (
            <Reveal>
              <section className="mb-10">
                <h2 className="text-xl font-bold text-foreground mb-4">Related repositories</h2>
                <ul className="space-y-2">
                  {project.relatedRepos.map((repo) => (
                    <li
                      key={repo.slug}
                      className="glass-card rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground break-words">
                          {repo.slug}
                        </p>
                        <p className="text-xs text-muted-foreground">{repo.role}</p>
                      </div>
                      {repo.url ? (
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                        >
                          <Github className="w-3.5 h-3.5" aria-hidden="true" />
                          View
                        </a>
                      ) : (
                        <span className="shrink-0 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                          Private
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}

          <nav className="flex flex-wrap justify-between items-center gap-4 pt-8 border-t border-border/40">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back to all projects
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Want something like this built? Get in touch
            </Link>
          </nav>
        </div>
      </article>
    </Layout>
  );
};

export default ProjectDetail;
