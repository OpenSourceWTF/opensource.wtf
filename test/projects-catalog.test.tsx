import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { projects } from "../src/content/projects.ts";
import Home from "../src/pages/Home.tsx";
import Projects from "../src/pages/Projects.tsx";

const MTPLX_NAME = "MTPLX-MoE";
const MTPLX_VERSION = "2.5.2+opensourcewtf.moe";
const MTPLX_REPOSITORY = "https://github.com/OpenSourceWTF/mtplx-moe";
const MTPLX_DESCRIPTION =
  "Our MTPLX fork keeps native-MTP speculative decoding while adding SSD-streamed expert serving and tested paths for large MoE models such as Hy3, GLM-5.2, and Kimi K3.";

function renderPage(page: React.ReactNode) {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={["/"]}>{page}</MemoryRouter>,
  );
}

test("every showcased project has useful catalog copy", () => {
  for (const project of projects) {
    assert.ok(project.tagline.trim().length > 0, project.name);
    assert.ok(project.description.trim().length > 0, project.name);
  }
});

test("MTPLX-MoE is pinned to the synchronized fork release exactly once", () => {
  const matches = projects.filter(({ name }) => name === MTPLX_NAME);

  assert.equal(matches.length, 1);
  const [project] = matches;
  assert.equal(project.version, MTPLX_VERSION);
  assert.equal(project.pinned, true);
  assert.equal(project.primaryAction.href, MTPLX_REPOSITORY);
});

test("Home and Projects expose the pinned release and hardened repository link", () => {
  for (const page of [<Home />, <Projects />]) {
    const markup = renderPage(page);

    assert.match(markup, new RegExp(MTPLX_NAME));
    assert.match(markup, /Pinned/);
    assert.match(markup, /2\.5\.2\+opensourcewtf\.moe/);
    assert.ok(markup.includes(MTPLX_DESCRIPTION));

    const repositoryAnchor = markup.match(
      new RegExp(`<a\\b([^>]*)href="${MTPLX_REPOSITORY}"([^>]*)>`),
    );
    assert.ok(repositoryAnchor);
    const attributes = `${repositoryAnchor[1]} ${repositoryAnchor[2]}`;
    assert.match(attributes, /\btarget="_blank"/);
    const rel = attributes.match(/\brel="([^"]*)"/)?.[1]?.split(/\s+/) ?? [];
    assert.ok(rel.includes("noopener"));
    assert.ok(rel.includes("noreferrer"));

    assert.ok(
      markup.indexOf(MTPLX_NAME) < markup.indexOf("Leaderboard"),
      "Pinned project should render before regular projects",
    );
  }
});
