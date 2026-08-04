import { Link } from "react-router-dom";
import { pinnedProjects, regularProjects } from "../content/projects";
import { postIndex as posts } from "../content/posts";
import Head from "../components/Head";
import PostCover from "../components/PostCover";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  return (
    <>
      <Head />
      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                The best software is{" "}
                <span className="text-brand">open source</span>
              </h1>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8">
                Building fun stuff for everyone.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center px-6 py-3 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors"
                >
                  Projects
                </Link>
                <Link
                  to="/blog"
                  className="inline-flex items-center px-6 py-3 border border-border text-text-primary font-medium rounded-lg hover:bg-surface-raised transition-colors"
                >
                  Blog
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/logo-light.svg"
                alt="OSWTF"
                className="w-full max-w-sm"
              />
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
            {[...pinnedProjects, ...regularProjects].map((project) => (
              <ProjectCard
                key={project.name}
                project={project}
                variant="compact"
              />
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
                className="group flex flex-col gap-5 rounded-xl border border-border bg-surface-raised p-4 transition-all hover:border-brand/30 sm:flex-row"
              >
                <PostCover
                  slug={post.slug}
                  title={post.title}
                  tags={post.tags}
                  image={post.image}
                  className="aspect-[16/10] w-full shrink-0 rounded-lg sm:aspect-auto sm:h-auto sm:w-48"
                />
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-muted">
                    <time>{post.date}</time>
                    <span>&middot;</span>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-brand">
                    {post.title}
                  </h3>
                  <p className="text-text-secondary">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
