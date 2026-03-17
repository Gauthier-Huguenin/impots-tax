"use client";

import { useTranslations } from "next-intl";
import { SOCIAL_CONTRIBUTIONS, SOCIAL_CONTRIBUTIONS_TOTALS } from "@/lib/tax-data";

function formatRate(value: number | null): string {
  if (value === null) return "—";
  return `${value}%`;
}

interface SalaryCostProps {
  onOpenDetail?: () => void;
}

export function SalaryCost({ onOpenDetail }: SalaryCostProps) {
  const t = useTranslations("salaryCost");

  return (
    <div
      role="button"
      tabIndex={0}
      className="group block cursor-pointer"
      onClick={onOpenDetail}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpenDetail?.(); }}
    >
      <div className="rounded border border-gray-800 bg-panel p-4 transition-colors group-hover:border-blanc/30">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-gray-400">
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-[10px] text-gray-600">
          {t("subtitle")}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full font-mono text-xs">
            <thead>
              <tr className="border-b border-gray-700 text-[10px] uppercase text-gray-500">
                <th className="py-2 pr-2 text-left">{t("contribution")}</th>
                <th className="px-2 py-2 text-right">
                  <span className="hidden sm:inline">{t("employerCol")}</span>
                  <span className="sm:hidden">E</span>
                </th>
                <th className="px-2 py-2 text-right">
                  <span className="hidden sm:inline">{t("employeeCol")}</span>
                  <span className="sm:hidden">S</span>
                </th>
                <th className="py-2 pl-2 text-right">
                  <span className="hidden sm:inline">{t("totalCol")}</span>
                  <span className="sm:hidden">T</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {SOCIAL_CONTRIBUTIONS.map((row) => (
                <tr
                  key={row.key}
                  className="border-b border-gray-800/50 text-gray-300"
                >
                  <td className="py-1.5 pr-2 text-[10px] text-gray-400 sm:text-xs">
                    {t(row.key as "health")}
                  </td>
                  <td className="px-2 py-1.5 text-right">
                    <span className={row.employer === null ? "text-gray-700" : ""}>
                      {formatRate(row.employer)}
                    </span>
                  </td>
                  <td className="px-2 py-1.5 text-right">
                    <span className={row.employee === null ? "text-gray-700" : ""}>
                      {formatRate(row.employee)}
                    </span>
                  </td>
                  <td className="py-1.5 pl-2 text-right text-gray-200">
                    {formatRate(row.total)}
                  </td>
                </tr>
              ))}
              {/* Totals row */}
              <tr className="border-t border-danger/30 bg-danger/5 font-bold text-danger">
                <td className="py-2 pr-2 text-[10px] sm:text-xs">
                  {t("totalRow")}
                </td>
                <td className="px-2 py-2 text-right">
                  ~{SOCIAL_CONTRIBUTIONS_TOTALS.employer}%
                </td>
                <td className="px-2 py-2 text-right">
                  ~{SOCIAL_CONTRIBUTIONS_TOTALS.employee}%
                </td>
                <td className="py-2 pl-2 text-right">
                  ~{SOCIAL_CONTRIBUTIONS_TOTALS.total}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-[10px] text-gray-600">
            {t("source")}
          </span>
          <span className="font-mono text-[10px] text-gray-600 group-hover:text-blanc">
            {t("details")}
          </span>
        </div>
      </div>
    </div>
  );
}
