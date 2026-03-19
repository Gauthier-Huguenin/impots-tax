"use client";

import { useTranslations } from "next-intl";
import { FLAT_TAX_2025, FLAT_TAX_2026 } from "@/lib/tax-data";

interface FlatTaxProps {
  onOpenDetail?: () => void;
}

export function FlatTax({ onOpenDetail }: FlatTaxProps) {
  const t = useTranslations("flatTax");

  return (
    <div
      role="button"
      tabIndex={0}
      className="group block cursor-pointer"
      onClick={onOpenDetail}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpenDetail?.(); }}
    >
      <div className="h-full rounded border border-gray-800 bg-panel p-4 transition-colors group-hover:border-blanc/30">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-slate-300">
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-[10px] text-gray-500">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          {/* 2025 */}
          <div className="rounded border border-gray-700 bg-background/50 p-3 text-center">
            <p className="font-mono text-[10px] text-gray-500">
              {t("year2025")}
            </p>
            <p className="font-mono text-2xl font-bold text-blanc">
              {FLAT_TAX_2025.total}%
            </p>
            <div className="mt-2 space-y-0.5 font-mono text-[10px] text-gray-500">
              <p>
                {t("ir")} : {FLAT_TAX_2025.ir}%
              </p>
              <p>
                {t("social")} : {FLAT_TAX_2025.social}%
              </p>
            </div>
          </div>

          {/* Arrow */}
          <span className="font-mono text-lg text-gray-500">→</span>

          {/* 2026 */}
          <div className="rounded border border-danger/30 bg-background/50 p-3 text-center">
            <p className="font-mono text-[10px] text-gray-500">
              {t("year2026")}
            </p>
            <p className="font-mono text-2xl font-bold text-danger animate-glow">
              {FLAT_TAX_2026.total}%
            </p>
            <div className="mt-2 space-y-0.5 font-mono text-[10px] text-gray-500">
              <p>
                {t("ir")} : {FLAT_TAX_2026.ir}%
              </p>
              <p>
                {t("social")} : {FLAT_TAX_2026.social}%
              </p>
            </div>
          </div>
        </div>

        <p className="mt-3 text-center font-mono text-[10px] text-warning">
          ↑ +1.4% — {t("change")}
        </p>
        <p className="mt-1 font-mono text-[10px] text-gray-500">
          {t("appliesTo")}
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
