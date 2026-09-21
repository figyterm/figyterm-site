import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 320,
            width: 760,
            height: 620,
            borderRadius: 9999,
            background: "radial-gradient(circle, #6366f1 0%, rgba(7,7,10,0) 68%)",
            opacity: 0.5,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={76} height={76} alt="" style={{ borderRadius: 18 }} />
          <div
            style={{
              fontSize: 38,
              fontWeight: 600,
              color: "#ecedf2",
              letterSpacing: -0.5,
            }}
          >
            FigyTerm
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.03,
              fontWeight: 700,
              color: "#ecedf2",
              letterSpacing: -2.4,
              maxWidth: 950,
            }}
          >
            FigyTerm — the
          </div>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.03,
              fontWeight: 700,
              color: "#818cf8",
              letterSpacing: -2.4,
            }}
          >
            open-source Fig alternative
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 30,
              color: "#9698a8",
              maxWidth: 900,
            }}
          >
            IDE-level terminal autocomplete, Fig-compatible specs, fully
            local. Plus an editor, an API client and a Claude Code window.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: "1px solid #1d1d27",
              background: "#0c0c11",
              borderRadius: 14,
              padding: "16px 22px",
              fontSize: 20,
              color: "#9698a8",
            }}
          >
            <span style={{ color: "#4ade80" }}>$</span>
            {site.installCommands.macos}
          </div>
          <div style={{ fontSize: 22, color: "#6b6d7d" }}>MIT · macOS · Linux · Windows</div>
        </div>
      </div>
    ),
    size,
  );
}
