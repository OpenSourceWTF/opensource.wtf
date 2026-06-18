import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ThemeChoice = "light" | "dark" | "system";
type Resolved = "light" | "dark";

const STORAGE_KEY = "theme";
const META_COLOR = { light: "#f6f6fb", dark: "#101019" } as const;

function systemPrefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function resolve(choice: ThemeChoice): Resolved {
  if (choice === "system") return systemPrefersDark() ? "dark" : "light";
  return choice;
}

function apply(resolved: Resolved) {
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", META_COLOR[resolved]);
}

function readStored(): ThemeChoice {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark" || v === "system") return v;
  } catch {
    /* localStorage unavailable (private mode, etc.) */
  }
  return "system";
}

interface ThemeContextValue {
  /** The user's choice, including "system". */
  theme: ThemeChoice;
  /** The concrete theme currently applied. */
  resolved: Resolved;
  setTheme: (t: ThemeChoice) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeChoice>(readStored);
  const [resolved, setResolved] = useState<Resolved>(() => resolve(readStored()));

  // Apply the resolved theme and persist the choice whenever it changes.
  useEffect(() => {
    const r = resolve(theme);
    setResolved(r);
    apply(r);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  // While on "system", follow live OS changes.
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const r: Resolved = mq.matches ? "dark" : "light";
      setResolved(r);
      apply(r);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((t: ThemeChoice) => setThemeState(t), []);

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
