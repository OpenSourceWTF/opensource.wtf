export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  html: string;
}

// Registry of blog posts — add new entries here.
// The markdown source lives at /content/blog/{slug}.md and is also
// served raw for AI agents and tools that prefer markdown.
export const postIndex: BlogPostMeta[] = [
  {
    slug: "hello-world",
    title: "Hello, World!",
    date: "2026-03-06",
    excerpt:
      "Introducing Opensource.wtf — our new home for open source projects, ideas, and experiments.",
    tags: ["announcement", "open-source"],
  },
];

export async function fetchPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`/content/blog/${slug}.md`);
    if (!res.ok) return null;
    const raw = await res.text();

    // Strip frontmatter
    const fmMatch = raw.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
    const body = fmMatch ? fmMatch[1].trim() : raw;

    const meta = postIndex.find((p) => p.slug === slug);
    if (!meta) return null;

    const { marked } = await import("marked");
    const html = await marked(body);

    return { ...meta, content: body, html };
  } catch {
    return null;
  }
}
