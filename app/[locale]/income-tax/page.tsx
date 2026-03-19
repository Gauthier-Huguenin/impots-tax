import { getTranslations } from "next-intl/server";
import type { Locale } from "@/lib/i18n/config";
import { buildSeoMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/detail/structured-data";
import type { FaqItem } from "@/lib/seo";
import { Breadcrumb } from "@/components/detail/breadcrumb";
import { IncomeTaxDetail } from "@/components/detail/income-tax-detail";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailIncomeTax" });

  return buildSeoMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale: locale as Locale,
    path: "/income-tax",
  });
}

export default async function IncomeTaxPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailIncomeTax" });
  const td = await getTranslations({ locale, namespace: "detail" });
  const typedLocale = locale as Locale;

  const faqs: FaqItem[] = [
    { question: t("faqQ1"), answer: t("faqA1") },
    { question: t("faqQ2"), answer: t("faqA2") },
    { question: t("faqQ3"), answer: t("faqA3") },
    { question: t("faqQ4"), answer: t("faqA4") },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <StructuredData
        locale={typedLocale}
        pageTitle={t("title")}
        pagePath="/income-tax"
        homeLabel={td("backToDashboard")}
        faqs={faqs}
      />
      <div className="sticky top-0 z-50">
        <div className="flex h-1">
          <div className="flex-1 bg-tricolore-blue" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-tricolore-red" />
        </div>
        <Header />
      </div>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        <Breadcrumb locale={typedLocale} moduleTitle={t("title")} />

        <IncomeTaxDetail />
      </main>

      <Footer />

      <div className="flex h-1">
        <div className="flex-1 bg-tricolore-blue" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-tricolore-red" />
      </div>
    </div>
  );
}
