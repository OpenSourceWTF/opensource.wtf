import { Link } from "react-router-dom";
import { postIndex } from "../content/posts";

export default function Blog() {
  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        <p className="text-text-secondary mb-10">
          Thoughts on open source, AI agents, and building in the open.
        </p>

        <div className="space-y-8">
          {postIndex.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block group"
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
              <h2 className="text-2xl font-semibold group-hover:text-brand transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-text-secondary leading-relaxed">
                {post.excerpt}
              </p>
              <div className="mt-3 text-sm text-brand group-hover:text-brand-light transition-colors">
                Read more &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
