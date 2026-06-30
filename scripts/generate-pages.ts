/**
 * generate-pages.ts
 *
 * Post-build script: generates per-route HTML pages with correct meta tags
 * so social media crawlers see the right title/description without JS.
 *
 * Runs after `vite build` and uses dist/index.html as the SPA shell template.
 */

import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://opensource.wtf";
const DIST = path.resolve("dist");

interface PageMeta {
  path: string;
  title: string;
  description: string;
  type: "website" | "article";
  image?: string; // absolute URL for og:image / twitter:image; falls back to the site default
  jsonLd?: object;
}

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  image?: string; // optional per-post social image (frontmatter `image:`)
}

function loadPostIndex(): PostMeta[] {
  // Read the generated TS file and extract the JSON array
  const raw = fs.readFileSync(
    path.resolve("src/content/posts.generated.ts"),
    "utf-8",
  );
  const match = raw.match(/postIndex: BlogPostMeta\[\] = (\[[\s\S]*?\]);/);
  if (!match) return [];
  return JSON.parse(match[1]);
}

function replaceMeta(template: string, meta: PageMeta): string {
  const fullTitle = meta.title
    ? `${meta.title} — Opensource.wtf`
    : "Opensource.wtf";
  const url = `${SITE_URL}${meta.path}`;

  let html = template;

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(fullTitle)}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeAttr(meta.description)}"`,
  );

  // Replace Open Graph tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escapeAttr(fullTitle)}"`,
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeAttr(meta.description)}"`,
  );
  html = html.replace(
    /<meta property="og:type" content="[^"]*"/,
    `<meta property="og:type" content="${meta.type}"`,
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${url}"`,
  );

  // Per-page social image (og:image + twitter:image); leaves the site default when unset.
  if (meta.image) {
    html = html.replace(
      /<meta property="og:image" content="[^"]*"/,
      `<meta property="og:image" content="${escapeAttr(meta.image)}"`,
    );
    html = html.replace(
      /<meta name="twitter:image" content="[^"]*"/,
      `<meta name="twitter:image" content="${escapeAttr(meta.image)}"`,
    );
  }

  // Replace Twitter Card tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${escapeAttr(fullTitle)}"`,
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}"`,
  );

  // Inject canonical link and optional JSON-LD before closing </head>
  let inject = `<link rel="canonical" href="${url}" />\n`;
  if (meta.jsonLd) {
    inject += `    <script type="application/ld+json">\n    ${JSON.stringify(meta.jsonLd)}\n    </script>\n`;
  }
  html = html.replace("</head>", `${inject}  </head>`);

  return html;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function writePage(template: string, meta: PageMeta): void {
  const html = replaceMeta(template, meta);
  // /blog/my-post → dist/blog/my-post/index.html
  const dir = path.join(DIST, meta.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
}

// --- Main ---

const template = fs.readFileSync(path.join(DIST, "index.html"), "utf-8");

// Static pages
const staticPages: PageMeta[] = [
  {
    path: "/projects",
    title: "Projects",
    description:
      "Open source tools for the AI agent ecosystem.",
    type: "website",
  },
  {
    path: "/blog",
    title: "Blog",
    description:
      "Thoughts on open source, AI agents, and building in the open.",
    type: "website",
  },
];

for (const page of staticPages) {
  writePage(template, page);
}
console.log(`   ✓ ${staticPages.length} static pages`);

// Blog posts
const posts = loadPostIndex();

for (const post of posts) {
  // Per-post social image: absolutize a root-relative frontmatter `image:`, else the site logo.
  const postImage = post.image
    ? (post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`)
    : `${SITE_URL}/logo-light.png`;
  writePage(template, {
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.excerpt,
    type: "article",
    image: postImage,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: `${SITE_URL}/blog/${post.slug}`,
      image: postImage,
      author: {
        "@type": "Organization",
        name: "OpenSourceWTF",
        url: SITE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "OpenSourceWTF",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo-light.png`,
        },
      },
      keywords: post.tags.join(", "),
    },
  });
}
console.log(`   ✓ ${posts.length} blog post pages`);

// SPA fallback — unmodified template for unknown routes
fs.copyFileSync(path.join(DIST, "index.html"), path.join(DIST, "404.html"));
console.log("   ✓ 404.html fallback");

console.log("✅ Page generation complete");
