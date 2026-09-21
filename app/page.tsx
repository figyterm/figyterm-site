import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Pillars } from "@/components/Pillars";
import { FeatureCard } from "@/components/FeatureCard";
import { Showcase } from "@/components/Showcase";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { FaqList } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { Icon } from "@/components/Icon";
import { LinkButton } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { CopyCommand } from "@/components/CopyCommand";
import { site } from "@/lib/site";
import { features } from "@/lib/features";
import { faqs, trustPoints } from "@/lib/content";
import { faqPage, graph, webPage } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { url: site.url, title: `${site.name} — ${site.tagline}` },
};

/** The five questions worth answering before someone clicks Download. */
const homeFaqs = faqs.slice(0, 5);

const showcase = [
  {
    id: "autocomplete",
    title: "Suggestions that understand the command",
    body: "Type git and FigyTerm knows the subcommands, their descriptions and your branches. Tab accepts, arrows navigate, Esc dismisses.",
    href: "/features/autocomplete",
    linkLabel: "How autocomplete works",
  },
  {
    id: "code-editor",
    title: "An editor that lives in the terminal",
    body: "One shortcut opens a real editor over the shell: file tabs, a breadcrumb and a resizable file tree. Click a path in terminal output and the file opens at that line.",
    href: "/features/code-editor",
    linkLabel: "Inside the editor",
  },
  {
    id: "api-client",
    title: "Fire the request without leaving",
    body: "FigyMan sends from Rust rather than the webview, so the headers, redirects and timings are the real ones — and your existing collections import and export unharmed.",
    href: "/features/api-client",
    linkLabel: "About the API client",
  },
  {
    id: "claude-code",
    title: "Claude Code, with projects",
    body: "A child window for the claude CLI where a project is a primary folder plus any extras — and switching projects never kills the conversation you left running.",
    href: "/features/claude-code",
    linkLabel: "About the Claude window",
  },
  {
    id: "drawing",
    title: "Sketch it before you build it",
    body: "An Excalidraw canvas beside a rich-text notes pane, saved as a named project and autosaved as you draw.",
    href: "/features/drawing",
    linkLabel: "About drawing projects",
  },
  {
    id: "panes",
    title: "Four panes, one tab, zero mouse",
    body: "Split horizontally and vertically up to four ways. Every pane is a real PTY with its own working directory and its own autocomplete.",
    href: "/features/terminal",
    linkLabel: "The terminal underneath",
  },
  {
    id: "history",
    title: "Every command you have ever run",
    body: "Fuzzy-search your shell history in a floating panel, then pin it picture-in-picture while you keep typing.",
    href: "/features/terminal",
    linkLabel: "The terminal underneath",
  },
  {
    id: "browser",
    title: "Docs beside the command, not behind it",
    body: "A native child webview with real tabs and an address bar, so documentation lives one shortcut away — and sites that refuse to be framed still load.",
    href: "/features/browser",
    linkLabel: "About the browser",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPage({
            path: "/",
            name: `${site.name} — ${site.tagline}`,
            description: site.description,
          }),
          faqPage(homeFaqs, `${site.url}/#home-faq`),
        )}
      />

      <Hero />
      <Pillars />

      <Section id="features">
        <SectionHeading
          eyebrow="Features"
          title="Nine tools, one window, no tab-switching"
          body="Autocomplete is the headline. The rest of the workbench — an editor with git and language servers, a REST client, a Claude Code window, a drawing board and a browser — is behind one shortcut each, and none of it loads until you open it."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.slug} feature={feature} />
          ))}
        </ul>
      </Section>

      <Section id="showcase">
        <SectionHeading
          eyebrow="Screenshots"
          title="See it before you install it"
          body="Real captures from the app — no mockups, no marketing renders. Taken on macOS; the same features ship on Linux and Windows."
        />
        <Showcase items={showcase} />
      </Section>

      {/* The Fig story, condensed, with the full table one click away. */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="FigyTerm vs Fig"
              title="The Fig alternative that outlived Fig"
              body="Fig was acquired by AWS and its standalone autocomplete was retired, taking a much-loved workflow with it. FigyTerm rebuilds that experience as a full terminal — spec-compatible, offline, open source, and on all three platforms rather than one."
            />
            <div className="mt-8">
              <LinkButton href="/fig-alternative" variant="secondary" icon="arrow-right">
                See the full comparison
              </LinkButton>
            </div>
          </div>

          <dl className="grid gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-2">
            {[
              { k: "Platforms", figy: "macOS, Linux, Windows", fig: "macOS only" },
              { k: "Autocomplete", figy: "Active", fig: "Discontinued" },
              { k: "Account", figy: "Never", fig: "Required" },
              { k: "Offline", figy: "Always", fig: "No" },
            ].map((row) => (
              <div key={row.k} className="bg-panel/70 p-5">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-subtle">
                  {row.k}
                </dt>
                <dd className="mt-3 space-y-1.5">
                  <span className="flex items-center gap-2 text-sm text-fg">
                    <span className="size-1.5 rounded-full bg-brand" />
                    {row.figy}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-fg-subtle">
                    <span className="size-1.5 rounded-full bg-edge-strong" />
                    {row.fig}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Privacy, as four specifics rather than one adjective. */}
      <Section>
        <SectionHeading
          eyebrow="Privacy"
          title="Local is not a feature here, it's the architecture"
          body="There is no server to opt out of. Everything the app computes, it computes on your machine."
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point) => (
            <li
              key={point.title}
              className="rounded-2xl border border-edge bg-panel/50 p-6 ring-edge"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-xl border border-edge bg-panel-2 text-term-green">
                <Icon name={point.icon} className="size-5" />
              </span>
              <h3 className="mt-5 text-[15px] font-semibold tracking-tight">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {point.body}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm text-fg-subtle">
          <Link
            href="/privacy"
            className="underline decoration-edge-strong underline-offset-4 transition-colors hover:text-fg-muted"
          >
            Read the full privacy position
          </Link>
        </p>
      </Section>

      {/* Install teaser */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow="Install"
            title="Running in under a minute"
            body="One command on macOS, one on Linux, one installer on Windows. You install once — FigyTerm updates itself from then on."
          />
          <CopyCommand
            command={site.installCommands.macos}
            className="mx-auto mt-10 max-w-xl"
          />
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton href="/download" icon="download" full>
              Installation guide
            </LinkButton>
            <LinkButton href={site.releases} variant="secondary" external full>
              All releases
            </LinkButton>
          </div>
        </div>
      </Section>

      <Section id="faq">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions people actually ask"
          body="The short list. The rest — platform quirks, package formats, the editor's save guarantees — is on the FAQ page."
        />
        <div className="mx-auto mt-14 max-w-3xl">
          <FaqList faqs={homeFaqs} />
          <p className="mt-6 text-center text-sm text-fg-subtle">
            <Link
              href="/faq"
              className="underline decoration-edge-strong underline-offset-4 transition-colors hover:text-fg-muted"
            >
              All {faqs.length} questions
            </Link>
          </p>
        </div>
      </Section>

      <Cta />
    </>
  );
}
