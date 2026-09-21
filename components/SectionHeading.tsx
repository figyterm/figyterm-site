export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  align?: "center" | "left";
  as?: "h2" | "h3";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl text-left"
      }
    >
      {eyebrow && (
        <p className="text-accent text-xs font-semibold uppercase tracking-[0.16em]">
          {eyebrow}
        </p>
      )}
      <Tag
        className={`text-3xl font-semibold tracking-tight sm:text-4xl ${
          eyebrow ? "mt-3" : ""
        }`}
      >
        {title}
      </Tag>
      {body && (
        <p className="mt-4 text-base leading-relaxed text-fg-muted">{body}</p>
      )}
    </div>
  );
}

/** A full-width band with the site's standard vertical rhythm and top rule. */
export function Section({
  id,
  children,
  className = "",
  bordered = true,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={`${bordered ? "border-t border-edge" : ""} ${
        id ? "scroll-mt-24" : ""
      } py-20 sm:py-24 ${className}`}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}
