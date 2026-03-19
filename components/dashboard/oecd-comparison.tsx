"use client";

import { useTranslations } from "next-intl";
import { OECD_COMPARISON, FRANCE_OECD_DELTA, USSR_COMPARISON } from "@/lib/tax-data";
import { formatPercent } from "@/lib/format";
import { IconGlobe } from "@/components/ui/panel-icons";

const MAX_TAX_GDP = 50; // Scale max for bar widths
const USSR_WIDTH = (USSR_COMPARISON.taxToGdpPeak / MAX_TAX_GDP) * 100;

interface OECDComparisonProps {
  onOpenDetail?: () => void;
}

export function OECDComparison({ onOpenDetail }: OECDComparisonProps) {
  const t = useTranslations("oecdComparison");

  return (
    <div
      role="button"
      tabIndex={0}
      className="group block cursor-pointer"
      onClick={onOpenDetail}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpenDetail?.(); }}
    >
      <div className="rounded border border-gray-800 bg-panel p-4 transition-colors group-hover:border-blanc/30">
        <h2 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-slate-300">
          <IconGlobe className="shrink-0" />
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-[10px] text-gray-500">
          {t("subtitle")}
        </p>

        <div className="space-y-1.5">
          {OECD_COMPARISON.map((country) => {
            const isFrance = country.key === "france";
            const isAverage = country.isAverage;
            const widthPercent = (country.taxToGdp / MAX_TAX_GDP) * 100;

            return (
              <div key={country.key} className="flex items-center gap-2">
                <span
                  className={`w-24 shrink-0 text-right font-mono text-[10px] sm:w-32 sm:text-xs ${
                    isFrance
                      ? "font-bold text-danger"
                      : isAverage
                        ? "text-blanc"
                        : "text-slate-300"
                  }`}
                >
                  {t(country.key as "france")}
                </span>
                <div className="flex-1">
                  <div className="h-4 w-full overflow-hidden rounded-sm bg-gray-800/50 sm:h-5">
                    <div
                      className={`h-full transition-all ${
                        isFrance
                          ? "bg-gradient-to-r from-danger/90 to-danger/60"
                          : isAverage
                            ? "border-r-2 border-dashed border-blanc bg-blanc/20"
                            : "bg-gray-600/50"
                      }`}
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                </div>
                <span
                  className={`w-12 shrink-0 font-mono text-[10px] font-bold sm:text-xs ${
                    isFrance
                      ? "text-danger"
                      : isAverage
                        ? "text-blanc"
                        : "text-gray-500"
                  }`}
                >
                  {formatPercent(country.taxToGdp)}
                </span>
              </div>
            );
          })}
        </div>

        {/* USSR reference line */}
        <div className="mt-2 flex items-center gap-2 rounded border border-dashed border-warning/40 bg-warning/5 px-1 py-1">
          <span className="w-24 shrink-0 text-right font-mono text-[10px] font-bold text-warning sm:w-32 sm:text-xs">
            ☭ {t("ussrLabel")}
          </span>
          <div className="flex-1">
            <div className="h-4 w-full overflow-hidden rounded-sm bg-gray-800/50 sm:h-5">
              <div
                className="h-full bg-gradient-to-r from-warning/60 to-warning/30 border-r-2 border-dashed border-warning"
                style={{ width: `${USSR_WIDTH}%` }}
              />
            </div>
          </div>
          <span className="w-12 shrink-0 font-mono text-[10px] font-bold text-warning sm:text-xs">
            ~{formatPercent(USSR_COMPARISON.taxToGdpPeak)}
          </span>
        </div>
        <p className="mt-1 font-mono text-[10px] text-warning/70 italic">
          {t("ussrNote")}
        </p>

        <p className="mt-3 font-mono text-xs font-bold text-danger">
          {t("franceDelta", { delta: FRANCE_OECD_DELTA })}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="font-mono text-[10px] text-gray-500">
            {t("source")}
          </span>
          <span className="font-mono text-[10px] text-gray-500 group-hover:text-blanc">
            {t("details")}
          </span>
        </div>
      </div>
    </div>
  );
}
