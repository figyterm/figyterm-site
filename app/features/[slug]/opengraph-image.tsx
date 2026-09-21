import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { feature as findFeature, features } from "@/lib/features";
import { site } from "@/lib/site";

export const alt = `${site.name} feature`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Prerender one card per feature, alongside the pages themselves. */
export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export default async function FeatureOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = findFeature(slug);

  return renderOgCard({
    eyebrow: feature?.navLabel ?? "Features",
    title: feature?.name ?? site.name,
    lede: feature?.tagline ?? site.shortDescription,
    accent: feature?.accent,
  });
}
