import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icon";
import { footerColumns, site } from "@/lib/site";
import { features } from "@/lib/features";

export function Footer() {
  return (
    <footer className="border-t border-edge bg-panel/30">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo-mark.png"
                alt=""
                width={512}
                height={512}
                className="size-8 rounded-lg"
              />
              <span className="font-semibold tracking-tight">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">
              A modern terminal for macOS, Linux and Windows — autocomplete,
              an editor, an API client, a Claude Code window and a drawing
              board, all local. Built with Tauri 2, Rust and React, open
              source under the {site.license} licence.
            </p>
            <a
              href={site.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-edge px-3.5 py-2 text-sm text-fg-muted transition-colors hover:border-edge-strong hover:text-fg"
            >
              <Icon name="github" className="size-4" />
              Star the repo
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <nav aria-label="Features">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-subtle">
                Features
              </h2>
              <ul className="mt-4 space-y-3">
                {features.map((feature) => (
                  <li key={feature.slug}>
                    <Link
                      href={`/features/${feature.slug}`}
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {feature.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-subtle">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-fg-muted transition-colors hover:text-fg"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-fg-muted transition-colors hover:text-fg"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-edge pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {site.license} licensed.
          </p>
          <p className="flex flex-wrap items-center gap-1.5">
            Built by
            <a
              href={site.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted transition-colors hover:text-fg"
            >
              {site.author}
            </a>
            <span aria-hidden="true">·</span>
            Not affiliated with Fig or Amazon Web Services
          </p>
        </div>
      </div>
    </footer>
  );
}
