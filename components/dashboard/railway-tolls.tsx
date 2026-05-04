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
      aria-label={t("title")}
      className="group block cursor-pointer"
      onClick={onOpenDetail}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpenDetail?.(); } }}
    >
      <div className="h-full rounded border-2 border-blanc bg-panel p-5 transition-colors group-hover:border-blanc">
        <h2 className="flex items-center gap-2 font-display text-base font-bold uppercase tracking-widest text-blanc">
          <IconTrain className="shrink-0" />
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-xs text-blanc">
          {t("subtitle")}
        </p>

        {/* Headline: TGV share */}
        <p className="mb-3 text-center font-mono text-2xl font-bold text-danger">
          {RAILWAY_TOLLS.tgvShare}%{" "}
          <span className="text-sm text-blanc">{t("tgvShare")}</span>
        </p>

        {/* Key figures */}
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div className="rounded border border-gray-800 bg-background/50 p-2 text-center">
            <p className="font-mono text-lg font-bold text-blanc">
              {RAILWAY_TOLLS.terShare}%
            </p>
            <p className="font-mono text-[10px] text-blanc">
              {t("terShare")}
            </p>
          </div>
          <div className="rounded border border-gray-800 bg-background/50 p-2 text-center">
            <p className="font-mono text-lg font-bold text-danger">
              &gt;{RAILWAY_TOLLS.totalRevenue}
            </p>
            <p className="font-mono text-[10px] text-blanc">
              {t("totalRevenue")}
            </p>
          </div>
        </div>

        {/* Annual increase */}
        <div className="rounded border border-danger/30 bg-background/50 p-2 text-center">
          <p className="font-mono text-lg font-bold text-danger">
            +{RAILWAY_TOLLS.annualIncrease}%
          </p>
          <p className="font-mono text-[10px] text-blanc">
            {t("annualIncrease")}
          </p>
        </div>

        <p className="mt-2 font-mono text-xs text-blanc">
          {t("sncfNote", { revenue: RAILWAY_TOLLS.groupRevenue })}
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
