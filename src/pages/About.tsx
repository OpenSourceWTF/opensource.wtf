import Head from "../components/Head";

export default function About() {
  return (
    <section className="py-16">
      <Head
        title="About"
        description="About OpenSourceWTF — building open source tools for the AI agent ecosystem."
        path="/about"
      />
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-6">About</h1>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            <strong className="text-text-primary">Opensource.wtf</strong> is a
            collective of developers building open source tools for the AI agent
            ecosystem. We believe the future of software development will be
            shaped by AI agents, and the tools they use should be open, free, and
            community-driven.
          </p>

          <p>
            Our projects span the full stack of AI agent infrastructure — from
            agent frameworks and workflow automation to skill registries and
            developer tooling.
          </p>

          <h2 className="text-2xl font-bold text-text-primary pt-4">
            Philosophy
          </h2>

          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-brand font-bold shrink-0">&gt;</span>
              <span>
                <strong className="text-text-primary">Open by default.</strong>{" "}
                Everything we build is open source. No premium tiers, no "open
                core" bait-and-switch.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand font-bold shrink-0">&gt;</span>
              <span>
                <strong className="text-text-primary">
                  Developer experience first.
                </strong>{" "}
                Tools should be delightful to use. If it feels like work,
                we're doing it wrong.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand font-bold shrink-0">&gt;</span>
              <span>
                <strong className="text-text-primary">
                  Ship, then iterate.
                </strong>{" "}
                Perfect is the enemy of useful. We release early, listen to
                feedback, and improve constantly.
              </span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-text-primary pt-4">
            Get Involved
          </h2>

          <p>
            Check out our{" "}
            <a
              href="https://github.com/OpenSourceWTF"
              className="text-brand hover:text-brand-light transition-colors"
            >
              GitHub organization
            </a>{" "}
            to see what we're building. Contributions, issues, and discussions
            are always welcome.
          </p>
        </div>
      </div>
    </section>
  );
}
