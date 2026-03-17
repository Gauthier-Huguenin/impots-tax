import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { locales, defaultLocale, type Locale } from "@/lib/i18n/config";

function buildUrl(path: string, locale: Locale): string {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  return `${siteConfig.url}${prefix}${path}`;
}

interface SeoMetadataOptions {
  title: string;
  description: string;
  locale: Locale;
  path: string;
}

export function buildSeoMetadata({
  title,
  description,
  locale,
  path,
}: SeoMetadataOptions): Metadata {
  const canonical = buildUrl(path, locale);
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = buildUrl(path, l);
  }
  languages["x-default"] = buildUrl(path, defaultLocale);

  return {
    title,
    description,
    icons: { icon: "/logo.svg" },
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "impots.tax",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@leploutos",
    },
  };
}
