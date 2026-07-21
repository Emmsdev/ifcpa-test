import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_URL } from "@/lib/site";

const indexableImages = [
  "/ifcpa-campus.jpg",
  "/ifcpa-campus-life.png",
  "/ifcpa-camera-workshop.jpg",
  "/ifcpa-sound-training.jpg",
  "/ifcpa-practical-camera.jpg",
  "/ifcpa-film-production.jpg",
  "/ifcpa-heritage-memory.jpg",
  "/ifcpa-archives.jpg",
  "/ifcpa-community.jpg",
  "/ifcpa-director-emmanuel-mbede.jpg",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-07-21"),
      changeFrequency: "weekly",
      priority: 1,
      images: indexableImages.map(absoluteUrl),
    },
  ];
}
