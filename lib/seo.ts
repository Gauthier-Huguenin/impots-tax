import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { locales, defaultLocale, type Locale } from "@/lib/i18n/config";

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

  const ogImage = {
    url: `${siteConfig.url}/og-image.png`,
    width: 1200,
    height: 630,
    alt: title,
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
