"use client";

import { useTranslations } from "next-intl";
import { CORPORATE_TAX } from "@/lib/tax-data";

interface CorporateTaxProps {
  onOpenDetail?: () => void;
}

export function CorporateTax({ onOpenDetail }: CorporateTaxProps) {
  const t = useTranslations("corporateTax");

  return (
    <div
      role="button"
      tabIndex={0}
      className="group block cursor-pointer"
      onClick={onOpenDetail}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpenDetail?.(); }}
    >
      <div className="h-full rounded border border-gray-800 bg-panel p-4 transition-colors group-hover:border-blanc/30">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-slate-300">
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-[10px] text-gray-500">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded border border-danger/20 bg-background/50 p-3 text-center">
            <p className="font-mono text-3xl font-bold text-danger">
              {CORPORATE_TAX.normalRate}%
            </p>
            <p className="mt-1 font-mono text-xs text-slate-300">
              {t("normalRate")}
            </p>
          </div>
          <div className="rounded border border-warning/20 bg-background/50 p-3 text-center">
            <p className="font-mono text-3xl font-bold text-warning">
              {CORPORATE_TAX.pmeRate}%
            </p>
            <p className="mt-1 font-mono text-xs text-slate-300">
              {t("pmeRate")}
            </p>
          </div>
        </div>

        <p className="mt-3 font-mono text-[10px] text-gray-500">
          {t("pmeCondition", {
            threshold: CORPORATE_TAX.pmeThreshold.toLocaleString("fr-FR"),
          })}
        </p>
        <p className="mt-1 font-mono text-[10px] text-gray-500">
          {t("pmeRequirements")}
        </p>

        <p className="mt-2 font-mono text-[10px] text-warning">
          {t("surtax")}
        </p>

        <div className="mt-3 flex items-center justify-between">
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
