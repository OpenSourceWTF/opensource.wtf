import { useEffect } from "react";

interface HeadProps {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
}

const SITE = "https://opensource.wtf";
const DEFAULT_TITLE = "Opensource.wtf";
const DEFAULT_DESC =
  "Open source tools for the AI agent ecosystem. Building developer tools in the open.";

export default function Head({
  title,
  description,
  path = "",
  type = "website",
}: HeadProps) {
  const fullTitle = title ? `${title} — ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  const desc = description || DEFAULT_DESC;
  const url = `${SITE}${path}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(
        `meta[${attr}="${name}"]`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", desc);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", desc, "property");
    setMeta("og:url", url, "property");
    setMeta("og:type", type, "property");
    setMeta("og:image", `${SITE}/logo.png`, "property");

    let canonical = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [fullTitle, desc, url, type]);

  return null;
}
