import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { localePath } from "@/lib/url";
import type { Locale } from "@/lib/i18n/config";
import { buildSeoMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/detail/structured-data";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DonateDetail } from "@/components/detail/donate-detail";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "donate" });
  return buildSeoMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale: locale as Locale,
    path: "/donate",
  });
}

export default async function DonatePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "donate" });
  const td = await getTranslations({ locale, namespace: "detail" });
  const typedLocale = locale as Locale;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <StructuredData
        locale={typedLocale}
        pageTitle={t("title")}
        pagePath="/donate"
        homeLabel="impots.tax"
      />

      <div className="sticky top-0 z-50">
        {/* Tricolore stripe — top */}
        <div className="flex h-1">
          <div className="flex-1 bg-tricolore-blue" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-tricolore-red" />
        </div>
        <Header />
      </div>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        {/* Back button */}
        <Link
          href={localePath("/", typedLocale)}
          className="mb-6 inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors hover:text-gray-300"
        >
          ← {td("backToDashboard")}
        </Link>

        <DonateDetail />
      </main>

      <Footer />

      {/* Tricolore stripe — bottom */}
      <div className="flex h-1">
        <div className="flex-1 bg-tricolore-blue" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-tricolore-red" />
      </div>
    </div>
  );
}
