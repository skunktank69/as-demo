import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // @ts-expect-error -hehe
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
