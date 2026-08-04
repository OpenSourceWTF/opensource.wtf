export interface ProjectAction {
  label: string;
  href: string;
  thumbnail?: string;
}

export interface Project {
  name: string;
  version?: string;
  pinned?: boolean;
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
  {
    name: "MTPLX-MoE",
    version: "2.5.2+opensourcewtf.moe",
    pinned: true,
    tagline: "Native-MTP inference with SSD-streamed MoE on Apple Silicon",
    description:
      "Our MTPLX fork keeps native-MTP speculative decoding while adding SSD-streamed expert serving and tested paths for large MoE models such as Hy3, GLM-5.2, and Kimi K3.",
    logo: "/mtplx-moe-icon.png",
    primaryAction: {
      label: "View repository",
      href: "https://github.com/OpenSourceWTF/mtplx-moe",
    },
    tags: ["Apple Silicon", "MLX", "MTP", "MoE"],
  },
];

export const pinnedProjects = projects.filter((project) => project.pinned);
export const regularProjects = projects.filter((project) => !project.pinned);
