import type { Project } from "../content/projects";

interface ProjectCardProps {
  project: Project;
  variant: "compact" | "expanded";
}

const externalLinkClasses =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface-raised";

export default function ProjectCard({
  project,
  variant,
}: ProjectCardProps) {
  const expanded = variant === "expanded";

  return (
    <article
      className={[
        "rounded-xl border border-border bg-surface-raised p-6 transition-colors hover:border-brand/30",
        expanded ? "sm:flex sm:gap-6" : "h-full",
      ].join(" ")}
    >
      {expanded ? (
        <img
          src={project.logo}
          alt=""
          className="mb-4 h-16 w-16 shrink-0 rounded-lg object-cover sm:mb-0"
        />
      ) : null}

      <div className="min-w-0 flex-1">
        {expanded ? (
          <h2 className="mb-1 text-xl font-semibold">{project.name}</h2>
        ) : (
          <div className="mb-4 flex items-center gap-3">
            <img
              src={project.logo}
              alt=""
              className="h-8 w-8 shrink-0 rounded object-cover"
            />
            <h3 className="text-lg font-semibold">{project.name}</h3>
          </div>
        )}
        <p className="mb-2 text-sm font-medium text-brand/80">
          {project.tagline}
        </p>
        <p
          className={[
            "leading-relaxed text-text-secondary",
            expanded ? "" : "text-sm",
          ].join(" ")}
        >
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface-overlay px-2 py-1 text-xs text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5">
          <a
            href={project.primaryAction.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark ${externalLinkClasses}`}
          >
            {project.primaryAction.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        {project.sourceLinks && project.sourceLinks.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {project.sourceLinks.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex min-h-11 items-center gap-3 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:border-brand/30 hover:text-brand ${externalLinkClasses}`}
              >
                {source.thumbnail ? (
                  <img
                    src={source.thumbnail}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded object-cover"
                  />
                ) : null}
                <span>{source.label}</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
