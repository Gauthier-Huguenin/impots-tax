"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { VAT_RATES } from "@/lib/tax-data";

const VAT_COLORS = [
  "text-danger",
  "text-warning",
  "text-info",
  "text-favorable",
];

const VAT_KEYS = ["normal", "intermediate", "reduced", "superReduced"] as const;

export function TVA() {
  const t = useTranslations("tva");

  return (
    <Link href="/vat" className="group block">
      <div className="h-full rounded border border-gray-800 bg-panel p-4 transition-colors group-hover:border-info/50">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-gray-400">
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-[10px] text-gray-600">
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

        <p className="mt-3 font-mono text-[10px] text-gray-600">
          {t("inventedIn")}
        </p>

        <div className="mt-2 flex items-center justify-between">
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
