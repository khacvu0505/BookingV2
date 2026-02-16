import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    silenceDeprecations: ["legacy-js-api", "import", "global-builtin"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "extapi.okdimall.com",
      },
      {
        protocol: "https",
        hostname: "**.okdimall.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://sp.zalo.me",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://*.okdimall.com https://cdn.prod.website-files.com",
              "font-src 'self' data:",
              "connect-src 'self' https://extapi.okdimall.com",
              "frame-src 'self' https://www.youtube.com https://www.google.com https://*.okdimall.com",
              "media-src 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  reactStrictMode: false,
  eslint: {
    // Allow build to succeed with pre-existing ESLint warnings/errors
    // These should be fixed gradually after migration
    ignoreDuringBuilds: true,
  },
  ...(process.env.NODE_ENV === "production" && { devIndicators: false }),
  webpack: (config) => {
    // Alias react-router-dom to our compatibility layer
    config.resolve.alias["react-router-dom"] = path.resolve(
      __dirname,
      "src/lib/router-compat.tsx"
    );

    // Alias /images/* imports to public/images/* (Vite compatibility)
    // Using exact path segments to avoid webpack internal conflicts
    const imageSubDirs = ["home", "HotelList", "HotelDetail", "Profile"];
    imageSubDirs.forEach((dir) => {
      config.resolve.alias[`/images/${dir}`] = path.resolve(
        __dirname,
        `public/images/${dir}`
      );
    });

    return config;
  },
};

export default nextConfig;
