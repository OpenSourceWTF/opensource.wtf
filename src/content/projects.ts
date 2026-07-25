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

export const projects: Project[] = [
  {
    name: "Leaderboard",
    tagline: "The most load-bearing open-source packages, ranked",
    description:
      "A live leaderboard of the open-source packages everything depends on, ranked by dependents, influence, and criticality. See what's quietly holding the internet up.",
    logo: "/leaderboard-logo.svg",
    primaryAction: {
      label: "View project",
      href: "https://leaderboard.opensource.wtf",
    },
    tags: ["Leaderboard", "Supply-chain", "Open data"],
  },
  {
    name: "Dojo",
    tagline: "Skill registry for AI coding agents",
    description:
      "A skill registry and distribution system for AI coding agents. Learn, share, and reuse skills across projects and teams.",
    logo: "/dojo-logo.svg",
    primaryAction: {
      label: "View project",
      href: "https://github.com/OpenSourceWTF/dojo",
    },
    tags: ["Skills", "Registry", "AI"],
  },
  {
    name: "Huddle",
    tagline: "Multi-agent orchestration framework",
    description:
      "Coordinate multiple AI agents working together on complex tasks. Define agent roles, communication patterns, and shared context.",
    logo: "/huddle-logo.svg",
    primaryAction: {
      label: "View project",
      href: "https://github.com/OpenSourceWTF/huddle",
    },
    tags: ["Agents", "Orchestration", "TypeScript"],
  },
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
  },
];
