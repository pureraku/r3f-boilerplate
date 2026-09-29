import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/r3f-boilerplate",

  images: {
    unoptimized: true,
  },

  trailingSlash: true,
};

export default nextConfig;
