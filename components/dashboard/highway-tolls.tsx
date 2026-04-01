"use client";

import { useTranslations } from "next-intl";
import { HIGHWAY_TOLLS, HIGHWAY_ROUTES } from "@/lib/tax-data";
import { IconRoad } from "@/components/ui/panel-icons";

interface HighwayTollsProps {
  onOpenDetail?: () => void;
}

export function HighwayTolls({ onOpenDetail }: HighwayTollsProps) {
  const t = useTranslations("highwayTolls");

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
          <IconRoad className="shrink-0" />
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-xs text-muted">
          {t("subtitle")}
        </p>

        {/* Key figures */}
        <div className="mb-3 grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="font-mono text-lg font-bold text-danger">
              {HIGHWAY_TOLLS.totalRevenue}
            </p>
            <p className="font-mono text-[10px] text-muted">
              {t("totalRevenue")}
            </p>
          </div>
          <div>
            <p className="font-mono text-lg font-bold text-warning">
              {HIGHWAY_TOLLS.totalProfits}
            </p>
            <p className="font-mono text-[10px] text-muted">
              {t("totalProfits")}
            </p>
          </div>
          <div>
            <p className="font-mono text-lg font-bold text-blanc">
              {HIGHWAY_TOLLS.stateShare}%
            </p>
            <p className="font-mono text-[10px] text-muted">
              {t("stateShare")}
            </p>
          </div>
        </div>

        {/* Route prices */}
        <p className="mb-2 font-mono text-xs text-slate-300">
          {t("routePrices")}
        </p>
        <div className="space-y-1.5">
          {HIGHWAY_ROUTES.map((route) => (
            <div
              key={route.key}
              className="flex items-center justify-between rounded border border-gray-800/50 bg-background/50 px-2 py-1.5"
            >
              <span className="font-mono text-xs text-gray-300">
                {t(route.key as "parisLyon")}
              </span>
              <span className="font-mono text-xs font-bold text-warning">
                {route.toll.toFixed(2)} €
              </span>
            </div>
          ))}
        </div>

        <p className="mt-2 font-mono text-xs text-muted">
          {t("dividendsNote", {
            amount: HIGHWAY_TOLLS.dividendsPaid,
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
