import type { ComponentType } from "react";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";
import { buildUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import ImpotRevenuFr, {
  metadata as impotRevenuFrMetadata,
} from "@/content/blog/fr/impot-revenu-2026.mdx";
import ImpotRevenuEn, {
  metadata as impotRevenuEnMetadata,
} from "@/content/blog/en/impot-revenu-2026.mdx";
import CoutEmployeurFr, {
  metadata as coutEmployeurFrMetadata,
} from "@/content/blog/fr/cout-employeur-salaire-net.mdx";
import CoutEmployeurEn, {
  metadata as coutEmployeurEnMetadata,
} from "@/content/blog/en/cout-employeur-salaire-net.mdx";
import FlatTaxFr, {
  metadata as flatTaxFrMetadata,
} from "@/content/blog/fr/flat-tax-2026.mdx";
import FlatTaxEn, {
  metadata as flatTaxEnMetadata,
} from "@/content/blog/en/flat-tax-2026.mdx";

export interface BlogPostMetadata {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  readingTime: string;
  relatedModules: string[];
  sources: string[];
}

export interface BlogPost {
  locale: Locale;
  path: string;
  metadata: BlogPostMetadata;
  Content: ComponentType;
}

export interface RelatedModule {
  slug: string;
  title: string;
  description: string;
}

const blogRegistry: Record<Locale, BlogPost[]> = {
  fr: [
    {
      locale: "fr",
      path: "/blog/impot-revenu-2026",
      metadata: impotRevenuFrMetadata,
      Content: ImpotRevenuFr,
    },
    {
      locale: "fr",
      path: "/blog/cout-employeur-salaire-net",
      metadata: coutEmployeurFrMetadata,
      Content: CoutEmployeurFr,
    },
    {
      locale: "fr",
      path: "/blog/flat-tax-2026",
      metadata: flatTaxFrMetadata,
      Content: FlatTaxFr,
    },
  ],
  en: [
    {
      locale: "en",
      path: "/blog/impot-revenu-2026",
      metadata: impotRevenuEnMetadata,
      Content: ImpotRevenuEn,
    },
    {
      locale: "en",
      path: "/blog/cout-employeur-salaire-net",
      metadata: coutEmployeurEnMetadata,
      Content: CoutEmployeurEn,
    },
    {
      locale: "en",
      path: "/blog/flat-tax-2026",
      metadata: flatTaxEnMetadata,
      Content: FlatTaxEn,
    },
  ],
};

const relatedModules: Record<Locale, Record<string, RelatedModule>> = {
  fr: {
    "income-tax": {
      slug: "income-tax",
      title: "Impôt sur le revenu",
      description: "Barème progressif, quotient familial et CDHR.",
    },
    "salary-contributions": {
      slug: "salary-contributions",
      title: "Salaires & cotisations",
      description: "Coût employeur, brut, net et prélèvements sociaux.",
    },
    "flat-tax": {
      slug: "flat-tax",
      title: "Flat Tax / PFU",
      description: "Revenus financiers, dividendes, crypto et taux 2026.",
    },
    vat: {
      slug: "vat",
      title: "TVA",
      description: "Taux normal, taux réduits et taxe sur la consommation.",
    },
    "capital-gains": {
      slug: "capital-gains",
      title: "Plus-values hors PEA",
      description: "CTO, PEA et fiscalité des titres étrangers.",
    },
  },
  en: {
    "income-tax": {
      slug: "income-tax",
      title: "Income Tax",
      description: "Progressive brackets, family quotient and CDHR.",
    },
    "salary-contributions": {
      slug: "salary-contributions",
      title: "Salary Contributions",
      description: "Employer cost, gross pay, net pay and payroll levies.",
    },
    "flat-tax": {
      slug: "flat-tax",
      title: "Flat Tax / PFU",
      description: "Financial income, dividends, crypto and 2026 rate.",
    },
    vat: {
      slug: "vat",
      title: "VAT",
      description: "Standard rate, reduced rates and consumption tax.",
    },
    "capital-gains": {
      slug: "capital-gains",
      title: "Capital Gains Outside PEA",
      description: "Taxable brokerage accounts, PEA and foreign securities.",
    },
  },
};

function assertSyncedBlogRegistry() {
  const [firstLocale, ...otherLocales] = locales;
  const firstSlugs = blogRegistry[firstLocale].map((post) => post.metadata.slug).sort();

  for (const locale of otherLocales) {
    const localeSlugs = blogRegistry[locale].map((post) => post.metadata.slug).sort();
    if (firstSlugs.join(",") !== localeSlugs.join(",")) {
      throw new Error(`Blog slugs are not synchronized for locale "${locale}"`);
    }
  }

  for (const locale of locales) {
    for (const post of blogRegistry[locale]) {
      if (post.metadata.slug !== post.path.replace("/blog/", "")) {
        throw new Error(`Blog metadata/path mismatch for "${post.metadata.slug}"`);
      }
    }
  }
}

assertSyncedBlogRegistry();

function sortByPublishedAt(posts: BlogPost[]) {
  return [...posts].sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );
}

export function getAllBlogPosts(locale: Locale): BlogPost[] {
  return sortByPublishedAt(blogRegistry[locale]);
}

export function getAllLocalizedBlogPosts(): BlogPost[] {
  return locales.flatMap((locale) => getAllBlogPosts(locale));
}

export function getBlogSlugs(): string[] {
  return getAllBlogPosts("fr").map((post) => post.metadata.slug);
}

export function getBlogPost(locale: Locale, slug: string): BlogPost | undefined {
  return blogRegistry[locale].find((post) => post.metadata.slug === slug);
}

export function getRelatedModules(locale: Locale, moduleSlugs: string[]): RelatedModule[] {
  return moduleSlugs
    .map((slug) => relatedModules[locale][slug])
    .filter((module): module is RelatedModule => Boolean(module));
}

export function formatBlogDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function buildBlogPostingJsonLd(post: BlogPost) {
  const url = buildUrl(post.path, post.locale);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.description,
    datePublished: post.metadata.publishedAt,
    dateModified: post.metadata.updatedAt,
    url,
    mainEntityOfPage: url,
    inLanguage: post.locale === "fr" ? "fr-FR" : "en-US",
    isPartOf: {
      "@type": "Blog",
      name: post.locale === "fr" ? "Blog impots.tax" : "impots.tax Blog",
      url: buildUrl("/blog", post.locale),
    },
    author: {
      "@type": "Person",
      name: "Gauthier Huguenin",
    },
    publisher: {
      "@type": "Organization",
      name: "impots.tax",
      url: siteConfig.url,
    },
    keywords: post.metadata.tags.join(", "),
  };
}

export function buildBlogJsonLd(locale: Locale, posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: locale === "fr" ? "Blog impots.tax" : "impots.tax Blog",
    description:
      locale === "fr"
        ? "Analyses fiscales françaises sourcées, satiriques et orientées SEO."
        : "Sourced, satirical and SEO-oriented analysis of French taxation.",
    url: buildUrl("/blog", locale),
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.metadata.title,
      url: buildUrl(post.path, post.locale),
      datePublished: post.metadata.publishedAt,
      dateModified: post.metadata.updatedAt,
    })),
  };
}
