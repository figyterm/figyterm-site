"use client";

import { useEffect, useId, useState } from "react";
import { Icon } from "./Icon";

export type PlatformId = "macos" | "linux" | "windows";

const tabs: { id: PlatformId; label: string; icon: string }[] = [
  { id: "macos", label: "macOS", icon: "apple" },
  { id: "linux", label: "Linux", icon: "linux" },
  { id: "windows", label: "Windows", icon: "windows" },
];

/**
 * Guesses the visitor's platform from the user agent.
 *
 * Only ever used to pick which tab opens first, so a wrong guess costs one
 * click. `userAgentData` is Chromium-only and the legacy string is enough for
 * a three-way split, so both are read.
 */
function detectPlatform(): PlatformId | null {
  const nav = navigator as Navigator & {
    userAgentData?: { platform?: string };
  };
  const hint = `${nav.userAgentData?.platform ?? ""} ${navigator.userAgent}`;

  if (/mac|iphone|ipad/i.test(hint)) return "macos";
  if (/win/i.test(hint)) return "windows";
  if (/linux|x11|cros/i.test(hint)) return "linux";
  return null;
}

/**
 * Tabbed panels, one per platform.
 *
 * Every panel is rendered and only hidden with the `hidden` attribute, so all
 * three sets of install instructions stay in the DOM for search engines and for
 * anyone reading with assistive tech or JavaScript disabled — which also means
 * the server-rendered default (macOS) is never a wrong answer, just a
 * pre-selection.
 */
export function PlatformTabs({
  panels,
}: {
  panels: Record<PlatformId, React.ReactNode>;
}) {
  const [active, setActive] = useState<PlatformId>("macos");
  const base = useId();

  // After hydration, not during render: picking the tab from the user agent
  // while rendering would make the server and client markup disagree.
  useEffect(() => {
    const detected = detectPlatform();
    if (detected) setActive(detected);
  }, []);

  return (
    <div className="mt-12">
      <div
        role="tablist"
        aria-label="Choose your platform"
        className="mx-auto flex w-fit gap-1 rounded-xl border border-edge bg-panel/60 p-1 ring-edge"
      >
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${base}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selected
                  ? "bg-brand text-white shadow-lg shadow-brand/25"
                  : "text-fg-muted hover:bg-white/[0.04] hover:text-fg"
              }`}
            >
              <Icon name={tab.icon} className="size-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${base}-panel-${tab.id}`}
          aria-labelledby={`${base}-tab-${tab.id}`}
          hidden={tab.id !== active}
          className="mt-8"
        >
          {panels[tab.id]}
        </div>
      ))}
    </div>
  );
}
