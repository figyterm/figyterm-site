import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";
import { LinkButton } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import { trustPoints } from "@/lib/content";
import { breadcrumbList, graph, webPage } from "@/lib/jsonld";

const title = "Privacy";
const description =
  "FigyTerm collects nothing. No telemetry, no analytics, no account, and no network request beyond an update check against GitHub Releases. Your commands, history, files, collections and drawings stay on your machine.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    url: `${site.url}/privacy`,
    title: `${title} · ${site.name}`,
    description,
  },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Privacy", href: "/privacy" },
];

/** Each panel, and where its data actually sits. */
const dataMap = [
  {
    what: "Commands and shell history",
    where: "Your shell's own history file, read by FigyTerm and never copied elsewhere.",
  },
  {
    what: "Autocomplete matching",
    where: "Computed in the Rust backend against specs shipped with the app.",
  },
  {
    what: "Files you edit",
    where: "Written straight back to your disk. Unsaved drafts are journalled locally so a crash cannot lose them.",
  },
  {
    what: "API collections and request history",
    where: "A SQLite file on your machine. Postgres sync is opt-in and points at a server you choose.",
  },
  {
    what: "Drawings and their notes",
    where: "Local storage on your machine. There is no cloud and no share link.",
  },
  {
    what: "Browser panel",
    where: "Its own webview storage, separate from your main browser. The sites you open are between you and them.",
  },
  {
    what: "Claude Code conversations",
    where: "Handled by the Claude Code CLI itself, under its own terms. FigyTerm draws the window and stores nothing.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPage({ path: "/privacy", name: title, description }),
          breadcrumbList(crumbs),
        )}
      />

      <PageHeader
        crumbs={crumbs}
        eyebrow="Privacy"
        title="There is nothing to opt out of"
        lede="FigyTerm has no analytics pipeline, no crash reporter, no account system and no server of its own. This page exists to say exactly that, and to be specific about where each thing you make actually lives."
      >
        <LinkButton href={site.repo} icon="github" external>
          Read the source
        </LinkButton>
        <LinkButton href="/download" variant="secondary" icon="download">
          Download FigyTerm
        </LinkButton>
      </PageHeader>

      <Section bordered={false}>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point) => (
            <li
              key={point.title}
              className="rounded-2xl border border-edge bg-panel/50 p-6 ring-edge"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-xl border border-edge bg-panel-2 text-term-green">
                <Icon name={point.icon} className="size-5" />
              </span>
              <h2 className="mt-5 text-[15px] font-semibold tracking-tight">
                {point.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {point.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            The one request the app makes
          </h2>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            FigyTerm checks GitHub Releases for a new version. That is a request
            to GitHub for a public file, carrying nothing about you beyond what
            any HTTP request carries — and it is the only network call the app
            initiates on its own. Everything else that leaves your machine
            leaves because you asked it to: a URL you opened in the browser
            panel, a request you fired from the API client, a{" "}
            <code className="font-mono text-fg">git push</code> you ran.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-edge bg-panel/40 ring-edge">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <caption className="sr-only">
              Where each kind of data FigyTerm handles is stored
            </caption>
            <thead>
              <tr className="border-b border-edge">
                <th
                  scope="col"
                  className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-fg-subtle"
                >
                  What
                </th>
                <th
                  scope="col"
                  className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-fg-subtle"
                >
                  Where it lives
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-edge">
              {dataMap.map((row) => (
                <tr key={row.what} className="transition-colors hover:bg-panel/70">
                  <th scope="row" className="px-5 py-4 text-sm font-normal text-fg">
                    {row.what}
                  </th>
                  <td className="px-5 py-4 text-sm text-fg-muted">{row.where}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            This website
          </h2>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            The site you are reading is static and carries no analytics script,
            no advertising tag and no third-party embed. Fonts are served with
            the page. If that ever changes, it will change here first.
          </p>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            Questions about any of this belong in{" "}
            <a
              href={site.issues}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-bright underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
            >
              an issue
            </a>
            , in public, where the answer is useful to everyone else too.
          </p>
        </div>
      </Section>
    </>
  );
}
