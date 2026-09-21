import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Tauri app one directory up has its own lockfile; pin the root here so
  // Turbopack doesn't guess the parent repo.
  turbopack: {
    root: import.meta.dirname,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // Screenshots are local PNGs; these widths cover the layouts we render them at.
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      {
        source: "/screenshots/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
