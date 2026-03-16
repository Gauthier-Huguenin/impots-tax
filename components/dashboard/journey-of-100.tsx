"use client";

import { useTranslations } from "next-intl";
import { JOURNEY_STEPS, JOURNEY_SUMMARY } from "@/lib/tax-data";

interface StepProps {
  label: string;
  detail: string;
  amount: number;
  isTax: boolean;
  maxAmount: number;
}

function Step({ label, detail, amount, isTax, maxAmount }: StepProps) {
  const absAmount = Math.abs(amount);
  const widthPercent = (absAmount / maxAmount) * 100;

  return (
    <div className="group">
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <span className="font-mono text-xs text-gray-400 sm:text-sm">
          {label}
        </span>
        <span
          className={`font-mono text-sm font-bold sm:text-base ${
            isTax ? "text-danger" : "text-favorable"
          }`}
        >
          {isTax ? "−" : ""}
          {absAmount} €
        </span>
      </div>
      <div className="h-5 w-full overflow-hidden rounded-sm bg-gray-800/50 sm:h-6">
        <div
          className={`h-full transition-all duration-700 ${
            isTax
              ? "bg-gradient-to-r from-danger/70 to-danger/40"
              : "bg-gradient-to-r from-info/70 to-info/40"
          }`}
          style={{ width: `${widthPercent}%` }}
        />
      </div>
      <p className="mt-0.5 font-mono text-[10px] text-gray-600">{detail}</p>
    </div>
  );
}

const STEP_DETAILS: Record<string, string> = {
  employerCost: "",
  employerContributions: "urssaf",
  grossSalary: "",
  employeeContributions: "csgCrds",
  netBeforeTax: "",
  incomeTax: "pasIr",
  netAfterTax: "",
  vatOnSpending: "vatAvg",
  realPurchasingPower: "",
};

export function JourneyOf100() {
  const t = useTranslations("journeyOf100");

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="relative overflow-hidden rounded border border-info/30 bg-panel p-4 sm:p-6 scanlines">
        {/* Panel header */}
        <div className="relative z-10 mb-6">
          <h2 className="font-display text-xl font-bold uppercase tracking-widest text-info sm:text-2xl md:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-1 font-mono text-xs text-gray-500 sm:text-sm">
            {t("subtitle")}
          </p>
        </div>

        {/* Journey steps */}
        <div className="relative z-10 space-y-3">
          {JOURNEY_STEPS.map((step) => (
            <Step
              key={step.key}
              label={t(step.key)}
              detail={
                STEP_DETAILS[step.key]
                  ? t(STEP_DETAILS[step.key] as "urssaf" | "csgCrds" | "pasIr" | "vatAvg")
                  : ""
              }
              amount={step.amount}
              isTax={step.isTax}
              maxAmount={JOURNEY_SUMMARY.employerCost}
            />
          ))}
        </div>

        {/* Summary box */}
        <div className="relative z-10 mt-6 grid grid-cols-1 gap-3 rounded border border-danger/20 bg-background/50 p-4 sm:grid-cols-3">
          <div className="text-center">
            <p className="font-mono text-xs uppercase text-gray-500">
              {t("employerPays")}
            </p>
            <p className="font-mono text-2xl font-bold text-info">
              {JOURNEY_SUMMARY.employerCost} €
            </p>
          </div>
          <div className="text-center">
            <p className="font-mono text-xs uppercase text-gray-500">
              {t("youReceive")}
            </p>
            <p className="font-mono text-2xl font-bold text-favorable">
              {JOURNEY_SUMMARY.realPurchasingPower} €
            </p>
          </div>
          <div className="text-center">
            <p className="font-mono text-xs uppercase text-gray-500">
              {t("extractionRate")}
            </p>
            <p className="font-mono text-2xl font-bold text-danger animate-glow">
              {JOURNEY_SUMMARY.extractionRate}%
            </p>
          </div>
        </div>

        {/* Source */}
        <p className="relative z-10 mt-3 font-mono text-[10px] text-gray-600">
          {t("source")}
        </p>
      </div>
    </div>
  );
}
