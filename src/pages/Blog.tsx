import { Link } from "react-router-dom";
import { postIndex } from "../content/posts";
import Head from "../components/Head";
import PostCover from "../components/PostCover";

export default function Blog() {
  return (
    <section className="py-16">
      <Head
        title="Blog"
        description="Thoughts on open source, AI agents, and building in the open."
        path="/blog"
      />
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        <p className="text-text-secondary mb-10">
          Thoughts on open source, AI agents, and building in the open.
        </p>

        <div className="space-y-6">
          {postIndex.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex flex-col gap-5 rounded-xl border border-border bg-surface-raised p-4 transition-colors hover:border-brand/40 sm:flex-row"
            >
              <PostCover
                slug={post.slug}
                title={post.title}
                tags={post.tags}
                image={post.image}
                className="aspect-[16/10] w-full shrink-0 rounded-lg sm:aspect-auto sm:h-auto sm:w-52"
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
                <h2 className="mb-2 text-xl font-semibold transition-colors group-hover:text-brand">
                  {post.title}
                </h2>
                <p className="leading-relaxed text-text-secondary">
                  {post.excerpt}
                </p>
                <div className="mt-3 text-sm text-brand transition-colors group-hover:text-brand-light">
                  Read more &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
