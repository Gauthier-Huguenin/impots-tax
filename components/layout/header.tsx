"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { TAX_DATA_YEAR } from "@/lib/tax-data";

export function Header() {
  const t = useTranslations("header");
  const [utcTime, setUtcTime] = useState("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      setUtcTime(
        now.toISOString().slice(11, 19) + " UTC"
      );
    }
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-gray-800 bg-panel px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Left: Title with alert triangle */}
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label="alert">
            ⚠
          </span>
          <h1 className="font-display text-lg font-bold uppercase tracking-widest text-danger sm:text-xl md:text-2xl">
            {t("title")}
          </h1>
        </div>

        {/* Right: Clock, data year, monitoring, language toggle */}
        <div className="flex items-center gap-4 text-xs">
          {/* UTC Clock */}
          <span className="hidden font-mono text-gray-400 sm:inline">
            {utcTime}
          </span>

          {/* Data year */}
          <span className="hidden font-mono text-gray-500 md:inline">
            {t("dataYear", { year: TAX_DATA_YEAR })}
          </span>

          {/* Monitoring indicator */}
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-favorable animate-pulse-dot" />
            <span className="hidden font-mono text-favorable sm:inline">
              {t("monitoring")}
            </span>
          </div>

          {/* Language toggle */}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
