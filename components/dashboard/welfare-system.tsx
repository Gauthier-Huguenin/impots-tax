"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { WELFARE_DATA } from "@/lib/tax-data";

export function WelfareSystem() {
  const t = useTranslations("welfareSystem");

  return (
    <Link href="/welfare-system" className="group block">
      <div className="h-full rounded border border-gray-800 bg-panel p-4 transition-colors group-hover:border-info/50">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-gray-400">
          {t("title")}
        </h2>
        <p className="mb-4 mt-1 font-mono text-[10px] text-gray-600">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-2 gap-2">
          {/* RSA */}
          <div className="rounded border border-gray-800 bg-background/50 p-3">
            <p className="font-display text-xs font-bold uppercase tracking-wider text-info">
              {t("rsaTitle")}
            </p>
            <p className="font-mono text-[9px] text-gray-500">
              {t("rsaDesc")}
            </p>
            <p className="mt-1 font-mono text-lg font-bold text-info">
              {t("rsaAmount", { amount: WELFARE_DATA.rsa.amountSingle.toFixed(2).replace(".", ",") })}
            </p>
            <p className="font-mono text-[9px] text-gray-500">
              {t("rsaBeneficiaries", { count: "2M" })}
            </p>
          </div>

          {/* AAH */}
          <div className="rounded border border-gray-800 bg-background/50 p-3">
            <p className="font-display text-xs font-bold uppercase tracking-wider text-info">
              {t("aahTitle")}
            </p>
            <p className="font-mono text-[9px] text-gray-500">
              {t("aahDesc")}
            </p>
            <p className="mt-1 font-mono text-lg font-bold text-info">
              {t("aahAmount", { amount: WELFARE_DATA.aah.amountMax.toFixed(2).replace(".", ",") })}
            </p>
            <p className="font-mono text-[9px] text-gray-500">
              {t("aahCondition")}
            </p>
          </div>

          {/* ARE */}
          <div className="rounded border border-gray-800 bg-background/50 p-3">
            <p className="font-display text-xs font-bold uppercase tracking-wider text-warning">
              {t("areTitle")}
            </p>
            <p className="font-mono text-[9px] text-gray-500">
              {t("areDesc")}
            </p>
            <p className="mt-1 font-mono text-lg font-bold text-warning">
              {t("areCalc", { rate: WELFARE_DATA.are.calcRate })}
            </p>
            <p className="font-mono text-[9px] text-gray-500">
              {t("areMin", { amount: WELFARE_DATA.are.minDaily })}
            </p>
          </div>

          {/* AME */}
          <div className="rounded border border-gray-800 bg-background/50 p-3">
            <p className="font-display text-xs font-bold uppercase tracking-wider text-danger">
              {t("ameTitle")}
            </p>
            <p className="font-mono text-[9px] text-gray-500">
              {t("ameDesc")}
            </p>
            <p className="mt-1 font-mono text-lg font-bold text-danger">
              {t("ameBudget", { amount: WELFARE_DATA.ame.budget })}
            </p>
            <p className="font-mono text-[9px] text-gray-500">
              {t("ameBeneficiaries", { count: "466 000" })}
            </p>
            <p className="font-mono text-[9px] text-gray-600">
              {t("ameCostPerCapita", { amount: WELFARE_DATA.ame.costPerCapita })}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
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
