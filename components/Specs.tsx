import { Icon } from "./Icon";
import { specs } from "@/lib/content";

export function SpecsTable() {
  return (
    <ul className="divide-y divide-edge overflow-hidden rounded-2xl border border-edge bg-panel/50 ring-edge">
      {specs.map((spec) => (
        <li
          key={spec.command}
          className="flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-panel sm:flex-row sm:items-center sm:justify-between sm:gap-6"
        >
          <code className="font-mono text-sm font-medium text-brand-bright">
            {spec.command}
          </code>
          <span className="text-sm text-fg-muted sm:text-right">
            {spec.coverage}
          </span>
        </li>
      ))}
      <li className="flex items-center gap-2 px-5 py-4 text-sm text-fg-subtle">
        <Icon name="puzzle" className="size-4" />
        Plus filesystem paths, shell built-ins and your own specs.
      </li>
    </ul>
  );
}
