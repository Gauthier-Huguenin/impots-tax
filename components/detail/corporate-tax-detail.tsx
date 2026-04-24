"use client";

import { useTranslations } from "next-intl";
import { CORPORATE_TAX, TAX_DATA_YEAR } from "@/lib/tax-data";

export function CorporateTaxDetail() {
  const t = useTranslations("detailCorporateTax");
  const td = useTranslations("detail");

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

      {/* Intro */}
      <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
        <p className="font-mono text-sm leading-relaxed text-blanc">
          {t("intro")}
        </p>
      </section>

      {/* Rate cards */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Normal rate */}
        <div className="rounded border border-danger/30 bg-danger/5 p-6">
          <div className="font-mono text-xs uppercase tracking-wide text-blanc">
            {t("normalRateTitle")}
          </div>
          <div className="mt-2 font-mono text-5xl font-bold text-danger">
            {CORPORATE_TAX.normalRate}%
          </div>
          <p className="mt-3 font-mono text-xs leading-relaxed text-blanc">
            {t("normalRateDesc")}
          </p>
        </div>

        {/* PME rate */}
        <div className="rounded border border-warning/30 bg-warning/5 p-6">
          <div className="font-mono text-xs uppercase tracking-wide text-blanc">
            {t("pmeRateTitle")}
          </div>
          <div className="mt-2 font-mono text-5xl font-bold text-warning">
            {CORPORATE_TAX.pmeRate}%
          </div>
          <p className="mt-3 font-mono text-xs leading-relaxed text-blanc">
            {t("pmeRateDesc")}
          </p>
        </div>
      </div>

      {/* PME conditions */}
      <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-blanc">
          {t("pmeConditionsTitle")}
        </h2>
        <ul className="space-y-2 font-mono text-sm text-blanc">
          <li className="flex items-start gap-2">
            <span className="text-blanc">▸</span> {t("pmeCondition1")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blanc">▸</span> {t("pmeCondition2")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blanc">▸</span> {t("pmeCondition3")}
          </li>
        </ul>
        <p className="mt-4 font-mono text-xs text-warning">
          {t("pmeThreshold")}
        </p>
      </section>

      {/* Social contribution on IS */}
      <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-blanc">
          {t("socialContributionTitle")}
        </h2>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-3xl font-bold text-warning">
            {CORPORATE_TAX.socialContribution}%
          </span>
        </div>
        <p className="mt-3 font-mono text-sm leading-relaxed text-blanc">
          {t("socialContributionDesc")}
        </p>
      </section>

      {/* Exceptional contribution */}
      <section className="mb-10 rounded border border-danger/30 bg-danger/5 p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-danger">
          {t("exceptionalTitle")}
        </h2>
        <p className="mb-4 font-mono text-sm leading-relaxed text-blanc">
          {t("exceptionalDesc")}
        </p>
        <ul className="space-y-2 font-mono text-sm text-blanc">
          <li className="flex items-start gap-2">
            <span className="text-danger">▸</span> {t("exceptionalRate1")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-danger">▸</span> {t("exceptionalRate2")}
          </li>
        </ul>
        <p className="mt-4 font-mono text-xs text-blanc">
          {t("exceptionalNote")}
        </p>
      </section>

      {/* Pending */}
      <section className="mb-10 rounded border-2 border-blanc bg-blanc/5 p-6">
        <h2 className="mb-2 font-display text-lg font-bold uppercase tracking-wider text-blanc">
          {t("pendingTitle")}
        </h2>
        <p className="font-mono text-sm leading-relaxed text-blanc">
          {t("pendingDesc")}
        </p>
      </section>

      {/* Source */}
      <footer className="border-t border-gray-800 pt-4">
        <p className="font-mono text-xs text-blanc">
          {td("source")} : {t("sourceText")}
        </p>
        <p className="mt-1 font-mono text-xs text-blanc">
          {td("lastUpdated", { date: "24 avril 2026" })}
        </p>
      </footer>
    </>
  );
}
