import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, FolderGit2, X, ArrowDown, GitFork, Layers } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { projects, projectStats } from "@/data/projects";
import { buildFilterOptions, matchesQuery } from "@/data/project-discovery";
import Reveal from "@/components/Reveal";

const filterOptions = buildFilterOptions(projects);
const PAGE_SIZE = 12;
const tierOrder = { flagship: 0, notable: 1, archive: 2 };

const Projects = () => {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const deferredQuery = useDeferredValue(query);
  const category = filterOptions.some((option) => option.value === params.get("category"))
    ? params.get("category")! : "All";
  const source = ["project", "fork"].includes(params.get("source") ?? "") ? params.get("source")! : "all";
  const sort = ["name", "newest"].includes(params.get("sort") ?? "") ? params.get("sort")! : "featured";
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const updateParam = (key: string, value: string, defaultValue = "") => {
    const next = new URLSearchParams(params);
    if (!value || value === defaultValue) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  useEffect(() => setVisibleCount(PAGE_SIZE), [category, deferredQuery, source, sort]);

  const filtered = useMemo(() => projects.filter((project) => {
    const matchesCategory = category === "All" ||
      (category === "Featured" ? project.tier === "flagship" : project.category === category);
    return matchesCategory && (source === "all" || project.sourceKind === source) &&
      matchesQuery(project, deferredQuery);
  }).sort((a, b) => {
    if (sort === "name") return a.title.localeCompare(b.title);
    if (sort === "newest") return Number(b.year) - Number(a.year) || a.title.localeCompare(b.title);
    return tierOrder[a.tier] - tierOrder[b.tier];
  }), [category, deferredQuery, source, sort]);

  const shown = filtered.slice(0, visibleCount);
  const isFiltered = category !== "All" || query.trim() !== "" || source !== "all";

  return (
    <section className="py-12 sm:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="max-w-3xl mb-10 sm:mb-14">
          <p className="eyebrow mb-4">The work archive</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.12] tracking-tight text-balance">
            Ideas into systems.<br /><span className="gradient-text">One project at a time.</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mt-5">
            AI products, full-stack platforms, research notebooks, and the tools behind them.
            Explore the complete GitHub collection, with upstream credit on every fork.
          </p>
        </Reveal>

        <Reveal className="grid grid-cols-3 gap-3 sm:gap-5 mb-10">
          {[
            { value: projectStats.total, label: "Repositories", icon: FolderGit2 },
            { value: projectStats.categories, label: "Disciplines", icon: Layers },
            { value: projectStats.forks, label: "Upstream forks", icon: GitFork },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="glass-card rounded-2xl p-4 sm:p-6">
              <Icon className="h-4 w-4 text-primary mb-3" aria-hidden="true" />
              <p className="text-2xl sm:text-4xl font-semibold tracking-tight tabular-nums">{value}</p>
              <p className="text-[11px] sm:text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </Reveal>

        <div className="glass-card rounded-2xl p-3 sm:p-4 mb-5">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <input type="search" inputMode="search" placeholder="Find a project, repository, or technology…"
                value={query} onChange={(event) => updateParam("q", event.target.value)}
                aria-label="Search projects" className="w-full pl-10 pr-10 py-3 rounded-xl glass-input text-base sm:text-sm" />
              {query && <button type="button" onClick={() => updateParam("q", "")}
                aria-label="Clear search" className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>}
            </div>
            <div className="grid grid-cols-2 gap-3 lg:w-[380px]">
              <label className="sr-only" htmlFor="source-filter">Repository type</label>
              <select id="source-filter" value={source} onChange={(event) => updateParam("source", event.target.value, "all")}
                className="glass-input rounded-xl px-3 py-3 text-sm min-w-0">
                <option value="all">All repositories</option><option value="project">Projects & collections</option><option value="fork">Upstream forks</option>
              </select>
              <label className="sr-only" htmlFor="project-sort">Sort projects</label>
              <select id="project-sort" value={sort} onChange={(event) => updateParam("sort", event.target.value, "featured")}
                className="glass-input rounded-xl px-3 py-3 text-sm min-w-0">
                <option value="featured">Featured first</option><option value="newest">Newest first</option><option value="name">Name A–Z</option>
              </select>
            </div>
          </div>
        </div>

        <div role="group" aria-label="Filter projects by category" className="flex md:flex-wrap gap-2 overflow-x-auto no-scrollbar py-2 mb-6">
          {filterOptions.map((option) => <button key={option.value} type="button"
            onClick={() => updateParam("category", option.value, "All")} aria-pressed={category === option.value}
            className={`shrink-0 rounded-full px-4 py-2.5 text-xs sm:text-sm font-medium border transition-colors ${category === option.value
              ? "bg-primary text-primary-foreground border-primary" : "bg-card/40 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"}`}>
            {option.label}<span className="ml-2 opacity-70 tabular-nums">{option.count}</span>
          </button>)}
        </div>

        <div className="flex items-center justify-between gap-3 mb-6 text-sm text-muted-foreground">
          <p role="status" aria-live="polite" aria-atomic="true">Showing <strong className="text-foreground">{shown.length}</strong> of <strong className="text-foreground">{filtered.length}</strong> {isFiltered ? "matching" : ""} repositories</p>
          {isFiltered && <button type="button" onClick={() => setParams(new URLSearchParams(), { replace: true })}
            className="inline-flex shrink-0 items-center gap-1.5 px-3 py-2 rounded-full border border-border hover:text-foreground">
            <X className="h-3.5 w-3.5" /> Reset
          </button>}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {shown.map((project, index) => <ProjectCard key={project.id} {...project} index={index} />)}
        </div>

        {shown.length === 0 && <div className="glass-card text-center rounded-3xl py-20 px-6">
          <Search className="h-8 w-8 mx-auto text-primary mb-5" aria-hidden="true" />
          <h2 className="text-xl font-semibold mb-2">No matches this time</h2>
          <p className="text-muted-foreground mb-5">Try a technology, a repository name, or another category.</p>
          <button type="button" onClick={() => setParams(new URLSearchParams(), { replace: true })} className="text-primary font-medium">Clear all filters</button>
        </div>}

        {shown.length < filtered.length && <div className="flex justify-center mt-10">
          <button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 hover:bg-primary/10 px-6 py-3.5 font-medium transition-colors">
            Explore more projects <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>}
      </div>
    </section>
  );
};

export default Projects;
