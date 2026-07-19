import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IFCPA / CRTV",
    short_name: "IFCPA",
    description: "Formation audiovisuelle et conservation du patrimoine de la CRTV.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f9fa",
    theme_color: "#42bcf5",
    icons: [{ src: "/favicon.png", sizes: "512x512", type: "image/png" }],
  };
}
