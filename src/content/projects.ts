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
    name: "Capybara",
    tagline: "AI-powered agent framework",
    description:
      "A flexible framework for building AI agents that can reason, plan, and execute complex tasks. Designed for composability and extensibility.",
    logo: "/capybara-logo.svg",
    repo: "https://github.com/OpenSourceWTF/capybara",
    tags: ["AI", "Agents", "TypeScript"],
  },
  {
    name: "WAAAH",
    tagline: "Workflow automation for AI agents",
    description:
      "An opinionated workflow system for orchestrating AI agents. Define tasks, manage state, and let agents handle the rest.",
    logo: "/waaah-logo.svg",
    repo: "https://github.com/OpenSourceWTF/WAAAH",
    tags: ["Automation", "AI", "Workflows"],
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
];
