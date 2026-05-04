import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
  type FaqItem,
} from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";

interface StructuredDataProps {
  locale: Locale;
  pageTitle: string;
  pagePath: string;
  homeLabel: string;
  description?: string;
  faqs?: FaqItem[];
}

export function StructuredData({
  locale,
  pageTitle,
  pagePath,
  homeLabel,
  description,
  faqs,
}: StructuredDataProps) {
  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: homeLabel, path: "/" },
      { name: pageTitle, path: pagePath },
    ],
    locale,
  );
  const webPage = description
    ? buildWebPageJsonLd({
        title: pageTitle,
        description,
        path: pagePath,
        locale,
      })
    : null;

  return (
    <>
      {webPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {faqs && faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(faqs)) }}
        />
      )}
    </>
  );
}
