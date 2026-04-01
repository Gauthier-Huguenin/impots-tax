"use client";

import { useTranslations } from "next-intl";
import { CORPORATE_TAX } from "@/lib/tax-data";
import { formatPercent, formatNumber } from "@/lib/format";
import { IconBuilding } from "@/components/ui/panel-icons";

interface CorporateTaxProps {
  onOpenDetail?: () => void;
}

export function CorporateTax({ onOpenDetail }: CorporateTaxProps) {
  const t = useTranslations("corporateTax");

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={t("title")}
      className="group block cursor-pointer"
      onClick={onOpenDetail}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpenDetail?.(); }}
    >
      <div className="h-full rounded border-2 border-blanc bg-panel p-5 transition-colors group-hover:border-blanc">
        <h2 className="flex items-center gap-2 font-display text-base font-bold uppercase tracking-widest text-blanc">
          <IconBuilding className="shrink-0" />
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-xs text-blanc">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded border border-danger/20 bg-background/50 p-3 text-center">
            <p className="font-mono text-3xl font-bold text-danger">
              {formatPercent(CORPORATE_TAX.normalRate)}
            </p>
            <p className="mt-1 font-mono text-xs text-blanc">
              {t("normalRate")}
            </p>
          </div>
          <div className="rounded border border-blue-500/20 bg-background/50 p-3 text-center">
            <p className="font-mono text-3xl font-bold text-blue-400">
              {formatPercent(CORPORATE_TAX.pmeRate)}
            </p>
            <p className="mt-1 font-mono text-xs text-blanc">
              {t("pmeRate")}
            </p>
          </div>
        </div>

        <p className="mt-3 font-mono text-xs text-blanc">
          {t("pmeCondition", {
            threshold: formatNumber(CORPORATE_TAX.pmeThreshold),
          })}
        </p>
        <p className="mt-1 font-mono text-xs text-blanc">
          {t("pmeRequirements")}
        </p>

        <p className="mt-2 font-mono text-xs text-blanc/60">
          {t("surtax")}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-gray-800 pt-3">
          <span className="font-mono text-xs text-blanc">
            {t("source")}
          </span>
          <span className="font-mono text-xs text-blanc group-hover:text-blanc">
            {t("details")}
          </span>
        </div>
      </div>
    </div>
  );
}
