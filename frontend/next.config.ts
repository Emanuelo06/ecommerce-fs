import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Enable Turbopack (Next.js 16 default)
  // Hot reload handled by WATCHPACK_POLLING env var in docker-compose
  turbopack: {},
};

export default nextConfig;
