"use client";

import { useTranslations } from "next-intl";
import {
  CAPITAL_GAINS_CTO,
  CAPITAL_GAINS_PEA,
  CAPITAL_GAINS_COMPARISON,
  US_DIVIDEND_TAX,
} from "@/lib/tax-data";
import { IconStock } from "@/components/ui/panel-icons";

interface CapitalGainsProps {
  onOpenDetail?: () => void;
}

export function CapitalGains({ onOpenDetail }: CapitalGainsProps) {
  const t = useTranslations("capitalGains");

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
          <IconStock className="shrink-0" />
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-xs text-muted">
          {t("subtitle")}
        </p>

        {/* CTO vs PEA comparison */}
        <div className="mb-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          {/* CTO */}
          <div className="rounded border border-danger/30 bg-background/50 p-3 text-center">
            <p className="font-mono text-xs text-muted">
              {t("cto")}
            </p>
            <p className="font-mono text-2xl font-bold text-danger">
              {CAPITAL_GAINS_CTO.flatTax2026.total}%
            </p>
            <div className="mt-1 space-y-0.5 font-mono text-[10px] text-muted">
              <p>
                {t("ir")} : {CAPITAL_GAINS_CTO.flatTax2026.ir}%
              </p>
              <p>
                {t("social")} : {CAPITAL_GAINS_CTO.flatTax2026.social}%
              </p>
            </div>
          </div>

          {/* VS */}
          <span className="font-mono text-xs text-muted">vs</span>

          {/* PEA */}
          <div className="rounded border border-favorable/30 bg-background/50 p-3 text-center">
            <p className="font-mono text-xs text-muted">
              {t("pea")}
            </p>
            <p className="font-mono text-2xl font-bold text-favorable">
              {CAPITAL_GAINS_PEA.social2026}%
            </p>
            <div className="mt-1 space-y-0.5 font-mono text-[10px] text-muted">
              <p>
                {t("ir")} : 0% ({t("peaExempt")})
              </p>
              <p>
                {t("social")} : {CAPITAL_GAINS_PEA.social2026}%
              </p>
            </div>
          </div>
        </div>

        {/* Savings line */}
        <p className="mb-3 text-center font-mono text-xs text-favorable">
          {t("savings", {
            amount: CAPITAL_GAINS_COMPARISON.savings.toLocaleString("fr-FR"),
            gain: CAPITAL_GAINS_COMPARISON.capitalGain.toLocaleString("fr-FR"),
          })}
        </p>

        {/* US withholding */}
        <div className="rounded border border-gray-800 bg-background/50 p-2">
          <p className="font-mono text-xs text-slate-300">
            {t("usWithholding")}
          </p>
          <div className="mt-1 flex items-center justify-between font-mono text-xs">
            <span className="text-muted">{t("withholdingRate")}</span>
            <span className="text-warning">
              {US_DIVIDEND_TAX.withholdingRate}%
            </span>
          </div>
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-muted">{t("leakage")}</span>
            <span className="text-danger">{US_DIVIDEND_TAX.leakage}%</span>
          </div>
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
