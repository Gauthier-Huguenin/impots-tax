import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { localePath } from "@/lib/url";
import { RAILWAY_TOLLS, TAX_DATA_YEAR } from "@/lib/tax-data";
import type { Locale } from "@/lib/i18n/config";
import { buildSeoMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/detail/structured-data";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailRailwayTolls" });

  return buildSeoMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale: locale as Locale,
    path: "/railway-tolls",
  });
}

export default async function RailwayTollsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailRailwayTolls" });
  const td = await getTranslations({ locale, namespace: "detail" });
  const typedLocale = locale as Locale;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <StructuredData
        locale={typedLocale}
        pageTitle={t("title")}
        pagePath="/railway-tolls"
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

        {/* Intro */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <p className="font-mono text-sm leading-relaxed text-gray-300">
            {t("intro")}
          </p>
        </section>

        {/* System description */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("systemTitle")}
          </h2>
          <p className="font-mono text-sm leading-relaxed text-gray-300">
            {t("systemDesc")}
          </p>
        </section>

        {/* Toll share in ticket */}
        <section className="mb-10">
          <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("shareTitle")}
          </h2>

          <div className="overflow-x-auto rounded border border-gray-800">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-[#0f1218]">
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">
                    {t("trainType")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("sharePercent")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800/50">
                  <td className="px-4 py-3 text-gray-300">{t("tgv")}</td>
                  <td className="px-4 py-3 text-right text-danger">{RAILWAY_TOLLS.tgvShare}%</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="px-4 py-3 text-gray-300">{t("ter")}</td>
                  <td className="px-4 py-3 text-right text-warning">{RAILWAY_TOLLS.terShare}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Visual bars */}
          <div className="mt-4 space-y-3">
            <div>
              <div className="mb-1 flex justify-between font-mono text-xs text-gray-500">
                <span>TGV</span>
                <span>{RAILWAY_TOLLS.tgvShare}%</span>
              </div>
              <div className="h-4 w-full overflow-hidden rounded-full bg-gray-800">
                <div className="h-full rounded-full bg-danger" style={{ width: `${RAILWAY_TOLLS.tgvShare}%` }} />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between font-mono text-xs text-gray-500">
                <span>TER</span>
                <span>{RAILWAY_TOLLS.terShare}%</span>
              </div>
              <div className="h-4 w-full overflow-hidden rounded-full bg-gray-800">
                <div className="h-full rounded-full bg-warning" style={{ width: `${RAILWAY_TOLLS.terShare}%` }} />
              </div>
            </div>
          </div>
        </section>

        {/* Key figures */}
        <section className="mb-10 rounded border border-danger/30 bg-danger/5 p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-danger">
            {t("financialsTitle")}
          </h2>
          <ul className="space-y-2 font-mono text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-danger">▸</span> {t("totalRevenue")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("regeneration")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("groupRevenue")}
            </li>
          </ul>
        </section>

        {/* Toll increases */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("increasesTitle")}
          </h2>
          <ul className="space-y-2 font-mono text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-danger">▸</span> {t("increase2024")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-danger">▸</span> {t("increase2025")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-danger">▸</span> {t("increase2026")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("increase2027")}
            </li>
          </ul>
        </section>

        {/* VAT on tickets */}
        <section className="mb-10 rounded border border-warning/30 bg-warning/5 p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-warning">
            {t("vatTitle")}
          </h2>
          <ul className="space-y-2 font-mono text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-warning">▸</span> {t("vatDomestic")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("vatInternational")}
            </li>
          </ul>
        </section>

        <footer className="border-t border-gray-800 pt-4">
          <p className="font-mono text-xs text-gray-600">
            {td("sources")} : {t("sourceText")}
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
