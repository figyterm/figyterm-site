import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "FigyTerm — A terminal that brought its whole workbench";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "Features",
    title: "A terminal that brought its whole workbench",
    lede: "Autocomplete, an editor with git and language servers, an API client, a Claude Code window and a drawing board.",
    accent: "#38bdf8",
  });
}
