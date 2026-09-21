import { Breadcrumbs } from "./Breadcrumbs";
import { Icon } from "./Icon";
import type { Crumb } from "@/lib/jsonld";

/**
 * The header every page below the home page opens with.
 *
 * Tints itself from `--accent`, which feature pages set on their wrapper — so
 * the same component reads indigo on the autocomplete page and emerald on the
 * API client page without either knowing about the other.
 */
export function PageHeader({
  crumbs,
  eyebrow,
  icon,
  badge,
  title,
  lede,
  meta,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  icon?: string;
  badge?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Small facts under the lede — shortcut, platforms, status. */
  meta?: React.ReactNode;
  /** Buttons. */
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-edge pb-14 pt-28 sm:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(70%_70%_at_50%_0%,black,transparent)]" />
        <div className="bg-accent-glow absolute left-1/2 top-[-22rem] size-[40rem] -translate-x-1/2 rounded-full blur-[140px] opacity-60" />
      </div>

      <div className="container-page">
        <Breadcrumbs crumbs={crumbs} />

        <div className="mt-8 max-w-3xl">
          {(icon || eyebrow || badge) && (
            <div className="flex items-center gap-3">
              {icon && (
                <span className="text-accent border-accent bg-accent-soft inline-flex size-10 items-center justify-center rounded-xl border">
                  <Icon name={icon} className="size-5" />
                </span>
              )}
              {eyebrow && (
                <span className="text-accent text-xs font-semibold uppercase tracking-[0.16em]">
                  {eyebrow}
                </span>
              )}
              {badge && (
                <span className="text-accent bg-accent-soft rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]">
                  {badge}
                </span>
              )}
            </div>
          )}

          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            {title}
          </h1>

          {lede && (
            <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">
              {lede}
            </p>
          )}

          {meta && (
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-subtle">
              {meta}
            </div>
          )}

          {children && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>
          )}
        </div>
      </div>
    </header>
  );
}
