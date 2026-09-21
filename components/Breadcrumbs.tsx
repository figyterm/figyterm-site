import Link from "next/link";
import type { Crumb } from "@/lib/jsonld";

/**
 * The visible trail. The matching `BreadcrumbList` structured data is emitted
 * by the page, not here, so a page has exactly one JSON-LD block.
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-fg-subtle">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-fg-muted">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-fg-muted"
                  >
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true" className="text-edge-strong">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
