import { getTranslations } from "next-intl/server";
import type { Locale } from "@/lib/i18n/config";
import { buildSeoMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/detail/structured-data";
import { Breadcrumb } from "@/components/detail/breadcrumb";
import { FaqSection } from "@/components/detail/faq-section";
import type { FaqItem } from "@/lib/seo";
import { SalaryContributionsDetail } from "@/components/detail/salary-contributions-detail";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailSalaryContributions" });

  return buildSeoMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale: locale as Locale,
    path: "/salary-contributions",
  });
}

export default async function SalaryContributionsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailSalaryContributions" });
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
        pagePath="/salary-contributions"
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

        <SalaryContributionsDetail />

        <FaqSection title={t("faqTitle")} faqs={faqs} />
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
