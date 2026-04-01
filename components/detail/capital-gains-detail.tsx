"use client";

import { useTranslations } from "next-intl";
import { CAPITAL_GAINS_CTO, CAPITAL_GAINS_PEA, CAPITAL_GAINS_COMPARISON, US_DIVIDEND_TAX, TAX_DATA_YEAR } from "@/lib/tax-data";

export function CapitalGainsDetail() {
  const t = useTranslations("detailCapitalGains");
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

      {/* CTO rates table */}
      <section className="mb-10">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
          {t("ctoTitle")}
        </h2>
        <p className="mb-4 font-mono text-sm text-slate-300">
          {t("ctoDesc")}
        </p>

        <div className="overflow-x-auto rounded border border-gray-800">
          <table className="w-full font-mono text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0f1218]">
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-muted">
                  {t("component")}
                </th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-muted">
                  {t("rate2025")}
                </th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-muted">
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
        <ul className="space-y-2 font-mono text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-favorable">&#9658;</span> IR : {CAPITAL_GAINS_PEA.ir}% (5 ans+)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">&#9658;</span> PS 2025 : {CAPITAL_GAINS_PEA.social2025}%
          </li>
          <li className="flex items-start gap-2">
            <span className="text-danger">&#9658;</span> PS 2026 : {CAPITAL_GAINS_PEA.social2026}%
          </li>
        </ul>
        <p className="mt-3 font-mono text-xs text-muted">
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
        <p className="mb-4 font-mono text-xs text-muted">
          {t("comparisonNote")}
        </p>

        <div className="overflow-x-auto rounded border border-gray-800">
          <table className="w-full font-mono text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0f1218]">
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-muted">
                  {t("envelope")}
                </th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-muted">
                  {t("finalGross")}
                </th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-muted">
                  {t("gain")}
                </th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-muted">
                  {t("tax")}
                </th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-muted">
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
        <ul className="space-y-2 font-mono text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-danger">&#9658;</span> US withholding: {US_DIVIDEND_TAX.withholdingRate}%
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blanc">&#9658;</span> FR credit: {US_DIVIDEND_TAX.frenchCreditRate}%
          </li>
          <li className="flex items-start gap-2">
            <span className="text-danger">&#9658;</span> Leakage: {US_DIVIDEND_TAX.leakage}%
          </li>
        </ul>
        <p className="mt-3 font-mono text-xs text-muted">
          {t("usNote")}
        </p>
      </section>

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
