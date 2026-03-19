"use client";

import { useTranslations } from "next-intl";
import { MACRO_INDICATORS, TAX_DATA_YEAR, USSR_COMPARISON } from "@/lib/tax-data";

export function IndicatorsDetail() {
  const t = useTranslations("detailIndicators");
  const td = useTranslations("detail");

  return (
    <>
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

      {/* Indicator cards */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Public debt */}
        <div className="rounded border border-danger/30 bg-danger/5 p-6">
          <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wider text-danger">
            {t("debtTitle")}
          </h2>
          <div className="font-mono text-3xl font-bold text-danger">
            {MACRO_INDICATORS.publicDebt.toLocaleString()} Mds €
          </div>
          <p className="mt-2 font-mono text-sm text-gray-300">
            {t("debtRatio")}
          </p>
          <p className="mt-3 font-mono text-xs leading-relaxed text-gray-500">
            {t("debtNote")}
          </p>
        </div>

        {/* Public spending */}
        <div className="rounded border border-warning/30 bg-warning/5 p-6">
          <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wider text-warning">
            {t("spendingTitle")}
          </h2>
          <div className="font-mono text-3xl font-bold text-warning">
            {MACRO_INDICATORS.spendingToGdp}%
          </div>
          <p className="mt-2 font-mono text-sm text-gray-300">
            {t("spendingRatio")}
          </p>
          <p className="mt-3 font-mono text-xs leading-relaxed text-gray-500">
            {t("spendingNote")}
          </p>
        </div>

        {/* USSR spending comparison */}
        <div className="rounded border border-dashed border-warning/40 bg-warning/5 p-6">
          <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wider text-warning">
            ☭ {t("ussrSpendingTitle")}
          </h2>
          <div className="flex items-end gap-4">
            <div className="text-center">
              <div className="font-mono text-2xl font-bold text-danger">
                {MACRO_INDICATORS.spendingToGdp}%
              </div>
              <p className="font-mono text-[10px] text-slate-300">France 2024</p>
            </div>
            <div className="font-mono text-lg text-gray-500">&gt;</div>
            <div className="text-center">
              <div className="font-mono text-2xl font-bold text-warning">
                ~{USSR_COMPARISON.spendingToGdp}%
              </div>
              <p className="font-mono text-[10px] text-slate-300">URSS {USSR_COMPARISON.period}</p>
            </div>
          </div>
          <p className="mt-3 font-mono text-xs leading-relaxed text-gray-500">
            {t("ussrSpendingNote")}
          </p>
        </div>

        {/* Deficit */}
        <div className="rounded border border-danger/30 bg-danger/5 p-6 sm:col-span-2">
          <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wider text-danger">
            {t("deficitTitle")}
          </h2>
          <div className="font-mono text-3xl font-bold text-danger">
            {MACRO_INDICATORS.deficit}%
          </div>
          <p className="mt-2 font-mono text-sm text-gray-300">
            {t("deficitRatio")}
          </p>
          <p className="mt-3 font-mono text-xs leading-relaxed text-gray-500">
            {t("deficitNote")}
          </p>
        </div>
      </div>

      {/* Other indicators */}
      <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
          {t("otherTitle")}
        </h2>
        <ul className="space-y-2 font-mono text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-blanc">▸</span> {t("smicNet")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blanc">▸</span> {t("medianSalary")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blanc">▸</span> {t("plafondSS")}
          </li>
        </ul>
      </section>

      {/* Summary */}
      <section className="mb-10 rounded border border-danger/30 bg-danger/5 p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-danger">
          {t("summaryTitle")}
        </h2>
        <p className="font-mono text-sm leading-relaxed text-gray-300">
          {t("summaryDesc")}
        </p>
      </section>

      <footer className="border-t border-gray-800 pt-4">
        <p className="font-mono text-xs text-gray-500">
          {td("source")} : {t("sourceText")}
        </p>
        <p className="mt-1 font-mono text-xs text-gray-500">
          {td("lastUpdated", { date: "Mars 2026" })}
        </p>
      </footer>
    </>
  );
}
