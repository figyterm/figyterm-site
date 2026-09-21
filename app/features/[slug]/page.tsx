import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Screenshot } from "@/components/Screenshot";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { FaqList } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { LinkButton } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { Cta } from "@/components/Cta";
import {
  feature as findFeature,
  features,
  relatedFeatures,
  type Feature,
  type FeatureSection,
} from "@/lib/features";
import { site } from "@/lib/site";
import { breadcrumbList, faqPage, graph, webPage } from "@/lib/jsonld";

type Props = { params: Promise<{ slug: string }> };

/** Every feature page is known at build time, so all of them are prerendered. */
export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

/**
 * The catalogue is the complete list, so a slug that isn't in it is a 404 —
 * not a page to render on demand and then discover is empty.
 */
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feature = findFeature(slug);
  if (!feature) return {};

  const path = `/features/${feature.slug}`;
  return {
    title: feature.metaTitle,
    description: feature.metaDescription,
    keywords: feature.keywords,
    alternates: { canonical: path },
    openGraph: {
      url: `${site.url}${path}`,
      title: `${feature.metaTitle} · ${site.name}`,
      description: feature.metaDescription,
      type: "article",
    },
    twitter: {
      title: `${feature.metaTitle} · ${site.name}`,
      description: feature.metaDescription,
    },
  };
}

export default async function FeaturePage({ params }: Props) {
  const { slug } = await params;
  const feature = findFeature(slug);
  if (!feature) notFound();

  const path = `/features/${feature.slug}`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: feature.navLabel, href: path },
  ];

  return (
    /* One accent for the whole page — every `--accent` utility below reads it. */
    <div style={{ "--accent": feature.accent } as React.CSSProperties}>
      <JsonLd
        data={graph(
          webPage({
            path,
            name: feature.metaTitle,
            description: feature.metaDescription,
          }),
          breadcrumbList(crumbs),
          faqPage(feature.faqs, `${site.url}${path}#faq`),
        )}
      />

      <PageHeader
        crumbs={crumbs}
        icon={feature.icon}
        eyebrow={feature.navLabel}
        badge={feature.badge}
        title={feature.name}
        lede={feature.tagline}
        meta={
          <>
            {feature.shortcut && (
              <span className="inline-flex items-center gap-2">
                <kbd className="rounded-md border border-edge bg-panel-2 px-2 py-1 font-mono text-[11px] text-fg">
                  {feature.shortcut.mac}
                </kbd>
                <span aria-hidden="true">/</span>
                <kbd className="rounded-md border border-edge bg-panel-2 px-2 py-1 font-mono text-[11px] text-fg">
                  {feature.shortcut.other}
                </kbd>
              </span>
            )}
            <span className="inline-flex items-center gap-2">
              <Icon name="apple" className="size-3.5" />
              <Icon name="linux" className="size-3.5" />
              <Icon name="windows" className="size-3" />
              All three platforms
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="shield" className="size-3.5" />
              Runs locally
            </span>
          </>
        }
      >
        <LinkButton href="/download" icon="download">
          Download FigyTerm
        </LinkButton>
        <LinkButton href="/features" variant="secondary" icon="arrow-left">
          All features
        </LinkButton>
      </PageHeader>

      {/* Hero capture, then the three things worth knowing about it. */}
      <div className="container-page pt-20 sm:pt-24">
        <Screenshot
          id={feature.heroShot}
          priority
          sizes="(min-width: 1280px) 1100px, 100vw"
          className="mx-auto max-w-5xl"
        />
      </div>

      <Section bordered={false}>
        <ul className="grid gap-4 md:grid-cols-3">
          {feature.highlights.map((highlight) => (
            <li
              key={highlight.title}
              className="rounded-2xl border border-edge bg-panel/50 p-6 ring-edge"
            >
              <span className="text-accent border-accent bg-accent-soft inline-flex size-10 items-center justify-center rounded-xl border">
                <Icon name={highlight.icon} className="size-5" />
              </span>
              <h2 className="mt-5 text-[15px] font-semibold tracking-tight">
                {highlight.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {highlight.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {feature.sections.map((section, i) => (
        <FeatureSectionBlock key={section.heading} section={section} index={i} />
      ))}

      <Section id="faq">
        <SectionHeading
          eyebrow="FAQ"
          title={`${feature.navLabel}, in short`}
        />
        <div className="mx-auto mt-12 max-w-3xl">
          <FaqList faqs={feature.faqs} />
        </div>
      </Section>

      <Related feature={feature} />

      <Cta />
    </div>
  );
}

/**
 * One section of a feature page.
 *
 * With a screenshot it is a two-column block that alternates side, so a page
 * of four sections reads as a column rather than a stack of identical rows.
 * Without one it stays a single measured column.
 */
function FeatureSectionBlock({
  section,
  index,
}: {
  section: FeatureSection;
  index: number;
}) {
  const body = (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {section.heading}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-fg-muted">
        {section.body}
      </p>

      {section.points && (
        <dl className="mt-7 space-y-4">
          {section.points.map((point) => (
            <div key={point.term} className="flex gap-3.5">
              <span className="text-accent mt-1.5 size-1.5 shrink-0 rounded-full bg-current" />
              <div>
                <dt className="text-sm font-medium text-fg">{point.term}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-fg-muted">
                  {point.detail}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      )}

      {section.code && (
        <figure className="mt-7">
          <pre className="overflow-x-auto rounded-xl border border-edge bg-canvas p-4 font-mono text-[12.5px] leading-relaxed text-fg-muted">
            <code>{section.code.lines.join("\n")}</code>
          </pre>
          <figcaption className="mt-2.5 text-xs text-fg-subtle">
            {section.code.caption}
          </figcaption>
        </figure>
      )}
    </div>
  );

  if (!section.shot) {
    return (
      <Section>
        <div className="max-w-3xl">{body}</div>
      </Section>
    );
  }

  const reversed = index % 2 === 1;
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className={reversed ? "lg:order-2" : ""}>{body}</div>
        <div className={reversed ? "lg:order-1" : ""}>
          <Screenshot id={section.shot} sizes="(min-width: 1024px) 560px, 100vw" />
        </div>
      </div>
    </Section>
  );
}

function Related({ feature }: { feature: Feature }) {
  const related = relatedFeatures(feature);
  if (!related.length) return null;

  return (
    <Section>
      <SectionHeading eyebrow="Keep reading" title="Related features" />
      <ul className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
        {related.map((other) => (
          <li
            key={other.slug}
            style={{ "--accent": other.accent } as React.CSSProperties}
          >
            <Link
              href={`/features/${other.slug}`}
              className="group flex h-full gap-4 rounded-2xl border border-edge bg-panel/50 p-5 ring-edge transition-colors hover:border-edge-strong hover:bg-panel"
            >
              <span className="text-accent border-accent bg-accent-soft mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl border">
                <Icon name={other.icon} className="size-5" />
              </span>
              <span>
                <span className="block text-[15px] font-semibold tracking-tight text-fg">
                  {other.name}
                </span>
                <span className="mt-1.5 block text-sm leading-relaxed text-fg-muted">
                  {other.tagline}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
