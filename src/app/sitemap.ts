import type { MetadataRoute } from "next";
import { getAllPeople } from "@/lib/people";

export default function sitemap(): MetadataRoute.Sitemap {
  const people = getAllPeople();

  const personPages = people.map((p) => ({
    url: `https://cmhwatch.ca/accountability/${p.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: "https://cmhwatch.ca", lastModified: new Date() },
    { url: "https://cmhwatch.ca/facts", lastModified: new Date() },
    { url: "https://cmhwatch.ca/accountability", lastModified: new Date() },
    { url: "https://cmhwatch.ca/community-voices", lastModified: new Date() },
    { url: "https://cmhwatch.ca/take-action", lastModified: new Date() },
    { url: "https://cmhwatch.ca/timeline", lastModified: new Date() },
    ...personPages,
  ];
}
