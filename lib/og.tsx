import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "./site";

/**
 * The shared Open Graph card.
 *
 * Every page gets its own rather than falling back to one generic image,
 * because a shared link is often the only thing a person — or an assistant
 * summarising a page — sees before deciding whether to open it. A card that
 * names the page beats a card that names the site.
 *
 * `next/og` renders a strict subset of CSS: flex only, no `gap` shorthand
 * quirks, no external stylesheets. Keep the markup below flat and explicit.
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export async function renderOgCard({
  eyebrow,
  title,
  lede,
  accent = "#818cf8",
  footer = "MIT · macOS · Linux · Windows",
}: {
  eyebrow: string;
  title: string;
  lede: string;
  accent?: string;
  footer?: string;
}) {
  const mark = await readFile(join(process.cwd(), "public", "logo-mark.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07070a",
          padding: "68px 76px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -280,
            left: 300,
            width: 800,
            height: 640,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${accent} 0%, rgba(7,7,10,0) 68%)`,
            opacity: 0.42,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={64} height={64} alt="" style={{ borderRadius: 16 }} />
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#ecedf2",
              letterSpacing: -0.4,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginLeft: 8,
              padding: "8px 16px",
              borderRadius: 999,
              border: `1px solid ${accent}55`,
              color: accent,
              fontSize: 20,
              letterSpacing: 1.2,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: title.length > 44 ? 58 : 68,
              lineHeight: 1.05,
              fontWeight: 700,
              color: "#ecedf2",
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 28,
              lineHeight: 1.4,
              color: "#9698a8",
              maxWidth: 950,
            }}
          >
            {lede}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 21,
            color: "#6b6d7d",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: accent }} />
            figyterm.code4mk.org
          </div>
          <div>·</div>
          <div>{footer}</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
