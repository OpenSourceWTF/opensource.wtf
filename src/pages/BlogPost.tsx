import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPost, type BlogPost } from "../content/posts";
import Head from "../components/Head";

// Format an ISO date (YYYY-MM-DD) as "June 29, 2026" without timezone drift
// (constructing from parts keeps it on the intended calendar day).
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchPost(slug).then((p) => {
      setPost(p);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 text-text-muted">
          Loading...
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <Link to="/blog" className="text-brand hover:text-brand-light">
            &larr; Back to blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className="py-16" aria-label={post.title}>
      <Head
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
      />
      <div className="max-w-3xl mx-auto px-6">
        <Link
          to="/blog"
          className="text-sm text-text-muted hover:text-text-primary transition-colors mb-8 inline-block"
        >
          &larr; Back to blog
        </Link>

        {/* Masthead: publish date and the raw-source link anchor opposite ends,
            separated from the title by a hairline rule. */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-border pb-3 mb-6 font-mono text-xs tracking-wide text-text-muted">
          <time dateTime={post.date} className="whitespace-nowrap">
            {formatDate(post.date)}
          </time>
          <a
            href={`/content/blog/${post.slug}.md`}
            className="inline-flex items-center gap-1 whitespace-nowrap text-brand transition-colors hover:text-brand-light"
            aria-label="View raw markdown source"
          >
            view&nbsp;.md <span aria-hidden="true">&#8599;</span>
          </a>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-5">{post.title}</h1>

        {/* Topics: chips give the tag list room to wrap instead of squishing. */}
        <ul className="flex flex-wrap gap-2 mb-12 p-0 m-0 list-none">
          {post.tags.map((tag) => (
            <li key={tag}>
              <span className="inline-flex items-center whitespace-nowrap rounded-full border border-border bg-surface-overlay px-3 py-1 text-xs text-text-secondary">
                <span className="mr-0.5 text-text-muted">#</span>
                {tag}
              </span>
            </li>
          ))}
        </ul>

        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </article>
  );
}
