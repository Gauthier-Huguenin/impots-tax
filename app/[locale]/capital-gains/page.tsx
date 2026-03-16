import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { localePath } from "@/lib/url";
import { CAPITAL_GAINS_CTO, CAPITAL_GAINS_PEA, CAPITAL_GAINS_COMPARISON, US_DIVIDEND_TAX, TAX_DATA_YEAR } from "@/lib/tax-data";
import type { Locale } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailCapitalGains" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    icons: { icon: "/logo.svg" },
  };
}

export default async function CapitalGainsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailCapitalGains" });
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

        {/* CTO rates table */}
        <section className="mb-10">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("ctoTitle")}
          </h2>
          <p className="mb-4 font-mono text-sm text-gray-400">
            {t("ctoDesc")}
          </p>

          <div className="overflow-x-auto rounded border border-gray-800">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-[#0f1218]">
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">
                    {t("component")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("rate2025")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("rate2026")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800/50">
                  <td className="px-4 py-3 text-gray-300">IR</td>
                  <td className="px-4 py-3 text-right text-warning">{CAPITAL_GAINS_CTO.flatTax2025.ir}%</td>
                  <td className="px-4 py-3 text-right text-warning">{CAPITAL_GAINS_CTO.flatTax2026.ir}%</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="px-4 py-3 text-gray-300">PS</td>
                  <td className="px-4 py-3 text-right text-warning">{CAPITAL_GAINS_CTO.flatTax2025.social}%</td>
                  <td className="px-4 py-3 text-right text-danger">{CAPITAL_GAINS_CTO.flatTax2026.social}%</td>
                </tr>
                <tr className="bg-danger/10">
                  <td className="px-4 py-3 font-bold text-danger">Total</td>
                  <td className="px-4 py-3 text-right font-bold text-danger">{CAPITAL_GAINS_CTO.flatTax2025.total}%</td>
                  <td className="px-4 py-3 text-right font-bold text-danger">{CAPITAL_GAINS_CTO.flatTax2026.total}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* PEA rates */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("peaTitle")}
          </h2>
          <p className="mb-4 font-mono text-sm leading-relaxed text-gray-300">
            {t("peaDesc")}
          </p>
          <ul className="space-y-2 font-mono text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-favorable">▸</span> IR : {CAPITAL_GAINS_PEA.ir}% (5 ans+)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">▸</span> PS 2025 : {CAPITAL_GAINS_PEA.social2025}%
            </li>
            <li className="flex items-start gap-2">
              <span className="text-danger">▸</span> PS 2026 : {CAPITAL_GAINS_PEA.social2026}%
            </li>
          </ul>
          <p className="mt-3 font-mono text-xs text-gray-500">
            {t("peaNote")}
          </p>
        </section>

        {/* Synthetic ETF trick */}
        <section className="mb-10 rounded border border-warning/30 bg-warning/5 p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-warning">
            {t("syntheticTitle")}
          </h2>
          <p className="font-mono text-sm leading-relaxed text-gray-300">
            {t("syntheticDesc")}
          </p>
        </section>

        {/* 10-year comparison table */}
        <section className="mb-10">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("comparisonTitle")}
          </h2>
          <p className="mb-4 font-mono text-xs text-gray-500">
            {t("comparisonNote")}
          </p>

          <div className="overflow-x-auto rounded border border-gray-800">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-[#0f1218]">
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">
                    {t("envelope")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("finalGross")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("gain")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("tax")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("netFinal")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800/50">
                  <td className="px-4 py-3 text-gray-300">CTO (2026)</td>
                  <td className="px-4 py-3 text-right text-gray-300">{CAPITAL_GAINS_COMPARISON.finalGross.toLocaleString()} €</td>
                  <td className="px-4 py-3 text-right text-gray-300">{CAPITAL_GAINS_COMPARISON.capitalGain.toLocaleString()} €</td>
                  <td className="px-4 py-3 text-right text-danger">{CAPITAL_GAINS_COMPARISON.taxCTO2026.toLocaleString()} €</td>
                  <td className="px-4 py-3 text-right text-warning">{CAPITAL_GAINS_COMPARISON.netCTO2026.toLocaleString()} €</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="px-4 py-3 text-gray-300">PEA (2026)</td>
                  <td className="px-4 py-3 text-right text-gray-300">{CAPITAL_GAINS_COMPARISON.finalGross.toLocaleString()} €</td>
                  <td className="px-4 py-3 text-right text-gray-300">{CAPITAL_GAINS_COMPARISON.capitalGain.toLocaleString()} €</td>
                  <td className="px-4 py-3 text-right text-warning">{CAPITAL_GAINS_COMPARISON.taxPEA2026.toLocaleString()} €</td>
                  <td className="px-4 py-3 text-right text-favorable">{CAPITAL_GAINS_COMPARISON.netPEA2026.toLocaleString()} €</td>
                </tr>
                <tr className="bg-favorable/10">
                  <td className="px-4 py-3 font-bold text-favorable" colSpan={3}>
                    PEA savings
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-favorable" colSpan={2}>
                    +{CAPITAL_GAINS_COMPARISON.savings.toLocaleString()} €
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* US dividend double taxation */}
        <section className="mb-10 rounded border border-danger/30 bg-danger/5 p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-danger">
            {t("usTitle")}
          </h2>
          <p className="mb-3 font-mono text-sm leading-relaxed text-gray-300">
            {t("usDesc")}
          </p>
          <ul className="space-y-2 font-mono text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-danger">▸</span> US withholding: {US_DIVIDEND_TAX.withholdingRate}%
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> FR credit: {US_DIVIDEND_TAX.frenchCreditRate}%
            </li>
            <li className="flex items-start gap-2">
              <span className="text-danger">▸</span> Leakage: {US_DIVIDEND_TAX.leakage}%
            </li>
          </ul>
          <p className="mt-3 font-mono text-xs text-gray-500">
            {t("usNote")}
          </p>
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
