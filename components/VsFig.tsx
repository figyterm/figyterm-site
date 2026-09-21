import { Icon } from "./Icon";
import { comparison, type ComparisonRow } from "@/lib/content";

function Cell({
  value,
  highlight,
}: {
  value: ComparisonRow["figyterm"];
  highlight?: boolean;
}) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-term-green">
        <Icon name="check" className="size-4" />
        <span className="sr-only">Yes</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-fg-subtle">
        <Icon name="cross" className="size-4" />
        <span className="sr-only">No</span>
      </span>
    );
  }
  return (
    <span className={`text-sm ${highlight ? "text-fg" : "text-fg-muted"}`}>
      {value}
    </span>
  );
}

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-edge bg-panel/40 ring-edge">
      <table className="w-full min-w-[38rem] border-collapse text-left">
        <caption className="sr-only">
          Feature comparison between FigyTerm, Fig and the built-in macOS
          Terminal app
        </caption>
        <thead>
          <tr className="border-b border-edge">
            <th
              scope="col"
              className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-fg-subtle"
            >
              Capability
            </th>
            <th scope="col" className="px-5 py-4">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-fg">
                <span className="size-2 rounded-full bg-brand" />
                FigyTerm
              </span>
            </th>
            <th scope="col" className="px-5 py-4 text-sm font-semibold text-fg-muted">
              Fig
            </th>
            <th scope="col" className="px-5 py-4 text-sm font-semibold text-fg-muted">
              Terminal.app
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-edge">
          {comparison.map((row) => (
            <tr key={row.feature} className="transition-colors hover:bg-panel/70">
              <th scope="row" className="px-5 py-4 text-sm font-normal text-fg">
                {row.feature}
              </th>
              <td className="bg-brand/[0.06] px-5 py-4">
                <Cell value={row.figyterm} highlight />
              </td>
              <td className="px-5 py-4">
                <Cell value={row.fig} />
              </td>
              <td className="px-5 py-4">
                <Cell value={row.builtin} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
