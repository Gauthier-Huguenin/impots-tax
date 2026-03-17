import { buildBreadcrumbJsonLd, buildFaqJsonLd, type FaqItem } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";

interface StructuredDataProps {
  locale: Locale;
  pageTitle: string;
  pagePath: string;
  homeLabel: string;
  faqs?: FaqItem[];
}

export function StructuredData({
  locale,
  pageTitle,
  pagePath,
  homeLabel,
  faqs,
}: StructuredDataProps) {
  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: homeLabel, path: "/" },
      { name: pageTitle, path: pagePath },
    ],
    locale,
  );

  return (
    <>
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
