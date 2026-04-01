"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { siteConfig } from "@/lib/config";
import { trackDonateOpen } from "@/lib/analytics";

export function Header() {
  const t = useTranslations("header");
  const [utcTime, setUtcTime] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function tick() {
      const now = new Date();
      setUtcTime(
        now.toLocaleTimeString("fr-FR", {
          timeZone: "Europe/Paris",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " PARIS"
      );
    }
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`border-b border-gray-800 px-4 py-3 transition-all duration-300 ${
        scrolled
          ? "bg-panel/80 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-[12px] backdrop-saturate-[1.2]"
          : "bg-panel"
      }`}
    >
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
          <span className="font-display text-lg font-black uppercase tracking-widest text-danger sm:text-xl md:text-2xl">
            {t("title")}
          </span>
        </div>

        {/* Right: Clock, data year, monitoring, language toggle */}
        <div className="flex items-center gap-3 text-xs">
          {/* UTC Clock */}
          <span className="hidden font-mono text-slate-300 sm:inline">
            {utcTime}
          </span>

          {/* Monitoring indicator */}
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-favorable animate-pulse-dot" />
            <span className="hidden font-mono text-favorable sm:inline">
              {t("monitoring")}
            </span>
          </div>

          {/* X / Twitter */}
          <a
            href={siteConfig.social.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="@leploutos on X"
            className="text-slate-300 transition-colors hover:text-gray-200"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* GitHub Star */}
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star on GitHub"
            className="hidden items-center gap-1.5 rounded-full border border-gray-600 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300 transition-all hover:border-gray-400 hover:bg-white/10 hover:text-white sm:flex"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
            </svg>
            Star
          </a>

          {/* Donate */}
          <button
            onClick={() => {
              trackDonateOpen("header");
              window.location.hash = "donate";
              window.dispatchEvent(new HashChangeEvent("hashchange"));
            }}
            className="hidden items-center gap-1.5 rounded-full border border-gray-600 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300 transition-all hover:border-favorable/50 hover:bg-favorable/10 hover:text-favorable sm:flex cursor-pointer"
          >
            <span className="text-sm leading-none" aria-hidden="true">$</span>
            {t("donate")}
          </button>

          {/* Language toggle */}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
