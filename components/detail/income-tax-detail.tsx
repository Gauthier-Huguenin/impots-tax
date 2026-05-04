"use client";

import { useTranslations } from "next-intl";
import { IR_BRACKETS, TAX_DATA_YEAR } from "@/lib/tax-data";
import { FaqSection } from "@/components/detail/faq-section";
import { QuickAnswer } from "@/components/detail/quick-answer";
import { RelatedReports, type RelatedReport } from "@/components/detail/related-reports";
import type { FaqItem } from "@/lib/seo";

const BRACKET_COLORS = [
  "text-slate-400",
  "text-favorable",
  "text-warning",
  "text-orange-400",
  "text-danger",
];

const BRACKET_BG = [
  "bg-slate-600/10 border-slate-600/30",
  "bg-favorable/10 border-favorable/30",
  "bg-warning/10 border-warning/30",
  "bg-orange-500/10 border-orange-500/30",
  "bg-danger/10 border-danger/30",
];

const BRACKET_BAR = [
  "bg-slate-600",
  "bg-favorable",
  "bg-warning",
  "bg-orange-500",
  "bg-danger",
];

export function IncomeTaxDetail() {
  const t = useTranslations("detailIncomeTax");
  const td = useTranslations("detail");

  const faqs: FaqItem[] = [
    { question: t("faqQ1"), answer: t("faqA1") },
    { question: t("faqQ2"), answer: t("faqA2") },
    { question: t("faqQ3"), answer: t("faqA3") },
    { question: t("faqQ4"), answer: t("faqA4") },
  ];
  const relatedReports: RelatedReport[] = [
    {
      href: "/flat-tax",
      title: t("relatedFlatTaxTitle"),
      description: t("relatedFlatTaxDesc"),
    },
    {
      href: "/salary-contributions",
      title: t("relatedSalaryTitle"),
      description: t("relatedSalaryDesc"),
    },
    {
      href: "/comparison",
      title: t("relatedComparisonTitle"),
      description: t("relatedComparisonDesc"),
    },
  ];

  return (
    <>
      {/* Header */}
      <header className="mb-10">
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-wider text-blanc md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 font-mono text-sm font-medium uppercase tracking-wide text-warning">
          {t("subtitle")}
        </p>
        <p className="mt-1 font-mono text-xs font-light text-blanc">
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

      {/* Tax brackets */}
      <section className="mb-10">
        <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-wider text-blanc">
          {t("bracketsTitle")}
        </h2>
        <p className="mb-4 font-mono text-xs font-light text-blanc">{t("perShare")}</p>

        <div className="space-y-3">
          {IR_BRACKETS.map((bracket, i) => (
            <div
              key={i}
              className={`rounded border p-4 ${BRACKET_BG[i]}`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="font-mono text-xs font-medium uppercase tracking-wide text-blanc">
                    {t("bracket", { number: i + 1 })} — {t(`bracketLabel${i}` as "bracketLabel0")}
                  </div>
                  <div className="mt-1 font-mono text-sm text-blanc">
                    {t(`bracketRange${i}` as "bracketRange0")}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-800 sm:w-32">
                    <div
                      className={`h-full rounded-full ${BRACKET_BAR[i]}`}
                      style={{ width: `${(bracket.rate / 45) * 100}%` }}
                    />
                  </div>
                  <span className={`font-mono text-2xl font-black ${BRACKET_COLORS[i]} ${i === 4 ? "animate-glow" : ""}`}>
                    {bracket.rate}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Family quotient */}
      <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-blanc">
          {t("quotientTitle")}
        </h2>
        <p className="mb-4 font-mono text-sm leading-relaxed text-blanc">
          {t("quotientDesc")}
        </p>
        <ul className="space-y-2 font-mono text-sm font-light text-blanc">
          <li className="flex items-start gap-2">
            <span className="text-blanc">▸</span> {t("quotientAdult")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blanc">▸</span> {t("quotientChild")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blanc">▸</span> {t("quotientChild3")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">▸</span> {t("quotientCap")}
          </li>
        </ul>
      </section>

      {/* CDHR 2026 */}
      <section className="mb-10 rounded border border-danger/30 bg-danger/5 p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-danger">
          {t("cdhrTitle")}
        </h2>
        <p className="font-mono text-sm leading-relaxed text-blanc">
          {t("cdhrDesc")}
        </p>
      </section>

      {/* Indexation note */}
      <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-4">
        <p className="font-mono text-xs font-light text-blanc">
          {t("indexation")}
        </p>
      </section>

      <FaqSection title={t("faqTitle")} faqs={faqs} />

      <RelatedReports title={td("relatedReports")} reports={relatedReports} />

      {/* Source */}
      <footer className="border-t border-gray-800 pt-4">
        <p className="font-mono text-xs font-light text-blanc">
          {td("source")} : {t("sourceText")}
        </p>
        <p className="mt-1 font-mono text-xs font-light text-blanc">
          {td("lastUpdated", { date: "Mars 2026" })}
        </p>
      </footer>
    </>
  );
}
