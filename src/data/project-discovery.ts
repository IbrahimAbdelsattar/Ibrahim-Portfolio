import { CATEGORY_ORDER, type Project, type ProjectCategory } from "@/data/types";

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
    project.repository.toLowerCase().includes(query) ||
    project.id.toLowerCase().includes(query) ||
    project.title.toLowerCase().includes(query) ||
    project.category.toLowerCase().includes(query) ||
    project.tagline.toLowerCase().includes(query) ||
    project.description.toLowerCase().includes(query) ||
    project.technologies.some((tech) => tech.toLowerCase().includes(query))
  );
};
