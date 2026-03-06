import { Link } from "react-router-dom";
import { projects } from "../content/projects";
import { postIndex as posts } from "../content/posts";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <img src="/logo-light.svg" alt="" className="h-16 w-16" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Open source that makes you say{" "}
              <span className="text-brand">WTF</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8">
              We build tools for developers working with AI agents, automation,
              and modern workflows. Everything is open source because the best
              software is built in the open.
            </p>
            <div className="flex gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center px-6 py-3 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors"
              >
                View Projects
              </Link>
              <a
                href="https://github.com/OpenSourceWTF"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-border text-text-primary font-medium rounded-lg hover:bg-surface-raised transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold">Projects</h2>
            <Link
              to="/projects"
              className="text-sm text-brand hover:text-brand-light transition-colors"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-xl border border-border bg-surface-raised hover:border-brand/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={project.logo}
                    alt=""
                    className="h-8 w-8 rounded"
                  />
                  <h3 className="font-semibold text-lg group-hover:text-brand transition-colors">
                    {project.name}
                  </h3>
                </div>
                <p className="text-sm text-brand/80 font-medium mb-2">
                  {project.tagline}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {project.description}
                </p>
                <div className="flex gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-surface-overlay text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-16 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold">Latest Posts</h2>
            <Link
              to="/blog"
              className="text-sm text-brand hover:text-brand-light transition-colors"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="space-y-6">
            {posts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block group p-6 rounded-xl border border-border bg-surface-raised hover:border-brand/30 transition-all"
              >
                <div className="flex items-center gap-3 text-sm text-text-muted mb-2">
                  <time>{post.date}</time>
                  <span>&middot;</span>
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-semibold group-hover:text-brand transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-text-secondary">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
