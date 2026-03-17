import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { localePath } from "@/lib/url";
import type { Locale } from "@/lib/i18n/config";
import { buildSeoMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/detail/structured-data";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const STRIPE_LINK = "https://buy.stripe.com/4gMdRb8dl6JGafxcHp53O01";

const BREAKDOWN_STEPS = [
  { key: "stepDonation", amount: "10.00 €", className: "text-favorable" },
  { key: "stepStripe", amount: "-0.40 €", className: "text-gray-400" },
  { key: "stepRevenue", amount: "9.60 €", className: "text-blanc" },
  { key: "stepUrssaf", amount: "-2.11 €", className: "text-danger" },
  { key: "stepIR", amount: "-0.40 €", className: "text-warning" },
  { key: "stepNet", amount: "7.09 €", className: "text-favorable font-bold" },
];

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "donate" });
  return buildSeoMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale: locale as Locale,
    path: "/donate",
  });
}

export default async function DonatePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "donate" });
  const td = await getTranslations({ locale, namespace: "detail" });
  const typedLocale = locale as Locale;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <StructuredData
        locale={typedLocale}
        pageTitle={t("title")}
        pagePath="/donate"
        homeLabel="impots.tax"
      />

      {/* Tricolore stripe — top */}
      <div className="flex h-1">
        <div className="flex-1 bg-tricolore-blue" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-tricolore-red" />
      </div>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        {/* Back button */}
        <Link
          href={localePath("/", typedLocale)}
          className="mb-6 inline-flex items-center gap-1 font-mono text-xs text-gray-500 transition-colors hover:text-gray-300"
        >
          ← {td("backToDashboard")}
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold uppercase tracking-widest text-danger sm:text-3xl">
            {t("title")}
          </h1>
          <p className="mt-1 font-mono text-xs uppercase tracking-wider text-gray-500">
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
                <tr className="border-b border-blanc/10 text-left text-xs uppercase tracking-wider text-gray-500">
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
                    <td className="py-2.5 text-gray-400">
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
            <p className="font-mono text-xs uppercase tracking-wider text-gray-500">
              {t("summaryYouGive")}
            </p>
            <p className="mt-1 font-mono text-xl font-bold text-favorable">
              10.00 €
            </p>
          </div>
          <div className="rounded border border-danger/30 bg-panel p-4 text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-gray-500">
              {t("summaryStateGets")}
            </p>
            <p className="mt-1 font-mono text-xl font-bold text-danger">
              2.51 €
            </p>
            <p className="mt-0.5 font-mono text-[10px] text-gray-500">
              25.1% {t("summaryPercent")}
            </p>
          </div>
          <div className="rounded border border-blanc/10 bg-panel p-4 text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-gray-500">
              {t("summaryStripeGets")}
            </p>
            <p className="mt-1 font-mono text-xl font-bold text-gray-400">
              0.40 €
            </p>
            <p className="mt-0.5 font-mono text-[10px] text-gray-500">
              4.0% {t("summaryPercent")}
            </p>
          </div>
          <div className="rounded border border-favorable/30 bg-panel p-4 text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-gray-500">
              {t("summaryIGet")}
            </p>
            <p className="mt-1 font-mono text-xl font-bold text-favorable">
              7.09 €
            </p>
            <p className="mt-0.5 font-mono text-[10px] text-gray-500">
              70.9% {t("summaryPercent")}
            </p>
          </div>
        </div>

        {/* Visual bar */}
        <div className="mb-8 overflow-hidden rounded border border-blanc/20 bg-panel">
          <div className="flex h-8">
            <div
              className="flex items-center justify-center bg-favorable/80 text-[10px] font-bold text-background"
              style={{ width: "70.9%" }}
            >
              70.9%
            </div>
            <div
              className="flex items-center justify-center bg-danger/80 text-[10px] font-bold text-white"
              style={{ width: "25.1%" }}
            >
              25.1%
            </div>
            <div
              className="flex items-center justify-center bg-gray-600 text-[10px] font-bold text-white"
              style={{ width: "4%" }}
            >
            </div>
          </div>
          <div className="flex justify-between px-3 py-1.5 text-[10px] text-gray-500">
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
          <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-gray-400">
            {t("microEntrepreneurTitle")}
          </h2>
          <p className="font-mono text-xs leading-relaxed text-gray-400">
            {t("microEntrepreneurDesc")}
          </p>
        </div>

        {/* CTA */}
        <div className="mb-8 rounded border border-favorable/30 bg-panel p-6 text-center sm:p-8">
          <h2 className="mb-3 font-display text-lg font-bold uppercase tracking-wider text-favorable">
            {t("ctaTitle")}
          </h2>
          <p className="mx-auto mb-6 max-w-md font-mono text-sm text-gray-400">
            {t("ctaDesc")}
          </p>
          <a
            href={STRIPE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-favorable/50 bg-favorable/10 px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-favorable transition-all hover:bg-favorable/20 hover:border-favorable"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
            </svg>
            {t("ctaButton")}
          </a>
          <p className="mt-3 font-mono text-[10px] text-gray-600">
            {t("ctaNote")}
          </p>
        </div>

        {/* Source */}
        <p className="mb-4 font-mono text-[10px] text-gray-600">
          {t("source")}
        </p>
      </main>

      {/* Tricolore stripe — bottom */}
      <div className="flex h-1">
        <div className="flex-1 bg-tricolore-blue" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-tricolore-red" />
      </div>
    </div>
  );
}
