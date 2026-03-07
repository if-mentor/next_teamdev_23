import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // supabaseのユーザーアイコンを読み込むために、ドメイン許可設定を追加。
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vqtssvxalhpnxptlzrzc.supabase.co",
      }
    ]
  }
};

export default nextConfig;
