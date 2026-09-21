import { Icon } from "./Icon";
import { pillars } from "@/lib/site";

export function Pillars() {
  return (
    <section aria-label="Why FigyTerm" className="border-t border-edge py-20">
      <div className="container-page grid gap-10 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div key={pillar.title}>
            <span className="inline-flex size-10 items-center justify-center rounded-xl border border-edge bg-panel-2 text-brand-bright">
              <Icon name={pillar.icon} className="size-5" />
            </span>
            <h2 className="mt-5 text-lg font-semibold tracking-tight">
              {pillar.title}
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
              {pillar.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
