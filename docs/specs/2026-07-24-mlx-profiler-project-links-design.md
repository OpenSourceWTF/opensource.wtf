# MLX Profiler project links and thumbnails

## Goal

Add the MLX profiling toolchain to the OpenSource.WTF project surfaces so a
visitor can open the hosted workbench or inspect either source repository
without needing to discover the links through a blog post.

## Scope

- Add one combined MLX Profiler project entry to the shared project catalog.
- Make `https://mlx-profiler.opensource.wtf` the primary action.
- Add separate source actions for:
  - `https://github.com/OpenSourceWTF/mlx-profiler`
  - `https://github.com/OpenSourceWTF/metal-dispatch-viz`
- Generate one project thumbnail for each source repository.
- Display both thumbnails with their matching source actions.
- Render the entry consistently on the homepage and `/projects`.
- Preserve accessible keyboard, focus, mobile, light-theme, and dark-theme
  behavior.

## Non-goals

- No new profiler or visualizer functionality.
- No embedded visualizer iframe or live trace data.
- No footer redesign.
- No changes to the existing projects beyond adapting them to the shared action
  contract.
- No deployment or publication claim without checking the live site separately.

## Content model

Replace the single project `repo` field with an explicit primary action and
optional source links:

```ts
interface ProjectAction {
  label: string;
  href: string;
  thumbnail?: string;
}

interface Project {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  primaryAction: ProjectAction;
  sourceLinks?: ProjectAction[];
  tags: string[];
}
```

Existing projects receive one primary action matching their current URL and no
source links. This preserves their current destinations while avoiding a
special-case card API.

The new project uses:

- Name: `MLX Profiler`
- Tagline: `See the work around your Metal kernels`
- Description: a short explanation that the profiler captures MLX dispatch,
  host encode, GPU, and wait evidence while the visualizer turns it into a
  local, read-only timeline.
- Primary label: `Open workbench`
- Tags: `MLX`, `Metal`, `Profiling`

## Presentation

The existing OpenSource.WTF visual system remains authoritative: current
typography, brand color, borders, radii, surfaces, spacing, and motion.

Project cards become semantic containers instead of one outer anchor. Each card
contains:

1. Existing logo, name, tagline, description, and tags.
2. One clear primary action.
3. An optional two-column source row.

For MLX Profiler, the source row contains:

- Profiler source with the profiler thumbnail.
- Visualizer source with the visualizer thumbnail.

On narrow screens the source row stacks. Every action is at least 44px high,
has visible focus treatment, names its destination, and indicates that it opens
in a new tab through accessible text.

The homepage keeps its existing grid. The added fourth project wraps naturally
at the current responsive breakpoint. The `/projects` entry retains its larger
horizontal presentation but moves its actions below the descriptive copy.

## Thumbnail direction

Both thumbnails use the site's existing dark technical character and share one
visual family without being interchangeable.

### MLX Profiler

- A compact command-stream motif: coral host dispatch marks above cyan Metal
  execution bars.
- Emphasis on capture and measurement.
- No tiny chart labels or numerical claims.
- No text baked into the image.

### Metal Dispatch Visualizer

- A compact timeline/workbench motif with aligned host, GPU, and wait lanes.
- Emphasis on visual inspection and overlap.
- No browser chrome, tiny labels, or numerical claims.
- No text baked into the image.

Both are square raster assets with strong silhouettes, safe padding, no
watermark, and sufficient contrast in light and dark page themes.

## Error handling

The project catalog is static and has no loading state. Missing optional source
links render no source row. Missing thumbnails must not remove the text link;
the action remains understandable from its label.

## Accessibility

- No nested anchors.
- Every action is keyboard reachable.
- Focus-visible styling matches or exceeds the current link treatment.
- Thumbnails are decorative because the adjacent text names each repository;
  they use empty alt text.
- Link purpose is understandable without surrounding visual context.
- Layout does not depend on color to distinguish the two repositories.

## Testing

- Add focused tests for the project content contract and both new repository
  URLs.
- Add focused rendering checks that the homepage and Projects page expose the
  hosted workbench plus both source actions without nested anchors.
- Verify thumbnail files exist and are referenced.
- Run targeted tests while iterating.
- At the commit gate, run the full project build because the repository has no
  separate full test script.

## Rollout

This is a static site change. Merge or push only after the build is green.
GitHub Pages deployment remains the existing workflow. Confirm the live links
after deployment before describing the site as updated in production.

## Failure-mode review

1. **Nested interactive controls** would create invalid and confusing markup.
   The card is therefore a container with independent links.
2. **Thumbnail detail may disappear at card size.** Both assets use simple,
   text-free shapes and are checked at their rendered dimensions.
3. **The fourth homepage project may unbalance the three-column grid.** Wrapping
   is accepted; no new breakpoint or special span is introduced.
4. **A missing image could hide a repository identity.** Text labels remain
   authoritative and usable without imagery.
