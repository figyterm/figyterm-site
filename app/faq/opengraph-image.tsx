import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "FigyTerm — Questions people actually ask";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "FAQ",
    title: "Questions people actually ask",
    lede: "What it is, which platforms it runs on, and why nothing you type ever leaves your machine.",
    accent: "#22d3ee",
  });
}
