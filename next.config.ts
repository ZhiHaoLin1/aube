import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-3fc6787160b4478f981aa86718fca41d.r2.dev",
      },
    ],
  },
};

export default nextConfig;
