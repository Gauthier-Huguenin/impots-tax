"use client";

import { useTranslations } from "next-intl";
import { JOURNEY_SUMMARY, USSR_COMPARISON } from "@/lib/tax-data";
import { formatEuro, formatPercent } from "@/lib/format";
import { IconEuro } from "@/components/ui/panel-icons";

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
      <div className="relative overflow-hidden rounded border-2 border-blanc bg-panel p-5 sm:p-6 scanlines">
        <div className="relative z-10">
          {/* Title */}
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 className="flex items-center gap-2 font-display text-base font-bold uppercase tracking-widest text-blanc sm:text-lg">
              <IconEuro className="shrink-0" />
              {t("title")}
            </h2>
            <span className="hidden font-mono text-xs font-light text-blanc sm:inline sm:text-sm">
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
          <div className="mt-3 grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2">
            {SEGMENTS.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <span className={`inline-block h-3 w-3 shrink-0 rounded-sm ${s.color}`} />
                <span className="font-mono text-sm text-blanc">
                  {i + 1}. {s.key === "remaining"
                    ? t("realPurchasingPower")
                    : t(s.key)}
                </span>
                <span
                  className={`ml-auto font-mono text-sm font-semibold ${
                    s.key === "remaining" ? "text-favorable" : "text-danger"
                  }`}
                >
                  {s.key === "remaining" ? "" : "−"}{formatEuro(s.amount)}
                </span>
              </div>
            ))}
          </div>

          {/* 3 key numbers */}
          <div className="mt-4 flex items-center justify-around border-t border-gray-800 pt-4">
            <div className="text-center">
              <p className="font-mono text-xs font-medium uppercase tracking-wide text-blanc sm:text-sm">
                {t("employerPays")}
              </p>
              <p className="font-mono text-2xl font-extrabold text-blanc sm:text-3xl">
                {formatEuro(employerCost)}
              </p>
            </div>
            <div className="text-3xl text-blanc sm:text-4xl">→</div>
            <div className="text-center">
              <p className="font-mono text-xs font-medium uppercase tracking-wide text-blanc sm:text-sm">
                {t("youReceive")}
              </p>
              <p className="font-mono text-2xl font-extrabold text-favorable sm:text-3xl">
                {formatEuro(realPurchasingPower)}
              </p>
            </div>
            <div className="text-3xl text-blanc sm:text-4xl">→</div>
            <div className="text-center">
              <p className="font-mono text-xs font-medium uppercase tracking-wide text-blanc sm:text-sm">
                {t("extractionRate")}
              </p>
              <p className="font-mono text-2xl font-black text-danger animate-glow sm:text-3xl">
                {formatPercent(extractionRate)}
              </p>
            </div>
          </div>

          {/* USSR comparison */}
          <p className="mt-3 text-center font-mono text-xs font-light text-warning/80 sm:text-sm">
            ☭ {t("ussrComparison", { ussrRate: USSR_COMPARISON.socialContributions, frRate: extractionRate })}
          </p>
        </div>
      </div>
    </div>
  );
}
