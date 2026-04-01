"use client";

import { useTranslations } from "next-intl";
import { WELFARE_DATA } from "@/lib/tax-data";
import { formatNumber } from "@/lib/format";
import { IconHandshake } from "@/components/ui/panel-icons";

interface WelfareSystemProps {
  onOpenDetail?: () => void;
}

export function WelfareSystem({ onOpenDetail }: WelfareSystemProps) {
  const t = useTranslations("welfareSystem");

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={t("title")}
      className="group block cursor-pointer"
      onClick={onOpenDetail}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpenDetail?.(); }}
    >
      <div className="h-full rounded border-2 border-blanc bg-panel p-5 transition-colors group-hover:border-blanc">
        <h2 className="flex items-center gap-2 font-display text-base font-bold uppercase tracking-widest text-blanc">
          <IconHandshake className="shrink-0" />
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-xs text-blanc">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-2 gap-2">
          {/* RSA */}
          <div className="rounded border border-gray-800 bg-background/50 p-3">
            <p className="font-display text-xs font-bold uppercase tracking-wider text-blanc">
              {t("rsaTitle")}
            </p>
            <p className="font-mono text-[10px] text-blanc">
              {t("rsaDesc")}
            </p>
            <p className="mt-1 font-mono text-lg font-bold text-blanc">
              {t("rsaAmount", { amount: formatNumber(WELFARE_DATA.rsa.amountSingle, 2) })}
            </p>
            <p className="font-mono text-[10px] text-blanc">
              {t("rsaBeneficiaries", { count: "2M" })}
            </p>
          </div>

          {/* AAH */}
          <div className="rounded border border-gray-800 bg-background/50 p-3">
            <p className="font-display text-xs font-bold uppercase tracking-wider text-blanc">
              {t("aahTitle")}
            </p>
            <p className="font-mono text-[10px] text-blanc">
              {t("aahDesc")}
            </p>
            <p className="mt-1 font-mono text-lg font-bold text-blanc">
              {t("aahAmount", { amount: formatNumber(WELFARE_DATA.aah.amountMax, 2) })}
            </p>
            <p className="font-mono text-[10px] text-blanc">
              {t("aahCondition")}
            </p>
          </div>

          {/* ARE */}
          <div className="rounded border border-gray-800 bg-background/50 p-3">
            <p className="font-display text-xs font-bold uppercase tracking-wider text-blanc">
              {t("areTitle")}
            </p>
            <p className="font-mono text-[10px] text-blanc">
              {t("areDesc")}
            </p>
            <p className="mt-1 font-mono text-lg font-bold text-blanc">
              {t("areCalc", { rate: WELFARE_DATA.are.calcRate })}
            </p>
            <p className="font-mono text-[10px] text-blanc">
              {t("areMin", { amount: WELFARE_DATA.are.minDaily })}
            </p>
          </div>

          {/* AME */}
          <div className="rounded border border-gray-800 bg-background/50 p-3">
            <p className="font-display text-xs font-bold uppercase tracking-wider text-danger">
              {t("ameTitle")}
            </p>
            <p className="font-mono text-[10px] text-blanc">
              {t("ameDesc")}
            </p>
            <p className="mt-1 font-mono text-lg font-bold text-danger">
              {t("ameBudget", { amount: WELFARE_DATA.ame.budget })}
            </p>
            <p className="font-mono text-[10px] text-blanc">
              {t("ameBeneficiaries", { count: "466 000" })}
            </p>
            <p className="font-mono text-[10px] text-blanc">
              {t("ameCostPerCapita", { amount: WELFARE_DATA.ame.costPerCapita })}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-800 pt-3">
          <span className="font-mono text-xs text-blanc">
            {t("source")}
          </span>
          <span className="font-mono text-xs text-blanc group-hover:text-blanc">
            {t("details")}
          </span>
        </div>
      </div>
    </div>
  );
}
