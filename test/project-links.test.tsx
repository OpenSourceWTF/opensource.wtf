import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ProjectCard from "../src/components/ProjectCard.tsx";
import { projects } from "../src/content/projects.ts";

test("MLX Profiler exposes the hosted workbench and both source repositories", () => {
  const project = projects.find(({ name }) => name === "MLX Profiler");

  assert.ok(project);
  assert.deepEqual(project.primaryAction, {
    label: "Open workbench",
    href: "https://mlx-profiler.opensource.wtf",
  });
  assert.deepEqual(project.sourceLinks, [
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
  ]);
});

function assertProjectActions(html: string) {
  assert.match(html, /href="https:\/\/mlx-profiler\.opensource\.wtf"/);
  assert.match(html, /href="https:\/\/github\.com\/OpenSourceWTF\/mlx-profiler"/);
  assert.match(
    html,
    /href="https:\/\/github\.com\/OpenSourceWTF\/metal-dispatch-viz"/,
  );
  assert.doesNotMatch(html, /<a\b[^>]*>(?:(?!<\/a>)[\s\S])*<a\b/);
  assert.match(html, /alt=""/);
  assert.equal(html.match(/opens in a new tab/g)?.length, 3);

  const actionAnchors = [...html.matchAll(/<a\b([^>]*)>/g)];
  assert.equal(actionAnchors.length, 3);
  for (const [, attributes] of actionAnchors) {
    assert.match(attributes, /\btarget="_blank"/);
    const rel = attributes.match(/\brel="([^"]*)"/)?.[1]?.split(/\s+/) ?? [];
    assert.ok(rel.includes("noopener"));
    assert.ok(rel.includes("noreferrer"));
  }
}

for (const variant of ["compact", "expanded"] as const) {
  test(`${variant} project card renders independent hosted and source links without nested anchors`, () => {
    const project = projects.find(({ name }) => name === "MLX Profiler");
    assert.ok(project);

    const html = renderToStaticMarkup(
      <ProjectCard project={project} variant={variant} />,
    );

    assertProjectActions(html);
  });
}

test("Home and Projects integrate the shared card with their intended variants", () => {
  const homeSource = readFileSync(
    new URL("../src/pages/Home.tsx", import.meta.url),
    "utf8",
  );
  const projectsSource = readFileSync(
    new URL("../src/pages/Projects.tsx", import.meta.url),
    "utf8",
  );

  assert.match(
    homeSource,
    /<ProjectCard[\s\S]*?project=\{project\}[\s\S]*?variant="compact"/,
  );
  assert.match(
    projectsSource,
    /<ProjectCard[\s\S]*?project=\{project\}[\s\S]*?variant="expanded"/,
  );
});
