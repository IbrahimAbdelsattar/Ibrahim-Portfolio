import { type ProjectStatus } from "@/data/types";

const STATUS_STYLES: Record<ProjectStatus, string> = {
  Production: "border-primary/50 bg-primary/15 text-primary",
  "Active Development": "border-primary/40 bg-primary/10 text-primary",
  Research: "border-secondary/40 bg-secondary/10 text-foreground",
  Prototype: "border-border bg-muted/40 text-muted-foreground",
  Completed: "border-border bg-card/60 text-muted-foreground",
  Scaffold: "border-border bg-muted/30 text-muted-foreground",
  "Archived Submission": "border-secondary/40 bg-secondary/10 text-foreground",
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
