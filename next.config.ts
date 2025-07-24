import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/page/:page",
        destination: "/?page=:page",
      },
      {
        source: "/query/:query",
        destination: "/?query=:query",
      },
      {
        source: "/query/:query/page/:page",
        destination: "/?query=:query&page=:page",
      }
    ]
  }
};

export default nextConfig;
