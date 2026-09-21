import { site } from "./site";

/**
 * The feature catalogue.
 *
 * One entry per `/features/<slug>` page. The index page, the navigation mega
 * menu, the home page grid and the sitemap are all generated from this array,
 * so a feature is added in exactly one place.
 *
 * Screenshots are referenced by id — see `lib/screenshots.ts` for how a
 * placeholder becomes a real capture.
 */

export type FeatureSection = {
  heading: string;
  body: string;
  /** Term/detail pairs. Rendered as a definition list, not prose. */
  points?: { term: string; detail: string }[];
  /** Screenshot id, shown beside the section. */
  shot?: string;
  /** A short transcript or snippet. Each entry is one line. */
  code?: { caption: string; lines: string[] };
};

export type Feature = {
  slug: string;
  /** Full name, used as the page H1. */
  name: string;
  /** Short name for nav, cards and breadcrumbs. */
  navLabel: string;
  icon: string;
  /** Hex, applied as `--accent` on the page. Keeps each feature distinct. */
  accent: string;
  shortcut?: { mac: string; other: string };
  badge?: string;
  /** One sentence under the H1. */
  tagline: string;
  /** Two sentences for cards and list pages. */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Screenshot id for the page hero. */
  heroShot: string;
  highlights: { icon: string; title: string; body: string }[];
  sections: FeatureSection[];
  faqs: { q: string; a: string }[];
  /** Slugs of features worth reading next. */
  related: string[];
};

export const features: Feature[] = [
  /* ──────────────────────────────────────────────────────────────────────── */
  {
    slug: "autocomplete",
    name: "Intelligent autocomplete",
    navLabel: "Autocomplete",
    icon: "sparkles",
    accent: "#818cf8",
    tagline:
      "IDE-level completions for your shell — subcommands, flags, arguments and paths, computed on your machine as you type.",
    summary:
      "Context-aware suggestions the moment you start typing, for git, docker, npm, pnpm, yarn, uv and more. Fig's spec format is read unchanged, so the community catalogue carries straight over.",
    metaTitle: "Terminal autocomplete for git, docker and npm",
    metaDescription:
      "FigyTerm brings IDE-level autocomplete to the command line: subcommands, flags, arguments and file paths for git, docker, npm, pnpm, yarn and uv. Fig-compatible specs, computed locally, no account and no network.",
    keywords: [
      "terminal autocomplete",
      "zsh autocomplete",
      "git autocomplete terminal",
      "docker command completion",
      "fig specs",
      "shell completion engine",
    ],
    heroShot: "autocomplete",
    highlights: [
      {
        icon: "zap",
        title: "Suggestions as you type",
        body: "The popup opens on the first keystroke of an argument and narrows with every letter after it. Tab accepts, arrows navigate, Esc dismisses.",
      },
      {
        icon: "puzzle",
        title: "Fig's spec format",
        body: "A spec is a plain TypeScript description of a command. FigyTerm reads the format Fig used, so completions written for it work here unchanged.",
      },
      {
        icon: "shield",
        title: "Nothing leaves the machine",
        body: "Matching happens in the Rust backend against specs on disk. The command you are halfway through typing is never sent anywhere.",
      },
    ],
    sections: [
      {
        heading: "It knows what the command means",
        body: "A completion engine that only knows filenames is a filename completer. FigyTerm reads a description of each command — its subcommands, the options each of those takes, and what kind of argument sits in each position — so the list you get after `git ` is git's subcommands with their own descriptions, and the list after `git checkout ` is your branches.",
        shot: "autocomplete",
        points: [
          { term: "Subcommands", detail: "With the one-line description the tool's own help gives them." },
          { term: "Options and flags", detail: "Long and short forms, filtered to the subcommand you are actually in." },
          { term: "Dynamic arguments", detail: "Branches for git, services for docker compose, scripts read out of package.json or pyproject.toml." },
        ],
      },
      {
        heading: "Paths, ordered the way you work",
        body: "Path completion reads the filesystem natively rather than shelling out, and orders what it finds by how recently you were there. The folder you visited four minutes ago is at the top of the list, not sorted alphabetically underneath a directory you have never opened.",
        shot: "path-completion",
      },
      {
        heading: "Eight commands covered out of the box",
        body: "Built-in specs ship for the tools most sessions are spent in, and adding your own CLI is a single TypeScript file in the repository. Anything without a spec still gets path, directory and shell built-in completion.",
        code: {
          caption: "The built-in catalogue",
          lines: [
            "git              subcommands, branches, options",
            "docker           commands, containers, images, options",
            "docker compose   services, commands, options",
            "npm / pnpm       scripts from package.json, packages, options",
            "yarn             scripts, packages, options",
            "uv               scripts from pyproject.toml, options",
            "cd               directories, recent-first ordering",
          ],
        },
      },
    ],
    faqs: [
      {
        q: "Does autocomplete work with my shell?",
        a: "Yes. Completions are computed by FigyTerm itself rather than by the shell, so zsh, bash, fish, PowerShell 7 and cmd.exe all behave the same. Nothing is installed into your dotfiles and no shell plugin is required.",
      },
      {
        q: "Can I add autocomplete for my own CLI?",
        a: "Yes. Specs are plain TypeScript definitions in the repository, and the spec authoring guide walks through adding a new command. Pull requests for new specs are welcome.",
      },
      {
        q: "Is it slower than my shell's own completion?",
        a: "No. Matching runs in Rust against specs already in memory, with no subprocess to spawn and no network round-trip, so the popup keeps up with typing.",
      },
    ],
    related: ["terminal", "code-editor"],
  },

  /* ──────────────────────────────────────────────────────────────────────── */
  {
    slug: "terminal",
    name: "The terminal underneath",
    navLabel: "Terminal",
    icon: "terminal",
    accent: "#94a3b8",
    tagline:
      "Panes, tabs, search, history, a system monitor and a command palette — the terminal fundamentals, done properly.",
    summary:
      "A Rust PTY backend behind xterm.js rendering: up to four panes per tab, drag-to-reorder tabs, fuzzy history search, live CPU and memory charts, and a command palette that spells every shortcut for the platform you are on.",
    metaTitle: "Split panes, tabs and history search",
    metaDescription:
      "FigyTerm's terminal core: up to four resizable panes per tab, browser-style tabs, fuzzy command history search with picture-in-picture, a live system monitor, a command palette and Oh My Zsh theme switching.",
    keywords: [
      "split pane terminal",
      "terminal tabs mac",
      "shell history search",
      "terminal system monitor",
      "oh my zsh theme switcher",
      "command palette terminal",
    ],
    heroShot: "panes",
    highlights: [
      {
        icon: "columns",
        title: "Four panes, one tab",
        body: "Split horizontally or vertically, resize by dragging. Every pane is a real PTY with its own working directory and its own completions.",
      },
      {
        icon: "history",
        title: "Everything you have run",
        body: "Fuzzy-search your shell history, then pin the panel picture-in-picture so it stays on top while you keep typing.",
      },
      {
        icon: "activity",
        title: "Watch the machine",
        body: "Live CPU and memory charts in a draggable modal, so a runaway build is obvious before the fans tell you.",
      },
    ],
    sections: [
      {
        heading: "Panes and tabs",
        body: "Up to four resizable panes per tab, split either way without leaving the keyboard. Tabs drag to reorder and rename inline, and a new tab can open already sitting in the active directory — the small thing you reach for a dozen times a day.",
        shot: "panes",
        points: [
          { term: "⌘D / ⌘⇧D", detail: "Split the active pane horizontally or vertically." },
          { term: "⌘T / ⌘⇧T", detail: "New tab, or a new tab in the same directory." },
          { term: "⌘1–9", detail: "Jump straight to a tab." },
        ],
      },
      {
        heading: "Search that stays out of the way",
        body: "⌘F finds text in the active pane. ⌘R opens a fuzzy search across your whole shell history — and unlike the shell's own reverse-search, it can be pinned picture-in-picture, so the list stays visible while you type the command it reminded you of.",
        shot: "history",
      },
      {
        heading: "A monitor, a palette and a theme picker",
        body: "⌘⇧M puts live CPU and memory charts in a draggable modal. ⌘⇧P opens a palette holding every action the app has, each spelled for the platform you are on. ⌘⇧L flips between light and dark. And on zsh platforms, Settings browses your Oh My Zsh themes with the prompt fully rendered — custom themes included — applying live with no dotfile to edit.",
        shot: "monitor",
      },
      {
        heading: "Native performance",
        body: "A Rust PTY backend behind xterm.js rendering, in a Tauri 2 shell rather than an Electron one. Input has no perceptible latency, memory stays in tens of megabytes, and every heavy panel — the editor, the browser, the API client, the drawing board — is loaded the first time you open it, so none of them cost anything at launch.",
        shot: "settings",
      },
    ],
    faqs: [
      {
        q: "How many panes can one tab hold?",
        a: "Four, split horizontally, vertically or both. Each one is an independent PTY with its own working directory, its own scrollback and its own autocomplete.",
      },
      {
        q: "Does the system monitor cost performance?",
        a: "It samples only while the modal is open, and the charts are drawn from a small rolling window. Closing it stops the sampling entirely.",
      },
      {
        q: "Does the Oh My Zsh theme picker work on Windows?",
        a: "No. It reads ~/.zshrc and so only applies where zsh does — macOS and Linux. The Windows equivalent would be Oh My Posh, which FigyTerm does not manage yet.",
      },
    ],
    related: ["autocomplete", "browser"],
  },

  /* ──────────────────────────────────────────────────────────────────────── */
  {
    slug: "code-editor",
    name: "Embedded code editor",
    navLabel: "Code editor",
    icon: "code",
    accent: "#38bdf8",
    shortcut: { mac: "⌘ ⇧ E", other: "Ctrl ⇧ E" },
    tagline:
      "A real editor over the shell — CodeMirror 6, file tabs, a file tree, a fuzzy finder and project-wide search, one shortcut away.",
    summary:
      "Click a path in terminal output and the file opens at that line. Saves are atomic, conflicts are detected rather than silently lost, and line endings survive untouched.",
    metaTitle: "Edit files without leaving the terminal",
    metaDescription:
      "FigyTerm's built-in editor: CodeMirror 6 with file tabs, a resizable file tree, fuzzy file finder, streamed project search and GitHub-flavoured Markdown preview. Atomic saves, conflict detection and CRLF preservation.",
    keywords: [
      "terminal with built-in code editor",
      "edit files in terminal",
      "codemirror terminal editor",
      "terminal markdown preview",
      "click path in terminal output",
    ],
    heroShot: "code-editor",
    highlights: [
      {
        icon: "target",
        title: "Straight from a stack trace",
        body: "A `path:line:col` in terminal output is clickable. One click opens the file in the editor with the cursor already on the offending line.",
      },
      {
        icon: "shield",
        title: "Saves you can trust",
        body: "Written to a temp file and renamed over the target, so a crash cannot leave half a file. CRLF and byte-order marks are written back exactly as found.",
      },
      {
        icon: "search",
        title: "Find anything",
        body: "⌘P fuzzy-matches a file from a few letters. ⌘⇧F streams project-wide results as they arrive rather than making you wait for the whole scan.",
      },
    ],
    sections: [
      {
        heading: "The shape of it",
        body: "File tabs across the top, a breadcrumb under them, and a resizable file tree — the layout an editor is expected to have, over the shell rather than instead of it. Each workspace remembers its own open tabs, so reopening the editor in a project puts you back where you left it. It is loaded the first time you open it, which is why it costs nothing at launch.",
        shot: "code-editor",
        points: [
          { term: "CodeMirror 6", detail: "Multi-cursor, folding, bracket matching and per-language highlighting across the languages the editor ships grammars for." },
          { term: "File tree", detail: "Resizable, with git status badged onto changed files." },
          { term: "Quick open", detail: "⌘P and a few letters — `edmod` finds `EditorModal.tsx`." },
        ],
      },
      {
        heading: "Markdown, rendered",
        body: "GitHub-flavoured rendering with a live outline beside it, scrolling synced both ways, and links that follow through to sibling files. Handy for the README you were about to open in something else. No `dangerouslySetInnerHTML` anywhere in the path, so a document cannot inject markup into the app.",
        shot: "markdown-preview",
      },
      {
        heading: "Search across the project",
        body: "⌘⇧F searches the whole project and streams matches in as they are found, grouped by file. Results are live-updating rather than a frozen list, so a large repository stays usable while the scan is still running.",
        shot: "project-search",
      },
      {
        heading: "Built carefully, because it writes to your disk",
        body: "This is the part that got the most attention, because an editor that loses work is worse than no editor.",
        points: [
          { term: "Atomic saves", detail: "Written to a temp file and renamed over the target. A crash mid-save cannot leave a half-written file." },
          { term: "Conflict detection", detail: "Every save carries the timestamp the file was opened at. If something else changed it meanwhile you are offered overwrite, reload or cancel — never a silent loss." },
          { term: "Bytes preserved", detail: "Line endings and byte-order marks are written back exactly as found, so a one-line edit stays a one-line diff on Windows." },
          { term: "Crash-safe drafts", detail: "Unsaved buffers are journalled while you type and offered back after a crash." },
          { term: "Deletes go to the trash", detail: "Not to nowhere." },
        ],
      },
    ],
    faqs: [
      {
        q: "Is the built-in editor meant to replace my IDE?",
        a: "No, and it does not pretend to. It is for the edits you would otherwise break flow for — patch a config, fix the line a stack trace just pointed at, read a README. There is no debugger and no test runner. Your editor keeps your project; this one keeps you in the terminal.",
      },
      {
        q: "Does it have IntelliSense?",
        a: "Optionally. Word completion from the open document works with no setup, and language server support adds real diagnostics, hover, completion, go-to-definition and rename using servers you already have installed.",
      },
      {
        q: "Does opening the editor slow the terminal down?",
        a: "No. The editor is loaded the first time you open it, not at launch, so a session that never opens it never pays for it.",
      },
    ],
    related: ["git", "code-intelligence"],
  },

  /* ──────────────────────────────────────────────────────────────────────── */
  {
    slug: "git",
    name: "Git in the editor",
    navLabel: "Git & diffs",
    icon: "branch",
    accent: "#fb923c",
    tagline:
      "Stage, commit, fetch and push without leaving the terminal — and a diff viewer that reads like the tool you already use.",
    summary:
      "Changed files badged in the tree, changed lines marked in the gutter, and a GitHub Desktop-style panel: tick the files, write a summary, commit. It runs your own git, so your hooks and credential helper apply.",
    metaTitle: "Git staging, commits and diffs in the terminal",
    metaDescription:
      "FigyTerm's editor includes git: changed files badged in the tree, gutter marks on changed lines, file-level staging, commits, fetch and push, a commit history drawer, and a diff viewer with GitHub, GitLab, VS Code, delta and plain git presets.",
    keywords: [
      "git gui in terminal",
      "terminal git staging",
      "git diff viewer",
      "split diff word level",
      "commit from terminal editor",
    ],
    heroShot: "git-panel",
    highlights: [
      {
        icon: "check",
        title: "Tick, summarise, commit",
        body: "File-level staging in a panel shaped like GitHub Desktop's. Tick what belongs in the commit, write the summary, commit.",
      },
      {
        icon: "columns",
        title: "A diff you can read",
        body: "Unified or split, with word-level highlighting inside changed lines, and five presets so it looks like the diff tool you already know.",
      },
      {
        icon: "terminal",
        title: "Your git, not a reimplementation",
        body: "It shells out to the git on your PATH, so your hooks, your config and your credential helper all apply exactly as they do on the command line.",
      },
    ],
    sections: [
      {
        heading: "Status where you are already looking",
        body: "Changed files are badged in the file tree and changed lines are marked in the gutter, so the state of the working tree is visible while you edit rather than something you stop to ask for. The status bar carries the current branch.",
        shot: "git-panel",
      },
      {
        heading: "A diff viewer with five faces",
        body: "Everyone has a diff they read fastest. Rather than pick one, the viewer ships presets for GitHub, GitLab, VS Code, delta and plain `git diff`, in unified or split layout, with word-level highlighting inside changed lines so a renamed variable does not look like a rewritten paragraph.",
        shot: "diff-viewer",
      },
      {
        heading: "History, and the two remote operations worth having",
        body: "A history tab lists commits; opening one slides out a drawer with its message and the files it touched. Fetch and push are there. Discards go to the system trash rather than into nothing.",
        shot: "git-history",
        points: [
          { term: "Built", detail: "Tree decorations, gutter marks, branch indicator, file-level staging, commit, history drawer, fetch, push." },
          { term: "Not built", detail: "Hunk-level staging, branch switching and pull. Those stay on the command line, where you already have them." },
        ],
      },
    ],
    faqs: [
      {
        q: "Does it use my git configuration?",
        a: "Yes. FigyTerm runs the git on your PATH rather than reimplementing it, so your hooks, aliases, signing configuration and credential helper all apply.",
      },
      {
        q: "Can I stage individual hunks?",
        a: "Not yet — staging is file-level. Hunk-level staging, branch switching and pull are deliberately left to the command line for now.",
      },
      {
        q: "What happens to a discarded change?",
        a: "The file goes to the system trash, not to nowhere. A discard you regret is recoverable.",
      },
    ],
    related: ["code-editor", "code-intelligence"],
  },

  /* ──────────────────────────────────────────────────────────────────────── */
  {
    slug: "code-intelligence",
    name: "Language servers",
    navLabel: "Code intelligence",
    icon: "wand",
    accent: "#a78bfa",
    badge: "Opt-in",
    tagline:
      "Diagnostics, hover, completion, go-to-definition and rename — using the language servers already installed on your machine.",
    summary:
      "Opt-in LSP support in the editor. Nothing is bundled and nothing is downloaded: FigyTerm speaks to the servers you already have, and a session that never opens a file never starts one.",
    metaTitle: "LSP diagnostics and go-to-definition in the editor",
    metaDescription:
      "FigyTerm's editor supports the Language Server Protocol: real diagnostics, hover documentation, completion, go-to-definition and rename, powered by the language servers already on your machine. Opt-in, so a terminal still starts fast.",
    keywords: [
      "terminal editor lsp",
      "language server protocol editor",
      "go to definition terminal",
      "code diagnostics editor",
    ],
    heroShot: "lsp-diagnostics",
    highlights: [
      {
        icon: "activity",
        title: "Real diagnostics",
        body: "Errors and warnings from an actual type checker, underlined in the buffer and listed with the message the compiler gave.",
      },
      {
        icon: "target",
        title: "Go to definition",
        body: "F12, or ⌘-click the symbol. Cross-file, because the server has indexed the project rather than guessed from the open buffer.",
      },
      {
        icon: "shield",
        title: "Nothing bundled",
        body: "FigyTerm starts the servers you already have. No download on first launch, no per-language install story it owns, and no daemon if you never opt in.",
      },
    ],
    sections: [
      {
        heading: "Why it is opt-in",
        body: "A language server is not free. `rust-analyzer` on a repository of any size is a gigabyte or more resident and minutes of indexing before it answers anything — and FigyTerm is a ten-megabyte terminal that starts instantly, which is the same argument that ruled out bundling a heavier editor. So the servers are yours, they start when you ask for them, and a session that never opens a file never pays for one.",
        shot: "lsp-diagnostics",
      },
      {
        heading: "What you get once it is on",
        body: "The things you cannot answer from syntax highlighting alone — what this symbol is, where it came from, what you just broke.",
        shot: "lsp-hover",
        points: [
          { term: "Diagnostics", detail: "Underlined in the buffer, with the message in a hover card." },
          { term: "Hover", detail: "Type signature and documentation for the symbol under the cursor." },
          { term: "Completion", detail: "Type-aware, rather than word completion from the open file." },
          { term: "Go to definition", detail: "F12, ⌥⌘↓, or ⌘-click — cross-file." },
          { term: "Rename", detail: "Across the project, not a find-and-replace." },
          { term: "Quick fix", detail: "⌘. on a diagnostic the server offers an action for." },
        ],
      },
      {
        heading: "And when there is no server",
        body: "Plenty of languages have no server worth installing, and the editor stays useful in them. Syntax highlighting, folding and word completion come from the syntax tree CodeMirror already parses on every keystroke — and the single most valuable diagnostic source is still the build you just ran in the pane below, whose output is clickable straight to the line.",
      },
    ],
    faqs: [
      {
        q: "Which language servers are supported?",
        a: "The ones you install. FigyTerm speaks the Language Server Protocol and launches the server you point it at, so anything protocol-compliant works. Nothing is bundled and nothing is downloaded on your behalf.",
      },
      {
        q: "Will this slow the terminal down?",
        a: "Only while a server is running, and only in the editor. Language server support is off until you turn it on, and the server starts when a matching file is opened rather than at launch.",
      },
      {
        q: "Is there IntelliSense without a language server?",
        a: "There is word completion drawn from the open document, plus highlighting, folding and bracket awareness from the syntax tree the editor already parses. Type-aware completion needs a server.",
      },
    ],
    related: ["code-editor", "git"],
  },

  /* ──────────────────────────────────────────────────────────────────────── */
  {
    slug: "claude-code",
    name: "Claude Code window",
    navLabel: "Claude Code",
    icon: "spark",
    accent: "#e08a5f",
    shortcut: { mac: "⌘ ⇧ A", other: "Ctrl ⇧ A" },
    badge: "New",
    tagline:
      "A project-shaped window for the Claude Code CLI, where switching projects never kills the conversation you left running.",
    summary:
      "The `claude` CLI exactly as it ships, in a child window FigyTerm draws the frame around. Projects are a primary folder plus any extras, and every conversation keeps running while you work elsewhere.",
    metaTitle: "Run Claude Code in a project-shaped window",
    metaDescription:
      "FigyTerm hosts the Claude Code CLI in a child window with real projects: a primary folder, additional folders, a project switcher, and conversations that keep running when you switch away from them.",
    keywords: [
      "claude code terminal",
      "claude code window",
      "ai agent terminal",
      "claude cli projects",
    ],
    heroShot: "claude-code",
    highlights: [
      {
        icon: "folder",
        title: "Projects, not directories",
        body: "A project is a primary folder plus any additional folders you add. It is named after the primary folder, because you already named that.",
      },
      {
        icon: "history",
        title: "Conversations keep running",
        body: "Switch project, go back to the shell, come back an hour later. The conversation you left is still where you left it, still going.",
      },
      {
        icon: "terminal",
        title: "The CLI as it ships",
        body: "FigyTerm draws the frame and nothing else. What is inside the window is Claude Code itself — every flag, every update, unmodified.",
      },
    ],
    sections: [
      {
        heading: "Why a window and not a tab",
        body: "Typing `claude` into a terminal tab works right up until you need a second project, or need the shell back, or close the tab by muscle memory. A window with projects in it is the difference between running the CLI and having the feature: the conversation outlives the thing you were looking at when you started it.",
        shot: "claude-code",
      },
      {
        heading: "Setting one up",
        body: "On first open it asks for a primary folder — defaulting to the working directory of the focused pane, because that is almost always the answer — and then for any additional folders. No name is asked for; the project is called whatever the primary folder is called. Additional folders can be added later without starting the conversation over.",
        shot: "claude-projects",
        points: [
          { term: "Primary folder", detail: "Defaults to the focused pane's working directory. Names the project." },
          { term: "Additional folders", detail: "Added at setup or any time after, without restarting." },
          { term: "Project switcher", detail: "Every project is one click away, and none of them stop when you leave." },
        ],
      },
      {
        heading: "It borrows the editor's chrome",
        body: "Drag, resize, the overlay stack and the keyboard conventions all come from the code editor, so the Claude window behaves like the rest of the app rather than like a guest in it. Inside the frame almost every key belongs to Claude Code itself — Escape above all — so the window claims only the chords that are unambiguously its own.",
      },
    ],
    faqs: [
      {
        q: "Do I need Claude Code installed?",
        a: "Yes. FigyTerm hosts the CLI, it does not ship it. Install `claude` the way you normally would and FigyTerm will run it.",
      },
      {
        q: "What happens to a conversation when I switch projects?",
        a: "Nothing. It keeps running. That is the point of the feature — the switcher moves what you are looking at, not what is executing.",
      },
      {
        q: "Is the CLI modified in any way?",
        a: "No. What is inside the window is Claude Code exactly as it ships. FigyTerm draws the frame, the project model and the switcher around it.",
      },
    ],
    related: ["code-editor", "terminal"],
  },

  /* ──────────────────────────────────────────────────────────────────────── */
  {
    slug: "api-client",
    name: "FigyMan, the API client",
    navLabel: "API client",
    icon: "send",
    accent: "#34d399",
    shortcut: { mac: "⌘ ⇧ H", other: "Ctrl ⇧ H" },
    badge: "New",
    tagline:
      "A REST client in the terminal, with your existing collections imported and exported unharmed.",
    summary:
      "Requests are sent from Rust, not the webview, so the headers, redirect chains and timings are real. Collections and history live in SQLite on your machine, and the industry-standard interchange format round-trips losslessly.",
    metaTitle: "A built-in REST API client",
    metaDescription:
      "FigyMan is FigyTerm's built-in REST client: requests sent from Rust so headers and redirects are real, collections and history in local SQLite, lossless Collection Format v2.1 import and export, variables, auth, and optional Postgres sync.",
    keywords: [
      "terminal api client",
      "postman alternative",
      "rest client desktop",
      "offline api client",
      "collection format v2.1",
    ],
    heroShot: "api-client",
    highlights: [
      {
        icon: "zap",
        title: "Sent from Rust",
        body: "`fetch` cannot set Host, Origin or Content-Length, cannot see a redirect chain, and CORS would fail most real calls. So requests go out from the backend instead.",
      },
      {
        icon: "folder",
        title: "Your collections come in and go back out",
        body: "Collection Format v2.1 in and out, v2.0 in. Import is lossless — the original document is kept beside the normalised model so export round-trips.",
      },
      {
        icon: "shield",
        title: "Works unplugged",
        body: "SQLite on your machine is the source of truth. Everything works with the network down, and what changed meanwhile is pushed when it comes back.",
      },
    ],
    sections: [
      {
        heading: "Why the backend sends",
        body: "An API client built on the webview's `fetch` is an API client that cannot do the job. `fetch` refuses to set `Host`, `Origin`, `Referer`, `Connection` or `Content-Length`; it cannot show you the redirect chain it followed; and CORS would reject most calls worth making. FigyMan sends from Rust, which means the request on the wire is the request you wrote.",
        shot: "api-client",
        points: [
          { term: "Real headers", detail: "Including the ones the browser reserves for itself." },
          { term: "Redirects by hand", detail: "Followed explicitly and shown to you, with credentials stripped on a cross-origin hop." },
          { term: "Timings", detail: "Wait, download and total, measured where the bytes actually move." },
          { term: "Classified errors", detail: "`timeout`, `tls`, `connect`, `body`, `cancelled` — not one stringified blob, so the UI can offer the remedy." },
          { term: "Cancellable", detail: "Any request, at any point, without exhausting memory on a body that will not stop." },
        ],
      },
      {
        heading: "Collections, variables and auth",
        body: "Requests live in collections and folders, with variables and authentication resolved at send time. The interchange format is the one the rest of the industry already writes, so moving in does not mean re-entering your work, and moving out later does not mean losing it.",
        shot: "api-collections",
      },
      {
        heading: "History, kept",
        body: "Every request you send is recorded with its status, timing and size, so the call that worked twenty minutes ago is still there to look at. History and collections share the same SQLite database, which is a file on your disk that you can copy, back up or delete.",
        shot: "api-history",
      },
      {
        heading: "Optional Postgres sync",
        body: "If you want the same collections on two machines, FigyMan can mirror to any Postgres server you can reach — hosted or self-hosted, over TLS. Local stays the source of truth: writes go to a durable outbox and are pushed when the connection allows. Sync is last-writer-wins per row with server-assigned timestamps, and a conflict is never silently dropped — the loser is kept as a conflicted copy beside the winner.",
        points: [
          { term: "Offline first", detail: "Everything works with the network unplugged. Nothing is blocked on a server." },
          { term: "Your server", detail: "A Postgres connection string, not a vendor's REST layer and not an account with us." },
          { term: "Honest status", detail: "Sync is built and reviewable, but has not yet been run against a production server at scale. Treat it as the newest part of the feature." },
        ],
      },
    ],
    faqs: [
      {
        q: "Can I import my existing collections?",
        a: "Yes. Collection Format v2.1.0 imports and exports, v2.0.0 imports. Import is lossless — the original document is kept alongside the normalised model, so an export round-trips back to what you brought in.",
      },
      {
        q: "Does my API data go to a server?",
        a: "Only to the API you are calling. Collections, history and variables live in SQLite on your machine. Postgres sync is opt-in and points at a server you choose.",
      },
      {
        q: "Is this meant to replace a full API platform?",
        a: "No. v1 is REST over HTTP and HTTPS, aimed at the request you want to fire without leaving the terminal. There is no mock server, no monitor and no team workspace.",
      },
    ],
    related: ["browser", "terminal"],
  },

  /* ──────────────────────────────────────────────────────────────────────── */
  {
    slug: "drawing",
    name: "Drawing projects",
    navLabel: "Drawing",
    icon: "pen",
    accent: "#f472b6",
    shortcut: { mac: "⌘ ⇧ X", other: "Ctrl ⇧ X" },
    badge: "New",
    tagline:
      "An Excalidraw canvas and a rich-text notes pane, saved as named projects, autosaved as you draw.",
    summary:
      "Sketch the architecture you are about to build without leaving the terminal. A project is a canvas and its notes together — both autosave, both are searchable, and there is no Save button to forget.",
    metaTitle: "Excalidraw drawing board with notes",
    metaDescription:
      "FigyTerm includes a drawing board: an Excalidraw canvas beside a rich-text notes pane, saved as named projects you can list, search, favourite, rename and duplicate. Autosaved, local, and no account.",
    keywords: [
      "terminal with excalidraw",
      "diagram tool developers",
      "sketch architecture diagram",
      "drawing with notes",
    ],
    heroShot: "drawing",
    highlights: [
      {
        icon: "pen",
        title: "A real canvas",
        body: "Excalidraw itself, with the toolset you already know. Boxes, arrows, the hand-drawn look, all of it.",
      },
      {
        icon: "document",
        title: "And what it is about",
        body: "A rich-text notes pane beside the canvas. Two views of one project — both always exist, both autosave independently.",
      },
      {
        icon: "folder",
        title: "Named projects",
        body: "List, search, favourite, rename, duplicate and delete. This is the one panel that owns its documents rather than borrowing yours.",
      },
    ],
    sections: [
      {
        heading: "Draw, Notes, or both",
        body: "A segmented control in the title bar chooses what you are looking at: the canvas, the notes, or the two side by side on a draggable split. `Both` is not a third document — the panes are keyed by project, so moving between views never reloads the canvas that was already on screen.",
        shot: "drawing",
        points: [
          { term: "Draw", detail: "The Excalidraw canvas." },
          { term: "Notes", detail: "A rich-text document — what the drawing is about." },
          { term: "Both", detail: "Side by side, on a split you can drag." },
        ],
      },
      {
        heading: "Projects, not files",
        body: "Unlike the editor and the browser, the drawing board owns what is in it. A project is a named drawing FigyTerm stores, lists, searches, favourites, renames and deletes — and duplicating or deleting one takes its notes with it, because they were never a separate thing. The rail marks a project whose notes have something in them, and the Notes tab carries a dot when you are looking at the canvas.",
        shot: "drawing-projects",
      },
      {
        heading: "Nothing to save",
        body: "Drawing is autosaved. There is no Save button, no unsaved-changes prompt, and nothing to lose if the machine goes down mid-sketch. Everything is stored locally — no account, no cloud, no share link you did not ask for.",
      },
    ],
    faqs: [
      {
        q: "Is this real Excalidraw?",
        a: "Yes — the Excalidraw canvas itself, embedded. The toolbar, the shapes and the feel are the ones you already know.",
      },
      {
        q: "Where are my drawings stored?",
        a: "Locally, on your machine. There is no account and no sync — a drawing project exists on the computer you drew it on.",
      },
      {
        q: "Can I export a drawing?",
        a: "Excalidraw's own export is there for getting a diagram into a document or an issue.",
      },
    ],
    related: ["code-editor", "claude-code"],
  },

  /* ──────────────────────────────────────────────────────────────────────── */
  {
    slug: "browser",
    name: "Embedded browser",
    navLabel: "Browser",
    icon: "globe",
    accent: "#22d3ee",
    shortcut: { mac: "⌘ ⇧ B", other: "Ctrl ⇧ B" },
    tagline:
      "A real native webview with tabs and an address bar, docked inside the terminal — not an iframe.",
    summary:
      "Documentation lives one shortcut away instead of one window away. Because it is a genuine child webview rather than an embedded frame, sites that refuse to be framed load normally.",
    metaTitle: "A browser docked inside the terminal",
    metaDescription:
      "FigyTerm's embedded browser is a native child webview with tabs, an address bar and back, forward and reload — so documentation sits beside the command instead of behind it. Real sites load, because it is not an iframe.",
    keywords: [
      "terminal with browser",
      "in-app browser terminal",
      "docs beside terminal",
      "native webview browser",
    ],
    heroShot: "browser",
    highlights: [
      {
        icon: "globe",
        title: "Not an iframe",
        body: "A genuine native child webview, so sites that set `X-Frame-Options` — which is most documentation worth reading — load normally.",
      },
      {
        icon: "tabs",
        title: "Tabs and an address bar",
        body: "Back, forward, reload, and as many tabs as you want. The parts of a browser you actually use while reading docs.",
      },
      {
        icon: "columns",
        title: "Beside the command",
        body: "Docked over the terminal, draggable and resizable, so the example and the shell you are pasting it into are on screen together.",
      },
    ],
    sections: [
      {
        heading: "Why it had to be a real webview",
        body: "An iframe would have been a tenth of the work and useless in practice: almost every documentation site sends headers that forbid framing, so the panel would have shown a blank box exactly when you needed it. FigyTerm embeds a native child webview instead, which is why real sites load.",
        shot: "browser",
      },
      {
        heading: "The Linux detour",
        body: "On Linux this needed work that is invisible when it succeeds. Tauri cannot position child webviews on GTK, so FigyTerm places the browser through a `gtk::Fixed` container of its own. The result is the same panel in the same place on all three platforms.",
      },
    ],
    faqs: [
      {
        q: "Is it a full browser?",
        a: "It is a native webview with tabs, an address bar and back, forward and reload. Bookmarks, extensions and profiles are not there — this is for reading documentation beside the command, not for replacing your browser.",
      },
      {
        q: "Will sites that block iframes work?",
        a: "Yes. It is a real child webview, not an iframe, so `X-Frame-Options` and frame-ancestors headers are not an obstacle.",
      },
      {
        q: "Does it share cookies with my main browser?",
        a: "No. It has its own webview storage, separate from Chrome, Safari or Firefox.",
      },
    ],
    related: ["api-client", "terminal"],
  },
];

export const featuresBySlug = new Map(features.map((f) => [f.slug, f]));

export function feature(slug: string): Feature | undefined {
  return featuresBySlug.get(slug);
}

export function featurePath(slug: string): string {
  return `/features/${slug}`;
}

export function featureUrl(slug: string): string {
  return `${site.url}/features/${slug}`;
}

/** Features to put in front of someone who has read this one. */
export function relatedFeatures(f: Feature): Feature[] {
  return f.related
    .map((slug) => featuresBySlug.get(slug))
    .filter((x): x is Feature => Boolean(x));
}
