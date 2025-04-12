import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "16a9564f-f8ec-42ba-a998-3027aa809e50.selstorage.ru",
      "www.servli.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

export default nextConfig;
