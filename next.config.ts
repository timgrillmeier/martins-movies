import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    TMDB_API_ROOT: process.env.TMDB_API_ROOT,
    TMDB_API_ACCESS_TOKEN: process.env.TMDB_API_ACCESS_TOKEN,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
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
