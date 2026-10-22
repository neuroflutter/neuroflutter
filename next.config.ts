import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export keeps hosting simple and free on Vercel/any static host.
  // Switch `output` off later if you add server features (forms, previews, ISR).
  output: "export",
  images: {
    unoptimized: true,
    // Article and portrait images served from Sanity's CDN.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  trailingSlash: true,
};

export default nextConfig;
