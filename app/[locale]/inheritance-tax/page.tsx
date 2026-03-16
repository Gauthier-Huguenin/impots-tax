import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { localePath } from "@/lib/url";
import { INHERITANCE_BRACKETS, INHERITANCE_DATA, TAX_DATA_YEAR } from "@/lib/tax-data";
import type { Locale } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailInheritanceTax" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    icons: { icon: "/logo.svg" },
  };
}

function formatAmount(amount: number): string {
  return amount.toLocaleString("fr-FR");
}

export default async function InheritanceTaxPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailInheritanceTax" });
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

        {/* Bracket table */}
        <section className="mb-10">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("bracketsTitle")}
          </h2>
          <p className="mb-4 font-mono text-xs text-gray-500">
            {t("allowanceNote")}
          </p>

          <div className="overflow-x-auto rounded border border-gray-800">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-[#0f1218]">
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">
                    {t("bracket")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("rate")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {INHERITANCE_BRACKETS.map((bracket, i) => (
                  <tr key={i} className="border-b border-gray-800/50">
                    <td className="px-4 py-3 text-gray-300">
                      {formatAmount(bracket.min)} € — {bracket.max ? `${formatAmount(bracket.max)} €` : "∞"}
                    </td>
                    <td className={`px-4 py-3 text-right font-bold ${bracket.rate >= 40 ? "text-danger" : bracket.rate >= 20 ? "text-warning" : "text-info"}`}>
                      {bracket.rate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-xs text-gray-500">
            {t("frozenNote")}
          </p>
        </section>

        {/* Other transfers */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("othersTitle")}
          </h2>

          <div className="mb-4">
            <h3 className="mb-2 font-mono text-sm font-bold text-warning">{t("siblingsTitle")}</h3>
            <ul className="space-y-1 font-mono text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-warning">▸</span> {t("siblingsAllowance")}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">▸</span> {t("siblingsRate1")}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">▸</span> {t("siblingsRate2")}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-mono text-sm font-bold text-danger">{t("nonRelativeTitle")}</h3>
            <p className="font-mono text-sm text-gray-400">
              {t("nonRelativeDesc")}
            </p>
          </div>
        </section>

        {/* Life insurance */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("lifeInsuranceTitle")}
          </h2>
          <ul className="space-y-2 font-mono text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("lifeInsuranceBefore70")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("lifeInsuranceAfter70")}
            </li>
          </ul>
        </section>

        {/* Dutreil pact */}
        <section className="mb-10 rounded border border-warning/30 bg-warning/5 p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-warning">
            {t("dutreilTitle")}
          </h2>
          <p className="font-mono text-sm leading-relaxed text-gray-300">
            {t("dutreilDesc")}
          </p>
        </section>

        {/* International comparison */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("comparisonTitle")}
          </h2>
          <div className="overflow-x-auto rounded border border-gray-800">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-[#0f1218]">
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">
                    {t("comparisonCountry")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("comparisonRate")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("comparisonAllowance")}
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-10 rounded border border-danger/30 bg-danger/5 p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-danger">
            {t("statsTitle")}
          </h2>
          <ul className="space-y-2 font-mono text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-danger">▸</span> {t("totalRevenue")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-danger">▸</span> {t("taxedPercent")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("medianInheritance")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("avgInheritance")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">▸</span> {t("inheritanceShare")}
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
