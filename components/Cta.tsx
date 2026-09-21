import { LinkButton } from "./Button";
import { CopyCommand } from "./CopyCommand";
import { site } from "@/lib/site";

export function Cta({
  title,
  body,
}: {
  title?: React.ReactNode;
  body?: React.ReactNode;
} = {}) {
  return (
    <section className="relative overflow-hidden border-t border-edge py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(70%_70%_at_50%_100%,black,transparent)]" />
        <div className="absolute bottom-[-16rem] left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[130px]" />
      </div>
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title ?? (
              <>
                Give your terminal its{" "}
                <span className="text-gradient">whole workbench</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            {body ??
              `Free, ${site.license} licensed, and entirely local. On macOS one command does it; Linux and Windows are one download away.`}
          </p>

          <CopyCommand
            command={site.installCommands.macos}
            className="mx-auto mt-8 max-w-xl"
          />

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton href="/download" icon="download" full>
              All downloads
            </LinkButton>
            <LinkButton href={site.repo} variant="secondary" icon="github" external full>
              Browse the source
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
