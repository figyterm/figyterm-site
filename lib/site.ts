export const site = {
  name: "FigyTerm",
  /*
   * The home page <title>, and the hardest-working string on the site.
   *
   * It leads on "Fig alternative" rather than on the product's own phrasing
   * because of a name collision that costs real traffic: "FigyTerm" is one
   * letter from `figterm`, Fig's own shell shim, so search engines and LLMs
   * asked about FigyTerm reliably answer about the discontinued Fig instead.
   * Naming the category in the title is what separates the two.
   *
   * Kept under ~60 characters with the brand first, so it survives Google's
   * truncation intact.
   */
  tagline: "Open-source Fig alternative with IDE autocomplete",
  /**
   * The meta description. Deliberately ~160 characters — past that Google
   * truncates, and the tail is wasted. The full pitch lives in
   * `longDescription`, where structured data has no such limit.
   */
  description:
    "The free, open-source Fig alternative: a cross-platform terminal with IDE-level autocomplete. Fig-compatible specs, fully local, no account. macOS, Linux, Windows.",
  longDescription:
    "FigyTerm is a free, open-source terminal for macOS, Linux and Windows with IDE-level autocomplete, a built-in code editor with git and language servers, an API client, a Claude Code window, a drawing board and an embedded browser — all fully local. It reads Fig's completion spec format, making it a direct alternative to Fig, whose standalone autocomplete was discontinued after the AWS acquisition.",
  shortDescription:
    "A free, open-source terminal for macOS, Linux and Windows with IDE-level autocomplete and a built-in editor, API client and Claude Code window.",
  /**
   * The statement that exists purely to break the `FigyTerm` / `figterm`
   * confusion. Emitted as `disambiguatingDescription` in the structured data,
   * where schema.org defines it for exactly this job, and stated in prose on
   * /fig-alternative so a crawler finds it in both forms.
   */
  disambiguation:
    "FigyTerm is an independent open-source project and is not Fig, figterm, or Amazon Q Developer CLI. Fig was acquired by AWS in 2023 and its standalone autocomplete app was sunset on 1 September 2024. FigyTerm is unaffiliated with Fig or Amazon Web Services, and reads the same completion spec format Fig used.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://figyterm.code4mk.org",
  repo: "https://github.com/code4mk/figyterm",
  releases: "https://github.com/code4mk/figyterm/releases",
  docs: "https://github.com/code4mk/figyterm/tree/main/docs",
  issues: "https://github.com/code4mk/figyterm/issues",
  author: "code4mk",
  authorUrl: "https://code4mk.org",
  license: "MIT",
  /** Per-platform one-liners. Windows installs from the .exe, so it has none. */
  installCommands: {
    macos:
      "curl -fsSL https://raw.githubusercontent.com/code4mk/figyterm/main/install.sh | sh",
    linux:
      "curl -fsSL https://raw.githubusercontent.com/code4mk/figyterm/main/install-linux.sh | sh",
  },
  /*
   * Ordered by intent, not by volume. The first block is the name-collision
   * cluster — the searches where FigyTerm currently loses to Fig itself — and
   * the misspellings people actually type when they half-remember the name.
   */
  keywords: [
    "figyterm",
    "figy term",
    "fig alternative",
    "fig successor",
    "fig terminal alternative",
    "open source fig replacement",
    "fig autocomplete alternative",
    "terminal with fig-style autocomplete",
    "fig compatible completion specs",
    "figterm alternative",
    "fig shut down alternative",
    "what replaced fig terminal",
    "amazon q developer cli alternative",
    "fig.io alternative",
    "best macOS terminal",
    "macOS terminal app",
    "linux terminal autocomplete",
    "windows terminal autocomplete",
    "cross-platform terminal",
    "terminal autocomplete",
    "zsh autocomplete",
    "mac terminal replacement",
    "open source terminal",
    "iTerm2 alternative",
    "warp terminal alternative",
    "terminal with IDE autocomplete",
    "tauri terminal",
    "rust terminal emulator",
    "oh my zsh themes",
    "split pane terminal mac",
    "powershell autocomplete",
    "appimage terminal",
    "terminal with built-in code editor",
    "terminal markdown preview",
    "terminal api client",
    "postman alternative",
    "claude code terminal",
    "terminal with excalidraw",

    /* Competitor-alternative cluster. High intent: whoever types one of these
       has already decided to switch and is choosing what to switch to. */
    "open source warp alternative",
    "warp terminal free alternative",
    "iterm2 alternative linux",
    "iterm2 alternative windows",
    "hyper terminal alternative",
    "tabby terminal alternative",
    "kitty terminal alternative",
    "alacritty alternative with autocomplete",
    "windows terminal alternative",
    "best terminal emulator 2026",
    "modern terminal emulator",

    /* API client cluster. "postman" itself is a navigational brand query and
       unwinnable; everything below is the same person one modifier later. */
    "postman alternative offline",
    "postman alternative open source",
    "lightweight postman alternative",
    "insomnia alternative",
    "bruno api client alternative",
    "api client without account",
    "offline rest client",
    "rest client desktop app",
    "http client for developers",

    /* Panel-specific long tail — one cluster per feature page. */
    "claude code gui",
    "claude code window",
    "ai agent in terminal",
    "terminal with git client",
    "git diff viewer app",
    "terminal with language server",
    "lsp in terminal editor",
    "excalidraw desktop app",
    "diagram tool for developers",
    "terminal with embedded browser",
    "fuzzy command history search",
    "terminal system monitor",

    /* Problem-shaped queries — how people describe the need before they know
       the product category. */
    "how to get autocomplete in terminal",
    "terminal that suggests commands",
    "edit files without leaving terminal",
    "terminal with everything built in",
    "private terminal no telemetry",
    "terminal with no account required",
    "edit files in terminal",
  ],
} as const;

/**
 * Every page on the site, in one place.
 *
 * `sitemap.ts` and the footer both read this, so a new route cannot be added
 * to the navigation and forgotten by search engines — or the other way round.
 * Feature detail pages are generated from `lib/features.ts` instead, since
 * their slugs already live there.
 */
export const routes = [
  { href: "/", label: "Home", priority: 1, changeFrequency: "weekly" },
  { href: "/features", label: "Features", priority: 0.9, changeFrequency: "weekly" },
  { href: "/download", label: "Download", priority: 0.9, changeFrequency: "weekly" },
  { href: "/fig-alternative", label: "vs Fig", priority: 0.8, changeFrequency: "monthly" },
  { href: "/shortcuts", label: "Shortcuts", priority: 0.7, changeFrequency: "monthly" },
  { href: "/specs", label: "Command specs", priority: 0.7, changeFrequency: "monthly" },
  { href: "/faq", label: "FAQ", priority: 0.7, changeFrequency: "monthly" },
  { href: "/privacy", label: "Privacy", priority: 0.5, changeFrequency: "yearly" },
] as const;

/** Top-level navigation. `Features` opens the mega menu built from the catalogue. */
export const navLinks: { href: string; label: string; menu?: boolean }[] = [
  { href: "/features", label: "Features", menu: true },
  { href: "/download", label: "Download" },
  { href: "/fig-alternative", label: "vs Fig" },
  { href: "/shortcuts", label: "Shortcuts" },
  { href: "/faq", label: "FAQ" },
];

export type FooterLink = { href: string; label: string; external?: boolean };

export const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "All features" },
      { href: "/download", label: "Download" },
      { href: "/shortcuts", label: "Keyboard shortcuts" },
      { href: "/specs", label: "Command specs" },
      { href: "/fig-alternative", label: "FigyTerm vs Fig" },
    ],
  },
  {
    title: "Project",
    links: [
      { href: site.repo, label: "GitHub repository", external: true },
      { href: site.releases, label: "Releases & changelog", external: true },
      { href: `${site.repo}/blob/main/docs/CONTRIBUTING.md`, label: "Contributing", external: true },
      { href: site.issues, label: "Report an issue", external: true },
      { href: `${site.repo}/blob/main/LICENSE`, label: "MIT licence", external: true },
    ],
  },
  {
    title: "Documentation",
    links: [
      { href: `${site.repo}/blob/main/docs/INSTALLATION.md`, label: "Installation guide", external: true },
      { href: `${site.repo}/blob/main/docs/SPECS.md`, label: "Spec authoring guide", external: true },
      { href: `${site.repo}/blob/main/docs/CODE-EDITOR.md`, label: "Editor design notes", external: true },
      { href: `${site.repo}/blob/main/docs/LSP.md`, label: "Language server notes", external: true },
      { href: "/faq", label: "FAQ" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export const stats = [
  { value: "100%", label: "Local — nothing leaves your machine" },
  { value: "6", label: "Tools in one window" },
  { value: "0", label: "Trackers, accounts or sign-ups" },
  { value: "3", label: "Platforms — macOS, Linux, Windows" },
] as const;

export const pillars = [
  {
    icon: "shield",
    title: "Local by default",
    body: "Completions, indexes, history and collections are computed and kept on your machine. No accounts, no telemetry, no analytics — the only request FigyTerm makes on its own is an update check against GitHub Releases.",
  },
  {
    icon: "zap",
    title: "Native, not a web app",
    body: "A Tauri 2 shell with a real PTY behind it. Input has no perceptible latency, memory stays measured in tens of megabytes, and every heavy panel loads the first time you open it — never at launch.",
  },
  {
    icon: "github",
    title: "Open source, forever",
    body: "MIT licensed and developed in public, design notes and all. Read the code that runs your shell, file an issue, or ship a completion spec for your own CLI in a single pull request.",
  },
] as const;
