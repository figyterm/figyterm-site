/**
 * An accordion of questions.
 *
 * `<details>` rather than JavaScript, so every answer is in the page for a
 * crawler and for anyone reading with the keyboard, open or not.
 */
export function FaqList({
  faqs,
  className = "",
}: {
  faqs: readonly { q: string; a: string }[];
  className?: string;
}) {
  return (
    <div
      className={`divide-y divide-edge overflow-hidden rounded-2xl border border-edge bg-panel/40 ring-edge ${className}`}
    >
      {faqs.map((faq) => (
        <details key={faq.q} className="group px-5 py-1 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-[15px] font-medium text-fg [&::-webkit-details-marker]:hidden">
            <h3 className="text-[15px] font-medium">{faq.q}</h3>
            <span
              aria-hidden="true"
              className="relative size-4 shrink-0 text-fg-subtle transition-transform duration-200 group-open:rotate-45"
            >
              <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
              <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
            </span>
          </summary>
          <p className="pb-5 pr-8 text-sm leading-relaxed text-fg-muted">
            {faq.a}
          </p>
        </details>
      ))}
    </div>
  );
}
