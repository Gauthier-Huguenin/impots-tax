"use client";

import { useTranslations } from "next-intl";
import { trackDonateOpen } from "@/lib/analytics";

interface DonateHookProps {
  onOpenDetail: () => void;
}

export function DonateHook({ onOpenDetail }: DonateHookProps) {
  const t = useTranslations("donateHook");

  const handleClick = () => {
    trackDonateOpen("hook");
    onOpenDetail();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-4">
      <div
        className="group flex cursor-pointer items-center justify-between gap-4 rounded border-2 border-blanc bg-panel/80 px-5 py-3 transition-all hover:border-blanc hover:bg-panel"
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="shrink-0 font-mono text-lg text-danger" aria-hidden="true">
            ☭
          </span>
          <p className="font-mono text-xs text-blanc sm:text-sm">
            <span className="text-blanc font-bold">{t("hook")}</span>
            {" "}
            <span className="hidden sm:inline">{t("detail")}</span>
          </p>
        </div>
        <span className="shrink-0 rounded border border-favorable/30 bg-favorable/5 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-favorable transition-all group-hover:bg-favorable/15 sm:text-sm">
          {t("cta")}
        </span>
      </div>
    </div>
  );
}
