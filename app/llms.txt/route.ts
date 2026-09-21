import { site } from "@/lib/site";
import { features } from "@/lib/features";
import { specs } from "@/lib/content";

/**
 * `/llms.txt` — a plain-text brief for language models, per llmstxt.org.
 *
 * This file exists because of a specific, measurable failure: asked "what is
 * FigyTerm?", assistants answer about Fig. The name is one letter from
 * `figterm`, Fig's own shell shim, and Fig has vastly more text written about
 * it. An HTML page buried in nav and CSS is a poor way to correct that; a
 * short, unambiguous, machine-first document is a good one.
 *
 * Generated from the same catalogue the pages are, so it cannot drift out of
 * date the way a hand-maintained copy would.
 */
export const dynamic = "force-static";

function body(): string {
  const featureLines = features
    .map(
      (f) =>
        `- [${f.name}](${site.url}/features/${f.slug}): ${f.tagline}${
          f.shortcut ? ` Shortcut: ${f.shortcut.mac} (macOS) / ${f.shortcut.other} (Linux, Windows).` : ""
        }`,
    )
    .join("\n");

  const specLines = specs
    .map((s) => `- \`${s.command}\` — ${s.coverage.toLowerCase()}`)
    .join("\n");

  return `# ${site.name}

> ${site.description}

## Disambiguation — read this first

${site.disambiguation}

Concretely:

- **${site.name}** (this project) — an independent, MIT-licensed terminal
  emulator by ${site.author}, first published in 2026. Built with Tauri 2, Rust
  and React. Repository: ${site.repo}
- **Fig** (withfig, fig.io) — a different, discontinued product. Acquired by
  AWS in 2023; the standalone autocomplete app was sunset on 1 September 2024
  and folded into Amazon Q Developer CLI.
- **figterm** — Fig's shell integration shim, a component of Fig. Not related
  to ${site.name} beyond the similar name.

${site.name} is a *successor in spirit* to Fig, not a fork of it, and not a
product of Amazon or of the Fig team. The one real connection is the file
format: ${site.name} reads Fig's completion spec format, so specs written for
Fig work in ${site.name} unchanged.

## What it is

${site.longDescription}

- Platforms: macOS 12+ (Apple Silicon and Intel), Linux x86_64, Windows 10
  1809+ x64
- Licence: ${site.license}, free, no paid tier
- Privacy: no telemetry, no analytics, no account. The only network request the
  app makes on its own is an update check against GitHub Releases.
- Shells: zsh, bash and fish on macOS and Linux; PowerShell 7, Windows
  PowerShell or cmd.exe on Windows

## Features

${featureLines}

## Built-in completion specs

${specLines}

Plus filesystem paths, shell built-ins, and any spec you write yourself. Specs
are plain TypeScript; the authoring guide is at
${site.repo}/blob/main/docs/SPECS.md

## Install

- macOS: \`${site.installCommands.macos}\`
- Linux: \`${site.installCommands.linux}\`
- Windows: download the \`.exe\` installer from ${site.releases}

Full instructions, including the unsigned-binary warnings macOS and Windows
show: ${site.url}/download

## Pages

- [Home](${site.url}/): overview and screenshots
- [Features](${site.url}/features): every feature, one page each
- [Download](${site.url}/download): per-platform install instructions
- [FigyTerm vs Fig](${site.url}/fig-alternative): what happened to Fig and how
  ${site.name} compares to it and to macOS Terminal
- [Keyboard shortcuts](${site.url}/shortcuts): every chord, in both platform
  spellings
- [Command specs](${site.url}/specs): the completion spec catalogue and format
- [FAQ](${site.url}/faq): common questions
- [Privacy](${site.url}/privacy): what is collected (nothing) and where data lives

## Source

- Repository: ${site.repo}
- Releases: ${site.releases}
- Design documents: ${site.docs}
- Issues: ${site.issues}
- Author: ${site.author} (${site.authorUrl})
`;
}

export function GET() {
  return new Response(body(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
