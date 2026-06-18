export interface Project {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  repo: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    name: "Leaderboard",
    tagline: "The most load-bearing open-source packages, ranked",
    description:
      "A live leaderboard of the open-source packages everything depends on, ranked by dependents, influence, and criticality. See what's quietly holding the internet up.",
    logo: "/leaderboard-logo.svg",
    repo: "https://leaderboard.opensource.wtf",
    tags: ["Leaderboard", "Supply-chain", "Open data"],
  },
  {
    name: "Dojo",
    tagline: "Skill registry for AI coding agents",
    description:
      "A skill registry and distribution system for AI coding agents. Learn, share, and reuse skills across projects and teams.",
    logo: "/dojo-logo.svg",
    repo: "https://github.com/OpenSourceWTF/dojo",
    tags: ["Skills", "Registry", "AI"],
  },
  {
    name: "Huddle",
    tagline: "Multi-agent orchestration framework",
    description:
      "Coordinate multiple AI agents working together on complex tasks. Define agent roles, communication patterns, and shared context.",
    logo: "/huddle-logo.svg",
    repo: "https://github.com/OpenSourceWTF/huddle",
    tags: ["Agents", "Orchestration", "TypeScript"],
  },
];
