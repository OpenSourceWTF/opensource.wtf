# opensource.wtf

Open source technology showcase and blog for [OpenSourceWTF](https://github.com/OpenSourceWTF).

## Stack

- [Vite](https://vite.dev) + [React](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [React Router v7](https://reactrouter.com)
- Blog content lives in [OpenSourceWTF/blog](https://github.com/OpenSourceWTF/blog)

## Architecture

```
OpenSourceWTF/blog              ← Markdown blog posts
  └── posts/*.md

OpenSourceWTF/opensource.wtf    ← This repo (site code)
  ├── scripts/build-content.ts  ← Generates index, RSS, sitemap, llms.txt
  ├── src/                      ← React app
  └── .github/workflows/        ← CI/CD
```

Blog posts are markdown files with YAML frontmatter. At build time, `scripts/build-content.ts` reads all posts and generates:

- `src/content/posts.generated.ts` — typed post index
- `public/content/blog/*.md` — raw markdown for AI agent access
- `public/rss.xml` — RSS 2.0 feed
- `public/sitemap.xml` — sitemap for SEO
- `public/llms.txt` — AI agent discovery file

## Local Development

```bash
# 1. Clone both repos
git clone git@github.com:OpenSourceWTF/opensource.wtf.git
cd opensource.wtf
git clone git@github.com:OpenSourceWTF/blog.git blog-content

# 2. Install deps
pnpm install

# 3. Run dev server
pnpm dev
```

The content script looks for blog posts in `./blog-content/posts/` first, then `../blog/posts/`.

## Build

```bash
pnpm build     # runs: content generation → TypeScript check → Vite build
pnpm preview   # preview the built site locally
```

## Deployment

Deployed to **GitHub Pages** via GitHub Actions.

### How it works

1. Push to `main` on this repo → GitHub Action builds and deploys
2. Push to `main` on `OpenSourceWTF/blog` → triggers a `repository_dispatch` to this repo → rebuilds and deploys
3. Manual trigger via `workflow_dispatch` also available

### Setup Instructions

#### 1. Enable GitHub Pages

1. Go to [repo Settings > Pages](https://github.com/OpenSourceWTF/opensource.wtf/settings/pages)
2. Source: **GitHub Actions**

#### 2. Create a GitHub PAT for cross-repo dispatch

The blog repo needs a PAT to trigger rebuilds on this repo.

1. Go to [GitHub Settings > Developer Settings > Personal Access Tokens > Fine-grained tokens](https://github.com/settings/tokens?type=beta)
2. Create a new token:
   - **Name:** `blog-site-dispatch`
   - **Repository access:** Select `OpenSourceWTF/opensource.wtf`
   - **Permissions:** Contents: Read and Write (needed for `repository_dispatch`)
   - **Expiration:** Set as needed
3. Copy the token

#### 3. Add the PAT to the blog repo

1. Go to [OpenSourceWTF/blog Settings > Secrets > Actions](https://github.com/OpenSourceWTF/blog/settings/secrets/actions)
2. Add a new secret:
   - **Name:** `SITE_REPO_PAT`
   - **Value:** The PAT from step 2

#### 4. Custom Domain (opensource.wtf)

1. Go to [repo Settings > Pages](https://github.com/OpenSourceWTF/opensource.wtf/settings/pages)
2. Under "Custom domain", enter `opensource.wtf`
3. At your DNS provider, add:
   - **A records** pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or a **CNAME** record: `opensourcewtf.github.io`
4. Check "Enforce HTTPS"

### Writing a Blog Post

1. Create a new `.md` file in the [blog repo](https://github.com/OpenSourceWTF/blog) under `posts/`:

```markdown
---
title: "Your Post Title"
date: "2026-03-15"
excerpt: "A short description."
tags: ["tag1", "tag2"]
---

Your content in markdown...
```

2. Push to `main`. The site rebuilds automatically.

## AI/Agent Readability

- `/llms.txt` — machine-readable site summary
- `/content/blog/*.md` — raw markdown for every blog post
- `/rss.xml` — RSS feed
- `/sitemap.xml` — sitemap
- JSON-LD structured data in HTML
- Semantic HTML with ARIA labels
