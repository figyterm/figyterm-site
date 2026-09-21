# Screenshots

Every capture the site can show is registered in [`lib/screenshots.ts`](../../lib/screenshots.ts).

## Adding one

1. Save the PNG in this folder under the exact filename the registry gives it.
   The placeholder on the page prints that path, so you can read it straight
   off the site in development.
2. Open `lib/screenshots.ts`, find the entry, and change `ready: false` to
   `ready: true`.

Nothing else changes. The placeholder is drawn at the capture's aspect ratio,
so the layout does not shift when the image lands, and `readyScreenshots`
feeds the structured data — a placeholder is never cited as an image that
exists.

## Capture settings

Match the existing set: **3002 × 1898**, a retina capture of the default
window on macOS. If a panel genuinely wants another shape, set its own
`width`/`height` on the entry rather than letting it inherit `CAPTURE`.

## Still pending

Run this to list what the site is currently drawing placeholders for:

```bash
grep -B4 'ready: false' ../../lib/screenshots.ts | grep 'file:'
```
