import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  images: {
    qualities: [70, 75, 80, 85, 90, 95],
    // PNG ko yahan add nahi karna, Next.js khud handle karega
    // Ye browsers ko sab se choti file (AVIF/WebP) serve karega
    formats: ["image/avif", "image/webp"], 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  poweredByHeader: false,
  reactStrictMode: true,
  
  compiler: {
    // Production mein console logs khatam (TBT fix karne ke liye)
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
