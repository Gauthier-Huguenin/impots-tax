import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { localePath } from "@/lib/url";
import { PROPERTY_TAX, PROPERTY_TAX_REVALUATION, PROPERTY_TAX_RATES, TAX_DATA_YEAR } from "@/lib/tax-data";
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
  const t = await getTranslations({ locale, namespace: "detailPropertyTax" });

  return buildSeoMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale: locale as Locale,
    path: "/property-tax",
  });
}

export default async function PropertyTaxPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailPropertyTax" });
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
        pagePath="/property-tax"
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

        {/* Intro */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <p className="font-mono text-sm leading-relaxed text-gray-300">
            {t("intro")}
          </p>
        </section>

        {/* Calculation formula */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("calculTitle")}
          </h2>
          <p className="mb-3 font-mono text-sm text-warning">
            {t("calculFormula")}
          </p>
          <p className="font-mono text-xs text-gray-500">
            {t("calculNote")}
          </p>
        </section>

        {/* Revaluation table */}
        <section className="mb-10">
          <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("revaluationTitle")}
          </h2>

          <div className="overflow-x-auto rounded border border-gray-800">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-[#0f1218]">
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">
                    {t("revaluationYear")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("revaluationRate")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {PROPERTY_TAX_REVALUATION.map((row) => (
                  <tr key={row.year} className="border-b border-gray-800/50">
                    <td className="px-4 py-3 text-gray-300">{row.year}</td>
                    <td className={`px-4 py-3 text-right ${row.rate >= 3 ? "text-danger" : "text-warning"}`}>
                      +{row.rate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-xs text-gray-500">
            {t("revaluation2026Note")}
          </p>
        </section>

        {/* Key amounts */}
        <section className="mb-10 rounded border border-danger/30 bg-danger/5 p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-danger">
            {t("amountsTitle")}
          </h2>
          <ul className="space-y-2 font-mono text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-danger">▸</span> {t("totalRevenue")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-danger">▸</span> {t("taxpayers")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-danger">▸</span> {t("avgPerTaxpayer")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">▸</span> {t("avgHouse")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">▸</span> {t("avgApartment")}
            </li>
          </ul>
        </section>

        {/* Rates by city */}
        <section className="mb-10">
          <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("ratesTitle")}
          </h2>

          <div className="overflow-x-auto rounded border border-gray-800">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-[#0f1218]">
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">
                    {t("city")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("rate")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {PROPERTY_TAX_RATES.map((city) => (
                  <tr key={city.key} className="border-b border-gray-800/50">
                    <td className="px-4 py-3 text-gray-300 capitalize">{city.key}</td>
                    <td className={`px-4 py-3 text-right ${city.rate >= 50 ? "text-danger" : city.rate >= 30 ? "text-warning" : "text-info"}`}>
                      {city.rate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-xs text-gray-500">
            {t("ratesNote")}
          </p>
        </section>

        {/* Housing tax abolition */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("habTaxTitle")}
          </h2>
          <p className="font-mono text-sm leading-relaxed text-gray-300">
            {t("habTaxDesc")}
          </p>
        </section>

        <FaqSection title={t("faqTitle")} faqs={faqs} />

        <footer className="border-t border-gray-800 pt-4">
          <p className="font-mono text-xs text-gray-600">
            {td("sources")} : {t("sourceText")}
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
