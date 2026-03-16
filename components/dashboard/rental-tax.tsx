"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { LMNP_MICRO_BIC } from "@/lib/tax-data";

export function RentalTax() {
  const t = useTranslations("rentalTax");

  return (
    <Link href="/rental-tax" className="group block">
      <div className="h-full rounded border border-gray-800 bg-panel p-4 transition-colors group-hover:border-info/50">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-gray-400">
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-[10px] text-gray-600">
          {t("subtitle")}
        </p>

        {/* LMNP micro-BIC table */}
        <div className="overflow-hidden rounded border border-gray-800">
          <table className="w-full text-left font-mono text-[10px]">
            <thead>
              <tr className="border-b border-gray-800 bg-background/50">
                <th className="px-2 py-1.5 text-gray-500">{t("regime")}</th>
                <th className="px-2 py-1.5 text-right text-gray-500">
                  {t("ceiling")}
                </th>
                <th className="px-2 py-1.5 text-right text-gray-500">
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
                  <td className="px-2 py-1.5 text-gray-300">
                    {t(regime.key as "unclassifiedTourism")}
                  </td>
                  <td className="px-2 py-1.5 text-right text-warning">
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
        <p className="mt-3 font-mono text-[10px] text-warning">
          {t("depreciationNote")}
        </p>

        <p className="mt-1 font-mono text-[10px] text-gray-500">
          {t("leMeurLaw")}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-[10px] text-gray-600">
            {t("source")}
          </span>
          <span className="font-mono text-[10px] text-gray-600 group-hover:text-info">
            {t("details")}
          </span>
        </div>
      </div>
    </Link>
  );
}
