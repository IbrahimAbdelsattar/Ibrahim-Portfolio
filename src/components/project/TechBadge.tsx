interface TechBadgeProps {
  tech: string;
  /** Renders the compact variant used inside dense card footers. */
  compact?: boolean;
  onClick?: () => void;
  active?: boolean;
}

/**
 * Single technology chip. Kept dumb and reusable so cards, detail pages and
 * the tech-stack section all render technology names identically.
 */
export const TechBadge = ({ tech, compact = false, onClick, active = false }: TechBadgeProps) => {
  const base = compact
    ? "px-2.5 py-0.5 text-xs rounded-lg"
    : "px-3 py-1 text-xs rounded-full";

  const tone = active
    ? "bg-primary/25 text-primary border-primary/50"
    : "bg-primary/10 text-primary/90 border-primary/20";

  const className = `${base} font-medium border transition-colors ${tone}`;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`${className} cursor-pointer hover:bg-primary/20`}
      >
        {tech}
      </button>
    );
  }

  return <span className={className}>{tech}</span>;
};

export default TechBadge;
