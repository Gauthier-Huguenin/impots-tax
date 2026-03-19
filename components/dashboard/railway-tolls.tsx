"use client";

import { useTranslations } from "next-intl";
import { RAILWAY_TOLLS } from "@/lib/tax-data";
import { IconTrain } from "@/components/ui/panel-icons";

interface RailwayTollsProps {
  onOpenDetail?: () => void;
}

export function RailwayTolls({ onOpenDetail }: RailwayTollsProps) {
  const t = useTranslations("railwayTolls");

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
          <IconTrain className="shrink-0" />
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-[10px] text-gray-500">
          {t("subtitle")}
        </p>

        {/* Headline: TGV share */}
        <p className="mb-3 text-center font-mono text-2xl font-bold text-danger">
          {RAILWAY_TOLLS.tgvShare}%{" "}
          <span className="text-sm text-slate-300">{t("tgvShare")}</span>
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
