"use client";

import { useTranslations } from "next-intl";
import { HIGHWAY_ROUTES, HIGHWAY_CONCESSIONS, TAX_DATA_YEAR } from "@/lib/tax-data";

export function HighwayTollsDetail() {
  const t = useTranslations("detailHighwayTolls");
  const td = useTranslations("detail");

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

      {/* Intro */}
      <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
        <p className="font-mono text-sm leading-relaxed text-blanc">
          {t("intro")}
        </p>
      </section>

      {/* Concessions table */}
      <section className="mb-10">
        <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-wider text-blanc">
          {t("concessionsTitle")}
        </h2>

        <div className="overflow-x-auto rounded border border-gray-800">
          <table className="w-full font-mono text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0f1218]">
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-blanc">
                  {t("company")}
                </th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-blanc">
                  {t("group")}
                </th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-blanc">
                  {t("endDate")}
                </th>
              </tr>
            </thead>
            <tbody>
              {HIGHWAY_CONCESSIONS.map((concession) => (
                <tr key={concession.key} className="border-b border-gray-800/50">
                  <td className="px-4 py-3 uppercase text-blanc">{concession.key}</td>
                  <td className="px-4 py-3 text-blanc">{concession.group}</td>
                  <td className="px-4 py-3 text-right text-warning">{concession.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Route prices table */}
      <section className="mb-10">
        <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-wider text-blanc">
          {t("routesTitle")}
        </h2>

        <div className="overflow-x-auto rounded border border-gray-800">
          <table className="w-full font-mono text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0f1218]">
                <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-blanc">
                  {t("route")}
                </th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-blanc">
                  {t("toll")}
                </th>
              </tr>
            </thead>
            <tbody>
              {HIGHWAY_ROUTES.map((route) => (
                <tr key={route.key} className="border-b border-gray-800/50">
                  <td className="px-4 py-3 text-blanc">
                    {t(route.key as "parisLyon")}
                  </td>
                  <td className="px-4 py-3 text-right text-danger">
                    {route.toll.toFixed(2)} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Annual increases */}
      <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-blanc">
          {t("increasesTitle")}
        </h2>
        <ul className="space-y-2 font-mono text-sm text-blanc">
          <li className="flex items-start gap-2">
            <span className="text-danger">▸</span> {t("increase2024")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">▸</span> {t("increase2025")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">▸</span> {t("increase2026")}
          </li>
        </ul>
      </section>

      {/* Financials */}
      <section className="mb-10 rounded border border-danger/30 bg-danger/5 p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-danger">
          {t("financialsTitle")}
        </h2>
        <ul className="space-y-2 font-mono text-sm text-blanc">
          <li className="flex items-start gap-2">
            <span className="text-danger">▸</span> {t("totalRevenue")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-danger">▸</span> {t("totalProfits")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-danger">▸</span> {t("dividends")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">▸</span> {t("stateShare")}
          </li>
        </ul>
      </section>

      {/* Breakdown of 1€ */}
      <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-blanc">
          {t("breakdownTitle")}
        </h2>

        <div className="mb-4 h-6 w-full overflow-hidden rounded-full bg-gray-800">
          <div className="inline-block h-full bg-danger" style={{ width: "42%" }} />
          <div className="inline-block h-full bg-favorable" style={{ width: "25%" }} />
          <div className="inline-block h-full bg-warning" style={{ width: "33%" }} />
        </div>

        <ul className="space-y-2 font-mono text-sm text-blanc">
          <li className="flex items-start gap-2">
            <span className="text-danger">▸</span> {t("stateSlice")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-favorable">▸</span> {t("maintenanceSlice")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">▸</span> {t("profitSlice")}
          </li>
        </ul>
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
