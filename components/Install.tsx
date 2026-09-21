import { Icon } from "./Icon";
import { CopyCommand } from "./CopyCommand";
import { PlatformTabs } from "./PlatformTabs";
import { site } from "@/lib/site";

function Card({
  icon,
  title,
  badge,
  featured = false,
  children,
}: {
  icon: string;
  title: string;
  badge?: string;
  featured?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 ring-edge sm:p-8 ${
        featured
          ? "border border-brand/30 bg-panel/60"
          : "border border-edge bg-panel/40"
      }`}
    >
      {featured && (
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-20 size-56 rounded-full bg-brand/15 blur-3xl"
        />
      )}
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex size-9 items-center justify-center rounded-xl ${
            featured
              ? "bg-brand/15 text-brand-bright"
              : "bg-panel-2 text-fg-muted"
          }`}
        >
          <Icon name={icon} className="size-4.5" />
        </span>
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
          {badge && (
            <p
              className={`text-xs ${
                featured ? "text-brand-bright" : "text-fg-subtle"
              }`}
            >
              {badge}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

function Steps({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="mt-5 space-y-4">
      {items.map((step, i) => (
        <li key={i} className="flex gap-3.5">
          <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-edge bg-panel-2 font-mono text-[11px] text-fg-muted">
            {i + 1}
          </span>
          <span className="text-sm leading-relaxed text-fg-muted">{step}</span>
        </li>
      ))}
    </ol>
  );
}

function Note({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p className="mt-6 rounded-xl border border-edge bg-panel-2/60 p-4 text-xs leading-relaxed text-fg-subtle">
      <strong className="font-medium text-fg-muted">{label}</strong> {children}
    </p>
  );
}

const releasesLink = (
  <a
    href={site.releases}
    target="_blank"
    rel="noopener noreferrer"
    className="text-brand-bright underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
  >
    Releases
  </a>
);

function MacOsPanel() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card icon="terminal" title="Install script" badge="Recommended" featured>
        <p className="mt-5 text-sm leading-relaxed text-fg-muted">
          Detects whether you&apos;re on Apple Silicon or Intel, downloads the
          matching build and installs it to{" "}
          <code className="font-mono text-fg">/Applications</code>. No security
          dialog, no <code className="font-mono text-fg">xattr</code> step.
        </p>

        <CopyCommand command={site.installCommands.macos} className="mt-6" />

        <a
          href={`${site.repo}/blob/main/install.sh`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm text-fg-muted underline decoration-edge-strong underline-offset-4 transition-colors hover:text-fg"
        >
          Read the script first
          <Icon name="arrow-right" className="size-3.5" />
        </a>
        <p className="mt-3 text-xs leading-relaxed text-fg-subtle">
          You should read anything you pipe to a shell. This one touches a temp
          directory and <code className="font-mono">FigyTerm.app</code>, nothing
          else.
        </p>
      </Card>

      <Card icon="download" title="Download the .dmg" badge="Manual install">
        <Steps
          items={[
            <>
              Grab the build for your Mac from {releasesLink} —{" "}
              <code className="font-mono text-fg">aarch64</code> for Apple
              Silicon, <code className="font-mono text-fg">x64</code> for Intel.
            </>,
            <>
              Open the <code className="font-mono text-fg">.dmg</code> and drag{" "}
              <strong className="font-medium text-fg">FigyTerm</strong> into{" "}
              <strong className="font-medium text-fg">Applications</strong>.
            </>,
            <>
              Clear the quarantine flag macOS added during the download:
              <code className="mt-2 block overflow-x-auto rounded-lg border border-edge bg-canvas px-3 py-2 font-mono text-[12px] text-term-green">
                xattr -cr /Applications/FigyTerm.app
              </code>
            </>,
            <>Launch FigyTerm.</>,
          ]}
        />

        <Note label="Why step 3?">
          FigyTerm isn&apos;t signed with a paid Apple Developer ID, so macOS
          quarantines browser downloads and reports the app as
          &ldquo;damaged&rdquo;. Quarantine is set by the downloading app —
          browsers set it, <code className="font-mono">curl</code>{" "}
          doesn&apos;t. That&apos;s why the script skips this entirely, and why
          in-app updates are never quarantined.
        </Note>
      </Card>
    </div>
  );
}

function LinuxPanel() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card icon="terminal" title="AppImage" badge="Recommended" featured>
        <p className="mt-5 text-sm leading-relaxed text-fg-muted">
          Runs on any distro, needs no root, and it&apos;s the only Linux format
          the built-in updater can replace in place. Installs to{" "}
          <code className="font-mono text-fg">~/.local/bin</code> with a desktop
          entry.
        </p>

        <CopyCommand command={site.installCommands.linux} className="mt-6" />

        <a
          href={`${site.repo}/blob/main/install-linux.sh`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm text-fg-muted underline decoration-edge-strong underline-offset-4 transition-colors hover:text-fg"
        >
          Read the script first
          <Icon name="arrow-right" className="size-3.5" />
        </a>
        <p className="mt-3 text-xs leading-relaxed text-fg-subtle">
          Or do it by hand: <code className="font-mono">chmod +x</code> the
          AppImage from {releasesLink} and run it. Nothing else is needed.
        </p>
      </Card>

      <Card icon="download" title="Distro packages" badge="apt & dnf">
        <p className="mt-5 text-sm leading-relaxed text-fg-muted">
          If you&apos;d rather your package manager stayed in charge, take a{" "}
          <code className="font-mono text-fg">.deb</code> or{" "}
          <code className="font-mono text-fg">.rpm</code> from {releasesLink}.
        </p>

        <pre className="mt-5 overflow-x-auto rounded-xl border border-edge bg-canvas p-4 font-mono text-[12.5px] leading-relaxed text-fg-muted">
          <code>
            <span className="text-term-green">sudo</span> apt install
            ./FigyTerm_*_amd64.deb{"\n"}
            <span className="text-term-green">sudo</span> dnf install
            ./FigyTerm-*.x86_64.rpm
          </code>
        </pre>

        <Note label="One difference:">
          a <code className="font-mono">.deb</code> or{" "}
          <code className="font-mono">.rpm</code> install belongs to{" "}
          <code className="font-mono">apt</code>/<code className="font-mono">dnf</code>,
          so FigyTerm won&apos;t rewrite files it doesn&apos;t own — it tells you
          a new version exists and leaves the install to you. The AppImage is the
          one that updates itself.
        </Note>

        <Note label="Blank window?">
          Some Nvidia and older Mesa drivers can&apos;t render WebKitGTK&apos;s
          DMA-BUF path. Start it with{" "}
          <code className="font-mono">WEBKIT_DISABLE_DMABUF_RENDERER=1</code>.
        </Note>
      </Card>
    </div>
  );
}

function WindowsPanel() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card icon="download" title="Installer" badge="Recommended" featured>
        <p className="mt-5 text-sm leading-relaxed text-fg-muted">
          Download{" "}
          <code className="font-mono text-fg">FigyTerm_*_x64-setup.exe</code>{" "}
          from {releasesLink} and run it. It installs for the current user under{" "}
          <code className="font-mono text-fg">%LOCALAPPDATA%</code>, needs no
          administrator rights, and updates itself from then on.
        </p>

        <a
          href={site.releases}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-bright"
        >
          <Icon name="download" className="size-4" />
          Get the installer
        </a>

        <Note label="&ldquo;Windows protected your PC&rdquo;">
          Expected, and it means one thing: the installer isn&apos;t
          code-signed. Click <strong className="font-medium text-fg-muted">More info</strong>,
          then <strong className="font-medium text-fg-muted">Run anyway</strong>.
          Unlike macOS there&apos;s no flag to clear and no{" "}
          <code className="font-mono">curl</code> loophole — SmartScreen builds
          reputation per binary as downloads accumulate.
        </Note>
      </Card>

      <Card icon="shield" title="MSI" badge="Managed deployment">
        <p className="mt-5 text-sm leading-relaxed text-fg-muted">
          <code className="font-mono text-fg">FigyTerm_*_x64_en-US.msi</code> is
          published for Group Policy or Intune. It installs per-machine and{" "}
          <strong className="font-medium text-fg">does not self-update</strong> —
          a managed install stays managed by whatever pushed it.
        </p>

        <Note label="Which shell?">
          PowerShell 7 (<code className="font-mono">pwsh</code>) if it&apos;s on
          your <code className="font-mono">PATH</code>, otherwise Windows
          PowerShell, otherwise <code className="font-mono">cmd.exe</code>.
          Command history comes from PSReadLine, so{" "}
          <code className="font-mono">cmd</code> sessions have none — that&apos;s
          a cmd limitation, not a FigyTerm one.
        </Note>

        <Note label="Requirements:">
          Windows 10 1809 or later, which is where ConPTY arrives. x64 only for
          now — Windows on ARM isn&apos;t built yet.
        </Note>
      </Card>
    </div>
  );
}

export function InstallGuide() {
  return (
    <>
      <PlatformTabs
        panels={{
          macos: <MacOsPanel />,
          linux: <LinuxPanel />,
          windows: <WindowsPanel />,
        }}
      />

      {/* Build from source */}
      <div className="mt-5 rounded-2xl border border-edge bg-panel/40 p-6 ring-edge sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <h3 className="text-[15px] font-semibold tracking-tight">
              Or build it yourself
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              Needs Node 18+, Rust 1.86+ and the Tauri CLI, plus your
              platform&apos;s toolchain — Xcode Command Line Tools on macOS, the
              WebKitGTK dev packages on Linux, or MSVC build tools on Windows.
            </p>
          </div>
          <pre className="overflow-x-auto rounded-xl border border-edge bg-canvas p-4 font-mono text-[12.5px] leading-relaxed text-fg-muted">
            <code>
              <span className="text-term-green">git</span> clone {site.repo}.git
              {"\n"}
              <span className="text-term-green">cd</span> figyterm{"\n"}
              <span className="text-term-green">npm</span> install{"\n"}
              <span className="text-term-green">npm</span> run tauri build
            </code>
          </pre>
        </div>
      </div>
    </>
  );
}
