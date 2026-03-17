"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { PROPERTY_TAX, PROPERTY_TAX_RATES } from "@/lib/tax-data";

const TOP_CITIES = PROPERTY_TAX_RATES.filter((c) =>
  ["paris", "lyon", "marseille", "grenoble"].includes(c.key)
);

const MAX_RATE = Math.max(...TOP_CITIES.map((c) => c.rate));

export function PropertyTax() {
  const t = useTranslations("propertyTax");

  return (
    <Link href="/property-tax" className="group block">
      <div className="h-full rounded border border-gray-800 bg-panel p-4 transition-colors group-hover:border-blanc/30">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-gray-400">
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-[10px] text-gray-600">
          {t("subtitle")}
        </p>

        {/* Key figures */}
        <div className="mb-3 grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="font-mono text-lg font-bold text-danger">
              {PROPERTY_TAX.totalRevenue}
            </p>
            <p className="font-mono text-[9px] text-gray-500">
              {t("totalRevenue")}
            </p>
          </div>
          <div>
            <p className="font-mono text-lg font-bold text-warning">
              {PROPERTY_TAX.avgPerTaxpayer} €
            </p>
            <p className="font-mono text-[9px] text-gray-500">
              {t("avgPerTaxpayer")}
            </p>
          </div>
          <div>
            <p className="font-mono text-lg font-bold text-danger">
              +{PROPERTY_TAX.increase10Years}%
            </p>
            <p className="font-mono text-[9px] text-gray-500">
              {t("increase10Years")}
            </p>
          </div>
        </div>

        {/* City rates bar chart */}
        <p className="mb-2 font-mono text-[10px] text-gray-400">
          {t("cityRates")}
        </p>
        <div className="space-y-1.5">
          {TOP_CITIES.map((city) => (
            <div key={city.key} className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-right font-mono text-[10px] text-gray-400">
                {t(city.key as "paris")}
              </span>
              <div className="relative h-4 flex-1 overflow-hidden rounded-sm bg-background/50">
                <div
                  className={`absolute inset-y-0 left-0 rounded-sm ${city.rate >= 50 ? "bg-danger" : city.rate >= 30 ? "bg-warning" : "bg-favorable"}`}
                  style={{ width: `${(city.rate / MAX_RATE) * 100}%` }}
                />
                <span className="relative z-10 flex h-full items-center pl-1.5 font-mono text-[9px] font-bold text-white/90">
                  {city.rate}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-[10px] text-gray-600">
            {t("source")}
          </span>
          <span className="font-mono text-[10px] text-gray-600 group-hover:text-blanc">
            {t("details")}
          </span>
        </div>
      </div>
    </Link>
  );
}
