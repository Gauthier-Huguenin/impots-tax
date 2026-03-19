import { getTranslations } from "next-intl/server";
import type { Locale } from "@/lib/i18n/config";
import { buildSeoMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/detail/structured-data";
import { Breadcrumb } from "@/components/detail/breadcrumb";
import { CapitalGainsDetail } from "@/components/detail/capital-gains-detail";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailCapitalGains" });

  return buildSeoMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale: locale as Locale,
    path: "/capital-gains",
  });
}

export default async function CapitalGainsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailCapitalGains" });
  const td = await getTranslations({ locale, namespace: "detail" });
  const typedLocale = locale as Locale;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <StructuredData
        locale={typedLocale}
        pageTitle={t("title")}
        pagePath="/capital-gains"
        homeLabel={td("backToDashboard")}
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

        <CapitalGainsDetail />
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
