import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { localePath } from "@/lib/url";
import { IR_BRACKETS, TAX_DATA_YEAR } from "@/lib/tax-data";
import type { Locale } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailIncomeTax" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    icons: { icon: "/logo.svg" },
  };
}

const BRACKET_COLORS = [
  "text-favorable", // 0%
  "text-info",      // 11%
  "text-warning",   // 30%
  "text-danger",    // 41%
  "text-danger",    // 45%
];

const BRACKET_BG = [
  "bg-favorable/10 border-favorable/30",
  "bg-info/10 border-info/30",
  "bg-warning/10 border-warning/30",
  "bg-danger/10 border-danger/30",
  "bg-danger/10 border-danger/30",
];

const BRACKET_BAR = [
  "bg-favorable",
  "bg-info",
  "bg-warning",
  "bg-danger",
  "bg-danger",
];

export default async function IncomeTaxPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "detailIncomeTax" });
  const td = await getTranslations({ locale, namespace: "detail" });
  const typedLocale = locale as Locale;

  return (
    <div className="flex min-h-screen flex-col bg-background">
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
          className="mb-8 inline-block font-mono text-sm text-info hover:text-info/80 transition-colors"
        >
          {td("backToDashboard")}
        </Link>

        {/* Header */}
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

        {/* Tax brackets */}
        <section className="mb-10">
          <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("bracketsTitle")}
          </h2>
          <p className="mb-4 font-mono text-xs text-gray-500">{t("perShare")}</p>

          <div className="space-y-3">
            {IR_BRACKETS.map((bracket, i) => (
              <div
                key={i}
                className={`rounded border p-4 ${BRACKET_BG[i]}`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="font-mono text-xs uppercase tracking-wide text-gray-500">
                      {t("bracket", { number: i + 1 })} — {t(`bracketLabel${i}` as "bracketLabel0")}
                    </div>
                    <div className="mt-1 font-mono text-sm text-gray-300">
                      {t(`bracketRange${i}` as "bracketRange0")}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-800 sm:w-32">
                      <div
                        className={`h-full rounded-full ${BRACKET_BAR[i]}`}
                        style={{ width: `${(bracket.rate / 45) * 100}%` }}
                      />
                    </div>
                    <span className={`font-mono text-2xl font-bold ${BRACKET_COLORS[i]}`}>
                      {bracket.rate}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Family quotient */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
            {t("quotientTitle")}
          </h2>
          <p className="mb-4 font-mono text-sm leading-relaxed text-gray-300">
            {t("quotientDesc")}
          </p>
          <ul className="space-y-2 font-mono text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("quotientAdult")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("quotientChild")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">▸</span> {t("quotientChild3")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">▸</span> {t("quotientCap")}
            </li>
          </ul>
        </section>

        {/* CDHR 2026 */}
        <section className="mb-10 rounded border border-danger/30 bg-danger/5 p-6">
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-danger">
            {t("cdhrTitle")}
          </h2>
          <p className="font-mono text-sm leading-relaxed text-gray-300">
            {t("cdhrDesc")}
          </p>
        </section>

        {/* Indexation note */}
        <section className="mb-10 rounded border border-gray-800 bg-[#0f1218] p-4">
          <p className="font-mono text-xs text-gray-500">
            {t("indexation")}
          </p>
        </section>

        {/* Source */}
        <footer className="border-t border-gray-800 pt-4">
          <p className="font-mono text-xs text-gray-600">
            {td("source")} : {t("sourceText")}
          </p>
          <p className="mt-1 font-mono text-xs text-gray-600">
            {td("lastUpdated", { date: "Mars 2026" })}
          </p>
        </footer>
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
