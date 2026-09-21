import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import {
  ShortcutLegend,
  ShortcutRationale,
  ShortcutTables,
} from "@/components/Shortcuts";
import { Section } from "@/components/SectionHeading";
import { LinkButton } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { Cta } from "@/components/Cta";
import { site } from "@/lib/site";
import { breadcrumbList, graph, webPage } from "@/lib/jsonld";

const title = "Keyboard shortcuts";
const description =
  "Every FigyTerm keyboard shortcut, in both spellings: ⌘ chords on macOS, Ctrl+Shift on Linux and Windows. Tabs, panes, the editor, the API client, the Claude Code window, the drawing board, search and the command palette.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "figyterm shortcuts",
    "terminal keyboard shortcuts",
    "mac terminal shortcuts",
    "split pane shortcut",
  ],
  alternates: { canonical: "/shortcuts" },
  openGraph: {
    url: `${site.url}/shortcuts`,
    title: `${title} · ${site.name}`,
    description,
  },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Shortcuts", href: "/shortcuts" },
];

export default function ShortcutsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPage({ path: "/shortcuts", name: title, description }),
          breadcrumbList(crumbs),
        )}
      />

      <PageHeader
        crumbs={crumbs}
        eyebrow="Keyboard first"
        title="Built for hands that never leave the keys"
        lede="Every chord in the idiom of the platform you're on — and the shell's own control keys always pass straight through, because a terminal that swallows Ctrl+C is not a terminal."
      >
        <LinkButton href="/download" icon="download">
          Download FigyTerm
        </LinkButton>
        <LinkButton
          href={`${site.repo}/blob/main/README.md#keyboard-shortcuts`}
          variant="secondary"
          external
        >
          Shortcuts in the README
        </LinkButton>
      </PageHeader>

      <Section bordered={false}>
        <ShortcutLegend />
        <div className="mt-10">
          <ShortcutTables />
        </div>
        <div className="mt-12">
          <ShortcutRationale />
        </div>
      </Section>

      <Cta
        title={
          <>
            Learn six of them and you&apos;ll{" "}
            <span className="text-gradient">stop reaching for the mouse</span>
          </>
        }
        body="⌘T, ⌘D, ⌘R, ⌘⇧E, ⌘⇧P and Tab. The rest you'll pick up when you need them."
      />
    </>
  );
}
