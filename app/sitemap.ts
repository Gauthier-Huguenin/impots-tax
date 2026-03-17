import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { locales, defaultLocale } from "@/lib/i18n/config";

const routes = [
  "",
  "/income-tax",
  "/corporate-tax",
  "/flat-tax",
  "/vat",
  "/fuel-tax",
  "/behavioral-tax",
  "/salary-contributions",
  "/welfare-system",
  "/property-tax",
  "/rental-tax",
  "/inheritance-tax",
  "/capital-gains",
  "/highway-tolls",
  "/railway-tolls",
  "/comparison",
  "/indicators",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  return routes.map((route) => {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      const path = locale === defaultLocale ? route : `/${locale}${route}`;
      languages[locale] = `${baseUrl}${path || "/"}`;
    }
    languages["x-default"] = `${baseUrl}${route || "/"}`;

    return {
      url: `${baseUrl}${route || "/"}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.8,
      alternates: { languages },
    };
  });
}
