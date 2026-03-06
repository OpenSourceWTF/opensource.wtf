import { Link, NavLink, Outlet } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
];

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header
        className="border-b border-border sticky top-0 z-50 bg-surface/80 backdrop-blur-md"
        role="banner"
      >
        <nav
          className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          <Link
            to="/"
            className="flex items-center gap-3 group"
            aria-label="Opensource.wtf - Home"
          >
            <img
              src="/logo-dark.svg"
              alt="Opensource.wtf logo"
              className="h-8 w-8"
            />
            <span className="text-lg font-bold tracking-tight text-text-primary group-hover:text-brand transition-colors">
              opensource.wtf
            </span>
          </Link>

          <div className="flex items-center gap-1" role="menubar">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                role="menuitem"
                className={({ isActive }) =>
                  `px-3 py-2 text-sm rounded-md transition-colors ${
                    isActive
                      ? "text-brand font-medium"
                      : "text-text-secondary hover:text-text-primary"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <a
              href="https://github.com/OpenSourceWTF"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
              aria-label="OpenSourceWTF on GitHub (opens in new tab)"
            >
              GitHub
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1" role="main" id="main-content">
        <Outlet />
      </main>

      <footer
        className="border-t border-border py-12"
        role="contentinfo"
        aria-label="Site footer"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-3">
                <img src="/logo-dark.svg" alt="" className="h-6 w-6" />
                <span className="font-bold text-text-primary">
                  opensource.wtf
                </span>
              </Link>
              <p className="text-sm text-text-muted max-w-xs">
                Building open source tools that make developers' lives better.
              </p>
            </div>

            <div className="flex gap-12">
              <nav aria-label="Projects">
                <h4 className="text-sm font-medium text-text-primary mb-3">
                  Projects
                </h4>
                <ul className="space-y-2 text-sm text-text-muted">
                  <li>
                    <a
                      href="https://github.com/OpenSourceWTF/capybara"
                      className="hover:text-text-primary transition-colors"
                    >
                      Capybara
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/OpenSourceWTF/WAAAH"
                      className="hover:text-text-primary transition-colors"
                    >
                      WAAAH
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/OpenSourceWTF/dojo"
                      className="hover:text-text-primary transition-colors"
                    >
                      Dojo
                    </a>
                  </li>
                </ul>
              </nav>
              <nav aria-label="Quick links">
                <h4 className="text-sm font-medium text-text-primary mb-3">
                  Links
                </h4>
                <ul className="space-y-2 text-sm text-text-muted">
                  <li>
                    <a
                      href="https://github.com/OpenSourceWTF"
                      className="hover:text-text-primary transition-colors"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className="hover:text-text-primary transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="hover:text-text-primary transition-colors"
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-xs text-text-muted">
            &copy; {new Date().getFullYear()} OpenSourceWTF. Open source, obviously.
          </div>
        </div>
      </footer>
    </div>
  );
}
