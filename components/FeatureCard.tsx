import Link from "next/link";
import { Icon } from "./Icon";
import type { Feature } from "@/lib/features";

/**
 * A feature, as a link to its page.
 *
 * The accent is set as `--accent` on the card itself rather than passed to
 * each child, so the icon chip, the glow and the arrow all tint together and
 * a grid of nine cards reads as nine distinct things.
 */
export function FeatureCard({
  feature,
  showShortcut = true,
}: {
  feature: Feature;
  showShortcut?: boolean;
}) {
  return (
    <li
      className="group relative"
      style={{ "--accent": feature.accent } as React.CSSProperties}
    >
      <Link
        href={`/features/${feature.slug}`}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-edge bg-panel/60 p-6 ring-edge transition-colors hover:border-edge-strong hover:bg-panel"
      >
        <div
          aria-hidden="true"
          className="bg-accent-glow absolute -right-16 -top-16 size-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="flex items-start justify-between gap-3">
          <span className="text-accent border-accent bg-accent-soft inline-flex size-10 items-center justify-center rounded-xl border">
            <Icon name={feature.icon} className="size-5" />
          </span>
          <div className="flex items-center gap-2">
            {feature.badge && (
              <span className="text-accent bg-accent-soft rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                {feature.badge}
              </span>
            )}
            {showShortcut && feature.shortcut && (
              <kbd className="rounded-md border border-edge bg-panel-2 px-2 py-1 font-mono text-[11px] text-fg-subtle">
                {feature.shortcut.mac}
              </kbd>
            )}
          </div>
        </div>

        <h3 className="mt-5 text-[15px] font-semibold tracking-tight text-fg">
          {feature.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
          {feature.summary}
        </p>

        <span className="text-accent mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
          Read more
          <Icon
            name="arrow-right"
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </span>
      </Link>
    </li>
  );
}
