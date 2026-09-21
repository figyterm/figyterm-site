import Link from "next/link";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-xl shadow-brand/30 hover:bg-brand-bright hover:shadow-brand/40",
  secondary:
    "border border-edge bg-panel/60 text-fg hover:border-edge-strong hover:bg-panel",
  ghost: "text-fg-muted hover:text-fg",
};

/**
 * One button, whether it points inside the site or out of it.
 *
 * An external href gets `target`/`rel` and a mark, so a link that leaves the
 * site always looks like one — and `next/link` is used for everything else so
 * internal navigation stays client-side.
 */
export function LinkButton({
  href,
  variant = "primary",
  icon,
  external,
  full,
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  icon?: string;
  external?: boolean;
  /** Full width until the `sm` breakpoint — the usual shape in a hero. */
  full?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const classes = `${base} ${variants[variant]} ${
    full ? "w-full sm:w-auto" : ""
  } ${className}`;

  const inner = (
    <>
      {icon && <Icon name={icon} className="size-4" />}
      {children}
      {external && <Icon name="external" className="size-3.5 opacity-60" />}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
