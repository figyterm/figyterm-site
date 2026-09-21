<p align="center">
  <img src="public/logo-mark.png" alt="" height="64" />
</p>

<p align="center">
  <strong>The marketing site for <a href="https://github.com/code4mk/figyterm">FigyTerm</a></strong> —
  a modern, intelligent terminal for macOS, Linux and Windows.
</p>

<p align="center">
  <a href="https://figyterm.code4mk.org">figyterm.code4mk.org</a>
</p>

---

A static Next.js site. Seventeen pages, all prerendered at build time, with no
database, no CMS and no analytics.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 ·
TypeScript. Node 20.9 or later.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build — prerenders every route |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit`. The check to run before pushing |

There is no lint script: `next lint` was removed in Next 16, and ESLint isn't
configured here. `npm run typecheck` plus `npm run build` is what CI would run.

## Where the content lives

Almost nothing is hardcoded in a component. Four files in `lib/` hold the text,
and the pages are generated from them — so a change lands in one place rather
than in a page, the navigation, the footer and the sitemap separately.

| File | Holds |
|---|---|
| `lib/site.ts` | Name, tagline, URLs, install commands, keywords, navigation, footer columns, the route table |
| `lib/features.ts` | The feature catalogue — one entry per `/features/<slug>` page |
| `lib/content.ts` | Command specs, keyboard shortcuts, the Fig comparison table, the general FAQ |
| `lib/screenshots.ts` | Every screenshot the site can show |
| `lib/jsonld.ts` | Structured-data builders |

`app/sitemap.ts` reads `routes` and `features`, so a page cannot be added to
the navigation and forgotten by search engines, or the other way round.

## Pages

```
/                          Home
/features                  Feature index
/features/[slug]           Nine feature pages, from lib/features.ts
/download                  Per-platform install instructions
/shortcuts                 Every keyboard shortcut, both spellings
/specs                     The completion spec catalogue
/fig-alternative           FigyTerm vs Fig vs Terminal.app
/faq                       General questions plus each feature's own
/privacy                   What is collected (nothing) and where data lives
```

`/fig-alternative` rather than `/vs-fig` on purpose — it is the phrase people
search for.

## Adding a feature page

Append an entry to the `features` array in `lib/features.ts`. That is the whole
task: the page, its metadata, its Open Graph card, the navigation menu entry,
the home page card, the footer link, the FAQ section and the sitemap entry all
come from it.

An entry needs a `slug`, an `accent` (a hex colour — it tints the whole page
through a single `--accent` custom property), a `heroShot`, three `highlights`,
some `sections` and its own `faqs`.

## Adding a screenshot

Every capture is registered in `lib/screenshots.ts`. An entry that isn't
captured yet renders a framed placeholder at the real aspect ratio, printing
the path to drop the file at — so the procedure is:

1. Save the PNG at `public/screenshots/<file>`, matching the filename in the
   registry.
2. Change that entry's `ready: false` to `ready: true`.

Nothing else changes. The placeholder holds the layout at the capture's aspect
ratio, so the page does not reflow when the image lands, and only `ready`
screenshots are cited in the structured data — a placeholder is never
advertised as an image that exists.

Capture at **3002 × 1898** to match the existing set. See
[`public/screenshots/README.md`](public/screenshots/README.md).

## SEO

- Per-page `title`, `description`, `keywords` and canonical URL.
- Breadcrumbs, visible and as `BreadcrumbList`.
- One shared `@graph` in the root layout holding `WebSite`, `Person` and
  `SoftwareApplication` with stable `@id`s. Pages add `WebPage` nodes that
  reference those by id, so the application and its author are a single entity
  across every URL instead of a new one per page.
- `FAQPage` on the pages that have questions, with the questions merged from
  `lib/content.ts` and the feature catalogue rather than duplicated.
- A generated Open Graph card per feature, tinted to that feature's accent.
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and
  `/robots.txt`.

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://figyterm.code4mk.org` | Canonical origin. Used for canonicals, Open Graph URLs, the sitemap and every `@id` in the structured data |

Set it for a preview deployment so the canonicals do not all point at
production.

## Deployment

Static output, deployed on Vercel. `next.config.ts` pins the Turbopack root to
this directory — the FigyTerm app repo has its own lockfile, and without the
pin Turbopack guesses the parent.

## Licence

MIT, same as [FigyTerm](https://github.com/code4mk/figyterm). Built by
[code4mk](https://code4mk.org).
