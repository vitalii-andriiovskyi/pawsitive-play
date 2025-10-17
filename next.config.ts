import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    remotePatterns: [new URL('https://images.pexels.com/**')],
  },
};

export default nextConfig;
