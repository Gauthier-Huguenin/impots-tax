"use client";

import { useTranslations } from "next-intl";
import { PROPERTY_TAX, PROPERTY_TAX_RATES } from "@/lib/tax-data";
import { IconHouse } from "@/components/ui/panel-icons";

const TOP_CITIES = PROPERTY_TAX_RATES.filter((c) =>
  ["paris", "lyon", "marseille", "grenoble"].includes(c.key)
);

const MAX_RATE = Math.max(...TOP_CITIES.map((c) => c.rate));

interface PropertyTaxProps {
  onOpenDetail?: () => void;
}

export function PropertyTax({ onOpenDetail }: PropertyTaxProps) {
  const t = useTranslations("propertyTax");

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
          <IconHouse className="shrink-0" />
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-xs text-muted">
          {t("subtitle")}
        </p>

        {/* Key figures */}
        <div className="mb-3 grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="font-mono text-lg font-bold text-danger">
              {PROPERTY_TAX.totalRevenue}
            </p>
            <p className="font-mono text-[10px] text-muted">
              {t("totalRevenue")}
            </p>
          </div>
          <div>
            <p className="font-mono text-lg font-bold text-warning">
              {PROPERTY_TAX.avgPerTaxpayer} €
            </p>
            <p className="font-mono text-[10px] text-muted">
              {t("avgPerTaxpayer")}
            </p>
          </div>
          <div>
            <p className="font-mono text-lg font-bold text-danger">
              +{PROPERTY_TAX.increase10Years}%
            </p>
            <p className="font-mono text-[10px] text-muted">
              {t("increase10Years")}
            </p>
          </div>
        </div>

        {/* City rates bar chart */}
        <p className="mb-2 font-mono text-xs text-slate-300">
          {t("cityRates")}
        </p>
        <div className="space-y-1.5">
          {TOP_CITIES.map((city) => (
            <div key={city.key} className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-right font-mono text-xs text-slate-300">
                {t(city.key as "paris")}
              </span>
              <div className="relative h-4 flex-1 overflow-hidden rounded-sm bg-background/50">
                <div
                  className={`absolute inset-y-0 left-0 rounded-sm ${city.rate >= 50 ? "bg-danger" : city.rate >= 30 ? "bg-warning" : "bg-favorable"}`}
                  style={{ width: `${(city.rate / MAX_RATE) * 100}%` }}
                />
                <span className="relative z-10 flex h-full items-center pl-1.5 font-mono text-[10px] font-bold text-white/90">
                  {city.rate}%
                </span>
              </div>
            </div>
          ))}
        </div>

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
