"use client";

import { useTranslations } from "next-intl";
import {
  TOBACCO_BREAKDOWN,
  TOBACCO_PACK_PRICE,
  TOBACCO_TAX_PERCENT,
} from "@/lib/tax-data";
import { IconCigarette } from "@/components/ui/panel-icons";

interface BehavioralTaxProps {
  onOpenDetail?: () => void;
}

const TOBACCO_COLORS: Record<string, string> = {
  accise: "bg-danger",
  vat: "bg-warning",
  retailer: "bg-gray-500",
  manufacturer: "bg-gray-600",
};

export function BehavioralTax({ onOpenDetail }: BehavioralTaxProps) {
  const t = useTranslations("behavioralTax");

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
          <IconCigarette className="shrink-0" />
          {t("title")}
        </h2>
        <p className="mb-1 mt-1 font-mono text-xs text-blanc">
          {t("subtitle")}
        </p>
        <p className="mb-3 font-mono text-xs text-blanc">
          {t("packPrice", { price: TOBACCO_PACK_PRICE })}
        </p>

        {/* Tax percentage header */}
        <p className="mb-2 text-center font-mono text-2xl font-bold text-danger animate-glow">
          ~{TOBACCO_TAX_PERCENT}%{" "}
          <span className="text-sm text-blanc">{t("totalTaxes")}</span>
        </p>

        {/* Stacked bar */}
        <div className="mb-3 flex h-6 overflow-hidden rounded-sm">
          {TOBACCO_BREAKDOWN.map((item) => (
            <div
              key={item.key}
              className={`${TOBACCO_COLORS[item.key]} flex items-center justify-center text-[8px] font-bold text-white/80`}
              style={{ width: `${item.percent}%` }}
            >
              {item.percent >= 10 ? `${item.percent}%` : ""}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="space-y-1">
          {TOBACCO_BREAKDOWN.map((item) => (
            <div key={item.key} className="flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-1.5">
                <span
                  className={`inline-block h-2 w-2 rounded-sm ${TOBACCO_COLORS[item.key]}`}
                />
                <span className={item.isTax ? "text-blanc" : "text-blanc"}>
                  {t(item.key as "accise")}
                </span>
              </div>
              <span className={item.isTax ? "text-danger" : "text-blanc"}>
                {item.amount.toFixed(2)} € ({item.percent}%)
              </span>
            </div>
          ))}
        </div>

        <p className="mt-3 font-mono text-xs text-warning">
          {t("priceEvolution")}
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
