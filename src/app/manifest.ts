import type { MetadataRoute } from "next";

const THEME = "#6366f1";
const BG = "#f8fafc";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AH Shop | Premium Printing & Stickers",
    short_name: "AH Shop",
    description:
      "Premium printing, bespoke stickers, and interactive children's books.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: BG,
    theme_color: THEME,
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
