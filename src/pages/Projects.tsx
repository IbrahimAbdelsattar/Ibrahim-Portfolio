import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, FolderGit2, X } from "lucide-react";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { projects, projectStats } from "@/data/projects";
import {
  buildFilterOptions,
  matchesQuery,
  type ProjectFilter,
} from "@/components/project/ProjectStatusBadge";

const Projects = () => {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const [query, setQuery] = useState("");

  const filterOptions = useMemo(() => buildFilterOptions(projects), []);

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesFilter =
        filter === "All"
          ? true
          : filter === "Featured"
            ? project.tier === "flagship"
            : project.category === filter;

      return matchesFilter && matchesQuery(project, query);
    });
  }, [filter, query]);

  const isFiltered = filter !== "All" || query.trim() !== "";

  return (
    <Layout>
      <section className="py-12 sm:py-20 overflow-x-clip">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 text-balance">
              Project <span className="gradient-text">Archive</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Every project listed here is backed by a real repository. Each entry reflects what
              the codebase actually contains.
            </p>
          </motion.header>

          {/* Search */}
          <div className="relative w-full max-w-md mx-auto mb-6">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              inputMode="search"
              placeholder="Search projects, categories or technology…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search projects"
              className="w-full pl-10 pr-4 py-3 min-h-[48px] rounded-xl glass-input text-base sm:text-sm"
            />
          </div>

          {/* Filters — derived from the data, so every tab has real projects behind it */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {filterOptions.map((option) => {
              const active = filter === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFilter(option.value)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all min-h-[40px] ${
                    active
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-card/40 border border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {option.label}
                  <span
                    className={`text-xs tabular-nums ${
                      active ? "text-primary-foreground/80" : "text-muted-foreground/70"
                    }`}
                  >
                    {option.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 text-sm text-muted-foreground px-2">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>
                Showing <strong className="text-foreground">{filtered.length}</strong> of{" "}
                <strong className="text-foreground">{projectStats.total}</strong> projects
              </span>
            </div>
            {isFiltered && (
              <button
                type="button"
                onClick={() => {
                  setFilter("All");
                  setQuery("");
                }}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs border border-border/70 hover:border-primary/50 hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
                Clear filters
              </button>
            )}
          </div>

          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} {...project} index={index} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 bg-card/20 rounded-2xl border border-dashed border-border mt-6">
              <p className="text-muted-foreground text-lg mb-2">No projects match</p>
              <p className="text-sm text-muted-foreground/70">
                Try a different search term or clear the filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
