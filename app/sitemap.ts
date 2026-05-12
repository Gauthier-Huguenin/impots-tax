import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { locales, defaultLocale } from "@/lib/i18n/config";
import { getAllBlogPosts } from "@/lib/blog";

// lastModified: update this date when content changes significantly
const CONTENT_LAST_MODIFIED = new Date("2026-05-04");

const routes: Array<{
  path: string;
  priority?: number;
  changeFrequency?: "weekly" | "monthly";
  lastModified?: Date;
}> = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.85, changeFrequency: "weekly" },
  { path: "/income-tax" },
  { path: "/corporate-tax" },
  { path: "/flat-tax" },
  { path: "/vat" },
  { path: "/fuel-tax" },
  { path: "/behavioral-tax" },
  { path: "/salary-contributions" },
  { path: "/welfare-system" },
  { path: "/property-tax" },
  { path: "/rental-tax" },
  { path: "/inheritance-tax" },
  { path: "/capital-gains" },
  { path: "/highway-tolls" },
  { path: "/railway-tolls" },
  { path: "/comparison" },
  { path: "/indicators" },
  { path: "/donate" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const blogRoutes = getAllBlogPosts(defaultLocale).map((post) => ({
    path: post.path,
    priority: 0.75,
    changeFrequency: "monthly" as const,
    lastModified: new Date(post.metadata.updatedAt),
  }));

  return [...routes, ...blogRoutes].map(({
    path,
    priority = 0.8,
    changeFrequency = "monthly",
    lastModified = CONTENT_LAST_MODIFIED,
  }) => {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      const localePath = locale === defaultLocale ? path : `/${locale}${path}`;
      languages[locale] = `${baseUrl}${localePath || "/"}`;
    }
    languages["x-default"] = `${baseUrl}${path || "/"}`;

    return {
      url: `${baseUrl}${path || "/"}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    };
  });
}
