import Link from "next/link";
import { Icon } from "./Icon";
import { LinkButton } from "./Button";
import { CopyCommand } from "./CopyCommand";
import { TerminalDemo } from "./TerminalDemo";
import { site, stats } from "@/lib/site";
import { features } from "@/lib/features";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
      {/* Backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute left-1/2 top-[-18rem] size-[46rem] -translate-x-1/2 animate-drift rounded-full bg-brand/20 blur-[140px]" />
        <div className="absolute right-[-10rem] top-[6rem] size-[28rem] rounded-full bg-violet/12 blur-[120px]" />
      </div>

      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href="/fig-alternative"
            className="inline-flex items-center gap-2 rounded-full border border-edge bg-panel/70 px-3.5 py-1.5 text-xs text-fg-muted ring-edge transition-colors hover:border-edge-strong hover:text-fg"
          >
            <span className="size-1.5 rounded-full bg-term-green" />
            Fig shut down. FigyTerm picks up where it left off.
            <Icon name="arrow-right" className="size-3.5" />
          </Link>

          <h1 className="mt-7 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            The terminal with{" "}
            <span className="text-gradient">autocomplete superpowers</span>
          </h1>

          {/* Named platforms, not just "cross-platform" — the three words are
              what someone arriving from a search is actually looking for. */}
          <div className="mt-5 flex items-center justify-center gap-5 text-sm text-fg-muted">
            <span className="inline-flex items-center gap-2">
              <Icon name="apple" className="size-4" />
              macOS
            </span>
            <span aria-hidden="true" className="text-fg-subtle">·</span>
            <span className="inline-flex items-center gap-2">
              <Icon name="linux" className="size-4" />
              Linux
            </span>
            <span aria-hidden="true" className="text-fg-subtle">·</span>
            <span className="inline-flex items-center gap-2">
              <Icon name="windows" className="size-3.5" />
              Windows
            </span>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
            IDE-level completions for{" "}
            <strong className="font-medium text-fg">git</strong>,{" "}
            <strong className="font-medium text-fg">docker</strong>,{" "}
            <strong className="font-medium text-fg">npm</strong> and more — then
            a code editor, an API client, a Claude Code window and a drawing
            board, each one shortcut away. Free, open source, and it never
            phones home.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton href="/download" icon="download" className="px-6 py-3.5" full>
              Download FigyTerm
            </LinkButton>
            <LinkButton
              href={site.repo}
              variant="secondary"
              icon="github"
              external
              className="px-6 py-3.5"
              full
            >
              Star on GitHub
            </LinkButton>
          </div>

          <CopyCommand
            command={site.installCommands.macos}
            className="mx-auto mt-6 max-w-xl"
          />

          <p className="mt-4 text-xs text-fg-subtle">
            macOS one-liner ·{" "}
            <Link
              href="/download"
              className="underline decoration-edge-strong underline-offset-4 transition-colors hover:text-fg-muted"
            >
              Linux &amp; Windows
            </Link>{" "}
            · No account, ever · {site.license} licensed
          </p>
        </div>

        {/* Animated product demo */}
        <div className="relative mx-auto mt-16 max-w-4xl animate-fade-up">
          <div
            aria-hidden="true"
            className="absolute -inset-x-8 -top-6 bottom-0 -z-10 rounded-[2rem] bg-gradient-to-b from-brand/25 to-transparent blur-3xl"
          />
          <TerminalDemo />
        </div>

        {/* What's in the window, as a row of links rather than a claim */}
        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-2">
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

        <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-8 border-t border-edge pt-10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-1.5 block text-xs leading-snug text-fg-subtle">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
