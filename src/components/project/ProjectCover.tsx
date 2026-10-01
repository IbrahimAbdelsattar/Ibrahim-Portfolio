import { useState } from "react";

interface ProjectCoverProps {
  /** Absolute path to a real screenshot. Falls back to a branded cover. */
  src?: string;
  alt: string;
  className?: string;
  /** Applies the hover-scale treatment used on cards. */
  interactive?: boolean;
}

/**
 * Renders a real project screenshot when one exists, and a designed fallback
 * when it does not. A missing image is a normal state — several repositories
 * genuinely have no screenshot — so it degrades to the brand gradient and the
 * project's initials rather than a broken image or a fabricated placeholder.
 */
export const ProjectCover = ({
  src,
  alt,
  className = "",
  interactive = false,
}: ProjectCoverProps) => {
  const [failed, setFailed] = useState(false);
  const initials = alt
    .replace(/[^A-Za-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

  if (!src || failed) {
    return (
      <div
        aria-hidden="true"
        className={`flex items-center justify-center bg-gradient-to-br from-primary/25 via-card to-secondary/20 ${className}`}
      >
        <span className="text-4xl font-bold text-primary/40 select-none">{initials || "AI"}</span>
      </div>
    );
  }

  return (
    <img
      alt={alt}
      src={src}
      loading="lazy"
      decoding="async"
      className={`object-cover object-center transition-transform duration-500 ${className} ${
        interactive ? "group-hover:scale-105" : ""
      }`}
      onError={() => setFailed(true)}
    />
  );
};

export default ProjectCover;
