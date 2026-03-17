import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { localePath } from "@/lib/url";
import { VAT_RATES, TAX_DATA_YEAR } from "@/lib/tax-data";
import type { Locale } from "@/lib/i18n/config";
import { buildSeoMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/detail/structured-data";
import { FaqSection } from "@/components/detail/faq-section";
import type { FaqItem } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailVat" });

  return buildSeoMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale: locale as Locale,
    path: "/vat",
  });
}

const RATE_KEYS = ["rateNormal", "rateIntermediate", "rateReduced", "rateSuperReduced"] as const;
const RATE_DESC_KEYS = ["rateNormalDesc", "rateIntermediateDesc", "rateReducedDesc", "rateSuperReducedDesc"] as const;
const RATE_COLORS = [
  "border-danger/30 bg-danger/5",
  "border-warning/30 bg-warning/5",
  "border-info/30 bg-info/5",
  "border-favorable/30 bg-favorable/5",
];
const RATE_TEXT_COLORS = ["text-danger", "text-warning", "text-info", "text-favorable"];

export default async function VatPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailVat" });
  const td = await getTranslations({ locale, namespace: "detail" });
  const typedLocale = locale as Locale;

  const faqs: FaqItem[] = [
    { question: t("faqQ1"), answer: t("faqA1") },
    { question: t("faqQ2"), answer: t("faqA2") },
    { question: t("faqQ3"), answer: t("faqA3") },
    { question: t("faqQ4"), answer: t("faqA4") },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <StructuredData
        locale={typedLocale}
        pageTitle={t("title")}
        pagePath="/vat"
        homeLabel={td("backToDashboard")}
        faqs={faqs}
      />
      <div className="flex h-1">
        <div className="flex-1 bg-tricolore-blue" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-tricolore-red" />
      </div>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        <Link
          href={localePath("/", typedLocale)}
          className="mb-8 inline-block font-mono text-sm text-info hover:text-info/80 transition-colors"
        >
          {td("backToDashboard")}
        </Link>

        <header className="mb-10">
          <h1 className="font-display text-3xl font-bold uppercase tracking-wider text-gray-100 md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 font-mono text-sm uppercase tracking-wide text-warning">
            {t("subtitle")}
          </p>
          <p className="mt-1 font-mono text-xs text-gray-500">
            {td("dataYear", { year: TAX_DATA_YEAR })}
          </p>
        </header>

        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <p className="font-mono text-sm leading-relaxed text-gray-300">
            {t("intro")}
          </p>
        </section>

        {/* VAT rates */}
        <section className="mb-10">
          <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("ratesTitle")}
          </h2>
          <div className="space-y-4">
            {VAT_RATES.map((vr, i) => (
              <div key={vr.key} className={`rounded border p-6 ${RATE_COLORS[i]}`}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <h3 className={`font-display text-lg font-bold uppercase ${RATE_TEXT_COLORS[i]}`}>
                      {t(RATE_KEYS[i])}
                    </h3>
                    <p className="mt-2 font-mono text-sm leading-relaxed text-gray-300">
                      {t(RATE_DESC_KEYS[i])}
                    </p>
                  </div>
                  <div className={`font-mono text-4xl font-bold ${RATE_TEXT_COLORS[i]} shrink-0`}>
                    {vr.rate}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* History */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("historyTitle")}
          </h2>
          <p className="font-mono text-sm leading-relaxed text-gray-300">
            {t("historyDesc")}
          </p>
        </section>

        {/* Mechanism */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("mechanismTitle")}
          </h2>
          <p className="font-mono text-sm leading-relaxed text-gray-300">
            {t("mechanismDesc")}
          </p>
        </section>

        <FaqSection title={t("faqTitle")} faqs={faqs} />

        <footer className="border-t border-gray-800 pt-4">
          <p className="font-mono text-xs text-gray-600">
            {td("source")} : {t("sourceText")}
          </p>
          <p className="mt-1 font-mono text-xs text-gray-600">
            {td("lastUpdated", { date: "Mars 2026" })}
          </p>
        </footer>
      </main>

      <div className="flex h-1">
        <div className="flex-1 bg-tricolore-blue" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-tricolore-red" />
      </div>
    </div>
  );
}
