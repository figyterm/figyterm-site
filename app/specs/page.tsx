import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SpecsTable } from "@/components/Specs";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";
import { LinkButton } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { Cta } from "@/components/Cta";
import { site } from "@/lib/site";
import { breadcrumbList, graph, webPage } from "@/lib/jsonld";

const title = "Command specs";
const description =
  "FigyTerm reads Fig's completion spec format, so the community catalogue of command definitions works unchanged. Built-in specs cover git, docker, docker compose, npm, pnpm, yarn, uv and cd — and adding your own CLI is a single TypeScript file.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "fig specs",
    "fig completion spec format",
    "write a completion spec",
    "custom cli autocomplete",
  ],
  alternates: { canonical: "/specs" },
  openGraph: {
    url: `${site.url}/specs`,
    title: `${title} · ${site.name}`,
    description,
  },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Command specs", href: "/specs" },
];

export default function SpecsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPage({ path: "/specs", name: title, description }),
          breadcrumbList(crumbs),
        )}
      />

      <PageHeader
        crumbs={crumbs}
        eyebrow="Command specs"
        title="Completions that know your tools"
        lede="A spec describes a command's subcommands, options and arguments. FigyTerm reads the format Fig used, so the ecosystem of community completions works unchanged — and adding your own CLI is a single TypeScript file."
      >
        <LinkButton
          href={`${site.repo}/blob/main/docs/SPECS.md`}
          icon="arrow-right"
          external
        >
          Spec authoring guide
        </LinkButton>
        <LinkButton href="/features/autocomplete" variant="secondary">
          How autocomplete works
        </LinkButton>
      </PageHeader>

      <Section bordered={false}>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              align="left"
              eyebrow="Built in"
              title="Eight commands covered out of the box"
              body="These ship with the app. Anything without a spec still gets filesystem paths, directories and shell built-ins, so autocomplete is never simply absent."
            />

            <p className="mt-8 flex items-start gap-2.5 text-sm text-fg-muted">
              <Icon name="shield" className="mt-0.5 size-4 shrink-0 text-term-green" />
              Specs are evaluated locally. Nothing about the command you are
              typing is ever sent over the network.
            </p>

            <p className="mt-4 flex items-start gap-2.5 text-sm text-fg-muted">
              <Icon name="puzzle" className="mt-0.5 size-4 shrink-0 text-brand-bright" />
              Missing your tool? A spec is one file and a pull request — the
              authoring guide walks through it end to end.
            </p>
          </div>

          <SpecsTable />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Why the format matters"
          title="Fig's spec catalogue did not have to die with Fig"
          body="Fig's autocomplete was discontinued after the AWS acquisition, but the specs the community wrote for it are just TypeScript describing commands — a genuinely useful artefact, independent of the app that read them. FigyTerm reads the same shape, so that work carries over instead of being rewritten."
        />
      </Section>

      <Cta />
    </>
  );
}
