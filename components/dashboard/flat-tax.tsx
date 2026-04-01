"use client";

import { useTranslations } from "next-intl";
import { FLAT_TAX_2025, FLAT_TAX_2026 } from "@/lib/tax-data";
import { IconTrendUp } from "@/components/ui/panel-icons";

interface FlatTaxProps {
  onOpenDetail?: () => void;
}

export function FlatTax({ onOpenDetail }: FlatTaxProps) {
  const t = useTranslations("flatTax");

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={t("title")}
      className="group block cursor-pointer"
      onClick={onOpenDetail}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpenDetail?.(); }}
    >
      <div className="h-full rounded border-2 border-blanc bg-panel p-5 transition-colors group-hover:border-blanc">
        <h2 className="flex items-center gap-2 font-display text-base font-bold uppercase tracking-widest text-blanc">
          <IconTrendUp className="shrink-0" />
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-xs text-blanc">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          {/* 2025 */}
          <div className="rounded border border-gray-700 bg-background/50 p-3 text-center">
            <p className="font-mono text-xs text-blanc">
              {t("year2025")}
            </p>
            <p className="font-mono text-2xl font-bold text-blanc">
              {FLAT_TAX_2025.total}%
            </p>
            <div className="mt-2 space-y-0.5 font-mono text-xs text-blanc">
              <p>
                {t("ir")} : {FLAT_TAX_2025.ir}%
              </p>
              <p>
                {t("social")} : {FLAT_TAX_2025.social}%
              </p>
            </div>
          </div>

          {/* Arrow */}
          <span className="font-mono text-lg text-blanc">→</span>

          {/* 2026 */}
          <div className="rounded border border-danger/30 bg-background/50 p-3 text-center">
            <p className="font-mono text-xs text-blanc">
              {t("year2026")}
            </p>
            <p className="font-mono text-2xl font-bold text-danger animate-glow">
              {FLAT_TAX_2026.total}%
            </p>
            <div className="mt-2 space-y-0.5 font-mono text-xs text-blanc">
              <p>
                {t("ir")} : {FLAT_TAX_2026.ir}%
              </p>
              <p>
                {t("social")} : {FLAT_TAX_2026.social}%
              </p>
            </div>
          </div>
        </div>

        <p className="mt-3 text-center font-mono text-xs text-warning">
          ↑ +1.4% — {t("change")}
        </p>
        <p className="mt-1 font-mono text-xs text-blanc">
          {t("appliesTo")}
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
