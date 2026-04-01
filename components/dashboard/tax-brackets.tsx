"use client";

import { useTranslations } from "next-intl";
import { IR_BRACKETS } from "@/lib/tax-data";
import { formatPercent, formatNumber } from "@/lib/format";
import { IconBarChart } from "@/components/ui/panel-icons";

interface TaxBracketsProps {
  onOpenDetail?: () => void;
}

const BRACKET_COLORS = [
  "bg-slate-600",
  "bg-blanc",
  "bg-blue-500",
  "bg-danger/80",
  "bg-danger",
];

const BRACKET_TEXT_COLORS = [
  "text-slate-400",
  "text-blanc",
  "text-blue-400",
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
      aria-label={t("title")}
      className="group flex flex-col cursor-pointer h-full"
      onClick={onOpenDetail}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpenDetail?.(); }}
    >
      <div className="flex flex-col flex-1 rounded border-2 border-blanc bg-panel p-5 transition-colors group-hover:border-blanc">
        <h2 className="flex items-center gap-2 font-display text-base font-bold uppercase tracking-widest text-blanc">
          <IconBarChart className="shrink-0" />
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-xs text-blanc">
          {t("subtitle")}
        </p>

        {/* Visual bars */}
        <div className="space-y-2">
          {IR_BRACKETS.map((bracket, i) => (
            <div key={i}>
              <div className="mb-0.5 flex items-baseline justify-between gap-2">
                <span className="font-mono text-xs text-blanc sm:text-sm">
                  {t(`bracket${i}` as "bracket0")}
                </span>
                <span
                  className={`font-mono text-sm font-bold sm:text-base ${BRACKET_TEXT_COLORS[i]} ${
                    i === 4 ? "animate-glow" : ""
                  }`}
                >
                  {formatPercent(bracket.rate)}
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

        {/* Table */}
        <div className="mt-4 scroll-hint overflow-x-auto">
          <table className="w-full border-collapse font-mono text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-left">
                <th className="py-2 pr-3 font-bold text-blanc">{t("colRange")}</th>
                <th className="px-3 py-2 text-right font-bold text-blanc">{t("colRate")}</th>
                <th className="hidden py-2 pl-3 font-bold text-blanc sm:table-cell">{t("colDescription")}</th>
              </tr>
            </thead>
            <tbody>
              {IR_BRACKETS.map((bracket, i) => (
                <tr
                  key={i}
                  className={`border-b border-gray-800/50 ${
                    i % 2 === 0 ? "bg-panel" : "bg-panel-light"
                  }`}
                >
                  <td className="whitespace-nowrap py-1.5 pr-3 text-blanc">
                    {bracket.max
                      ? `${formatNumber(bracket.min)} – ${formatNumber(bracket.max)}\u00A0€`
                      : `${formatNumber(bracket.min)}\u00A0€ +`}
                  </td>
                  <td className={`px-3 py-1.5 text-right font-bold ${BRACKET_TEXT_COLORS[i]}`}>
                    {formatPercent(bracket.rate)}
                  </td>
                  <td className="hidden py-1.5 pl-3 text-blanc sm:table-cell">
                    {t(`bracketDesc${i}` as "bracketDesc0")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 font-mono text-xs text-blanc/60">
          {t("cdhr")}
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
