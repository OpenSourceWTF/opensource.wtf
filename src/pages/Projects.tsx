import { projects } from "../content/projects";
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

        <div className="space-y-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              variant="expanded"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
