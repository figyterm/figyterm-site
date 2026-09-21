import Image from "next/image";
import { Icon } from "./Icon";
import { shot as lookup, type Screenshot as Shot } from "@/lib/screenshots";

/**
 * A screenshot in window chrome — or, until the capture exists, a placeholder
 * of exactly the same shape.
 *
 * The placeholder is deliberate rather than apologetic: it holds the layout at
 * the real aspect ratio, so dropping the PNG in later moves nothing, and it
 * prints the path to drop it at. Flip `ready` in `lib/screenshots.ts` and the
 * image appears — nothing else has to change.
 */
export function Screenshot({
  id,
  priority = false,
  sizes = "(min-width: 1024px) 720px, 100vw",
  title,
  className = "",
}: {
  id: string;
  priority?: boolean;
  sizes?: string;
  /** Text in the title bar. Defaults to the app name. */
  title?: string;
  className?: string;
}) {
  const shot = lookup(id);

  return (
    <figure className={`group/shot ${className}`}>
      <div className="overflow-hidden rounded-xl border border-edge bg-panel shadow-2xl shadow-black/50 ring-edge">
        <div className="flex items-center gap-2 border-b border-edge/70 px-3 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="ml-1.5 truncate text-[11px] font-medium text-fg-subtle">
            {title ?? `FigyTerm — ${shot.label}`}
          </span>
        </div>

        {shot.ready ? (
          <Image
            src={`/screenshots/${shot.file}`}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            sizes={sizes}
            priority={priority}
            className="h-auto w-full"
          />
        ) : (
          <Placeholder shot={shot} />
        )}
      </div>
    </figure>
  );
}

/**
 * Holds the frame at the capture's aspect ratio so the page does not reflow
 * when the real file lands, and says what is meant to go here.
 */
function Placeholder({ shot }: { shot: Shot }) {
  return (
    <div
      className="relative flex flex-col items-center justify-center gap-3 bg-panel-2 bg-grid px-6 py-10 text-center"
      style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
      role="img"
      aria-label={`Screenshot pending: ${shot.alt}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(99,102,241,0.12),transparent_70%)]"
      />
      <span className="relative inline-flex size-11 items-center justify-center rounded-xl border border-edge bg-panel text-fg-subtle">
        <Icon name="image" className="size-5" />
      </span>
      <div className="relative">
        <p className="text-sm font-medium text-fg-muted">{shot.label}</p>
        <p className="mx-auto mt-1.5 max-w-sm text-xs leading-relaxed text-fg-subtle">
          {shot.alt}
        </p>
      </div>
      <code className="relative rounded-md border border-edge bg-canvas px-2.5 py-1.5 font-mono text-[11px] text-fg-subtle">
        public/screenshots/{shot.file}
      </code>
    </div>
  );
}

/**
 * The same frame, sized for a grid cell: no caption, no drop path, just enough
 * to read as "a screenshot goes here" at a glance.
 */
export function ScreenshotThumb({
  id,
  sizes = "(min-width: 768px) 380px, 100vw",
}: {
  id: string;
  sizes?: string;
}) {
  const shot = lookup(id);

  if (!shot.ready) {
    return (
      <div
        className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-edge-strong bg-panel-2 text-fg-subtle"
        style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
        role="img"
        aria-label={`Screenshot pending: ${shot.alt}`}
      >
        <Icon name="image" className="size-4" />
        <span className="text-[11px]">{shot.label}</span>
      </div>
    );
  }

  return (
    <Image
      src={`/screenshots/${shot.file}`}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      sizes={sizes}
      className="h-auto w-full rounded-lg border border-edge"
    />
  );
}
