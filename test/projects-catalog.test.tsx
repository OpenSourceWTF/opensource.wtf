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

test("every showcased project has a complete catalog record", () => {
  for (const [index, project] of projects.entries()) {
    const context = project.name || `project ${index}`;

    assert.ok(project.name.trim().length > 0, `${context}: name`);
    assert.ok(project.tagline.trim().length > 0, `${context}: tagline`);
    assert.ok(project.description.trim().length > 0, `${context}: description`);
    assert.ok(project.logo.trim().length > 0, `${context}: logo`);
    assert.ok(
      project.primaryAction.href.trim().length > 0,
      `${context}: primary action URL`,
    );
    assert.ok(project.tags.length > 0, `${context}: tags`);
    for (const [tagIndex, tag] of project.tags.entries()) {
      assert.ok(tag.trim().length > 0, `${context}: tag ${tagIndex}`);
    }
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
    const projectCard = [...markup.matchAll(/<article\b[\s\S]*?<\/article>/g)]
      .map(([article]) => article)
      .find((article) => article.includes(MTPLX_NAME));

    assert.ok(projectCard, "MTPLX-MoE project card should render");
    assert.match(projectCard, />Pinned</);
    assert.ok(projectCard.includes(MTPLX_VERSION));
    assert.ok(projectCard.includes(MTPLX_DESCRIPTION));

    const repositoryAnchor = projectCard.match(
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
