"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { MACRO_INDICATORS } from "@/lib/tax-data";

export function MacroIndicators() {
  const t = useTranslations("keyIndicators");

  const indicators = [
    {
      key: "debtToGdp",
      value: `${MACRO_INDICATORS.debtToGdp}%`,
      color: "text-danger",
      glow: false,
    },
    {
      key: "spendingToGdp",
      value: `${MACRO_INDICATORS.spendingToGdp}%`,
      color: "text-danger",
      glow: false,
    },
    {
      key: "deficit",
      value: `${MACRO_INDICATORS.deficit}%`,
      color: "text-danger",
      glow: true,
    },
    {
      key: "publicDebt",
      value: t("billions", { value: MACRO_INDICATORS.publicDebt.toLocaleString("fr-FR") }),
      color: "text-blanc",
      glow: false,
    },
  ];

  return (
    <Link href="/indicators" className="group block">
      <div className="h-full rounded border border-gray-800 bg-panel p-4 transition-colors group-hover:border-blanc/30">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-gray-400">
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-[10px] text-gray-600">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-2 gap-3">
          {indicators.map((ind) => (
            <div
              key={ind.key}
              className="rounded border border-gray-800 bg-background/50 p-3 text-center"
            >
              <p
                className={`font-mono text-xl font-bold sm:text-2xl ${ind.color} ${
                  ind.glow ? "animate-glow" : ""
                }`}
              >
                {ind.value}
              </p>
              <p className="mt-1 font-mono text-[10px] text-gray-500">
                {t(ind.key as "debtToGdp")}
              </p>
            </div>
          ))}
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
    </Link>
  );
}
