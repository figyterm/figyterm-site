/**
 * One line-art icon set, drawn at 24×24 on a 1.6 stroke.
 *
 * Brand marks (GitHub, Apple, Windows) are the exception and are filled, since
 * a stroked outline of a logo reads as a bad copy of it rather than as the
 * logo. Everything else stays in the same language so a row of them looks like
 * a set.
 */
type IconName =
  | "sparkles"
  | "puzzle"
  | "columns"
  | "tabs"
  | "globe"
  | "history"
  | "activity"
  | "code"
  | "document"
  | "palette"
  | "zap"
  | "branch"
  | "wand"
  | "spark"
  | "send"
  | "pen"
  | "folder"
  | "target"
  | "search"
  | "user"
  | "wifi"
  | "layers"
  | "github"
  | "apple"
  | "linux"
  | "windows"
  | "check"
  | "cross"
  | "copy"
  | "arrow-right"
  | "arrow-left"
  | "chevron-down"
  | "external"
  | "terminal"
  | "shield"
  | "menu"
  | "image"
  | "download";

const paths: Record<IconName, React.ReactNode> = {
  sparkles: (
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
      <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />
    </>
  ),
  puzzle: (
    <path d="M10 4a2 2 0 1 1 4 0v1h3a1 1 0 0 1 1 1v3h1a2 2 0 1 1 0 4h-1v3a1 1 0 0 1-1 1h-3v-1a2 2 0 1 0-4 0v1H7a1 1 0 0 1-1-1v-3H5a2 2 0 1 1 0-4h1V6a1 1 0 0 1 1-1h3V4z" />
  ),
  columns: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M12 4v16" />
    </>
  ),
  tabs: (
    <>
      <path d="M3 8h6l2-3h10v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" />
      <path d="M9 8V5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18-2.5-2.6-2.5-15.4 0-18z" />
    </>
  ),
  history: (
    <>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" />
      <path d="M3 4v4h4" />
      <path d="M12 8v4.5l3 1.8" />
    </>
  ),
  activity: <path d="M3 12h3.5l2.5-6 3.5 12 2.5-6H21" />,
  // Chevrons plus a slash — the one glyph that reads as "source" at 16px.
  code: <path d="M9 7 4.5 12 9 17M15 7l4.5 5L15 17M13.6 4.4 10.4 19.6" />,
  document: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" />
      {/* The folded corner, drawn separately so it isn't filled. */}
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 16.5h4" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 0 0 0 18c1.4 0 2-1 2-2s-.8-1.6-.8-2.5c0-1 .8-1.5 1.8-1.5H18a3 3 0 0 0 3-3c0-4.4-4-9-9-9z" />
      <circle cx="8" cy="10" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  zap: <path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8z" />,
  // Two nodes on a trunk with a branch leaving it — the git graph, minus the graph.
  branch: (
    <>
      <circle cx="7" cy="5.5" r="2.5" />
      <circle cx="7" cy="18.5" r="2.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M7 8v8M17 11.5c0 3-2.5 4.5-6.5 4.8" />
    </>
  ),
  // A wand with a spark: "the editor knows something it didn't before".
  wand: (
    <>
      <path d="M4 20 15 9" />
      <path d="M13.5 7.5 16.5 10.5" />
      <path d="M18 3l.7 1.8L20.5 5.5l-1.8.7L18 8l-.7-1.8L15.5 5.5l1.8-.7L18 3z" />
    </>
  ),
  // The four-point asterisk Claude is known by, drawn as strokes.
  spark: (
    <>
      <path d="M12 3v18M3 12h18" />
      <path d="M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
    </>
  ),
  send: <path d="M21 3 3 10.5l7.5 3L13.5 21 21 3z" />,
  pen: (
    <>
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4.5 1.5L5 15 16.5 3.5z" />
      <path d="M14.5 5.5 18.5 9.5" />
    </>
  ),
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M15.8 15.8 21 21" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  wifi: (
    <>
      <path d="M2.5 9.5a14 14 0 0 1 19 0" />
      <path d="M6 13a9 9 0 0 1 12 0" />
      <path d="M9.5 16.5a4 4 0 0 1 5 0" />
      <circle cx="12" cy="20" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3 3 7.5 12 12l9-4.5L12 3z" />
      <path d="M3 12.5 12 17l9-4.5M3 17 12 21.5 21 17" />
    </>
  ),
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 1.8a10.2 10.2 0 0 0-3.2 19.9c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 2v3c0 .3.2.6.8.5A10.2 10.2 0 0 0 12 1.8z"
    />
  ),
  apple: (
    <path
      fill="currentColor"
      stroke="none"
      d="M16.4 12.8c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.7-1.8-3.3-1.8-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.8 3-.8 1.4 0 1.8.8 3 .7 1.2 0 2-1.1 2.8-2.2.9-1.3 1.3-2.5 1.3-2.6-.1 0-2.7-1-2.7-3.7zM14.2 5.6c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-.9 2.8 1 .1 2.1-.5 2.7-1.3z"
    />
  ),
  // Tux, drawn in the same line-art language as the rest of the set rather than
  // as a solid brand mark: a filled silhouette would need the eyes and beak as
  // evenodd cut-outs, which reads worse at 16px than strokes do.
  linux: (
    <>
      {/* One continuous outline: head dome into body, so no internal arc shows
          through and it doesn't read as an owl. */}
      <path d="M8.7 8.4A3.4 3.4 0 1 1 15.3 8.4C16.6 9.6 17.2 12 17.2 14.3A5.2 5.2 0 0 1 6.8 14.3C6.8 12 7.4 9.6 8.7 8.4Z" />
      <circle cx="10.8" cy="6.3" r="0.62" fill="currentColor" stroke="none" />
      <circle cx="13.2" cy="6.3" r="0.62" fill="currentColor" stroke="none" />
      <path d="M11.2 7.7h1.6l-.8 1.2z" fill="currentColor" stroke="none" />
      <path d="M9.4 19.2 7.9 21M14.6 19.2 16.1 21" />
    </>
  ),
  // Four squares — the one platform mark that needs no freehand curves.
  windows: (
    <>
      <rect x="3.2" y="3.2" width="7.6" height="7.6" fill="currentColor" stroke="none" />
      <rect x="13.2" y="3.2" width="7.6" height="7.6" fill="currentColor" stroke="none" />
      <rect x="3.2" y="13.2" width="7.6" height="7.6" fill="currentColor" stroke="none" />
      <rect x="13.2" y="13.2" width="7.6" height="7.6" fill="currentColor" stroke="none" />
    </>
  ),
  check: <path d="M4.5 12.5 9 17l10.5-10.5" />,
  cross: <path d="M6 6l12 12M18 6 6 18" />,
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M15 5.5A1.5 1.5 0 0 0 13.5 4H6a2 2 0 0 0-2 2v7.5A1.5 1.5 0 0 0 5.5 15" />
    </>
  ),
  "arrow-right": <path d="M5 12h13m0 0-5.5-5.5M18 12l-5.5 5.5" />,
  "arrow-left": <path d="M19 12H6m0 0 5.5-5.5M6 12l5.5 5.5" />,
  "chevron-down": <path d="m6 9.5 6 6 6-6" />,
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
    </>
  ),
  terminal: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7.5 9.5 10 12l-2.5 2.5M12.5 15H17" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5.5c0 4.3-3 8-7 9.5-4-1.5-7-5.2-7-9.5V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  image: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <circle cx="8.5" cy="10" r="1.6" />
      <path d="m3.5 17 4.8-4.8a1.5 1.5 0 0 1 2.1 0L15 16.8M14 15.5l1.9-1.9a1.5 1.5 0 0 1 2.1 0l2.5 2.5" />
    </>
  ),
  download: <path d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14" />,
};

export function Icon({
  name,
  className = "size-5",
}: {
  name: string;
  className?: string;
}) {
  const shape = paths[name as IconName];
  if (!shape) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {shape}
    </svg>
  );
}
