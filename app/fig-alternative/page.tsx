import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ComparisonTable } from "@/components/VsFig";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { FaqList } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { LinkButton } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { Cta } from "@/components/Cta";
import { site } from "@/lib/site";
import { faqs } from "@/lib/content";
import { breadcrumbList, faqPage, graph, webPage } from "@/lib/jsonld";

const title = "The Fig alternative that outlived Fig";
const description =
  "Fig was acquired by AWS and its standalone autocomplete was discontinued. FigyTerm rebuilds that experience as a full terminal for macOS, Linux and Windows — reading the same spec format, with no account, no network, and MIT licensed.";

export const metadata: Metadata = {
  title: "Fig alternative for macOS, Linux and Windows",
  description,
  keywords: [
    "fig alternative",
    "fig.io alternative",
    "fig autocomplete replacement",
    "fig shut down",
    "fig aws acquisition",
    "open source fig alternative",
  ],
  alternates: { canonical: "/fig-alternative" },
  openGraph: {
    url: `${site.url}/fig-alternative`,
    title: `Fig alternative for macOS, Linux and Windows · ${site.name}`,
    description,
  },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Fig alternative", href: "/fig-alternative" },
];

const story = [
  {
    icon: "history",
    title: "What Fig was",
    body: "A macOS app that put IDE-style completions over your existing terminal. It read specs — plain TypeScript descriptions of a command's subcommands, flags and arguments — and the community wrote hundreds of them.",
  },
  {
    icon: "cross",
    title: "What happened",
    body: "Fig was acquired by AWS. The standalone autocomplete product was discontinued, and the workflow a lot of people had built their day around went with it.",
  },
  {
    icon: "sparkles",
    title: "What FigyTerm does about it",
    body: "Rebuilds the experience as the terminal itself rather than a layer over one — reading the same spec format, on three platforms instead of one, with no account and no network path to lose.",
  },
];

const differences = [
  {
    title: "It is the terminal, not an overlay",
    body: "Fig attached itself to whatever terminal you already ran, which is why it was fragile across shells, multiplexers and updates. FigyTerm owns the PTY, so completions cannot desynchronise from what the shell thinks is on the line.",
  },
  {
    title: "Three platforms, not one",
    body: "macOS on Apple Silicon and Intel, Linux on x86_64, and Windows on x64 — with the same panels and the same shortcuts, spelled for each platform's conventions.",
  },
  {
    title: "No account, and nothing to shut down",
    body: "Fig required a login. FigyTerm has no concept of a user, makes no network request except an update check, and is MIT licensed — so if this project ever stops, the code does not.",
  },
  {
    title: "And then considerably more",
    body: "An editor with git and language servers, a REST API client, a Claude Code window, a drawing board and an embedded browser. Fig was an autocomplete; this is a workbench.",
  },
];

const figFaqs = faqs.filter((faq) =>
  [
    "Is FigyTerm a good Fig alternative?",
    "What is FigyTerm?",
    "Does FigyTerm send my commands anywhere?",
    "Which platforms are supported?",
    "What does it cost?",
  ].includes(faq.q),
);

export default function FigAlternativePage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPage({
            path: "/fig-alternative",
            name: "Fig alternative for macOS, Linux and Windows",
            description,
          }),
          breadcrumbList(crumbs),
          faqPage(figFaqs, `${site.url}/fig-alternative#faq`),
        )}
      />

      <PageHeader
        crumbs={crumbs}
        eyebrow="FigyTerm vs Fig"
        title={title}
        lede="Fig was acquired by AWS and its standalone autocomplete was retired, taking a much-loved workflow with it. FigyTerm rebuilds that experience as a full terminal — spec-compatible, offline, and open source."
      >
        <LinkButton href="/download" icon="download">
          Download FigyTerm
        </LinkButton>
        <LinkButton href="/features" variant="secondary">
          What it does now
        </LinkButton>
      </PageHeader>

      <Section bordered={false}>
        <ol className="grid gap-4 md:grid-cols-3">
          {story.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl border border-edge bg-panel/50 p-6 ring-edge"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-edge bg-panel-2 text-brand-bright">
                  <Icon name={step.icon} className="size-5" />
                </span>
                <span className="font-mono text-xs text-fg-subtle">
                  0{i + 1}
                </span>
              </div>
              <h2 className="mt-5 text-[15px] font-semibold tracking-tight">
                {step.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Side by side"
          title="Capability for capability"
          body="FigyTerm against Fig's standalone autocomplete as it stood before discontinuation, and against macOS Terminal as Apple ships it."
        />
        <div className="mt-14">
          <ComparisonTable />
        </div>
        <p className="mt-5 text-xs text-fg-subtle">
          Comparison reflects Fig&apos;s standalone autocomplete app prior to its
          discontinuation, and macOS Terminal as shipped by Apple. FigyTerm is
          not affiliated with Fig or Amazon Web Services.
        </p>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Not a clone"
          title="Four places it deliberately differs"
          body="Rebuilding Fig exactly would have rebuilt its constraints too."
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2">
          {differences.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-edge bg-panel/50 p-6 ring-edge"
            >
              <h3 className="text-[15px] font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="faq">
        <SectionHeading eyebrow="FAQ" title="Coming from Fig" />
        <div className="mx-auto mt-12 max-w-3xl">
          <FaqList faqs={figFaqs} />
        </div>
      </Section>

      <Cta
        title={
          <>
            The workflow didn&apos;t have to{" "}
            <span className="text-gradient">die with the company</span>
          </>
        }
      />
    </>
  );
}
