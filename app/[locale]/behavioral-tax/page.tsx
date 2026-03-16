import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { localePath } from "@/lib/url";
import { TOBACCO_BREAKDOWN, TOBACCO_PACK_PRICE, TOBACCO_TAX_PERCENT, TAX_DATA_YEAR } from "@/lib/tax-data";
import type { Locale } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailBehavioralTax" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    icons: { icon: "/logo.svg" },
  };
}

export default async function BehavioralTaxPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailBehavioralTax" });
  const td = await getTranslations({ locale, namespace: "detail" });
  const typedLocale = locale as Locale;

  const totalTaxAmount = TOBACCO_BREAKDOWN.filter((c) => c.isTax)
    .reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="flex min-h-screen flex-col bg-background">
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

        {/* Tobacco breakdown */}
        <section className="mb-10">
          <h2 className="mb-2 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("tobaccoTitle")}
          </h2>
          <p className="mb-2 font-mono text-xs text-gray-500">{t("tobaccoPMP")}</p>
          <p className="mb-6 font-mono text-xs text-warning">{t("tobaccoTarget")}</p>

          <div className="overflow-x-auto rounded border border-gray-800">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-[#0f1218]">
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-gray-500">
                    {t("component")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("amount")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-gray-500">
                    {t("percent")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {TOBACCO_BREAKDOWN.map((component) => (
                  <tr key={component.key} className="border-b border-gray-800/50">
                    <td className={`px-4 py-3 ${component.isTax ? "text-danger" : "text-gray-300"}`}>
                      {t(component.key as "accise")}
                    </td>
                    <td className={`px-4 py-3 text-right ${component.isTax ? "text-danger" : "text-gray-300"}`}>
                      {component.amount.toFixed(2)} €
                    </td>
                    <td className={`px-4 py-3 text-right ${component.isTax ? "text-danger" : "text-gray-300"}`}>
                      ~{component.percent}%
                    </td>
                  </tr>
                ))}
                <tr className="bg-danger/10">
                  <td className="px-4 py-3 font-bold text-danger">
                    {t("totalTaxes")}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-danger">
                    ~{totalTaxAmount.toFixed(2)} €
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-danger">
                    ~{TOBACCO_TAX_PERCENT}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Visual bar */}
          <div className="mt-4 h-6 w-full overflow-hidden rounded-full bg-gray-800">
            {TOBACCO_BREAKDOWN.map((component) => (
              <div
                key={component.key}
                className={`inline-block h-full ${component.isTax ? "bg-danger" : "bg-gray-600"}`}
                style={{ width: `${component.percent}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-xs text-gray-500">
            <span>{TOBACCO_PACK_PRICE} €</span>
            <span>~{TOBACCO_TAX_PERCENT}% taxes</span>
          </div>
        </section>

        {/* Accise detail */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("acciseDetailTitle")}
          </h2>
          <ul className="space-y-2 font-mono text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-danger">▸</span> {t("acciseProportional")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-danger">▸</span> {t("acciseSpecific")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-danger">▸</span> {t("acciseMinimum")}
            </li>
          </ul>
        </section>

        {/* Price evolution */}
        <section className="mb-10 rounded border border-warning/30 bg-warning/5 p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-warning">
            {t("evolutionTitle")}
          </h2>
          <p className="font-mono text-sm leading-relaxed text-gray-300">
            {t("evolutionDesc")}
          </p>
        </section>

        {/* Alcohol */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("alcoholTitle")}
          </h2>
          <p className="font-mono text-sm leading-relaxed text-gray-400 italic">
            {t("alcoholDesc")}
          </p>
        </section>

        {/* Sugar tax */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("sugarTitle")}
          </h2>
          <p className="font-mono text-sm leading-relaxed text-gray-400 italic">
            {t("sugarDesc")}
          </p>
        </section>

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
