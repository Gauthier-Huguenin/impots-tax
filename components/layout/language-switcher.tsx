"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/lib/navigation";
import type { Locale } from "@/lib/i18n/config";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-1 text-xs">
      <button
        onClick={() => switchLocale("fr")}
        className={`px-2 py-1 font-mono uppercase tracking-wider transition-colors ${
          locale === "fr"
            ? "bg-info/20 text-info border border-info/50"
            : "text-gray-500 hover:text-gray-300 border border-transparent"
        }`}
      >
        FR
      </button>
      <button
        onClick={() => switchLocale("en")}
        className={`px-2 py-1 font-mono uppercase tracking-wider transition-colors ${
          locale === "en"
            ? "bg-info/20 text-info border border-info/50"
            : "text-gray-500 hover:text-gray-300 border border-transparent"
        }`}
      >
        EN
      </button>
    </div>
  );
}
