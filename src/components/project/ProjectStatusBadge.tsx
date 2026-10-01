import { CATEGORY_ORDER, type Project, type ProjectCategory, type ProjectStatus } from "@/data/types";

const STATUS_STYLES: Record<ProjectStatus, string> = {
  Production: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  "Active Development": "border-sky-500/40 bg-sky-500/10 text-sky-300",
  Research: "border-violet-500/40 bg-violet-500/10 text-violet-300",
  Prototype: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  Completed: "border-slate-500/40 bg-slate-500/10 text-slate-300",
};

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export const ProjectStatusBadge = ({ status, className = "" }: ProjectStatusBadgeProps) => (
  <span
    className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium leading-tight ${STATUS_STYLES[status]} ${className}`}
  >
    {status}
  </span>
);

export default ProjectStatusBadge;

/* ------------------------------------------------------------------ */
/* Filter model                                                        */
/* ------------------------------------------------------------------ */

export type ProjectFilter =
  | "All"
  | "Featured"
  | ProjectCategory;

export interface ProjectFilterOption {
  value: ProjectFilter;
  label: string;
  count: number;
}

/**
 * Builds the filter list with real counts per bucket, so the tabs can never
 * advertise a category that holds no projects.
 */
export const buildFilterOptions = (source: Project[]): ProjectFilterOption[] => {
  const counts = new Map<ProjectFilter, number>([["All", source.length]]);
  for (const project of source) {
    if (project.tier === "flagship") {
      counts.set("Featured", (counts.get("Featured") ?? 0) + 1);
    }
    counts.set(project.category, (counts.get(project.category) ?? 0) + 1);
  }

  const ordered: ProjectFilter[] = ["All", "Featured", ...CATEGORY_ORDER];
  return ordered
    .filter((value) => (counts.get(value) ?? 0) > 0)
    .map((value) => ({ value, label: value, count: counts.get(value) ?? 0 }));
};

/** Client-side search across name, category, tagline, description and stack. */
export const matchesQuery = (project: Project, rawQuery: string): boolean => {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return true;

  return (
    project.title.toLowerCase().includes(query) ||
    project.category.toLowerCase().includes(query) ||
    project.tagline.toLowerCase().includes(query) ||
    project.description.toLowerCase().includes(query) ||
    project.technologies.some((tech) => tech.toLowerCase().includes(query))
  );
};
