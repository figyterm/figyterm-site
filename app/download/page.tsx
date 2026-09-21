import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { InstallGuide } from "@/components/Install";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { FaqList } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { LinkButton } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import { faqs } from "@/lib/content";
import { breadcrumbList, graph, ids, webPage } from "@/lib/jsonld";

const title = "Download";
const description =
  "Install FigyTerm on macOS, Linux or Windows. A one-line install script for macOS and Linux, a .dmg, an AppImage, .deb and .rpm packages, and an NSIS installer plus .msi for Windows. Free and MIT licensed.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "download figyterm",
    "install terminal macos",
    "terminal appimage",
    "windows terminal installer",
    "mac terminal dmg",
  ],
  alternates: { canonical: "/download" },
  openGraph: {
    url: `${site.url}/download`,
    title: `${title} · ${site.name}`,
    description,
  },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Download", href: "/download" },
];

const platforms = [
  {
    icon: "apple",
    name: "macOS",
    detail: "12 or later. Apple Silicon (aarch64) and Intel (x64).",
    formats: "Install script · .dmg",
  },
  {
    icon: "linux",
    name: "Linux",
    detail: "x86_64. Any distro for the AppImage; apt and dnf for packages.",
    formats: "Install script · AppImage · .deb · .rpm",
  },
  {
    icon: "windows",
    name: "Windows",
    detail: "10 build 1809 or later, x64. ARM isn't built yet.",
    formats: ".exe installer · .msi",
  },
];

/** The install-shaped questions, pulled out of the general FAQ. */
const installFaqs = faqs.filter((faq) =>
  [
    "Which platforms are supported?",
    "Which Linux package should I pick?",
    "Why does Windows say “Windows protected your PC”?",
    "Why does macOS say the app is damaged?",
    "How do updates work?",
    "What does it cost?",
  ].includes(faq.q),
);

export default function DownloadPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPage({ path: "/download", name: title, description }),
          breadcrumbList(crumbs),
          {
            "@type": "DownloadAction",
            name: `Download ${site.name}`,
            target: site.releases,
            object: { "@id": ids.app },
          },
        )}
      />

      <PageHeader
        crumbs={crumbs}
        eyebrow="Download"
        title="Running in under a minute"
        lede="macOS, Linux and Windows. Every route installs once — FigyTerm updates itself from then on, except the packages you'd rather your own package manager owned."
        meta={
          <>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" className="size-3.5 text-term-green" />
              Free, {site.license} licensed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" className="size-3.5 text-term-green" />
              No account
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" className="size-3.5 text-term-green" />
              Self-updating
            </span>
          </>
        }
      >
        <LinkButton href={site.releases} icon="download" external>
          All releases
        </LinkButton>
        <LinkButton
          href={`${site.repo}/blob/main/docs/INSTALLATION.md`}
          variant="secondary"
          external
        >
          Installation guide
        </LinkButton>
      </PageHeader>

      <Section bordered={false}>
        <ul className="grid gap-4 md:grid-cols-3">
          {platforms.map((platform) => (
            <li
              key={platform.name}
              className="rounded-2xl border border-edge bg-panel/50 p-6 ring-edge"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-xl border border-edge bg-panel-2 text-fg">
                <Icon name={platform.icon} className="size-5" />
              </span>
              <h2 className="mt-5 text-[15px] font-semibold tracking-tight">
                {platform.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {platform.detail}
              </p>
              <p className="mt-3 font-mono text-xs text-fg-subtle">
                {platform.formats}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <InstallGuide />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Installing"
          title="The questions the installer raises"
          body="Mostly about code signing, which FigyTerm doesn't pay for — so here is exactly what each platform will say and what to do about it."
        />
        <div className="mx-auto mt-12 max-w-3xl">
          <FaqList faqs={installFaqs} />
        </div>
      </Section>
    </>
  );
}
