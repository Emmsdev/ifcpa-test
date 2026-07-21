import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "IFCPA / CRTV — Formation audiovisuelle",
    short_name: "IFCPA",
    description: "Formation aux métiers de l'audiovisuel et conservation du patrimoine de la CRTV à Yaoundé.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#f8f9fa",
    theme_color: "#06395f",
    lang: "fr-CM",
    dir: "ltr",
    categories: ["education", "training", "media"],
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
