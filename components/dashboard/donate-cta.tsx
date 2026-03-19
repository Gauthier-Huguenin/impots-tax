"use client";

import { useTranslations } from "next-intl";

interface DonateCtaProps {
  onOpenDetail?: () => void;
}

export function DonateCta({ onOpenDetail }: DonateCtaProps) {
  const t = useTranslations("dashboardDonate");

  return (
    <div
      className="rounded border border-favorable/20 bg-panel p-5 sm:p-6 scanlines cursor-pointer transition-colors hover:border-favorable/40"
      onClick={onOpenDetail}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenDetail?.();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-favorable">
            {t("title")}
          </h3>
          <p className="mt-1 font-mono text-xs text-gray-500">
            {t("desc")}
          </p>
        </div>
        <span className="shrink-0 rounded border border-favorable/30 bg-favorable/5 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-favorable transition-all group-hover:bg-favorable/15">
          {t("cta")}
        </span>
      </div>
    </div>
  );
}
