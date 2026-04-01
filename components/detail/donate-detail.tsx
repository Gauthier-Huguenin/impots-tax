"use client";

import { useTranslations } from "next-intl";
import { trackStripeClick } from "@/lib/analytics";

const STRIPE_LINK = "https://buy.stripe.com/4gMdRb8dl6JGafxcHp53O01";

const BREAKDOWN_STEPS = [
  { key: "stepDonation", amount: "10.00 €", className: "text-favorable" },
  { key: "stepStripe", amount: "-0.40 €", className: "text-slate-300" },
  { key: "stepRevenue", amount: "9.60 €", className: "text-blanc" },
  { key: "stepUrssaf", amount: "-2.11 €", className: "text-danger" },
  { key: "stepIR", amount: "-0.40 €", className: "text-warning" },
  { key: "stepNet", amount: "7.09 €", className: "text-favorable font-bold" },
];

export function DonateDetail() {
  const t = useTranslations("donate");

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold uppercase tracking-widest text-danger sm:text-3xl">
          {t("title")}
        </h1>
        <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">
          {t("subtitle")}
        </p>
      </div>

      {/* Intro */}
      <div className="mb-8 rounded border border-blanc/20 bg-panel p-5 sm:p-6">
        <p className="font-mono text-sm leading-relaxed text-gray-300">
          {t("intro")}
        </p>
      </div>

      {/* Breakdown table */}
      <div className="mb-8 rounded border border-danger/30 bg-panel p-5 sm:p-6 animate-pulse-border">
        <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wider text-danger">
          {t("breakdownTitle")}
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full font-mono text-sm">
            <thead>
              <tr className="border-b border-blanc/10 text-left text-xs uppercase tracking-wider text-muted">
                <th className="pb-2 pr-4">{t("step")}</th>
                <th className="pb-2 pr-4 text-right">{t("amount")}</th>
                <th className="pb-2">{t("description")}</th>
              </tr>
            </thead>
            <tbody>
              {BREAKDOWN_STEPS.map((step, i) => (
                <tr
                  key={step.key}
                  className={`border-b border-blanc/5 ${i === BREAKDOWN_STEPS.length - 1 ? "border-blanc/20" : ""}`}
                >
                  <td className={`py-2.5 pr-4 ${step.className}`}>
                    {t(step.key)}
                  </td>
                  <td className={`py-2.5 pr-4 text-right tabular-nums ${step.className}`}>
                    {step.amount}
                  </td>
                  <td className="py-2.5 text-slate-300">
                    {t(`${step.key}Desc`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary boxes */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded border border-blanc/20 bg-panel p-4 text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            {t("summaryYouGive")}
          </p>
          <p className="mt-1 font-mono text-xl font-bold text-favorable">
            10.00 €
          </p>
        </div>
        <div className="rounded border border-danger/30 bg-panel p-4 text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            {t("summaryStateGets")}
          </p>
          <p className="mt-1 font-mono text-xl font-bold text-danger">
            2.51 €
          </p>
          <p className="mt-0.5 font-mono text-xs text-muted">
            25.1% {t("summaryPercent")}
          </p>
        </div>
        <div className="rounded border border-blanc/10 bg-panel p-4 text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            {t("summaryStripeGets")}
          </p>
          <p className="mt-1 font-mono text-xl font-bold text-slate-300">
            0.40 €
          </p>
          <p className="mt-0.5 font-mono text-xs text-muted">
            4.0% {t("summaryPercent")}
          </p>
        </div>
        <div className="rounded border border-favorable/30 bg-panel p-4 text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            {t("summaryIGet")}
          </p>
          <p className="mt-1 font-mono text-xl font-bold text-favorable">
            7.09 €
          </p>
          <p className="mt-0.5 font-mono text-xs text-muted">
            70.9% {t("summaryPercent")}
          </p>
        </div>
      </div>

      {/* Visual bar */}
      <div className="mb-8 overflow-hidden rounded border border-blanc/20 bg-panel">
        <div className="flex h-8">
          <div
            className="flex items-center justify-center bg-favorable/80 text-xs font-bold text-background"
            style={{ width: "70.9%" }}
          >
            70.9%
          </div>
          <div
            className="flex items-center justify-center bg-danger/80 text-xs font-bold text-white"
            style={{ width: "25.1%" }}
          >
            25.1%
          </div>
          <div
            className="flex items-center justify-center bg-gray-600 text-xs font-bold text-white"
            style={{ width: "4%" }}
          >
          </div>
        </div>
        <div className="flex justify-between px-3 py-1.5 text-xs text-muted">
          <span>{t("summaryIGet")}</span>
          <span>{t("summaryStateGets")}</span>
          <span>Stripe</span>
        </div>
      </div>

      {/* Verdict */}
      <div className="mb-8 rounded border border-warning/30 bg-panel p-5 sm:p-6">
        <h2 className="mb-3 font-display text-lg font-bold uppercase tracking-wider text-warning">
          {t("verdictTitle")}
        </h2>
        <p className="font-mono text-sm leading-relaxed text-gray-300">
          {t("verdictDesc")}
        </p>
      </div>

      {/* Micro-entrepreneur explanation */}
      <div className="mb-8 rounded border border-blanc/10 bg-panel p-5 sm:p-6">
        <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-slate-300">
          {t("microEntrepreneurTitle")}
        </h2>
        <p className="font-mono text-xs leading-relaxed text-slate-300">
          {t("microEntrepreneurDesc")}
        </p>
      </div>

      {/* CTA */}
      <div className="mb-8 rounded border border-favorable/30 bg-panel p-6 text-center sm:p-8">
        <h2 className="mb-3 font-display text-lg font-bold uppercase tracking-wider text-favorable">
          {t("ctaTitle")}
        </h2>
        <p className="mx-auto mb-6 max-w-md font-mono text-sm text-slate-300">
          {t("ctaDesc")}
        </p>
        <a
          href={STRIPE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackStripeClick}
          className="inline-flex items-center gap-2 rounded border border-favorable/50 bg-favorable/10 px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-favorable transition-all hover:bg-favorable/20 hover:border-favorable"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
          </svg>
          {t("ctaButton")}
        </a>
        <p className="mt-3 font-mono text-xs text-muted">
          {t("ctaNote")}
        </p>
      </div>

      {/* Source */}
      <p className="mb-4 font-mono text-xs text-muted">
        {t("source")}
      </p>
    </>
  );
}
