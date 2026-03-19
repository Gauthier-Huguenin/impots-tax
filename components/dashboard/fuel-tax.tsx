"use client";

import { useTranslations } from "next-intl";
import { FUEL_BREAKDOWN, FUEL_PRICE, FUEL_TAX_PERCENT } from "@/lib/tax-data";
import { IconFuel } from "@/components/ui/panel-icons";

interface FuelTaxProps {
  onOpenDetail?: () => void;
}

const FUEL_COLORS: Record<string, string> = {
  crudeOil: "bg-gray-500",
  distribution: "bg-gray-600",
  accise: "bg-danger",
  vatProduct: "bg-warning",
  vatAccise: "bg-red-800",
};

export function FuelTax({ onOpenDetail }: FuelTaxProps) {
  const t = useTranslations("fuelTax");

  return (
    <div
      role="button"
      tabIndex={0}
      className="group block cursor-pointer"
      onClick={onOpenDetail}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpenDetail?.(); }}
    >
      <div className="h-full rounded border border-gray-800 bg-panel p-4 transition-colors group-hover:border-blanc/30">
        <h2 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-slate-300">
          <IconFuel className="shrink-0" />
          {t("title")}
        </h2>
        <p className="mb-1 mt-1 font-mono text-[10px] text-gray-500">
          {t("subtitle")}
        </p>
        <p className="mb-3 font-mono text-xs text-slate-300">
          {t("pricePerLiter", { price: FUEL_PRICE.toFixed(2) })}
        </p>

        {/* Tax percentage header */}
        <p className="mb-2 text-center font-mono text-2xl font-bold text-danger">
          ~{FUEL_TAX_PERCENT}%{" "}
          <span className="text-sm text-slate-300">{t("totalTaxes")}</span>
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
            <div key={item.key} className="flex items-center justify-between font-mono text-[10px]">
              <div className="flex items-center gap-1.5">
                <span
                  className={`inline-block h-2 w-2 rounded-sm ${FUEL_COLORS[item.key]}`}
                />
                <span className={item.isTax ? "text-gray-300" : "text-gray-500"}>
                  {t(item.key as "crudeOil")}
                </span>
              </div>
              <span className={item.isTax ? "text-danger" : "text-gray-500"}>
                {item.amount.toFixed(2)} € ({item.percent}%)
              </span>
            </div>
          ))}
        </div>

        <p className="mt-3 font-mono text-[10px] text-warning">
          {t("taxOnTax")}
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
