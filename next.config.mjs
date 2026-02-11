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
