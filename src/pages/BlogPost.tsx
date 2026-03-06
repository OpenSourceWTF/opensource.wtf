import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPost, type BlogPost } from "../content/posts";

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
      <div className="max-w-3xl mx-auto px-6">
        <Link
          to="/blog"
          className="text-sm text-text-muted hover:text-text-primary transition-colors mb-8 inline-block"
        >
          &larr; Back to blog
        </Link>

        <div className="flex items-center gap-3 text-sm text-text-muted mb-4">
          <time dateTime={post.date}>{post.date}</time>
          <span>&middot;</span>
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
          <span>&middot;</span>
          <a
            href={`/content/blog/${post.slug}.md`}
            className="text-brand hover:text-brand-light transition-colors"
            aria-label="View raw markdown source"
          >
            view .md
          </a>
        </div>

        <h1 className="text-4xl font-bold mb-8">{post.title}</h1>

        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </article>
  );
}
