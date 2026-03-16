"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { HIGHWAY_TOLLS, HIGHWAY_ROUTES } from "@/lib/tax-data";

export function HighwayTolls() {
  const t = useTranslations("highwayTolls");

  return (
    <Link href="/highway-tolls" className="group block">
      <div className="h-full rounded border border-gray-800 bg-panel p-4 transition-colors group-hover:border-info/50">
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
              {HIGHWAY_TOLLS.totalRevenue}
            </p>
            <p className="font-mono text-[9px] text-gray-500">
              {t("totalRevenue")}
            </p>
          </div>
          <div>
            <p className="font-mono text-lg font-bold text-warning">
              {HIGHWAY_TOLLS.totalProfits}
            </p>
            <p className="font-mono text-[9px] text-gray-500">
              {t("totalProfits")}
            </p>
          </div>
          <div>
            <p className="font-mono text-lg font-bold text-info">
              {HIGHWAY_TOLLS.stateShare}%
            </p>
            <p className="font-mono text-[9px] text-gray-500">
              {t("stateShare")}
            </p>
          </div>
        </div>

        {/* Route prices */}
        <p className="mb-2 font-mono text-[10px] text-gray-400">
          {t("routePrices")}
        </p>
        <div className="space-y-1.5">
          {HIGHWAY_ROUTES.map((route) => (
            <div
              key={route.key}
              className="flex items-center justify-between rounded border border-gray-800/50 bg-background/50 px-2 py-1.5"
            >
              <span className="font-mono text-[10px] text-gray-300">
                {t(route.key as "parisLyon")}
              </span>
              <span className="font-mono text-[10px] font-bold text-warning">
                {route.toll.toFixed(2)} €
              </span>
            </div>
          ))}
        </div>

        <p className="mt-2 font-mono text-[10px] text-gray-500">
          {t("dividendsNote", {
            amount: HIGHWAY_TOLLS.dividendsPaid,
          })}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-[10px] text-gray-600">
            {t("source")}
          </span>
          <span className="font-mono text-[10px] text-gray-600 group-hover:text-info">
            {t("details")}
          </span>
        </div>
      </div>
    </Link>
  );
}
