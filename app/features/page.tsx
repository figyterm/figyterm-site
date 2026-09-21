import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { FeatureCard } from "@/components/FeatureCard";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";
import { LinkButton } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { Cta } from "@/components/Cta";
import { features } from "@/lib/features";
import { site } from "@/lib/site";
import { breadcrumbList, graph, itemList, webPage } from "@/lib/jsonld";

const title = "Features";
const description =
  "Everything FigyTerm does: IDE-level autocomplete, a code editor with git and language servers, a REST API client, a Claude Code window, a drawing board, an embedded browser, split panes, history search and a live system monitor.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/features" },
  openGraph: {
    url: `${site.url}/features`,
    title: `${title} · ${site.name}`,
    description,
  },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
];

/** The claim the page has to keep, stated once. */
const principles = [
  {
    icon: "zap",
    title: "Nothing loads at launch",
    body: "Each panel is loaded the first time you open it. A session that only uses the terminal pays for the terminal — the binary is around ten megabytes and starts instantly either way.",
  },
  {
    icon: "columns",
    title: "One window, one keyboard",
    body: "Every panel is a modal over the shell with the same drag, resize and overlay conventions, so learning one teaches you the rest.",
  },
  {
    icon: "shield",
    title: "All of it local",
    body: "Completions, indexes, collections, drawings and history live on your machine. No account exists to store them anywhere else.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPage({ path: "/features", name: title, description }),
          breadcrumbList(crumbs),
          itemList(
            "FigyTerm features",
            features.map((f) => ({
              name: f.name,
              description: f.summary,
              href: `/features/${f.slug}`,
            })),
          ),
        )}
      />

      <PageHeader
        crumbs={crumbs}
        eyebrow="Features"
        title={
          <>
            A terminal that brought its{" "}
            <span className="text-gradient">whole workbench</span>
          </>
        }
        lede="FigyTerm started as a Fig alternative — IDE-level completions for the command line. It is now the editor, the API client, the agent window, the browser and the sketchpad as well, each behind one shortcut, none of them loaded until you ask."
      >
        <LinkButton href="/download" icon="download">
          Download FigyTerm
        </LinkButton>
        <LinkButton href="/shortcuts" variant="secondary">
          See every shortcut
        </LinkButton>
      </PageHeader>

      <Section bordered={false}>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.slug} feature={feature} />
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="How it holds together"
          title="Six panels and a terminal that still starts instantly"
          body="Bolting an IDE's worth of panels onto a terminal is the easy way to make a slow terminal. Three rules stop that happening."
        />
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {principles.map((principle) => (
            <div key={principle.title}>
              <span className="inline-flex size-10 items-center justify-center rounded-xl border border-edge bg-panel-2 text-brand-bright">
                <Icon name={principle.icon} className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {principle.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                {principle.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Cta />
    </>
  );
}
