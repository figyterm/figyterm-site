/**
 * Content that isn't tied to a single feature page: the spec catalogue, the
 * shortcut tables, the Fig comparison and the general FAQ.
 *
 * Per-feature FAQs live beside their feature in `lib/features.ts` and are
 * merged into the FAQ page from there, so a feature brings its own questions.
 */

export const specs = [
  { command: "git", coverage: "Subcommands, branches, options" },
  { command: "docker", coverage: "Commands, containers, images, options" },
  { command: "docker compose", coverage: "Services, commands, options" },
  { command: "npm", coverage: "Scripts, packages, options" },
  { command: "pnpm", coverage: "Scripts, workspaces, options" },
  { command: "yarn", coverage: "Scripts, packages, options" },
  { command: "uv", coverage: "Scripts from pyproject.toml, options" },
  { command: "cd", coverage: "Directories, recent-first ordering" },
] as const;

/**
 * Two spellings per shortcut, because the platforms genuinely differ.
 *
 * macOS gives the app ⌘ and leaves Ctrl to the shell. Linux and Windows have no
 * ⌘, and a bare Ctrl+key already belongs to the shell — Ctrl+C interrupts,
 * Ctrl+D is EOF, Ctrl+R is reverse-search — so the app takes Ctrl+Shift there,
 * exactly as GNOME Terminal, Konsole and Windows Terminal do. Two pairs would
 * otherwise collide, and those fall back to Ctrl+Alt.
 *
 * The code editor is the exception, and deliberately so: no shell has focus
 * inside it, so the conventional editor chords — plain Ctrl+S, Ctrl+P, Ctrl+F —
 * are free to mean what they mean everywhere else.
 */
export const shortcutGroups = [
  {
    group: "Tabs & panes",
    items: [
      { mac: "⌘ T", other: "Ctrl ⇧ T", action: "New tab" },
      { mac: "⌘ ⇧ T", other: "Ctrl ⌥ T", action: "New tab in same directory" },
      { mac: "⌘ ⇧ W", other: "Ctrl ⇧ W", action: "Close active pane" },
      { mac: "⌘ D", other: "Ctrl ⇧ D", action: "Split horizontally" },
      { mac: "⌘ ⇧ D", other: "Ctrl ⌥ D", action: "Split vertically" },
      { mac: "⌘ 1-9", other: "Ctrl 1-9", action: "Switch to tab N" },
      { mac: "⌘ ⇧ [", other: "Ctrl ⇧ [", action: "Previous tab" },
      { mac: "⌘ ⇧ ]", other: "Ctrl ⇧ ]", action: "Next tab" },
      { mac: "⌘ Tab", other: "Ctrl Tab", action: "Cycle tabs" },
    ],
  },
  {
    group: "Panels",
    items: [
      { mac: "⌘ ⇧ E", other: "Ctrl ⇧ E", action: "Code editor" },
      { mac: "⌘ ⇧ B", other: "Ctrl ⇧ B", action: "Browser" },
      { mac: "⌘ ⇧ A", other: "Ctrl ⇧ A", action: "Claude Code" },
      { mac: "⌘ ⇧ H", other: "Ctrl ⇧ H", action: "API client" },
      { mac: "⌘ ⇧ X", other: "Ctrl ⇧ X", action: "Drawing" },
      { mac: "⌘ ⇧ M", other: "Ctrl ⇧ M", action: "System monitor" },
      { mac: "⌘ ⇧ P", other: "Ctrl ⇧ P", action: "Command palette" },
      { mac: "⌘ ⇧ L", other: "Ctrl ⇧ L", action: "Toggle light / dark" },
      { mac: "⌘ ,", other: "Ctrl ,", action: "Settings" },
    ],
  },
  {
    group: "Search & shell",
    items: [
      { mac: "⌘ F", other: "Ctrl ⇧ F", action: "Find in terminal" },
      { mac: "⌘ R", other: "Ctrl ⇧ R", action: "Search command history" },
      { mac: "⌘ K", other: "Ctrl ⇧ K", action: "Clear terminal" },
      { mac: "⌘ C", other: "Ctrl ⇧ C", action: "Copy selection" },
      { mac: "⌘ V", other: "Ctrl ⇧ V", action: "Paste" },
      { mac: "⌃ C", other: "Ctrl C", action: "Interrupt — always the shell's" },
      { mac: "⌃ D", other: "Ctrl D", action: "EOF — always the shell's" },
      { mac: "⌃ R", other: "Ctrl R", action: "Reverse search — always the shell's" },
    ],
  },
  {
    group: "Autocomplete",
    items: [
      { mac: "Tab", other: "Tab", action: "Accept suggestion" },
      { mac: "↑ ↓", other: "↑ ↓", action: "Navigate suggestions" },
      { mac: "Esc", other: "Esc", action: "Dismiss suggestions" },
    ],
  },
  {
    group: "Code editor",
    items: [
      { mac: "⌘ S", other: "Ctrl S", action: "Save" },
      { mac: "⌥ ⌘ S", other: "Ctrl ⌥ S", action: "Save all" },
      { mac: "⌘ P", other: "Ctrl P", action: "Go to file" },
      { mac: "⌘ F", other: "Ctrl F", action: "Find in file" },
      { mac: "⌥ ⌘ F", other: "Ctrl H", action: "Find and replace" },
      { mac: "⌘ ⇧ F", other: "Ctrl ⇧ F", action: "Search in folder" },
      { mac: "⌘ G", other: "Ctrl G", action: "Go to line" },
      { mac: "⌘ B", other: "Ctrl B", action: "Toggle file tree" },
      { mac: "⌘ /", other: "Ctrl /", action: "Toggle comment" },
      { mac: "⌘ D", other: "Ctrl D", action: "Select next occurrence" },
      { mac: "⌘ W", other: "Ctrl W", action: "Close file tab" },
      { mac: "⌘ 1-9", other: "Ctrl 1-9", action: "Nth file tab" },
    ],
  },
  {
    group: "Code intelligence",
    items: [
      { mac: "F12", other: "F12", action: "Go to definition" },
      { mac: "⌥ ⌘ ↓", other: "F12", action: "Go to definition (alternate)" },
      { mac: "⌘ .", other: "Ctrl .", action: "Quick fix" },
    ],
  },
] as const;

export type ComparisonRow = {
  feature: string;
  figyterm: string | true | false;
  fig: string | true | false;
  builtin: string | true | false;
};

export const comparison: ComparisonRow[] = [
  { feature: "Platforms", figyterm: "macOS, Linux, Windows", fig: "macOS", builtin: "macOS" },
  { feature: "IDE-style autocomplete", figyterm: true, fig: "Discontinued", builtin: false },
  { feature: "Works fully offline", figyterm: true, fig: false, builtin: true },
  { feature: "Account required", figyterm: "Never", fig: "Yes", builtin: "Never" },
  { feature: "Fig-format command specs", figyterm: true, fig: true, builtin: false },
  { feature: "Split panes", figyterm: "Up to 4 per tab", fig: "—", builtin: true },
  { feature: "Built-in code editor", figyterm: true, fig: false, builtin: false },
  { feature: "Git staging & diff viewer", figyterm: true, fig: false, builtin: false },
  { feature: "Language server support", figyterm: "Opt-in", fig: false, builtin: false },
  { feature: "Embedded browser", figyterm: true, fig: false, builtin: false },
  { feature: "REST API client", figyterm: true, fig: false, builtin: false },
  { feature: "Claude Code window", figyterm: true, fig: false, builtin: false },
  { feature: "Drawing board with notes", figyterm: true, fig: false, builtin: false },
  { feature: "Command history fuzzy search", figyterm: true, fig: true, builtin: false },
  { feature: "Live system monitor", figyterm: true, fig: false, builtin: false },
  { feature: "Oh My Zsh theme picker", figyterm: "zsh platforms", fig: false, builtin: false },
  { feature: "Open source", figyterm: "MIT", fig: false, builtin: false },
  { feature: "Price", figyterm: "Free", fig: "Shut down", builtin: "Free" },
];

/** General questions. Feature-specific ones live with their feature. */
export const faqs = [
  {
    q: "What is FigyTerm?",
    a: "FigyTerm is a free, open-source terminal for macOS, Linux and Windows that brings IDE-level autocomplete to the command line — and then the rest of the workbench: a code editor with git and language servers, a REST API client, a Claude Code window, a drawing board and an embedded browser. It is built with Tauri 2, Rust and React, and runs entirely on your machine.",
  },
  {
    q: "Is FigyTerm a good Fig alternative?",
    a: "Yes. Fig was acquired by AWS and its standalone autocomplete was discontinued, leaving a gap FigyTerm fills. FigyTerm reads the same spec format Fig used, so community command completions work here, and it does it without an account, a login or a network connection.",
  },
  {
    q: "Does FigyTerm send my commands anywhere?",
    a: "No. There is no telemetry, no analytics and no account system. Autocomplete is computed locally by the Rust backend, so your commands, paths and history never leave your machine. The only network request the app makes on its own is checking GitHub Releases for an update.",
  },
  {
    q: "Which platforms are supported?",
    a: "macOS on Apple Silicon (aarch64) and Intel (x64), Linux on x86_64, and Windows on x64. macOS ships a .dmg, Linux ships an AppImage plus .deb and .rpm packages, and Windows ships an NSIS installer plus an .msi for managed deployment. Windows on ARM and Linux on aarch64 aren't built yet.",
  },
  {
    q: "Do all the features work on every platform?",
    a: "Almost. Autocomplete, panes, tabs, history search, the system monitor, the command palette, the embedded browser, the code editor, the API client, the Claude Code window and the drawing board work everywhere. The one exception is the Oh My Zsh theme picker, which reads ~/.zshrc and so only applies where zsh does — macOS and Linux. On Windows the equivalent would be Oh My Posh, which FigyTerm doesn't manage yet.",
  },
  {
    q: "Does all of this make it slow to start?",
    a: "No, because none of it loads at launch. The editor, browser, API client, Claude window and drawing board are each loaded the first time you open them, so a session that only uses the terminal pays for the terminal. The base app is a Tauri 2 binary of around ten megabytes with a Rust PTY behind it.",
  },
  {
    q: "Which Linux package should I pick?",
    a: "The AppImage, unless you specifically want your package manager in charge. It runs on any distro, needs no root, and it's the only Linux format FigyTerm's updater can replace in place. A .deb or .rpm install belongs to apt or dnf, so FigyTerm will tell you when a new version exists but leave installing it to you.",
  },
  {
    q: "Why does Windows say “Windows protected your PC”?",
    a: "Because the installer isn't code-signed. Click More info, then Run anyway. Unlike macOS there's no flag to clear and no curl workaround — SmartScreen builds reputation per binary as downloads accumulate, and only an expensive EV certificate grants it up front.",
  },
  {
    q: "Why does macOS say the app is damaged?",
    a: "FigyTerm is not code-signed with a paid Apple Developer ID, so macOS quarantines it when a browser downloads it. Run xattr -cr /Applications/FigyTerm.app once and it opens normally. The install script avoids this entirely, because curl never sets the quarantine flag.",
  },
  {
    q: "Do I need Oh My Zsh or a special shell?",
    a: "No. On macOS and Linux FigyTerm launches whatever your $SHELL points to — zsh, bash and fish all work out of the box. On Windows it prefers PowerShell 7, then Windows PowerShell, then cmd.exe. Oh My Zsh is optional and only unlocks the live theme picker in Settings.",
  },
  {
    q: "How do updates work?",
    a: "FigyTerm updates itself. The built-in Tauri updater checks GitHub Releases and installs new versions in one click, so you only ever install manually once. The exceptions are the packages meant to be managed by something else — a Linux .deb or .rpm and the Windows .msi — where FigyTerm reports the new version and leaves the install to whatever put it there.",
  },
  {
    q: "What does it cost?",
    a: "Nothing, and there is no paid tier to upgrade to. FigyTerm is MIT licensed and developed in public.",
  },
] as const;

/** Where each promise on the home page is actually kept. */
export const trustPoints = [
  {
    icon: "shield",
    title: "No telemetry, no analytics",
    body: "Nothing measures you. There is no event pipeline to opt out of, because there is no event pipeline.",
  },
  {
    icon: "user",
    title: "No account, ever",
    body: "Nothing to sign up for and nothing to sign in to. The app has no concept of a user.",
  },
  {
    icon: "wifi",
    title: "Offline by design",
    body: "Completions, indexes, history and collections are computed and stored locally. The one request the app makes on its own is an update check.",
  },
  {
    icon: "github",
    title: "Auditable",
    body: "MIT licensed, with the design notes for every major panel committed alongside the code.",
  },
] as const;
