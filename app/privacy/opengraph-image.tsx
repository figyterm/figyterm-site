import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "FigyTerm — There is nothing to opt out of";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "Privacy",
    title: "There is nothing to opt out of",
    lede: "No telemetry, no analytics, no account. One network request: an update check against GitHub Releases.",
    accent: "#34d399",
  });
}
