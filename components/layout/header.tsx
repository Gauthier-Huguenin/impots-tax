"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { TAX_DATA_YEAR } from "@/lib/tax-data";
import { siteConfig } from "@/lib/config";
import { Link } from "@/lib/navigation";

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
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="impots.tax"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="font-display text-lg font-bold uppercase tracking-widest text-danger sm:text-xl md:text-2xl">
            {t("title")}
          </span>
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

          {/* Tricolore micro-stripe */}
          <div className="hidden items-center gap-0.5 md:flex">
            <span className="h-3 w-1 rounded-sm bg-tricolore-blue" />
            <span className="h-3 w-1 rounded-sm bg-blanc" />
            <span className="h-3 w-1 rounded-sm bg-tricolore-red" />
          </div>

          {/* X / Twitter */}
          <a
            href={siteConfig.social.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="@leploutos on X"
            className="text-gray-400 transition-colors hover:text-gray-200"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Donate */}
          <Link
            href="/donate"
            className="hidden font-mono text-[10px] uppercase tracking-wider text-favorable/70 transition-colors hover:text-favorable sm:inline"
          >
            {t("donate")}
          </Link>

          {/* Language toggle */}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
