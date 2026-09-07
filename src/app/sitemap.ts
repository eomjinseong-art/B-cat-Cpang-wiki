import type { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = getAllGuides();

  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/guides`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/download`, changeFrequency: "yearly", priority: 0.3 },
    ...guides.map((guide) => ({
      url: `${SITE_URL}/guides/${guide.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}