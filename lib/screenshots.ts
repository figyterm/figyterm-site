/**
 * Every screenshot the site can show, in one registry.
 *
 * ## Adding a screenshot
 *
 * 1. Capture the app and save the PNG at `public/screenshots/<file>`.
 * 2. Flip that entry's `ready` to `true`.
 *
 * That is the whole procedure. Until `ready` is true the `<Screenshot>`
 * component draws a framed placeholder at the same aspect ratio, naming the
 * path to drop the file into — so an unfinished capture is obvious in
 * development, costs no layout shift when it lands, and is never emitted into
 * the sitemap or the structured data.
 *
 * Capture at the same size as the existing set (3002 × 1898, a retina capture
 * of the default window) unless the panel genuinely wants another shape.
 */

export type Screenshot = {
  /** Stable id — features reference shots by this. */
  id: string;
  /** Short label for tab strips and captions. */
  label: string;
  /** Alt text. Describes what is in the frame, not that it is a screenshot. */
  alt: string;
  /** Filename under `public/screenshots/`. */
  file: string;
  /** `false` renders the placeholder instead of the image. */
  ready: boolean;
  width: number;
  height: number;
};

const CAPTURE = { width: 3002, height: 1898 } as const;

const all = [
  {
    id: "autocomplete",
    label: "Autocomplete",
    alt: "FigyTerm suggesting git subcommands — add, commit, push, pull, checkout — each with its own description",
    file: "auth-complete.png",
    ready: true,
  },
  {
    id: "path-completion",
    label: "Path completion",
    alt: "FigyTerm suggesting directory paths with recently visited folders listed first",
    file: "path-completion.png",
    ready: true,
  },
  {
    id: "code-editor",
    label: "Code editor",
    alt: "FigyTerm's embedded code editor previewing README.md, with an outline panel listing the document's headings and the project file tree on the right",
    file: "code-editor.png",
    ready: true,
  },
  {
    id: "panes",
    label: "Split panes",
    alt: "Four split terminal panes in a single FigyTerm tab, each running its own shell session",
    file: "multiple-pane.png",
    ready: true,
  },
  {
    id: "history",
    label: "History search",
    alt: "FigyTerm command history search panel fuzzy-matching previously run shell commands",
    file: "cli-history.png",
    ready: true,
  },
  {
    id: "browser",
    label: "Browser",
    alt: "FigyTerm embedded browser modal with tabs and an address bar open on top of a terminal session",
    file: "browser.png",
    ready: true,
  },
  {
    id: "monitor",
    label: "System monitor",
    alt: "FigyTerm system monitor modal showing live CPU and memory usage charts",
    file: "system-monitor.png",
    ready: true,
  },
  {
    id: "settings",
    label: "Settings",
    alt: "FigyTerm settings with the Terminal tab open, showing font, cursor style and scrollback options",
    file: "settings.png",
    ready: true,
  },

  /* ── Awaiting capture ──────────────────────────────────────────────────── */

  {
    id: "claude-code",
    label: "Claude Code",
    alt: "The Claude Code window in FigyTerm with a project selected and a conversation running",
    file: "claude-code.png",
    ready: false,
  },
  {
    id: "claude-projects",
    label: "Project switcher",
    alt: "The Claude Code project switcher in FigyTerm listing projects with their primary folders",
    file: "claude-projects.png",
    ready: false,
  },
  {
    id: "api-client",
    label: "API client",
    alt: "The FigyMan API client in FigyTerm with a request composed and its response body displayed",
    file: "api-client.png",
    ready: false,
  },
  {
    id: "api-collections",
    label: "Collections",
    alt: "The FigyMan collections sidebar in FigyTerm showing saved requests grouped in folders",
    file: "api-collections.png",
    ready: false,
  },
  {
    id: "api-history",
    label: "Request history",
    alt: "The FigyMan history tab in FigyTerm listing past requests with status codes and response times",
    file: "api-history.png",
    ready: false,
  },
  {
    id: "drawing",
    label: "Drawing",
    alt: "A FigyTerm drawing project with an Excalidraw canvas beside its rich-text notes pane",
    file: "drawing.png",
    ready: false,
  },
  {
    id: "drawing-projects",
    label: "Drawing projects",
    alt: "The FigyTerm drawing project rail listing named, searchable drawings with favourites pinned",
    file: "drawing-projects.png",
    ready: false,
  },
  {
    id: "git-panel",
    label: "Git panel",
    alt: "The git panel in FigyTerm's editor with changed files ticked for staging and a commit summary typed",
    file: "git-panel.png",
    ready: false,
  },
  {
    id: "diff-viewer",
    label: "Diff viewer",
    alt: "FigyTerm's split diff viewer with word-level highlighting inside the changed lines",
    file: "diff-viewer.png",
    ready: false,
  },
  {
    id: "git-history",
    label: "Commit history",
    alt: "The commit history tab in FigyTerm's editor with a commit opened into a drawer listing its files",
    file: "git-history.png",
    ready: false,
  },
  {
    id: "lsp-diagnostics",
    label: "Diagnostics",
    alt: "A language server diagnostic underlined in FigyTerm's editor with the error message in a hover card",
    file: "lsp-diagnostics.png",
    ready: false,
  },
  {
    id: "lsp-hover",
    label: "Hover & definition",
    alt: "A hover card in FigyTerm's editor showing a symbol's type signature and documentation",
    file: "lsp-hover.png",
    ready: false,
  },
  {
    id: "markdown-preview",
    label: "Markdown preview",
    alt: "FigyTerm rendering a Markdown document beside its live outline, with scrolling synced between them",
    file: "markdown-preview.png",
    ready: false,
  },
  {
    id: "quick-open",
    label: "Fuzzy file finder",
    alt: "FigyTerm's fuzzy file finder matching a file path from a handful of typed letters",
    file: "quick-open.png",
    ready: false,
  },
  {
    id: "project-search",
    label: "Project search",
    alt: "Streamed project-wide search results in FigyTerm's editor, grouped by file",
    file: "project-search.png",
    ready: false,
  },
  {
    id: "command-palette",
    label: "Command palette",
    alt: "FigyTerm's command palette listing every action with its shortcut for the current platform",
    file: "command-palette.png",
    ready: false,
  },
  {
    id: "light-theme",
    label: "Light mode",
    alt: "FigyTerm running in light mode with the same panels as the dark theme",
    file: "light-theme.png",
    ready: false,
  },
  {
    id: "tabs",
    label: "Tabs",
    alt: "FigyTerm's tab bar with several renamed tabs, one being dragged into a new position",
    file: "tabs.png",
    ready: false,
  },
  {
    id: "themes",
    label: "Oh My Zsh themes",
    alt: "The Oh My Zsh theme picker in FigyTerm settings rendering each theme's prompt in full",
    file: "themes.png",
    ready: false,
  },
].map((shot) => ({ ...shot, ...CAPTURE })) satisfies Screenshot[];

const byId = new Map(all.map((shot) => [shot.id, shot]));

/** Look one up. Throws at build time on a typo rather than rendering nothing. */
export function shot(id: string): Screenshot {
  const found = byId.get(id);
  if (!found) throw new Error(`Unknown screenshot: ${id}`);
  return found;
}

export function shots(...ids: string[]): Screenshot[] {
  return ids.map(shot);
}

/** Only captured images — what structured data and the image sitemap may cite. */
export const readyScreenshots = all.filter((s) => s.ready);

export const allScreenshots: Screenshot[] = all;
