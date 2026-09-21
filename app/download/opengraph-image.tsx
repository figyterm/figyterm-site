import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "FigyTerm — Running in under a minute";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "Download",
    title: "Running in under a minute",
    lede: "One command on macOS and Linux, one installer on Windows. Install once — it updates itself.",
    accent: "#4ade80",
  });
}
