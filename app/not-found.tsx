import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { LinkButton } from "@/components/Button";
import { features } from "@/lib/features";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-32 sm:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute left-1/2 top-[-20rem] size-[36rem] -translate-x-1/2 rounded-full bg-brand/15 blur-[130px]" />
      </div>

      <div className="container-page">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-mono text-sm text-fg-subtle">
            <span className="text-term-green">$</span> cd {" "}
            <span className="text-fg-muted">./this-page</span>
          </p>
          <p className="mt-2 font-mono text-sm text-fg-subtle">
            cd: no such file or directory
          </p>

          <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">
            404
          </h1>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            Nothing lives at that path. Autocomplete would have caught this.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton href="/" icon="arrow-left" full>
              Back home
            </LinkButton>
            <LinkButton href="/features" variant="secondary" full>
              Browse the features
            </LinkButton>
          </div>
        </div>

        <ul className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-2">
          {features.map((feature) => (
            <li key={feature.slug}>
              <Link
                href={`/features/${feature.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-edge bg-panel/50 px-3.5 py-2 text-xs text-fg-muted transition-colors hover:border-edge-strong hover:text-fg"
              >
                <span style={{ color: feature.accent }}>
                  <Icon name={feature.icon} className="size-3.5" />
                </span>
                {feature.navLabel}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
