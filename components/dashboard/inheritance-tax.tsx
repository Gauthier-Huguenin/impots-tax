"use client";

import { useTranslations } from "next-intl";
import { INHERITANCE_DATA } from "@/lib/tax-data";

interface InheritanceTaxProps {
  onOpenDetail?: () => void;
}

export function InheritanceTax({ onOpenDetail }: InheritanceTaxProps) {
  const t = useTranslations("inheritanceTax");

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

        {/* Top rate headline */}
        <p className="mb-3 text-center font-mono text-2xl font-bold text-danger">
          45%{" "}
          <span className="text-sm text-slate-300">{t("topRate")}</span>
        </p>

        {/* Key figures grid */}
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div className="rounded border border-gray-800 bg-background/50 p-2 text-center">
            <p className="font-mono text-lg font-bold text-danger">
              {INHERITANCE_DATA.nonRelativeRate}%
            </p>
            <p className="font-mono text-[9px] text-gray-500">
              {t("nonRelativeRate")}
            </p>
          </div>
          <div className="rounded border border-gray-800 bg-background/50 p-2 text-center">
            <p className="font-mono text-lg font-bold text-favorable">
              {(INHERITANCE_DATA.childAllowance / 1000).toFixed(0)}k €
            </p>
            <p className="font-mono text-[9px] text-gray-500">
              {t("childAllowance")}
            </p>
          </div>
          <div className="rounded border border-gray-800 bg-background/50 p-2 text-center">
            <p className="font-mono text-lg font-bold text-favorable">
              {INHERITANCE_DATA.successionsTaxed}%
            </p>
            <p className="font-mono text-[9px] text-gray-500">
              {t("actuallyTaxed")}
            </p>
          </div>
          <div className="rounded border border-gray-800 bg-background/50 p-2 text-center">
            <p className="font-mono text-lg font-bold text-warning">
              {INHERITANCE_DATA.totalRevenue}
            </p>
            <p className="font-mono text-[9px] text-gray-500">
              {t("totalRevenue")}
            </p>
          </div>
        </div>

        <p className="font-mono text-[10px] text-gray-500">
          {t("medianNote", {
            median: (INHERITANCE_DATA.medianInheritance / 1000).toFixed(0),
            avg: (INHERITANCE_DATA.avgInheritance / 1000).toFixed(0),
          })}
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
