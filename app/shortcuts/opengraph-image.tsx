import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "FigyTerm — Built for hands that never leave the keys";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "Shortcuts",
    title: "Built for hands that never leave the keys",
    lede: "Every chord in the idiom of your platform — and the shell's own control keys always pass through.",
    accent: "#a78bfa",
  });
}
