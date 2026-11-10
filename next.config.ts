import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    localPatterns: [
      { pathname: "/**", search: "" },
      { pathname: "/images/planetarium-current.jpg" },
      { pathname: "/images/proposal/*.jpg" },
      { pathname: "/images/operations/*.jpg" },
      { pathname: "/images/feasibility/section-cover.jpg" },
      { pathname: "/images/implementation/section-cover.jpg" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
