import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { locales, defaultLocale } from "@/lib/i18n/config";

// lastModified: update this date when content changes significantly
const CONTENT_LAST_MODIFIED = new Date("2026-05-04");

const routes: Array<{ path: string; priority?: number; changeFrequency?: "weekly" | "monthly" }> = [
  { path: "", priority: 1, changeFrequency: "weekly" },
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

  return routes.map(({ path, priority = 0.8, changeFrequency = "monthly" }) => {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      const localePath = locale === defaultLocale ? path : `/${locale}${path}`;
      languages[locale] = `${baseUrl}${localePath || "/"}`;
    }
    languages["x-default"] = `${baseUrl}${path || "/"}`;

    return {
      url: `${baseUrl}${path || "/"}`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency,
      priority,
      alternates: { languages },
    };
  });
}
