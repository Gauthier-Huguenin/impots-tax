"use client";

import { useTranslations } from "next-intl";
import { FUEL_BREAKDOWN, FUEL_PRICE, FUEL_TAX_PERCENT } from "@/lib/tax-data";
import { IconFuel } from "@/components/ui/panel-icons";

interface FuelTaxProps {
  onOpenDetail?: () => void;
}

const FUEL_COLORS: Record<string, string> = {
  crudeOil: "bg-slate-600",
  distribution: "bg-slate-700",
  accise: "bg-danger",
  vatProduct: "bg-blue-500",
  vatAccise: "bg-danger/60",
};

export function FuelTax({ onOpenDetail }: FuelTaxProps) {
  const t = useTranslations("fuelTax");

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
          <IconFuel className="shrink-0" />
          {t("title")}
        </h2>
        <p className="mb-1 mt-1 font-mono text-xs text-blanc">
          {t("subtitle")}
        </p>
        <p className="mb-3 font-mono text-xs text-blanc">
          {t("pricePerLiter", { price: FUEL_PRICE.toFixed(2) })}
        </p>

        {/* Tax percentage header */}
        <p className="mb-2 text-center font-mono text-2xl font-bold text-danger">
          ~{FUEL_TAX_PERCENT}%{" "}
          <span className="text-sm text-blanc">{t("totalTaxes")}</span>
        </p>

        {/* Stacked bar */}
        <div className="mb-3 flex h-6 overflow-hidden rounded-sm">
          {FUEL_BREAKDOWN.map((item) => (
            <div
              key={item.key}
              className={`${FUEL_COLORS[item.key]} flex items-center justify-center text-[8px] font-bold text-white/80`}
              style={{ width: `${item.percent}%` }}
            >
              {item.percent >= 10 ? `${item.percent}%` : ""}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="space-y-1">
          {FUEL_BREAKDOWN.map((item) => (
            <div key={item.key} className="flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-1.5">
                <span
                  className={`inline-block h-2 w-2 rounded-sm ${FUEL_COLORS[item.key]}`}
                />
                <span className={item.isTax ? "text-blanc" : "text-blanc"}>
                  {t(item.key as "crudeOil")}
                </span>
              </div>
              <span className={item.isTax ? "text-danger" : "text-blanc"}>
                {item.amount.toFixed(2)} € ({item.percent}%)
              </span>
            </div>
          ))}
        </div>

        <p className="mt-3 font-mono text-xs text-blanc/60">
          {t("taxOnTax")}
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
