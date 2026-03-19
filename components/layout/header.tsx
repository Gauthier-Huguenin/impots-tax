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
        now.toISOString().slice(11, 19) + " UTC"
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
            className="text-gray-400 transition-colors hover:text-gray-200"
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
            className="hidden items-center gap-1.5 rounded-md border border-gray-700 px-2 py-0.5 font-mono text-[10px] text-gray-400 transition-colors hover:border-gray-500 hover:text-gray-200 sm:flex"
          >
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
            className="hidden font-mono text-[10px] uppercase tracking-wider text-favorable/70 transition-colors hover:text-favorable sm:inline cursor-pointer"
          >
            {t("donate")}
          </button>

          {/* Language toggle */}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
