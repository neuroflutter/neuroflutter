import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getArticles, getAuthors } from "@/lib/content";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sortedArticles = await getArticles();
  const authors = await getAuthors();
  const newest = sortedArticles[0]?.date ?? new Date().toISOString().slice(0, 10);

  const pages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: newest, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/about/`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/learn/`, lastModified: newest, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/contribute/`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/privacy/`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const articles: MetadataRoute.Sitemap = sortedArticles.map((a) => ({
    url: `${site.url}/learn/${a.slug}/`,
    lastModified: a.date,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  const authorPages: MetadataRoute.Sitemap = authors
    .filter((a) => sortedArticles.some((x) => x.authorId === a.id))
    .map((a) => ({
      url: `${site.url}/authors/${a.id}/`,
      lastModified: newest,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...pages, ...articles, ...authorPages];
}
