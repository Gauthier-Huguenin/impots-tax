import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { localePath } from "@/lib/url";
import { FLAT_TAX_2025, FLAT_TAX_2026, TAX_DATA_YEAR } from "@/lib/tax-data";
import type { Locale } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailFlatTax" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    icons: { icon: "/logo.svg" },
  };
}

export default async function FlatTaxPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailFlatTax" });
  const td = await getTranslations({ locale, namespace: "detail" });
  const typedLocale = locale as Locale;

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

        {/* 2025 vs 2026 comparison */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* 2025 */}
          <div className="rounded border border-gray-800 bg-[#0f1218] p-6">
            <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wider text-gray-100">
              {t("rates2025Title")}
            </h2>
            <table className="w-full font-mono text-sm">
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-gray-400">{t("componentIR")}</td>
                  <td className="py-2 text-right text-info">{FLAT_TAX_2025.ir}%</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-gray-400">{t("componentSocial")}</td>
                  <td className="py-2 text-right text-warning">{FLAT_TAX_2025.social}%</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-gray-200">{t("componentTotal")}</td>
                  <td className="py-2 text-right text-2xl font-bold text-warning">{FLAT_TAX_2025.total}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 2026 */}
          <div className="rounded border border-danger/30 bg-danger/5 p-6">
            <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wider text-danger">
              {t("rates2026Title")}
            </h2>
            <table className="w-full font-mono text-sm">
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-gray-400">{t("componentIR")}</td>
                  <td className="py-2 text-right text-info">{FLAT_TAX_2026.ir}%</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-gray-400">{t("componentSocial")}</td>
                  <td className="py-2 text-right text-danger">{FLAT_TAX_2026.social}%</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-gray-200">{t("componentTotal")}</td>
                  <td className="py-2 text-right text-2xl font-bold text-danger">{FLAT_TAX_2026.total}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Change explanation */}
        <section className="mb-10 rounded border border-danger/30 bg-danger/5 p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-danger">
            {t("changeTitle")}
          </h2>
          <p className="font-mono text-sm leading-relaxed text-gray-300">
            {t("changeDesc")}
          </p>
        </section>

        {/* Scope */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("scopeTitle")}
          </h2>
          <ul className="space-y-2 font-mono text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("scopeDividends")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("scopeInterest")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("scopeCapitalGains")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("scopeCrypto")}
            </li>
          </ul>
        </section>

        {/* Exceptions */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("exceptionTitle")}
          </h2>
          <p className="font-mono text-sm leading-relaxed text-gray-300">
            {t("exceptionDesc")}
          </p>
        </section>

        {/* Progressive scale option */}
        <section className="mb-10 rounded border border-info/30 bg-info/5 p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-info">
            {t("optionTitle")}
          </h2>
          <p className="font-mono text-sm leading-relaxed text-gray-300">
            {t("optionDesc")}
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
