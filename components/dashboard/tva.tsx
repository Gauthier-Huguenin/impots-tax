"use client";

import { useTranslations } from "next-intl";
import { VAT_RATES } from "@/lib/tax-data";

interface TVAProps {
  onOpenDetail?: () => void;
}

const VAT_COLORS = [
  "text-danger",
  "text-warning",
  "text-blanc",
  "text-favorable",
];

const VAT_KEYS = ["normal", "intermediate", "reduced", "superReduced"] as const;

export function TVA({ onOpenDetail }: TVAProps) {
  const t = useTranslations("tva");

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

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {VAT_RATES.map((vat, i) => (
            <div
              key={vat.key}
              className="rounded border border-gray-800 bg-background/50 p-2 text-center"
            >
              <p className={`font-mono text-xl font-bold sm:text-2xl ${VAT_COLORS[i]}`}>
                {vat.rate}%
              </p>
              <p className="mt-1 font-mono text-[9px] leading-tight text-gray-500 sm:text-[10px]">
                {t(VAT_KEYS[i])}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-3 font-mono text-[10px] text-gray-500">
          {t("inventedIn")}
        </p>

        <div className="mt-2 flex items-center justify-between">
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
