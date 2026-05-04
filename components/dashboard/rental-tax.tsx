"use client";

import { useTranslations } from "next-intl";
import { LMNP_MICRO_BIC } from "@/lib/tax-data";
import { IconKey } from "@/components/ui/panel-icons";

interface RentalTaxProps {
  onOpenDetail?: () => void;
}

export function RentalTax({ onOpenDetail }: RentalTaxProps) {
  const t = useTranslations("rentalTax");

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
          <IconKey className="shrink-0" />
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-xs text-blanc">
          {t("subtitle")}
        </p>

        {/* LMNP micro-BIC table */}
        <div className="overflow-hidden rounded border border-gray-800">
          <table className="w-full text-left font-mono text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-background/50">
                <th className="px-2 py-1.5 text-blanc">{t("regime")}</th>
                <th className="px-2 py-1.5 text-right text-blanc">
                  {t("ceiling")}
                </th>
                <th className="px-2 py-1.5 text-right text-blanc">
                  {t("allowance")}
                </th>
              </tr>
            </thead>
            <tbody>
              {LMNP_MICRO_BIC.map((regime) => (
                <tr
                  key={regime.key}
                  className="border-b border-gray-800/50 last:border-0"
                >
                  <td className="px-2 py-1.5 text-blanc">
                    {t(regime.key as "unclassifiedTourism")}
                  </td>
                  <td className="px-2 py-1.5 text-right text-blanc">
                    {regime.ceiling.toLocaleString("fr-FR")} €
                  </td>
                  <td className="px-2 py-1.5 text-right text-danger">
                    {regime.allowance}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Before/after note */}
        <p className="mt-3 font-mono text-xs text-blanc">
          {t("depreciationNote")}
        </p>

        <p className="mt-1 font-mono text-xs text-blanc">
          {t("leMeurLaw")}
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
