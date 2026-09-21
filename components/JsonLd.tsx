/**
 * Emits one `application/ld+json` block.
 *
 * The content is always authored in `lib/jsonld.ts` and never comes from user
 * input, which is why serialising it straight into the tag is safe here. `<`
 * is escaped anyway so a string containing `</script` cannot close the tag.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
