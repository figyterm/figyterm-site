import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "FigyTerm — The Fig alternative that outlived Fig";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "vs Fig",
    title: "The Fig alternative that outlived Fig",
    lede: "Fig was sunset in 2024. FigyTerm rebuilds it as a full terminal — spec-compatible, offline, open source.",
    accent: "#818cf8",
  });
}
