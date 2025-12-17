import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow webhook routes to receive raw body
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
