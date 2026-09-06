import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 「玉野の話」は「動く人たち」に統合。旧URLは恒久的に転送する。
      { source: "/stories", destination: "/interviews", permanent: true },
    ];
  },
};

export default nextConfig;
