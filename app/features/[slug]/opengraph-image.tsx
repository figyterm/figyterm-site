import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { feature as findFeature, features } from "@/lib/features";
import { site } from "@/lib/site";

export const alt = `${site.name} feature`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Prerender one card per feature, alongside the pages themselves. */
export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export default async function FeatureOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = findFeature(slug);

  const mark = await readFile(join(process.cwd(), "public", "logo-mark.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  const accent = feature?.accent ?? "#818cf8";
  const heading = feature?.name ?? site.name;
  const lede = feature?.tagline ?? site.shortDescription;

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
        {/* Accent glow, tinted to the feature so a row of shared links reads
            as a set of distinct pages rather than one repeated card. */}
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
          <div style={{ fontSize: 32, fontWeight: 600, color: "#ecedf2", letterSpacing: -0.4 }}>
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
            {feature?.navLabel ?? "Features"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.05,
              fontWeight: 700,
              color: "#ecedf2",
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {heading}
          </div>
          <div style={{ marginTop: 24, fontSize: 28, lineHeight: 1.4, color: "#9698a8", maxWidth: 940 }}>
            {lede}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 21, color: "#6b6d7d" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: accent }} />
            figyterm.code4mk.org
          </div>
          <div>·</div>
          <div>MIT · macOS · Linux · Windows</div>
        </div>
      </div>
    ),
    size,
  );
}
