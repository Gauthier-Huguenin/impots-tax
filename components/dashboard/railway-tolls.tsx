"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { RAILWAY_TOLLS } from "@/lib/tax-data";

export function RailwayTolls() {
  const t = useTranslations("railwayTolls");

  return (
    <Link href="/railway-tolls" className="group block">
      <div className="h-full rounded border border-gray-800 bg-panel p-4 transition-colors group-hover:border-info/50">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-gray-400">
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-[10px] text-gray-600">
          {t("subtitle")}
        </p>

        {/* Headline: TGV share */}
        <p className="mb-3 text-center font-mono text-2xl font-bold text-danger">
          {RAILWAY_TOLLS.tgvShare}%{" "}
          <span className="text-sm text-gray-400">{t("tgvShare")}</span>
        </p>

        {/* Key figures */}
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div className="rounded border border-gray-800 bg-background/50 p-2 text-center">
            <p className="font-mono text-lg font-bold text-warning">
              {RAILWAY_TOLLS.terShare}%
            </p>
            <p className="font-mono text-[9px] text-gray-500">
              {t("terShare")}
            </p>
          </div>
          <div className="rounded border border-gray-800 bg-background/50 p-2 text-center">
            <p className="font-mono text-lg font-bold text-danger">
              &gt;{RAILWAY_TOLLS.totalRevenue}
            </p>
            <p className="font-mono text-[9px] text-gray-500">
              {t("totalRevenue")}
            </p>
          </div>
        </div>

        {/* Annual increase */}
        <div className="rounded border border-danger/30 bg-background/50 p-2 text-center">
          <p className="font-mono text-lg font-bold text-danger">
            +{RAILWAY_TOLLS.annualIncrease}%
          </p>
          <p className="font-mono text-[9px] text-gray-500">
            {t("annualIncrease")}
          </p>
        </div>

        <p className="mt-2 font-mono text-[10px] text-gray-500">
          {t("sncfNote", { revenue: RAILWAY_TOLLS.groupRevenue })}
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
