"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { JOURNEY_SUMMARY, USSR_COMPARISON } from "@/lib/tax-data";
import { formatEuro, formatPercent } from "@/lib/format";
import { IconEuro } from "@/components/ui/panel-icons";

const SEGMENTS = [
  { key: "employerContributions", amount: 23, color: "bg-danger" },
  { key: "employeeContributions", amount: 11, color: "bg-warning" },
  { key: "incomeTax", amount: 9, color: "bg-orange-500" },
  { key: "vatOnSpending", amount: 9, color: "bg-blue-500" },
  { key: "remaining", amount: 48, color: "bg-slate-600" },
] as const;

type SegmentKey = (typeof SEGMENTS)[number]["key"];

export function JourneyOf100() {
  const t = useTranslations("journeyOf100");
  const { employerCost, realPurchasingPower, extractionRate } = JOURNEY_SUMMARY;
  const [hoveredKey, setHoveredKey] = useState<SegmentKey | null>(null);

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

          {/* Stacked bar */}
          <div className="flex h-10 w-full gap-px overflow-hidden rounded sm:h-12">
            {SEGMENTS.map((s) => (
              <div
                key={s.key}
                className={`relative h-full cursor-pointer transition-opacity duration-150 ${s.color} ${
                  hoveredKey !== null && hoveredKey !== s.key ? "opacity-30" : "opacity-100"
                }`}
                style={{ width: `${s.amount}%` }}
                onMouseEnter={() => setHoveredKey(s.key)}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <span className="absolute inset-0 flex items-center justify-center select-none font-mono text-xs font-bold text-white/90 drop-shadow-sm">
                  {s.amount}%
                </span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-3 grid grid-cols-1 gap-y-1 sm:grid-cols-2 sm:gap-x-6">
            {SEGMENTS.map((s, i) => (
              <div
                key={s.key}
                className={`flex cursor-pointer items-center gap-2 rounded px-2 py-1 transition-colors duration-150 ${
                  hoveredKey === s.key ? "bg-white/10" : ""
                }`}
                onMouseEnter={() => setHoveredKey(s.key)}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <span
                  className={`inline-block h-3 w-3 shrink-0 rounded-sm transition-opacity duration-150 ${s.color} ${
                    hoveredKey !== null && hoveredKey !== s.key ? "opacity-30" : ""
                  }`}
                />
                <span
                  className={`font-mono text-sm transition-colors duration-150 ${
                    hoveredKey === s.key
                      ? "text-white"
                      : hoveredKey !== null
                        ? "text-blanc/40"
                        : "text-blanc"
                  }`}
                >
                  {i + 1}.{" "}
                  {s.key === "remaining" ? t("realPurchasingPower") : t(s.key)}
                </span>
                <span
                  className={`ml-auto font-mono text-sm font-semibold transition-colors duration-150 ${
                    s.key === "remaining"
                      ? hoveredKey === s.key
                        ? "text-white"
                        : hoveredKey !== null
                          ? "text-blanc/40"
                          : "text-blanc"
                      : hoveredKey !== null && hoveredKey !== s.key
                        ? "text-danger/40"
                        : "text-danger"
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
              <p className="font-mono text-2xl font-extrabold text-blanc sm:text-3xl">
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
          <p className="mt-3 text-center font-mono text-xs font-light text-blanc/60 sm:text-sm">
            ☭ {t("ussrComparison", { ussrRate: USSR_COMPARISON.socialContributions, frRate: extractionRate })}
          </p>
        </div>
      </div>
    </div>
  );
}
