import type { NextConfig } from "next";
import path from "node:path";

const config: NextConfig = {
  // Force the app to render every locale × route at build time so the catalog
  // is fully crawlable HTML and i18next state is locale-correct per file.
  output: "standalone",
  outputFileTracingRoot: __dirname,
  images: {
    // Existing asset hosts referenced by experiences.ts and Lovable previews.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  webpack: (config) => {
    // Replace react-router-dom with the App Router shim — every existing
    // `import { Link, useParams, ... } from "react-router-dom"` is rewired
    // to next/* primitives without touching a single src/ file.
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "react-router-dom$": path.resolve(__dirname, "src/lib/router-shim.tsx"),
    };
    return config;
  },
};

export default config;
