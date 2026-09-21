import { Icon } from "./Icon";
import { shortcutGroups } from "@/lib/content";

function Keys({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="whitespace-nowrap rounded-md border border-edge bg-panel-2 px-2 py-1 font-mono text-[11px] text-fg">
      {children}
    </kbd>
  );
}

/** The legend the two columns need, stated once rather than per card. */
export function ShortcutLegend() {
  return (
    <div className="mx-auto flex max-w-md items-center justify-center gap-6 text-xs text-fg-subtle">
      <span className="inline-flex items-center gap-1.5">
        <Icon name="apple" className="size-3.5" />
        macOS
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Icon name="linux" className="size-3.5" />
        <Icon name="windows" className="size-3" />
        Linux &amp; Windows
      </span>
    </div>
  );
}

export function ShortcutTables({
  columns = "lg:grid-cols-3",
}: {
  columns?: string;
}) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${columns}`}>
      {shortcutGroups.map((group) => (
        <div
          key={group.group}
          className="rounded-2xl border border-edge bg-panel/50 p-5 ring-edge"
        >
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-subtle">
            {group.group}
          </h3>
          <dl className="mt-4 space-y-0.5">
            {group.items.map((item) => (
              <div
                key={item.action}
                className="rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.03]"
              >
                <dt className="text-sm text-fg-muted">{item.action}</dt>
                <dd className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <Keys>{item.mac}</Keys>
                  {/* Only show the second spelling when it differs — Tab is
                      Tab everywhere, and repeating it is just noise. */}
                  {item.other !== item.mac && (
                    <>
                      <span aria-hidden="true" className="text-fg-subtle">
                        /
                      </span>
                      <Keys>{item.other}</Keys>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

export function ShortcutRationale() {
  return (
    <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-fg-subtle">
      Why <code className="font-mono text-fg-muted">Ctrl ⇧</code> off macOS?
      Because a bare <code className="font-mono text-fg-muted">Ctrl</code>+key
      already belongs to the shell —{" "}
      <code className="font-mono text-fg-muted">Ctrl C</code> interrupts,{" "}
      <code className="font-mono text-fg-muted">Ctrl D</code> is EOF,{" "}
      <code className="font-mono text-fg-muted">Ctrl R</code> is reverse-search.
      Taking those would break the terminal to decorate the app around it, so
      FigyTerm does what GNOME Terminal, Konsole and Windows Terminal do. The
      code editor is the exception: no shell has focus inside it, so the usual
      editor chords are free to mean what they mean everywhere else.
    </p>
  );
}
