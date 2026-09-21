import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "FigyTerm — Completions that know your tools";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "Specs",
    title: "Completions that know your tools",
    lede: "FigyTerm reads Fig's completion spec format, so the community catalogue works unchanged.",
    accent: "#fb923c",
  });
}
