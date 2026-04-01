"use client";

import { useTranslations } from "next-intl";
import { FUEL_BREAKDOWN, FUEL_PRICE, FUEL_TAX_PERCENT, TAX_DATA_YEAR } from "@/lib/tax-data";

export function FuelTaxDetail() {
  const t = useTranslations("detailFuelTax");
  const td = useTranslations("detail");

  const totalTaxAmount = FUEL_BREAKDOWN.filter((c) => c.isTax)
    .reduce((sum, c) => sum + c.amount, 0);

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

      {/* Price breakdown table */}
      <section className="mb-10">
        <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-wider text-blanc">
          {t("breakdownTitle")}
        </h2>

        <div className="overflow-x-auto rounded border border-gray-800">
          <table className="w-full font-mono text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0f1218]">
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-blanc">
                  {t("component")}
                </th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-blanc">
                  {t("amount")}
                </th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-blanc">
                  {t("percent")}
                </th>
              </tr>
            </thead>
            <tbody>
              {FUEL_BREAKDOWN.map((component) => (
                <tr key={component.key} className="border-b border-gray-800/50">
                  <td className={`px-4 py-3 ${component.isTax ? "text-danger" : "text-blanc"}`}>
                    {t(component.key as "crudeOil")}
                  </td>
                  <td className={`px-4 py-3 text-right ${component.isTax ? "text-danger" : "text-blanc"}`}>
                    {component.amount.toFixed(2)} \u20ac
                  </td>
                  <td className={`px-4 py-3 text-right ${component.isTax ? "text-danger" : "text-blanc"}`}>
                    ~{component.percent}%
                  </td>
                </tr>
              ))}
              <tr className="bg-danger/10">
                <td className="px-4 py-3 font-bold text-danger">
                  {t("totalTaxes")}
                </td>
                <td className="px-4 py-3 text-right font-bold text-danger">
                  ~{totalTaxAmount.toFixed(2)} \u20ac
                </td>
                <td className="px-4 py-3 text-right font-bold text-danger">
                  ~{FUEL_TAX_PERCENT}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Visual bar */}
        <div className="mt-4 h-6 w-full overflow-hidden rounded-full bg-gray-800">
          {FUEL_BREAKDOWN.map((component) => (
            <div
              key={component.key}
              className={`inline-block h-full ${component.isTax ? "bg-danger" : "bg-gray-600"}`}
              style={{ width: `${component.percent}%` }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between font-mono text-xs text-blanc">
          <span>{FUEL_PRICE} \u20ac/L</span>
          <span>~{FUEL_TAX_PERCENT}% taxes</span>
        </div>
      </section>

      {/* Tax on tax */}
      <section className="mb-10 rounded border border-danger/30 bg-danger/5 p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-danger">
          {t("taxOnTaxTitle")}
        </h2>
        <p className="font-mono text-sm leading-relaxed text-blanc">
          {t("taxOnTaxDesc")}
        </p>
      </section>

      {/* Accise rates */}
      <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-blanc">
          {t("acciseTitle")}
        </h2>
        <ul className="space-y-2 font-mono text-sm text-blanc">
          <li className="flex items-start gap-2">
            <span className="text-warning">&#9656;</span> {t("acciseSP95")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">&#9656;</span> {t("acciseGazole")}
          </li>
        </ul>
      </section>

      {/* Carbon component */}
      <section className="mb-10 rounded border border-warning/30 bg-warning/5 p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-warning">
          {t("carbonTitle")}
        </h2>
        <p className="font-mono text-sm leading-relaxed text-blanc">
          {t("carbonDesc")}
        </p>
      </section>

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
