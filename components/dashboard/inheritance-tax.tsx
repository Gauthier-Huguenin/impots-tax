"use client";

import { useTranslations } from "next-intl";
import { INHERITANCE_DATA } from "@/lib/tax-data";
import { IconScroll } from "@/components/ui/panel-icons";

interface InheritanceTaxProps {
  onOpenDetail?: () => void;
}

export function InheritanceTax({ onOpenDetail }: InheritanceTaxProps) {
  const t = useTranslations("inheritanceTax");

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={t("title")}
      className="group block cursor-pointer"
      onClick={onOpenDetail}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpenDetail?.(); }}
    >
      <div className="h-full rounded border border-gray-800 bg-panel p-5 transition-colors group-hover:border-blanc/30">
        <h2 className="flex items-center gap-2 font-display text-base font-bold uppercase tracking-widest text-slate-300">
          <IconScroll className="shrink-0" />
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-xs text-muted">
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
            <p className="font-mono text-[10px] text-muted">
              {t("nonRelativeRate")}
            </p>
          </div>
          <div className="rounded border border-gray-800 bg-background/50 p-2 text-center">
            <p className="font-mono text-lg font-bold text-favorable">
              {(INHERITANCE_DATA.childAllowance / 1000).toFixed(0)}k €
            </p>
            <p className="font-mono text-[10px] text-muted">
              {t("childAllowance")}
            </p>
          </div>
          <div className="rounded border border-gray-800 bg-background/50 p-2 text-center">
            <p className="font-mono text-lg font-bold text-favorable">
              {INHERITANCE_DATA.successionsTaxed}%
            </p>
            <p className="font-mono text-[10px] text-muted">
              {t("actuallyTaxed")}
            </p>
          </div>
          <div className="rounded border border-gray-800 bg-background/50 p-2 text-center">
            <p className="font-mono text-lg font-bold text-warning">
              {INHERITANCE_DATA.totalRevenue}
            </p>
            <p className="font-mono text-[10px] text-muted">
              {t("totalRevenue")}
            </p>
          </div>
        </div>

        <p className="font-mono text-xs text-muted">
          {t("medianNote", {
            median: (INHERITANCE_DATA.medianInheritance / 1000).toFixed(0),
            avg: (INHERITANCE_DATA.avgInheritance / 1000).toFixed(0),
          })}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-gray-800 pt-3">
          <span className="font-mono text-xs text-muted">
            {t("source")}
          </span>
          <span className="font-mono text-xs text-muted group-hover:text-blanc">
            {t("details")}
          </span>
        </div>
      </div>
    </div>
  );
}
