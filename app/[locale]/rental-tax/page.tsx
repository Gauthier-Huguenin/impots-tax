import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { localePath } from "@/lib/url";
import { LMNP_MICRO_BIC, AIRBNB_STATS, TAX_DATA_YEAR } from "@/lib/tax-data";
import type { Locale } from "@/lib/i18n/config";
import { buildSeoMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailRentalTax" });

  return buildSeoMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale: locale as Locale,
    path: "/rental-tax",
  });
}

export default async function RentalTaxPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailRentalTax" });
  const td = await getTranslations({ locale, namespace: "detail" });
  const typedLocale = locale as Locale;

  return (
    <div className="flex min-h-screen flex-col bg-background">
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

        {/* Micro-BIC thresholds table */}
        <section className="mb-10">
          <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("microBicTitle")}
          </h2>

          <div className="overflow-x-auto rounded border border-gray-800">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-[#0f1218]">
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">
                    {t("type")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("ceiling")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("allowance")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("before")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {LMNP_MICRO_BIC.map((row) => (
                  <tr key={row.key} className="border-b border-gray-800/50">
                    <td className="px-4 py-3 text-gray-300">
                      {t(row.key as "unclassifiedTourism")}
                    </td>
                    <td className="px-4 py-3 text-right text-warning">
                      {row.ceiling.toLocaleString()} €
                    </td>
                    <td className={`px-4 py-3 text-right ${row.allowance <= 30 ? "text-danger" : "text-info"}`}>
                      {row.allowance}%
                    </td>
                    <td className="px-4 py-3 text-right text-gray-500">
                      {row.before}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Depreciation reintegration */}
        <section className="mb-10 rounded border border-danger/30 bg-danger/5 p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-danger">
            {t("depreciationTitle")}
          </h2>
          <p className="mb-3 font-mono text-sm leading-relaxed text-gray-300">
            {t("depreciationDesc")}
          </p>
          <p className="font-mono text-xs text-gray-500">
            {t("depreciationException")}
          </p>
        </section>

        {/* Loi Le Meur */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("loiLeMeurTitle")}
          </h2>
          <p className="mb-4 font-mono text-sm leading-relaxed text-gray-300">
            {t("loiLeMeurDesc")}
          </p>
          <ul className="space-y-2 font-mono text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-warning">▸</span> {t("measure1")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">▸</span> {t("measure2")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">▸</span> {t("measure3")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">▸</span> {t("measure4")}
            </li>
          </ul>
        </section>

        {/* Airbnb statistics */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("statsTitle")}
          </h2>
          <ul className="space-y-2 font-mono text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("activeListings")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("parisListings")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("avgIncome")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("avgRate")}
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
