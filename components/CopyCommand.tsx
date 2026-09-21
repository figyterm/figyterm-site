"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

export function CopyCommand({
  command,
  className = "",
}: {
  command: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked (insecure context or denied permission) — the text
      // is on screen and selectable, so there is nothing to recover from.
    }
  };

  return (
    <div
      className={`group flex items-center gap-3 rounded-xl border border-edge bg-panel/80 px-4 py-3 ring-edge ${className}`}
    >
      <span className="select-none font-mono text-sm text-term-green" aria-hidden="true">
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[12.5px] text-fg-muted sm:text-sm">
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied to clipboard" : "Copy install command"}
        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-edge px-2.5 py-1.5 text-xs font-medium text-fg-muted transition-colors hover:border-edge-strong hover:text-fg"
      >
        <Icon
          name={copied ? "check" : "copy"}
          className={`size-3.5 ${copied ? "text-term-green" : ""}`}
        />
        <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}
