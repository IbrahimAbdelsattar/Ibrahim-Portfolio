/**
 * Portfolio project taxonomy.
 *
 * Every field below is populated from first-party evidence only: repository
 * READMEs, repository trees, GitHub language statistics, live HTTP checks, and
 * the canonical CV facts in PROFILE.md. Nothing here is inferred from a repo
 * name alone.
 */

export type ProjectCategory =
  | "AI Products"
  | "Generative AI & Agents"
  | "Machine Learning"
  | "NLP & Speech"
  | "Data Science"
  | "Full-Stack Systems"
  | "Research & Coursework";

export type ProjectStatus =
  | "Production"
  | "Active Development"
  | "Research"
  | "Prototype"
  | "Completed";

export type ProjectTier = "flagship" | "notable" | "archive";

export interface ProjectArchitecture {
  frontend?: string[];
  backend?: string[];
  ai?: string[];
  database?: string[];
  infrastructure?: string[];
  integrations?: string[];
}

/** A companion repository that belongs to the same product. */
export interface RelatedRepo {
  /** Repository slug on GitHub. */
  slug: string;
  /** Present only when the repository is publicly reachable. */
  url?: string;
  /** True when the source exists but is not publicly visible. */
  isPrivate: boolean;
  /** What this repo contributes to the product. */
  role: string;
}

export interface Project {
  /** URL-safe slug, used for routing and as a stable React key. */
  id: string;
  title: string;
  /** One-line value proposition shown on cards. */
  tagline: string;
  category: ProjectCategory;
  status: ProjectStatus;
  /** Controls ordering and which projects surface as featured. */
  tier: ProjectTier;
  year: string;
  role?: string;

  /** Full, factual description used on cards and detail pages. */
  description: string;
  /** The problem the project addresses, where evidence supports it. */
  problem?: string;
  /** Evidenced capabilities, never aspirational. */
  highlights: string[];
  /**
   * Integrity disclosures surfaced on the case study — for example when a
   * README claims a feature the repository does not contain. Kept visible
   * rather than silently dropped so the portfolio stays honest.
   */
  notes?: string[];

  /** Normalised technology names (see tech.ts for the canonical spellings). */
  technologies: string[];
  architecture?: ProjectArchitecture;

  /**
   * Canonical repository URL. Only set when the repository is publicly
   * reachable — a private repo would render a 404 for visitors, so it is
   * represented by `sourcePrivate` instead.
   */
  githubUrl?: string;
  /** True when the source exists but is not public. */
  sourcePrivate?: boolean;
  liveUrl?: string;

  relatedRepos?: RelatedRepo[];

  /**
   * Optional by design: a project without a real screenshot renders the
   * branded fallback in ProjectCover rather than a placeholder image that
   * would imply functionality the repository does not have.
   */
  image?: string;
  images?: string[];
}

export const CATEGORY_ORDER: ProjectCategory[] = [
  "AI Products",
  "Generative AI & Agents",
  "Machine Learning",
  "NLP & Speech",
  "Data Science",
  "Full-Stack Systems",
  "Research & Coursework",
];
