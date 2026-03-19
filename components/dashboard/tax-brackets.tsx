"use client";

import { useTranslations } from "next-intl";
import { IR_BRACKETS } from "@/lib/tax-data";

interface TaxBracketsProps {
  onOpenDetail?: () => void;
}

const BRACKET_COLORS = [
  "bg-favorable",
  "bg-blanc",
  "bg-warning",
  "bg-danger/80",
  "bg-danger",
];

const BRACKET_TEXT_COLORS = [
  "text-favorable",
  "text-blanc",
  "text-warning",
  "text-danger/80",
  "text-danger",
];

export function TaxBrackets({ onOpenDetail }: TaxBracketsProps) {
  const t = useTranslations("taxBrackets");
  const maxRate = 45;

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

        <div className="space-y-2">
          {IR_BRACKETS.map((bracket, i) => (
            <div key={i}>
              <div className="mb-0.5 flex items-baseline justify-between gap-2">
                <span className="font-mono text-[10px] text-gray-500 sm:text-xs">
                  {t(`bracket${i}` as "bracket0")}
                </span>
                <span
                  className={`font-mono text-sm font-bold sm:text-base ${BRACKET_TEXT_COLORS[i]} ${
                    i === 4 ? "animate-glow" : ""
                  }`}
                >
                  {bracket.rate}%
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-sm bg-gray-800/50">
                <div
                  className={`h-full ${BRACKET_COLORS[i]} ${
                    bracket.rate === 0 ? "opacity-20" : "opacity-70"
                  }`}
                  style={{
                    width: `${bracket.rate === 0 ? 3 : (bracket.rate / maxRate) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-3 font-mono text-[10px] text-warning">
          {t("cdhr")}
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
