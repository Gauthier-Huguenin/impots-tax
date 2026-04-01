"use client";

import { useTranslations } from "next-intl";
import { SOCIAL_CONTRIBUTIONS, SOCIAL_CONTRIBUTIONS_TOTALS, TAX_DATA_YEAR, USSR_COMPARISON } from "@/lib/tax-data";
import { FaqSection } from "@/components/detail/faq-section";
import type { FaqItem } from "@/lib/seo";

const JOURNEY_ROWS = [
  { key: "stepEmployerCost", amount: "~230 \u20ac", desc: "stepEmployerCostDesc" },
  { key: "stepEmployerContrib", amount: "~54 \u20ac", desc: "stepEmployerContribDesc", isTax: true },
  { key: "stepGross", amount: "~176 \u20ac", desc: "stepGrossDesc" },
  { key: "stepEmployeeContrib", amount: "~26 \u20ac", desc: "stepEmployeeContribDesc", isTax: true },
  { key: "stepNetBeforeTax", amount: "~150 \u20ac", desc: "stepNetBeforeTaxDesc" },
  { key: "stepIR", amount: "~20 \u20ac", desc: "stepIRDesc", isTax: true },
  { key: "stepNetAfterTax", amount: "~130 \u20ac", desc: "stepNetAfterTaxDesc" },
  { key: "stepVAT", amount: "~22 \u20ac", desc: "stepVATDesc", isTax: true },
  { key: "stepPurchasingPower", amount: "~108 \u20ac", desc: "stepPurchasingPowerDesc", isResult: true },
] as const;

export function SalaryContributionsDetail() {
  const t = useTranslations("detailSalaryContributions");
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
        <h1 className="font-display text-3xl font-bold uppercase tracking-wider text-blanc md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 font-mono text-sm uppercase tracking-wide text-warning">
          {t("subtitle")}
        </p>
        <p className="mt-1 font-mono text-xs text-blanc">
          {td("dataYear", { year: TAX_DATA_YEAR })}
        </p>
      </header>

      <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
        <p className="font-mono text-sm leading-relaxed text-blanc">
          {t("intro")}
        </p>
      </section>

      {/* Reference data */}
      <section className="mb-10 rounded border-2 border-blanc bg-blanc/5 p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-blanc">
          {t("referenceTitle")}
        </h2>
        <ul className="space-y-2 font-mono text-sm text-blanc">
          <li className="flex items-start gap-2">
            <span className="text-blanc">&#9656;</span> {t("pmss")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blanc">&#9656;</span> {t("pass")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blanc">&#9656;</span> {t("smic")}
          </li>
        </ul>
      </section>

      {/* Contributions table */}
      <section className="mb-10">
        <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-wider text-blanc">
          {t("tableTitle")}
        </h2>

        <div className="overflow-x-auto rounded border border-gray-800">
          <table className="w-full font-mono text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0f1218]">
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-blanc">
                  {t("contribution")}
                </th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-blanc">
                  {t("employer")}
                </th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-blanc">
                  {t("employee")}
                </th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-blanc">
                  {t("total")}
                </th>
              </tr>
            </thead>
            <tbody>
              {SOCIAL_CONTRIBUTIONS.map((contrib) => (
                <tr key={contrib.key} className="border-b border-gray-800/50">
                  <td className="px-4 py-3 text-blanc">
                    {t(contrib.key as "health")}
                  </td>
                  <td className="px-4 py-3 text-right text-warning">
                    {contrib.employer !== null ? `${contrib.employer}%` : "\u2014"}
                  </td>
                  <td className="px-4 py-3 text-right text-info">
                    {contrib.employee !== null ? `${contrib.employee}%` : "\u2014"}
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

      {/* USSR comparison callout */}
      <section className="mb-10 rounded border border-dashed border-warning/40 bg-warning/5 p-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">&#9773;</span>
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-warning">
              {t("ussrTitle")}
            </h3>
            <p className="mt-2 font-mono text-sm leading-relaxed text-blanc">
              {t("ussrDesc", {
                frRate: SOCIAL_CONTRIBUTIONS_TOTALS.total,
                ussrRate: USSR_COMPARISON.socialContributions,
                delta: SOCIAL_CONTRIBUTIONS_TOTALS.total - USSR_COMPARISON.socialContributions,
              })}
            </p>
            <p className="mt-2 font-mono text-xs text-blanc">
              {t("ussrSource")}
            </p>
          </div>
        </div>
      </section>

      {/* Tactical notes */}
      <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-blanc">
          {t("notesTitle")}
        </h2>
        <ul className="space-y-2 font-mono text-xs text-blanc">
          <li className="flex items-start gap-2">
            <span className="text-warning">&#9656;</span> {t("note1")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">&#9656;</span> {t("note2")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blanc">&#9656;</span> {t("note3")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blanc">&#9656;</span> {t("note4")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blanc">&#9656;</span> {t("note5")}
          </li>
        </ul>
      </section>

      {/* Journey of 100 euros */}
      <section className="mb-10">
        <h2 className="mb-2 font-display text-xl font-bold uppercase tracking-wider text-blanc">
          {t("journeyTitle")}
        </h2>
        <p className="mb-6 font-mono text-xs text-blanc">{t("journeySubtitle")}</p>

        <div className="overflow-x-auto rounded border border-gray-800">
          <table className="w-full font-mono text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0f1218]">
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-blanc">
                  {t("step")}
                </th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-blanc">
                  {t("stepAmount")}
                </th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-blanc">
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
                          : "text-blanc"
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
                          : "text-blanc"
                    }`}
                  >
                    {row.amount}
                  </td>
                  <td className="px-4 py-3 text-xs text-blanc">
                    {t(row.desc)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <FaqSection title={t("faqTitle")} faqs={faqs} />

      <footer className="border-t border-gray-800 pt-4">
        <p className="font-mono text-xs text-blanc">
          {td("sources")} : {t("sourceText")}
        </p>
        <p className="mt-1 font-mono text-xs text-blanc">
          {td("lastUpdated", { date: "Mars 2026" })}
        </p>
      </footer>
    </>
  );
}
