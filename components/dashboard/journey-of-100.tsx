"use client";

import { useTranslations } from "next-intl";
import { JOURNEY_SUMMARY, USSR_COMPARISON } from "@/lib/tax-data";

const SEGMENTS = [
  { key: "employerContributions", amount: 23, color: "bg-tricolore-red" },
  { key: "employeeContributions", amount: 11, color: "bg-red-700/80" },
  { key: "incomeTax", amount: 9, color: "bg-red-500/70" },
  { key: "vatOnSpending", amount: 9, color: "bg-red-400/60" },
  { key: "remaining", amount: 48, color: "bg-favorable/70" },
] as const;

export function JourneyOf100() {
  const t = useTranslations("journeyOf100");
  const { employerCost, realPurchasingPower, extractionRate } = JOURNEY_SUMMARY;

  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="relative overflow-hidden rounded border border-blanc/20 bg-panel p-5 sm:p-6 scanlines">
        <div className="relative z-10">
          {/* Title */}
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 className="font-display text-base font-bold uppercase tracking-widest text-blanc sm:text-lg">
              {t("title")}
            </h2>
            <span className="hidden font-mono text-[10px] text-gray-600 sm:inline sm:text-xs">
              {t("source")}
            </span>
          </div>

          {/* Stacked bar — purely visual, no text inside */}
          <div className="flex h-10 w-full gap-px overflow-hidden rounded sm:h-12">
            {SEGMENTS.map((s) => (
              <div
                key={s.key}
                className={`h-full ${s.color}`}
                style={{ width: `${s.amount}%` }}
              />
            ))}
          </div>

          {/* Legend — each item matches its bar segment */}
          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 sm:flex sm:justify-between">
            {SEGMENTS.map((s) => (
              <div key={s.key} className="flex items-center gap-2">
                <span className={`inline-block h-2.5 w-2.5 shrink-0 rounded-sm ${s.color}`} />
                <span className="font-mono text-[11px] text-gray-400 sm:text-xs">
                  {s.key === "remaining"
                    ? t("realPurchasingPower")
                    : t(s.key)}
                </span>
                <span
                  className={`ml-auto font-mono text-xs font-semibold sm:text-sm ${
                    s.key === "remaining" ? "text-favorable" : "text-danger"
                  }`}
                >
                  {s.key === "remaining" ? "" : "−"}
                  {s.amount} €
                </span>
              </div>
            ))}
          </div>

          {/* 3 key numbers */}
          <div className="mt-4 flex items-center justify-around border-t border-gray-800 pt-4">
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-wide text-gray-500 sm:text-xs">
                {t("employerPays")}
              </p>
              <p className="font-mono text-2xl font-bold text-blanc sm:text-3xl">
                {employerCost} €
              </p>
            </div>
            <div className="text-3xl text-gray-700 sm:text-4xl">→</div>
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-wide text-gray-500 sm:text-xs">
                {t("youReceive")}
              </p>
              <p className="font-mono text-2xl font-bold text-favorable sm:text-3xl">
                {realPurchasingPower} €
              </p>
            </div>
            <div className="text-3xl text-gray-700 sm:text-4xl">→</div>
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-wide text-gray-500 sm:text-xs">
                {t("extractionRate")}
              </p>
              <p className="font-mono text-2xl font-bold text-danger animate-glow sm:text-3xl">
                {extractionRate}%
              </p>
            </div>
          </div>

          {/* USSR comparison */}
          <p className="mt-3 text-center font-mono text-[10px] text-warning/80 sm:text-xs">
            ☭ {t("ussrComparison", { ussrRate: USSR_COMPARISON.socialContributions, frRate: extractionRate })}
          </p>
        </div>
      </div>
    </div>
  );
}
