"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Suggestion = { name: string; desc: string; kind: string };

type Scene = {
  base: string;
  query: string;
  ghost: string;
  count: number;
  icon: string;
  items: Suggestion[];
};

const scenes: Scene[] = [
  {
    base: "git ",
    query: "pu",
    ghost: "ll origin dev",
    count: 16,
    icon: "/icons/git.png",
    items: [
      { name: "pull", desc: "Fetch from and integrate with another repository", kind: "CMD" },
      { name: "push", desc: "Update remote refs along with associated objects", kind: "CMD" },
      { name: "commit", desc: "Record changes to the repository", kind: "CMD" },
      { name: "checkout", desc: "Switch branches or restore working tree files", kind: "CMD" },
    ],
  },
  {
    base: "docker ",
    query: "co",
    ghost: "mpose up -d",
    count: 50,
    icon: "/icons/docker.png",
    items: [
      { name: "compose", desc: "Define and run multi-container applications", kind: "CMD" },
      { name: "container", desc: "Manage containers", kind: "CMD" },
      { name: "commit", desc: "Create a new image from a container's changes", kind: "CMD" },
      { name: "cp", desc: "Copy files between a container and the local filesystem", kind: "CMD" },
    ],
  },
  {
    base: "cd ",
    query: "do",
    ghost: "cuments/GitHub",
    count: 2,
    icon: "/icons/folder.png",
    items: [
      { name: "Documents/", desc: "Visited 4 minutes ago", kind: "DIR" },
      { name: "Downloads/", desc: "Visited yesterday", kind: "DIR" },
    ],
  },
  {
    base: "npm ",
    query: "ru",
    ghost: "n tauri build",
    count: 9,
    icon: "/icons/npm.png",
    items: [
      { name: "run", desc: "Run a script from package.json", kind: "CMD" },
      { name: "run dev", desc: "vite", kind: "SCRIPT" },
      { name: "run build", desc: "tsc && vite build", kind: "SCRIPT" },
      { name: "run tauri", desc: "tauri", kind: "SCRIPT" },
    ],
  },
];

const TYPE_MS = 70;
const HOLD_MS = 2400;

export function TerminalDemo() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [typed, setTyped] = useState(0);
  const [still, setStill] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const scene = scenes[sceneIndex];
  const full = scene.base + scene.query;

  useEffect(() => {
    // Respect the user's motion preference: show the finished frame, no cycling.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      setStill(true);
      setTyped(full.length);
      return;
    }

    if (typed < full.length) {
      timer.current = setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
    } else {
      timer.current = setTimeout(() => {
        setTyped(0);
        setSceneIndex((i) => (i + 1) % scenes.length);
      }, HOLD_MS);
    }

    return () => clearTimeout(timer.current);
  }, [typed, full.length]);

  const text = full.slice(0, typed);
  const baseShown = text.slice(0, Math.min(typed, scene.base.length));
  const queryShown = text.slice(scene.base.length);
  const complete = typed >= full.length;
  const popupOpen = complete || queryShown.length > 0;

  return (
    <div className="relative overflow-hidden rounded-xl border border-edge bg-[#0a0a0e] shadow-2xl shadow-black/60 ring-edge">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-edge/70 px-4 py-3">
        <span className="flex gap-2" aria-hidden="true">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="ml-2 text-xs font-semibold tracking-tight text-fg-muted">
          FigyTerm
        </span>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 border-b border-edge/70 px-3 pt-2">
        <Image
          src="/logo-mark.png"
          alt=""
          width={512}
          height={512}
          className="mb-2 mr-1 size-5 rounded"
        />
        <span className="-mb-px flex items-center gap-2 rounded-t-md border-b-2 border-brand px-3 py-2 font-mono text-xs text-fg">
          zsh
        </span>
        <span className="mb-2 px-2 font-mono text-xs text-fg-subtle">+</span>
      </div>

      {/* Terminal body */}
      <div className="relative min-h-[19rem] px-4 py-4 font-mono text-[13px] leading-relaxed sm:min-h-[21rem] sm:text-sm">
        <div className="text-fg-subtle">
          <span aria-hidden="true">╭─ </span>
          <span className="text-violet"> ~</span>
        </div>
        <div className="flex flex-wrap items-baseline">
          <span aria-hidden="true" className="text-fg-subtle">
            ╰─❯&nbsp;
          </span>
          {/* `whitespace-pre` because each of these is a flex item, and the
              trailing space in a base like "docker " sits at the item's edge —
              where normal white-space processing drops it, running the command
              into the query as "dockerco". */}
          <span className="whitespace-pre text-term-green">{baseShown}</span>
          <span className="whitespace-pre text-fg">{queryShown}</span>
          {complete && <span className="text-fg-subtle/70">{scene.ghost}</span>}
          {!still && (
            <span className="ml-0.5 inline-block h-4 w-[7px] animate-caret bg-fg/80 align-middle" />
          )}
        </div>

        {/* Suggestion popup */}
        <div
          className={`mt-3 ml-6 w-full max-w-[27rem] origin-top-left overflow-hidden rounded-xl border border-edge-strong bg-[#12121a]/95 shadow-2xl shadow-black/70 backdrop-blur transition-all duration-200 ${
            popupOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
          }`}
        >
          <div className="flex items-center justify-between border-b border-edge/80 px-3 py-2">
            <span className="text-[10px] font-semibold tracking-[0.14em] text-brand-bright">
              SUGGESTIONS{" "}
              <span className="text-fg-subtle">({scene.count})</span>
            </span>
            <span className="flex gap-1" aria-hidden="true">
              {["↑↓", "Tab", "↵"].map((k) => (
                <kbd
                  key={k}
                  className="rounded border border-edge-strong px-1.5 py-0.5 text-[10px] text-fg-subtle"
                >
                  {k}
                </kbd>
              ))}
            </span>
          </div>
          <ul>
            {scene.items.map((item, i) => (
              <li
                key={item.name}
                className={`flex items-center gap-2.5 px-2.5 py-2 ${
                  i === 0 ? "bg-brand/12 ring-1 ring-inset ring-brand/30" : ""
                }`}
              >
                <Image
                  src={scene.icon}
                  alt=""
                  width={32}
                  height={32}
                  className="size-5 shrink-0 rounded"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] text-fg">
                    {item.name}
                  </span>
                  <span className="block truncate text-[11px] text-fg-subtle">
                    {item.desc}
                  </span>
                </span>
                <span className="shrink-0 text-[9px] font-semibold tracking-wider text-brand-bright">
                  {item.kind}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-3 border-t border-edge/70 px-4 py-2 font-mono text-[11px] text-fg-subtle">
        <span>zsh</span>
        <span className="truncate">~/Documents/GitHub</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-term-green" />
          Ready
        </span>
      </div>
    </div>
  );
}
