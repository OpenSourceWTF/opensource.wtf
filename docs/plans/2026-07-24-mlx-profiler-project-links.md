# MLX Profiler Project Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-optimized:subagent-driven-development (recommended) or superpowers-optimized:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one accessible MLX Profiler project entry with a hosted-workbench action, two source-repository actions, and distinct profiler and visualizer thumbnails.

**Architecture:** Extend the static project catalog from one destination URL to an explicit primary action plus optional source actions. Replace the outer linked project cards with semantic containers so all destinations remain independent, valid links. Generate two square, text-free raster assets and use them only beside their matching repository actions.

**Tech Stack:** React 19, TypeScript 5.9, React Router 7, Tailwind CSS 4, Node test runner through `tsx`, Vite, built-in image generation.

**Assumptions:**

- Assumes the hosted workbench remains at `https://mlx-profiler.opensource.wtf` — the primary action will be wrong if that deployment moves.
- Assumes both repositories remain public under `OpenSourceWTF` — source links will not handle authentication or private access.
- Assumes static project content is sufficient — this plan does not add a CMS, API, loading state, or runtime repository metadata.

---

## File structure

- `public/mlx-profiler-thumbnail.png` — square, text-free profiler capture motif.
- `public/metal-dispatch-viz-thumbnail.png` — square, text-free timeline/workbench motif.
- `src/content/projects.ts` — project types, existing-project action migration, and new MLX Profiler content.
- `src/components/ProjectCard.tsx` — shared semantic card and independent action rendering.
- `src/pages/Home.tsx` — compact shared-card usage.
- `src/pages/Projects.tsx` — expanded shared-card usage.
- `test/project-links.test.tsx` — content and server-rendered markup contracts.
- `package.json` — focused test command.

### Task 1: Generate and validate both thumbnails

**Files:**

- Create: `public/mlx-profiler-thumbnail.png`
- Create: `public/metal-dispatch-viz-thumbnail.png`

**Security flag:** `none`

- [ ] **Step 1: Generate the profiler thumbnail**

Use the built-in image generator in edit-free generation mode with:

```text
Use case: infographic-diagram
Asset type: square project-repository thumbnail
Primary request: Create an abstract MLX Metal profiler thumbnail showing a compact coral host-command stream above a cyan GPU execution lane.
Style/medium: crisp flat technical infographic, dark navy instrument-panel aesthetic
Composition/framing: centered square composition, bold simple shapes, generous safe padding, readable at 64 pixels
Color palette: dark navy, coral, cyan, muted slate
Constraints: no text, no numbers, no logos, no watermark, no browser chrome
Avoid: tiny labels, dense charts, photorealism, gradients that reduce contrast
```

Save the selected output to `public/mlx-profiler-thumbnail.png`.

- [ ] **Step 2: Generate the visualizer thumbnail**

Use the built-in image generator in edit-free generation mode with:

```text
Use case: infographic-diagram
Asset type: square project-repository thumbnail
Primary request: Create an abstract Metal dispatch visualizer thumbnail with aligned host, GPU, and wait timeline lanes, a selected range, and one inspection marker.
Style/medium: crisp flat technical infographic, dark navy instrument-panel aesthetic matching the profiler thumbnail
Composition/framing: centered square composition, bold simple shapes, generous safe padding, readable at 64 pixels
Color palette: dark navy, cyan, coral, amber, muted slate
Constraints: no text, no numbers, no logos, no watermark, no browser chrome
Avoid: tiny labels, dense charts, photorealism, gradients that reduce contrast
```

Save the selected output to `public/metal-dispatch-viz-thumbnail.png`.

- [ ] **Step 3: Validate both image assets**

Run:

```sh
file public/mlx-profiler-thumbnail.png public/metal-dispatch-viz-thumbnail.png
```

Expected: both files are PNG raster images with square dimensions.

- [ ] **Step 4: Inspect both at full size and thumbnail size**

Open both assets with the image viewer and confirm:

- distinct profiler and visualizer motifs;
- no text, number, logo, or watermark;
- strong contrast and recognizable shapes at card size;
- no important content touches the edges.

### Task 2: Add the project action contract with failing tests

**Files:**

- Modify: `package.json`
- Modify: `src/content/projects.ts`
- Create: `test/project-links.test.tsx`

**Security flag:** `none`

**Does NOT cover:** Optional source actions render only when `sourceLinks` is present; it does not infer repository links from a project name or primary URL.

- [ ] **Step 1: Add the focused test command**

Add to `package.json` scripts:

```json
"test": "tsx --test test/**/*.test.tsx"
```

- [ ] **Step 2: Write the failing content test**

Create `test/project-links.test.tsx` with:

```tsx
import assert from "node:assert/strict";
import test from "node:test";
import { projects } from "../src/content/projects.ts";

test("MLX Profiler exposes the hosted workbench and both source repositories", () => {
  const project = projects.find(({ name }) => name === "MLX Profiler");

  assert.ok(project);
  assert.deepEqual(project.primaryAction, {
    label: "Open workbench",
    href: "https://mlx-profiler.opensource.wtf",
  });
  assert.deepEqual(project.sourceLinks, [
    {
      label: "Profiler source",
      href: "https://github.com/OpenSourceWTF/mlx-profiler",
      thumbnail: "/mlx-profiler-thumbnail.png",
    },
    {
      label: "Visualizer source",
      href: "https://github.com/OpenSourceWTF/metal-dispatch-viz",
      thumbnail: "/metal-dispatch-viz-thumbnail.png",
    },
  ]);
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run:

```sh
pnpm test
```

Expected: FAIL because `MLX Profiler` does not exist.

- [ ] **Step 4: Implement the action contract and project entry**

In `src/content/projects.ts`, define:

```ts
export interface ProjectAction {
  label: string;
  href: string;
  thumbnail?: string;
}

export interface Project {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  primaryAction: ProjectAction;
  sourceLinks?: ProjectAction[];
  tags: string[];
}
```

Migrate each existing `repo` value into:

```ts
primaryAction: { label: "View project", href: "<existing URL>" }
```

Append:

```ts
{
  name: "MLX Profiler",
  tagline: "See the work around your Metal kernels",
  description:
    "Capture MLX dispatch, host encode, GPU, and wait evidence, then inspect it in a local, read-only timeline.",
  logo: "/mlx-profiler-thumbnail.png",
  primaryAction: {
    label: "Open workbench",
    href: "https://mlx-profiler.opensource.wtf",
  },
  sourceLinks: [
    {
      label: "Profiler source",
      href: "https://github.com/OpenSourceWTF/mlx-profiler",
      thumbnail: "/mlx-profiler-thumbnail.png",
    },
    {
      label: "Visualizer source",
      href: "https://github.com/OpenSourceWTF/metal-dispatch-viz",
      thumbnail: "/metal-dispatch-viz-thumbnail.png",
    },
  ],
  tags: ["MLX", "Metal", "Profiling"],
}
```

- [ ] **Step 5: Run the focused test**

Run:

```sh
pnpm test
```

Expected: PASS.

### Task 3: Render accessible shared project cards

**Files:**

- Create: `src/components/ProjectCard.tsx`
- Modify: `src/pages/Home.tsx`
- Modify: `src/pages/Projects.tsx`
- Modify: `test/project-links.test.tsx`

**Security flag:** `none`

**Does NOT cover:** The compact and expanded variants change layout only; they do not change link destinations or hide any action.

- [ ] **Step 1: Write failing markup tests**

Append to `test/project-links.test.tsx`:

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import ProjectCard from "../src/components/ProjectCard.tsx";

test("project card renders independent hosted and source links without nested anchors", () => {
  const project = projects.find(({ name }) => name === "MLX Profiler");
  assert.ok(project);

  const html = renderToStaticMarkup(
    <ProjectCard project={project} variant="compact" />,
  );

  assert.match(html, /href="https:\/\/mlx-profiler\.opensource\.wtf"/);
  assert.match(html, /href="https:\/\/github\.com\/OpenSourceWTF\/mlx-profiler"/);
  assert.match(html, /href="https:\/\/github\.com\/OpenSourceWTF\/metal-dispatch-viz"/);
  assert.doesNotMatch(html, /<a[^>]*>[^]*<a/);
  assert.match(html, /alt=""/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```sh
pnpm test
```

Expected: FAIL because `ProjectCard.tsx` does not exist.

- [ ] **Step 3: Implement the shared card**

Create `src/components/ProjectCard.tsx` with a typed `project` prop and
`"compact" | "expanded"` variant. Render:

- a semantic `<article>`;
- the existing logo, name, tagline, description, tags;
- `primaryAction` as a visible external link;
- `sourceLinks` as an optional responsive grid;
- source thumbnails with `alt=""`;
- `target="_blank"` and `rel="noopener noreferrer"` on every external action;
- existing tokens for surfaces, borders, type, brand color, hover, and
  `focus-visible` treatment;
- minimum `min-h-11` action height.

- [ ] **Step 4: Replace duplicate page card markup**

In `src/pages/Home.tsx`, import `ProjectCard` and render:

```tsx
{projects.map((project) => (
  <ProjectCard key={project.name} project={project} variant="compact" />
))}
```

In `src/pages/Projects.tsx`, render:

```tsx
{projects.map((project) => (
  <ProjectCard key={project.name} project={project} variant="expanded" />
))}
```

- [ ] **Step 5: Run focused tests**

Run:

```sh
pnpm test
```

Expected: PASS with both content and markup contracts green.

### Task 4: Verify production readiness

**Files:**

- Verify all files from Tasks 1-3.

**Security flag:** `none`

- [ ] **Step 1: Run formatting and diff checks**

Run:

```sh
git diff --check
```

Expected: no output and exit code 0.

- [ ] **Step 2: Run the focused tests**

Run:

```sh
pnpm test
```

Expected: all tests pass.

- [ ] **Step 3: Run the commit-gate build**

Run:

```sh
pnpm build
```

Expected: content generation, TypeScript, Vite, and static page generation all
complete successfully.

- [ ] **Step 4: Inspect the built links**

Run:

```sh
rg -n "mlx-profiler\\.opensource\\.wtf|OpenSourceWTF/mlx-profiler|OpenSourceWTF/metal-dispatch-viz" dist
```

Expected: the hosted and both source URLs appear in built output.

- [ ] **Step 5: Review repository state**

Run:

```sh
git status --short --branch
git diff --stat
```

Expected: only the spec, plan, two thumbnails, project content, shared card,
page integrations, test, package script, and generated content changes required
by the build are present.
