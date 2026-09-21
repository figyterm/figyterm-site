"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "./Icon";
import { Screenshot } from "./Screenshot";
import { shot } from "@/lib/screenshots";

export type ShowcaseItem = {
  /** Screenshot id from `lib/screenshots.ts`. */
  id: string;
  title: string;
  body: string;
  /** Optional link to the feature page this shot belongs to. */
  href?: string;
  linkLabel?: string;
};

/**
 * Tabbed screenshots.
 *
 * Only panels the visitor has actually opened are mounted, so an unseen
 * capture is never downloaded — and once opened a panel stays mounted, so
 * switching back is instant.
 */
export function Showcase({ items }: { items: ShowcaseItem[] }) {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<number[]>([0]);

  const select = (index: number) => {
    setActive(index);
    setSeen((prev) => (prev.includes(index) ? prev : [...prev, index]));
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const delta =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    select((active + delta + items.length) % items.length);
  };

  return (
    <>
      <div
        role="tablist"
        aria-label="FigyTerm screenshots"
        onKeyDown={onKeyDown}
        className="mx-auto mt-12 flex max-w-4xl snap-x gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`shot-tab-${item.id}`}
            aria-selected={i === active}
            aria-controls={`shot-panel-${item.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => select(i)}
            className={`shrink-0 snap-start rounded-full border px-4 py-2 text-sm transition-colors ${
              i === active
                ? "border-brand/50 bg-brand/15 text-fg"
                : "border-edge bg-panel/50 text-fg-muted hover:border-edge-strong hover:text-fg"
            }`}
          >
            {shot(item.id).label}
          </button>
        ))}
      </div>

      <div className="relative mt-8">
        {items.map((item, i) => {
          if (!seen.includes(i)) return null;
          return (
            <div
              key={item.id}
              role="tabpanel"
              id={`shot-panel-${item.id}`}
              aria-labelledby={`shot-tab-${item.id}`}
              hidden={i !== active}
            >
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.55fr]">
                <div className="order-2 lg:order-1">
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted sm:text-base">
                    {item.body}
                  </p>
                  {item.href && (
                    <Link
                      href={item.href}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-bright transition-colors hover:text-fg"
                    >
                      {item.linkLabel ?? "Read more"}
                      <Icon name="arrow-right" className="size-4" />
                    </Link>
                  )}
                  <p className="mt-6 flex items-center gap-2 text-xs text-fg-subtle">
                    <span className="h-px w-8 bg-edge-strong" />
                    {shot(item.id).label} · {i + 1} of {items.length}
                  </p>
                </div>

                <div className="order-1 lg:order-2">
                  <Screenshot id={item.id} priority={i === 0} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
