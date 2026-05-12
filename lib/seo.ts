import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { locales, defaultLocale, type Locale } from "@/lib/i18n/config";
import {
  buildOgImageAlt,
  getOgImageSlugFromPath,
  OG_IMAGE_SIZE,
} from "@/lib/og-images";

export function buildUrl(path: string, locale: Locale): string {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  return `${siteConfig.url}${prefix}${path}`;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[],
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: buildUrl(item.path, locale),
    })),
  };
}

export function buildFaqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildWebPageJsonLd({
  title,
  description,
  path,
  locale,
}: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
}) {
  const url = buildUrl(path, locale);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "impots.tax",
      url: siteConfig.url,
    },
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
  };
}

interface SeoMetadataOptions {
  title: string;
  description: string;
  locale: Locale;
  path: string;
}

interface ArticleSeoMetadataOptions extends SeoMetadataOptions {
  publishedTime: string;
  modifiedTime: string;
  tags: string[];
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

  const ogSlug = getOgImageSlugFromPath(path);
  const ogImageUrl = `${siteConfig.url}/og/${locale}/${ogSlug}`;
  const ogImage = {
    url: ogImageUrl,
    width: OG_IMAGE_SIZE.width,
    height: OG_IMAGE_SIZE.height,
    alt: buildOgImageAlt(ogSlug, locale),
  };

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    manifest: "/site.webmanifest",
    icons: { icon: "/logo.svg" },
    alternates: {
      canonical,
      languages,
      types: {
        "application/rss+xml": `${siteConfig.url}/feed.xml`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "impots.tax",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@leploutos",
      images: [ogImage.url],
    },
  };
}

export function buildArticleSeoMetadata({
  title,
  description,
  locale,
  path,
  publishedTime,
  modifiedTime,
  tags,
}: ArticleSeoMetadataOptions): Metadata {
  const metadata = buildSeoMetadata({ title, description, locale, path });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime,
      modifiedTime,
      tags,
    },
  };
}
