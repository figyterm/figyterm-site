import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { FaqList } from "@/components/Faq";
import { Section } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";
import { LinkButton } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { Cta } from "@/components/Cta";
import { site } from "@/lib/site";
import { faqs } from "@/lib/content";
import { features } from "@/lib/features";
import { breadcrumbList, faqPage, graph, webPage } from "@/lib/jsonld";

const title = "FAQ";
const description =
  "Answers about FigyTerm: what it is, which platforms it runs on, why macOS and Windows warn about the unsigned build, how updates work, what each panel does, and why none of your commands ever leave your machine.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/faq" },
  openGraph: {
    url: `${site.url}/faq`,
    title: `${title} · ${site.name}`,
    description,
  },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "FAQ", href: "/faq" },
];

/**
 * Every question on the site, general first and then each feature's own.
 *
 * Merged here rather than duplicated, so a question answered on a feature page
 * is the same question here — and the FAQPage structured data covers the lot.
 */
const everyFaq = [...faqs, ...features.flatMap((f) => f.faqs)];

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPage({ path: "/faq", name: title, description }),
          breadcrumbList(crumbs),
          faqPage(everyFaq, `${site.url}/faq#faq`),
        )}
      />

      <PageHeader
        crumbs={crumbs}
        eyebrow="FAQ"
        title="Questions people actually ask"
        lede={
          <>
            General questions first, then the ones each panel raises. Something
            missing?{" "}
            <a
              href={site.issues}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-bright underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
            >
              Open an issue on GitHub
            </a>
            .
          </>
        }
      >
        <LinkButton href="/download" icon="download">
          Download FigyTerm
        </LinkButton>
        <LinkButton href={site.docs} variant="secondary" external>
          Read the docs
        </LinkButton>
      </PageHeader>

      <Section bordered={false}>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-bright">
            General
          </h2>
          <div className="mt-6">
            <FaqList faqs={faqs} />
          </div>

          {features.map((feature) => (
            <div
              key={feature.slug}
              className="mt-14"
              style={{ "--accent": feature.accent } as React.CSSProperties}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-accent flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em]">
                  <Icon name={feature.icon} className="size-4" />
                  {feature.navLabel}
                </h2>
                <Link
                  href={`/features/${feature.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs text-fg-subtle transition-colors hover:text-fg-muted"
                >
                  Read the full page
                  <Icon name="arrow-right" className="size-3.5" />
                </Link>
              </div>
              <div className="mt-6">
                <FaqList faqs={feature.faqs} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Cta />
    </>
  );
}
