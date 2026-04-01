"use client";

import { useTranslations } from "next-intl";
import { SOCIAL_CONTRIBUTIONS, SOCIAL_CONTRIBUTIONS_TOTALS } from "@/lib/tax-data";
import { IconBriefcase } from "@/components/ui/panel-icons";

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
      aria-label={t("title")}
      className="group block cursor-pointer"
      onClick={onOpenDetail}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpenDetail?.(); }}
    >
      <div className="rounded border-2 border-blanc bg-panel p-5 transition-colors group-hover:border-blanc">
        <h2 className="flex items-center gap-2 font-display text-base font-bold uppercase tracking-widest text-blanc">
          <IconBriefcase className="shrink-0" />
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-xs text-blanc">
          {t("subtitle")}
        </p>

        <div className="scroll-hint overflow-x-auto">
          <table className="w-full font-mono text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-sm uppercase text-blanc">
                <th className="py-2 pr-2 text-left">{t("contribution")}</th>
                <th className="px-2 py-2 text-right text-xs sm:text-sm">
                  {t("employerCol")}
                </th>
                <th className="px-2 py-2 text-right text-xs sm:text-sm">
                  {t("employeeCol")}
                </th>
                <th className="py-2 pl-2 text-right text-xs sm:text-sm">
                  {t("totalCol")}
                </th>
              </tr>
            </thead>
            <tbody>
              {SOCIAL_CONTRIBUTIONS.map((row) => (
                <tr
                  key={row.key}
                  className="border-b border-gray-800/50 text-blanc"
                >
                  <td className="py-1.5 pr-2 text-sm text-blanc">
                    {t(row.key as "health")}
                  </td>
                  <td className="px-2 py-1.5 text-right">
                    <span className={row.employer === null ? "text-blanc" : ""}>
                      {formatRate(row.employer)}
                    </span>
                  </td>
                  <td className="px-2 py-1.5 text-right">
                    <span className={row.employee === null ? "text-blanc" : ""}>
                      {formatRate(row.employee)}
                    </span>
                  </td>
                  <td className="py-1.5 pl-2 text-right text-blanc">
                    {formatRate(row.total)}
                  </td>
                </tr>
              ))}
              {/* Totals row */}
              <tr className="border-t border-danger/30 bg-danger/5 font-bold text-danger">
                <td className="py-2 pr-2 text-sm">
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
