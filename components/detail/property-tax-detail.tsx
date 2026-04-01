"use client";

import { useTranslations } from "next-intl";
import { PROPERTY_TAX_REVALUATION, PROPERTY_TAX_RATES, TAX_DATA_YEAR } from "@/lib/tax-data";
import { FaqSection } from "@/components/detail/faq-section";
import type { FaqItem } from "@/lib/seo";

export function PropertyTaxDetail() {
  const t = useTranslations("detailPropertyTax");
  const td = useTranslations("detail");

  const faqs: FaqItem[] = [
    { question: t("faqQ1"), answer: t("faqA1") },
    { question: t("faqQ2"), answer: t("faqA2") },
    { question: t("faqQ3"), answer: t("faqA3") },
    { question: t("faqQ4"), answer: t("faqA4") },
  ];

  return (
    <>
      <header className="mb-10">
        <h1 className="font-display text-3xl font-bold uppercase tracking-wider text-gray-100 md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 font-mono text-sm uppercase tracking-wide text-warning">
          {t("subtitle")}
        </p>
        <p className="mt-1 font-mono text-xs text-muted">
          {td("dataYear", { year: TAX_DATA_YEAR })}
        </p>
      </header>

      {/* Intro */}
      <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
        <p className="font-mono text-sm leading-relaxed text-gray-300">
          {t("intro")}
        </p>
      </section>

      {/* Calculation formula */}
      <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
          {t("calculTitle")}
        </h2>
        <p className="mb-3 font-mono text-sm text-warning">
          {t("calculFormula")}
        </p>
        <p className="font-mono text-xs text-muted">
          {t("calculNote")}
        </p>
      </section>

      {/* Revaluation table */}
      <section className="mb-10">
        <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
          {t("revaluationTitle")}
        </h2>

        <div className="overflow-x-auto rounded border border-gray-800">
          <table className="w-full font-mono text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0f1218]">
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-muted">
                  {t("revaluationYear")}
                </th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-muted">
                  {t("revaluationRate")}
                </th>
              </tr>
            </thead>
            <tbody>
              {PROPERTY_TAX_REVALUATION.map((row) => (
                <tr key={row.year} className="border-b border-gray-800/50">
                  <td className="px-4 py-3 text-gray-300">{row.year}</td>
                  <td className={`px-4 py-3 text-right ${row.rate >= 3 ? "text-danger" : "text-warning"}`}>
                    +{row.rate}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-mono text-xs text-muted">
          {t("revaluation2026Note")}
        </p>
      </section>

      {/* Key amounts */}
      <section className="mb-10 rounded border border-danger/30 bg-danger/5 p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-danger">
          {t("amountsTitle")}
        </h2>
        <ul className="space-y-2 font-mono text-sm text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-danger">&#9658;</span> {t("totalRevenue")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-danger">&#9658;</span> {t("taxpayers")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-danger">&#9658;</span> {t("avgPerTaxpayer")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">&#9658;</span> {t("avgHouse")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">&#9658;</span> {t("avgApartment")}
          </li>
        </ul>
      </section>

      {/* Rates by city */}
      <section className="mb-10">
        <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
          {t("ratesTitle")}
        </h2>

        <div className="overflow-x-auto rounded border border-gray-800">
          <table className="w-full font-mono text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0f1218]">
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-muted">
                  {t("city")}
                </th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-muted">
                  {t("rate")}
                </th>
              </tr>
            </thead>
            <tbody>
              {PROPERTY_TAX_RATES.map((city) => (
                <tr key={city.key} className="border-b border-gray-800/50">
                  <td className="px-4 py-3 text-gray-300 capitalize">{city.key}</td>
                  <td className={`px-4 py-3 text-right ${city.rate >= 50 ? "text-danger" : city.rate >= 30 ? "text-warning" : "text-favorable"}`}>
                    {city.rate}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-mono text-xs text-muted">
          {t("ratesNote")}
        </p>
      </section>

      {/* Housing tax abolition */}
      <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
          {t("habTaxTitle")}
        </h2>
        <p className="font-mono text-sm leading-relaxed text-gray-300">
          {t("habTaxDesc")}
        </p>
      </section>

      <FaqSection title={t("faqTitle")} faqs={faqs} />

      <footer className="border-t border-gray-800 pt-4">
        <p className="font-mono text-xs text-muted">
          {td("sources")} : {t("sourceText")}
        </p>
        <p className="mt-1 font-mono text-xs text-muted">
          {td("lastUpdated", { date: "Mars 2026" })}
        </p>
      </footer>
    </>
  );
}
