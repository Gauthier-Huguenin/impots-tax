"use client";

import { useTranslations } from "next-intl";
import { TICKER_DATA } from "@/lib/tax-data";

const TICKER_ITEMS = [
  { key: "smic", value: TICKER_DATA.smicNet },
  { key: "plafondSS", value: TICKER_DATA.plafondSS },
  { key: "tva", value: TICKER_DATA.tvaNormale },
  { key: "csg", value: TICKER_DATA.csg },
  { key: "publicDebt", value: TICKER_DATA.publicDebt },
  { key: "debtToGdp", value: TICKER_DATA.debtToGdp },
  { key: "taxToGdp", value: TICKER_DATA.taxToGdp },
  { key: "ussrAlert", value: TICKER_DATA.taxToGdp },
  { key: "deficit", value: TICKER_DATA.deficit },
  { key: "flatTax", value: TICKER_DATA.flatTax2026 },
  { key: "irTop", value: TICKER_DATA.irTopRate },
] as const;

export function Ticker() {
  const t = useTranslations("ticker");

  const items = TICKER_ITEMS.map((item) => t(item.key, { value: item.value }));
  // Duplicate for seamless loop
  const allItems = [...items, ...items];

  return (
    <div className="overflow-hidden border-t border-gray-800 bg-panel" aria-live="off" aria-label="Ticker data">
      <div className="flex animate-ticker whitespace-nowrap py-2">
        {allItems.map((text, i) => (
          <span key={i} className="mx-6 font-mono text-xs text-slate-300">
            <span className={`mr-2 ${i % 3 === 0 ? "text-favorable" : i % 3 === 1 ? "text-blanc" : "text-danger"}`}>■</span>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
