import { pinnedProjects, regularProjects } from "../content/projects";
import Head from "../components/Head";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <section className="py-16">
      <Head
        title="Projects"
        description="Open source tools for the AI agent ecosystem."
        path="/projects"
      />
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-2">Projects</h1>
        <p className="text-text-secondary mb-10">
          Open source tools for the AI agent ecosystem.
        </p>

        {pinnedProjects.length > 0 ? (
          <section aria-labelledby="pinned-projects-heading" className="mb-12">
            <h2
              id="pinned-projects-heading"
              className="mb-4 text-sm font-semibold uppercase tracking-wide text-text-secondary"
            >
              Pinned projects
            </h2>
            <div className="space-y-6">
              {pinnedProjects.map((project) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  variant="expanded"
                />
              ))}
            </div>
          </section>
        ) : null}

        <section aria-labelledby="all-projects-heading">
          <h2 id="all-projects-heading" className="sr-only">
            All other projects
          </h2>
          <div className="space-y-6">
            {regularProjects.map((project) => (
              <ProjectCard
                key={project.name}
                project={project}
                variant="expanded"
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
