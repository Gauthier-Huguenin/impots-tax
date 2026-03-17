import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { localePath } from "@/lib/url";
import { OECD_COMPARISON, FRANCE_OECD_DELTA, TAX_DATA_YEAR } from "@/lib/tax-data";
import type { Locale } from "@/lib/i18n/config";
import { buildSeoMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/detail/structured-data";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailComparison" });

  return buildSeoMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale: locale as Locale,
    path: "/comparison",
  });
}

export default async function ComparisonPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailComparison" });
  const td = await getTranslations({ locale, namespace: "detail" });
  const typedLocale = locale as Locale;

  const maxTaxToGdp = Math.max(...OECD_COMPARISON.map((c) => c.taxToGdp));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <StructuredData
        locale={typedLocale}
        pageTitle={t("title")}
        pagePath="/comparison"
        homeLabel={td("backToDashboard")}
      />
      <div className="flex h-1">
        <div className="flex-1 bg-tricolore-blue" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-tricolore-red" />
      </div>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        <Link
          href={localePath("/", typedLocale)}
          className="mb-8 inline-block font-mono text-sm text-info hover:text-info/80 transition-colors"
        >
          {td("backToDashboard")}
        </Link>

        <header className="mb-10">
          <h1 className="font-display text-3xl font-bold uppercase tracking-wider text-gray-100 md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 font-mono text-sm uppercase tracking-wide text-warning">
            {t("subtitle")}
          </p>
          <p className="mt-1 font-mono text-xs text-gray-500">
            {td("dataYear", { year: TAX_DATA_YEAR })}
          </p>
        </header>

        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <p className="font-mono text-sm leading-relaxed text-gray-300">
            {t("intro")}
          </p>
        </section>

        {/* Ranking */}
        <section className="mb-10">
          <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("rankingTitle")}
          </h2>

          <div className="space-y-2">
            {OECD_COMPARISON.map((country) => {
              const isFrance = country.key === "france";
              const isAverage = country.isAverage;
              const barColor = isFrance
                ? "bg-danger"
                : isAverage
                  ? "bg-gray-500"
                  : "bg-info";
              const textColor = isFrance
                ? "text-danger"
                : isAverage
                  ? "text-gray-400"
                  : "text-gray-300";
              const borderClass = isFrance
                ? "border-danger/30 bg-danger/5"
                : isAverage
                  ? "border-gray-700 bg-gray-800/30"
                  : "border-gray-800/50 bg-transparent";

              return (
                <div
                  key={country.key}
                  className={`flex items-center gap-4 rounded border p-3 ${borderClass}`}
                >
                  <div className={`w-28 shrink-0 font-mono text-sm ${textColor} truncate`}>
                    {t(country.key as "france")}
                  </div>
                  <div className="flex-1">
                    <div className="h-4 w-full overflow-hidden rounded-full bg-gray-800">
                      <div
                        className={`h-full rounded-full ${barColor}`}
                        style={{ width: `${(country.taxToGdp / maxTaxToGdp) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className={`w-16 shrink-0 text-right font-mono text-sm font-bold ${textColor}`}>
                    {country.taxToGdp}%
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-4 font-mono text-sm font-bold text-danger">
            {t("franceDelta")}
          </p>
        </section>

        {/* Analysis */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("analysisTitle")}
          </h2>
          <div className="space-y-4 font-mono text-sm leading-relaxed text-gray-300">
            <p>{t("analysisP1")}</p>
            <p>{t("analysisP2")}</p>
            <p>{t("analysisP3")}</p>
          </div>
        </section>

        <footer className="border-t border-gray-800 pt-4">
          <p className="font-mono text-xs text-gray-600">
            {td("source")} : {t("sourceText")}
          </p>
          <p className="mt-1 font-mono text-xs text-gray-600">
            {td("lastUpdated", { date: "Mars 2026" })}
          </p>
        </footer>
      </main>

      <div className="flex h-1">
        <div className="flex-1 bg-tricolore-blue" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-tricolore-red" />
      </div>
    </div>
  );
}
