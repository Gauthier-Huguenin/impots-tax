import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { localePath } from "@/lib/url";
import { SOCIAL_CONTRIBUTIONS, SOCIAL_CONTRIBUTIONS_TOTALS, TAX_DATA_YEAR } from "@/lib/tax-data";
import type { Locale } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailSalaryContributions" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    icons: { icon: "/logo.svg" },
  };
}

const JOURNEY_ROWS = [
  { key: "stepEmployerCost", amount: "~230 €", desc: "stepEmployerCostDesc" },
  { key: "stepEmployerContrib", amount: "~54 €", desc: "stepEmployerContribDesc", isTax: true },
  { key: "stepGross", amount: "~176 €", desc: "stepGrossDesc" },
  { key: "stepEmployeeContrib", amount: "~26 €", desc: "stepEmployeeContribDesc", isTax: true },
  { key: "stepNetBeforeTax", amount: "~150 €", desc: "stepNetBeforeTaxDesc" },
  { key: "stepIR", amount: "~20 €", desc: "stepIRDesc", isTax: true },
  { key: "stepNetAfterTax", amount: "~130 €", desc: "stepNetAfterTaxDesc" },
  { key: "stepVAT", amount: "~22 €", desc: "stepVATDesc", isTax: true },
  { key: "stepPurchasingPower", amount: "~108 €", desc: "stepPurchasingPowerDesc", isResult: true },
] as const;

export default async function SalaryContributionsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailSalaryContributions" });
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

        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <p className="font-mono text-sm leading-relaxed text-gray-300">
            {t("intro")}
          </p>
        </section>

        {/* Reference data */}
        <section className="mb-10 rounded border border-info/30 bg-info/5 p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-info">
            {t("referenceTitle")}
          </h2>
          <ul className="space-y-2 font-mono text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("pmss")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("pass")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("smic")}
            </li>
          </ul>
        </section>

        {/* Contributions table */}
        <section className="mb-10">
          <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("tableTitle")}
          </h2>

          <div className="overflow-x-auto rounded border border-gray-800">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-[#0f1218]">
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">
                    {t("contribution")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("employer")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("employee")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("total")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {SOCIAL_CONTRIBUTIONS.map((contrib) => (
                  <tr key={contrib.key} className="border-b border-gray-800/50">
                    <td className="px-4 py-3 text-gray-300">
                      {t(contrib.key as "health")}
                    </td>
                    <td className="px-4 py-3 text-right text-warning">
                      {contrib.employer !== null ? `${contrib.employer}%` : "—"}
                    </td>
                    <td className="px-4 py-3 text-right text-info">
                      {contrib.employee !== null ? `${contrib.employee}%` : "—"}
                    </td>
                    <td className="px-4 py-3 text-right text-danger">
                      {contrib.total}%
                    </td>
                  </tr>
                ))}
                <tr className="bg-danger/10">
                  <td className="px-4 py-3 font-bold text-danger">
                    {t("totalRow")}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-warning">
                    ~{SOCIAL_CONTRIBUTIONS_TOTALS.employer}%
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-info">
                    ~{SOCIAL_CONTRIBUTIONS_TOTALS.employee}%
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-danger">
                    ~{SOCIAL_CONTRIBUTIONS_TOTALS.total}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Tactical notes */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("notesTitle")}
          </h2>
          <ul className="space-y-2 font-mono text-xs text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-warning">▸</span> {t("note1")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">▸</span> {t("note2")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("note3")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("note4")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("note5")}
            </li>
          </ul>
        </section>

        {/* Journey of 100€ */}
        <section className="mb-10">
          <h2 className="mb-2 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("journeyTitle")}
          </h2>
          <p className="mb-6 font-mono text-xs text-gray-500">{t("journeySubtitle")}</p>

          <div className="overflow-x-auto rounded border border-gray-800">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-[#0f1218]">
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">
                    {t("step")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("stepAmount")}
                  </th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">
                    {t("stepDescription")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {JOURNEY_ROWS.map((row) => (
                  <tr
                    key={row.key}
                    className={`border-b border-gray-800/50 ${
                      "isResult" in row && row.isResult
                        ? "bg-favorable/10"
                        : "isTax" in row && row.isTax
                          ? "bg-danger/5"
                          : ""
                    }`}
                  >
                    <td
                      className={`px-4 py-3 ${
                        "isResult" in row && row.isResult
                          ? "font-bold text-favorable"
                          : "isTax" in row && row.isTax
                            ? "text-danger"
                            : "text-gray-300"
                      }`}
                    >
                      {t(row.key)}
                    </td>
                    <td
                      className={`px-4 py-3 text-right ${
                        "isResult" in row && row.isResult
                          ? "font-bold text-favorable"
                          : "isTax" in row && row.isTax
                            ? "text-danger"
                            : "text-gray-300"
                      }`}
                    >
                      {row.amount}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {t(row.desc)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
