import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    remotePatterns: [new URL('https://images.pexels.com/**'), new URL('https://upload.wikimedia.org/**')],
  },
};

export default nextConfig;
