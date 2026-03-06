import { projects } from "../content/projects";

export default function Projects() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-2">Projects</h1>
        <p className="text-text-secondary mb-10">
          Open source tools for the AI agent ecosystem.
        </p>

        <div className="space-y-6">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex gap-6 p-6 rounded-xl border border-border bg-surface-raised hover:border-brand/30 transition-all"
            >
              <img
                src={project.logo}
                alt=""
                className="h-16 w-16 rounded-lg shrink-0"
              />
              <div>
                <h2 className="text-xl font-semibold group-hover:text-brand transition-colors mb-1">
                  {project.name}
                </h2>
                <p className="text-sm text-brand/80 font-medium mb-2">
                  {project.tagline}
                </p>
                <p className="text-text-secondary leading-relaxed">
                  {project.description}
                </p>
                <div className="flex gap-2 mt-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-surface-overlay text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
