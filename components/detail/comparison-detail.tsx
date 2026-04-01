"use client";

import { useTranslations } from "next-intl";
import { OECD_COMPARISON, FRANCE_OECD_DELTA, TAX_DATA_YEAR, USSR_COMPARISON } from "@/lib/tax-data";

export function ComparisonDetail() {
  const t = useTranslations("detailComparison");
  const td = useTranslations("detail");

  const maxTaxToGdp = Math.max(...OECD_COMPARISON.map((c) => c.taxToGdp));

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

      <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
        <p className="font-mono text-sm leading-relaxed text-gray-300">
          {t("intro")}
        </p>
      </section>

      {/* Ranking */}
      <section className="mb-10">
        <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
          {t("rankingTitle")}
        </h2>

        <div className="space-y-2">
          {OECD_COMPARISON.map((country) => {
            const isFrance = country.key === "france";
            const isAverage = country.isAverage;
            const barColor = isFrance
              ? "bg-danger"
              : isAverage
                ? "bg-gray-500"
                : "bg-favorable";
            const textColor = isFrance
              ? "text-danger"
              : isAverage
                ? "text-slate-300"
                : "text-gray-300";
            const borderClass = isFrance
              ? "border-danger/30 bg-danger/5"
              : isAverage
                ? "border-gray-700 bg-gray-800/30"
                : "border-gray-800/50 bg-transparent";

            return (
              <div
                key={country.key}
                className={`flex items-center gap-4 rounded border p-3 ${borderClass}`}
              >
                <div className={`w-28 shrink-0 font-mono text-sm ${textColor} truncate`}>
                  {t(country.key as "france")}
                </div>
                <div className="flex-1">
                  <div className="h-4 w-full overflow-hidden rounded-full bg-gray-800">
                    <div
                      className={`h-full rounded-full ${barColor}`}
                      style={{ width: `${(country.taxToGdp / maxTaxToGdp) * 100}%` }}
                    />
                  </div>
                </div>
                <div className={`w-16 shrink-0 text-right font-mono text-sm font-bold ${textColor}`}>
                  {country.taxToGdp}%
                </div>
              </div>
            );
          })}
        </div>

        {/* USSR reference */}
        <div className="mt-4 flex items-center gap-4 rounded border border-dashed border-warning/40 bg-warning/5 p-3">
          <div className="w-28 shrink-0 font-mono text-sm font-bold text-warning truncate">
            ☭ {t("ussrLabel")}
          </div>
          <div className="flex-1">
            <div className="h-4 w-full overflow-hidden rounded-full bg-gray-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-warning/80 to-warning/40 border-r-2 border-dashed border-warning"
                style={{ width: `${(USSR_COMPARISON.taxToGdpPeak / maxTaxToGdp) * 100}%` }}
              />
            </div>
          </div>
          <div className="w-16 shrink-0 text-right font-mono text-sm font-bold text-warning">
            ~{USSR_COMPARISON.taxToGdpPeak}%
          </div>
        </div>
        <p className="mt-2 font-mono text-xs text-warning/70 italic">
          {t("ussrNote")}
        </p>

        <p className="mt-4 font-mono text-sm font-bold text-danger">
          {t("franceDelta")}
        </p>
      </section>

      {/* Analysis */}
      <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
        <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
          {t("analysisTitle")}
        </h2>
        <div className="space-y-4 font-mono text-sm leading-relaxed text-gray-300">
          <p>{t("analysisP1")}</p>
          <p>{t("analysisP2")}</p>
          <p>{t("analysisP3")}</p>
        </div>
      </section>

      <footer className="border-t border-gray-800 pt-4">
        <p className="font-mono text-xs text-muted">
          {td("source")} : {t("sourceText")}
        </p>
        <p className="mt-1 font-mono text-xs text-muted">
          {td("lastUpdated", { date: "Mars 2026" })}
        </p>
      </footer>
    </>
  );
}
