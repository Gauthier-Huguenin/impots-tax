"use client";

import { useTranslations } from "next-intl";
import { FLAT_TAX_2025, FLAT_TAX_2026, TAX_DATA_YEAR } from "@/lib/tax-data";
import { FaqSection } from "@/components/detail/faq-section";
import { QuickAnswer } from "@/components/detail/quick-answer";
import { RelatedReports, type RelatedReport } from "@/components/detail/related-reports";
import type { FaqItem } from "@/lib/seo";

export function FlatTaxDetail() {
  const t = useTranslations("detailFlatTax");
  const td = useTranslations("detail");

  const faqs: FaqItem[] = [
    { question: t("faqQ1"), answer: t("faqA1") },
    { question: t("faqQ2"), answer: t("faqA2") },
    { question: t("faqQ3"), answer: t("faqA3") },
    { question: t("faqQ4"), answer: t("faqA4") },
  ];
  const relatedReports: RelatedReport[] = [
    {
      href: "/capital-gains",
      title: t("relatedCapitalGainsTitle"),
      description: t("relatedCapitalGainsDesc"),
    },
    {
      href: "/income-tax",
      title: t("relatedIncomeTaxTitle"),
      description: t("relatedIncomeTaxDesc"),
    },
    {
      href: "/vat",
      title: t("relatedVatTitle"),
      description: t("relatedVatDesc"),
    },
  ];

  return (
    <>
      {/* Header */}
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

      <QuickAnswer title={t("quickAnswerTitle")} answer={t("quickAnswer")} />

      {/* Intro */}
      <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
        <p className="font-mono text-sm leading-relaxed text-blanc">
          {t("intro")}
        </p>
      </section>

      {/* 2025 vs 2026 comparison */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* 2025 */}
        <div className="rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wider text-blanc">
            {t("rates2025Title")}
          </h2>
          <table className="w-full font-mono text-sm">
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="py-2 text-blanc">{t("componentIR")}</td>
                <td className="py-2 text-right text-blanc">{FLAT_TAX_2025.ir}%</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 text-blanc">{t("componentSocial")}</td>
                <td className="py-2 text-right text-warning">{FLAT_TAX_2025.social}%</td>
              </tr>
              <tr>
                <td className="py-2 font-bold text-blanc">{t("componentTotal")}</td>
                <td className="py-2 text-right text-2xl font-bold text-blanc">{FLAT_TAX_2025.total}%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 2026 */}
        <div className="rounded border border-danger/30 bg-danger/5 p-6">
          <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wider text-danger">
            {t("rates2026Title")}
          </h2>
          <table className="w-full font-mono text-sm">
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="py-2 text-blanc">{t("componentIR")}</td>
                <td className="py-2 text-right text-blanc">{FLAT_TAX_2026.ir}%</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 text-blanc">{t("componentSocial")}</td>
                <td className="py-2 text-right text-danger">{FLAT_TAX_2026.social}%</td>
              </tr>
              <tr>
                <td className="py-2 font-bold text-blanc">{t("componentTotal")}</td>
                <td className="py-2 text-right text-2xl font-bold text-danger">{FLAT_TAX_2026.total}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Change explanation */}
      <section className="mb-10 rounded border border-danger/30 bg-danger/5 p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-danger">
          {t("changeTitle")}
        </h2>
        <p className="font-mono text-sm leading-relaxed text-blanc">
          {t("changeDesc")}
        </p>
      </section>

      {/* Scope */}
      <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-blanc">
          {t("scopeTitle")}
        </h2>
        <ul className="space-y-2 font-mono text-sm text-blanc">
          <li className="flex items-start gap-2">
            <span className="text-blanc">▸</span> {t("scopeDividends")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blanc">▸</span> {t("scopeInterest")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blanc">▸</span> {t("scopeCapitalGains")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blanc">▸</span> {t("scopeCrypto")}
          </li>
        </ul>
      </section>

      {/* Exceptions */}
      <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-blanc">
          {t("exceptionTitle")}
        </h2>
        <p className="font-mono text-sm leading-relaxed text-blanc">
          {t("exceptionDesc")}
        </p>
      </section>

      {/* Progressive scale option */}
      <section className="mb-10 rounded border-2 border-blanc bg-blanc/5 p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-blanc">
          {t("optionTitle")}
        </h2>
        <p className="font-mono text-sm leading-relaxed text-blanc">
          {t("optionDesc")}
        </p>
      </section>

      <FaqSection title={t("faqTitle")} faqs={faqs} />

      <RelatedReports title={td("relatedReports")} reports={relatedReports} />

      {/* Source */}
      <footer className="border-t border-gray-800 pt-4">
        <p className="font-mono text-xs text-blanc">
          {td("source")} : {t("sourceText")}
        </p>
        <p className="mt-1 font-mono text-xs text-blanc">
          {td("lastUpdated", { date: "Avril 2026" })}
        </p>
      </footer>
    </>
  );
}
