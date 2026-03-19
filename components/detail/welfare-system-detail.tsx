"use client";

import { useTranslations } from "next-intl";
import { WELFARE_DATA, TAX_DATA_YEAR } from "@/lib/tax-data";

const RSA_AMOUNTS = [
  { key: "rsaSingle", amount: "646.52 \u20ac" },
  { key: "rsaCouple", amount: "969.78 \u20ac" },
  { key: "rsaSingle1Child", amount: "969.78 \u20ac" },
  { key: "rsaCouple1Child", amount: "1 163.73 \u20ac" },
  { key: "rsaCouple2Children", amount: "1 357.69 \u20ac" },
  { key: "rsaExtraChild", amount: "+258.61 \u20ac" },
] as const;

export function WelfareSystemDetail() {
  const t = useTranslations("detailWelfareSystem");
  const td = useTranslations("detail");

  return (
    <>
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

      {/* RSA */}
      <section className="mb-10 rounded border border-favorable/30 bg-[#0f1218] p-6">
        <h2 className="mb-2 font-display text-2xl font-bold uppercase tracking-wider text-favorable">
          {t("rsaTitle")}
        </h2>
        <p className="mb-6 font-mono text-sm leading-relaxed text-gray-300">
          {t("rsaDesc")}
        </p>

        <h3 className="mb-4 font-display text-lg font-bold uppercase tracking-wider text-gray-100">
          {t("rsaAmountsTitle")}
        </h3>
        <div className="overflow-x-auto rounded border border-gray-800">
          <table className="w-full font-mono text-sm">
            <tbody>
              {RSA_AMOUNTS.map((row) => (
                <tr key={row.key} className="border-b border-gray-800/50">
                  <td className="px-4 py-3 text-gray-300">
                    {t(row.key)}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-favorable">
                    {row.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 space-y-1 font-mono text-xs text-gray-500">
          <p>{t("rsaRevaluation")}</p>
          <p>{t("rsaEstimate2026")}</p>
        </div>

        <h3 className="mb-3 mt-6 font-display text-lg font-bold uppercase tracking-wider text-gray-100">
          {t("rsaStatsTitle")}
        </h3>
        <ul className="space-y-2 font-mono text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-favorable">&#9656;</span> {t("rsaBeneficiaries")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">&#9656;</span> {t("rsaNonTakeUp")}
          </li>
          <li className="flex items-start gap-2 text-xs text-gray-500">
            <span className="text-gray-500">&#9656;</span> {t("rsaNonTakeUpNote")}
          </li>
        </ul>

        <h3 className="mb-3 mt-6 font-display text-lg font-bold uppercase tracking-wider text-gray-100">
          {t("rsaReformTitle")}
        </h3>
        <ul className="space-y-2 font-mono text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-warning">&#9656;</span> {t("rsaReform1")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">&#9656;</span> {t("rsaReform2")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">&#9656;</span> {t("rsaReform3")}
          </li>
        </ul>
      </section>

      {/* AAH */}
      <section className="mb-10 rounded border border-favorable/30 bg-[#0f1218] p-6">
        <h2 className="mb-2 font-display text-2xl font-bold uppercase tracking-wider text-favorable">
          {t("aahTitle")}
        </h2>
        <p className="mb-6 font-mono text-sm leading-relaxed text-gray-300">
          {t("aahDesc")}
        </p>

        <h3 className="mb-4 font-display text-lg font-bold uppercase tracking-wider text-gray-100">
          {t("aahAmountTitle")}
        </h3>
        <div className="mb-2 flex items-baseline gap-3">
          <span className="font-mono text-3xl font-bold text-favorable">
            {WELFARE_DATA.aah.amountMax} \u20ac
          </span>
          <span className="font-mono text-xs text-gray-500">{td("perMonth")}</span>
        </div>
        <p className="mb-4 font-mono text-xs text-gray-500">{t("aahEstimate2026")}</p>

        <h3 className="mb-3 mt-6 font-display text-lg font-bold uppercase tracking-wider text-gray-100">
          {t("aahConditionsTitle")}
        </h3>
        <ul className="space-y-2 font-mono text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-favorable">&#9656;</span> {t("aahCondition1")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-favorable">&#9656;</span> {t("aahCondition2")}
          </li>
        </ul>
        <p className="mt-4 font-mono text-xs text-gray-500">
          {t("aahDeconjugalization")}
        </p>
      </section>

      {/* ARE */}
      <section className="mb-10 rounded border border-warning/30 bg-[#0f1218] p-6">
        <h2 className="mb-2 font-display text-2xl font-bold uppercase tracking-wider text-warning">
          {t("areTitle")}
        </h2>
        <p className="mb-6 font-mono text-sm leading-relaxed text-gray-300">
          {t("areDesc")}
        </p>

        <h3 className="mb-3 font-display text-lg font-bold uppercase tracking-wider text-gray-100">
          {t("areConditionsTitle")}
        </h3>
        <ul className="space-y-2 font-mono text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-warning">&#9656;</span> {t("areCondition1")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning">&#9656;</span> {t("areCondition2")}
          </li>
        </ul>

        <h3 className="mb-3 mt-6 font-display text-lg font-bold uppercase tracking-wider text-gray-100">
          {t("areDurationTitle")}
        </h3>
        <p className="font-mono text-sm text-gray-300">{t("areDuration")}</p>

        <h3 className="mb-3 mt-6 font-display text-lg font-bold uppercase tracking-wider text-gray-100">
          {t("areCalcTitle")}
        </h3>
        <p className="font-mono text-sm text-gray-300">{t("areCalcDesc")}</p>
        <div className="mt-2 flex items-baseline gap-3">
          <span className="font-mono text-2xl font-bold text-warning">
            ~{WELFARE_DATA.are.calcRate}%
          </span>
        </div>
        <p className="mt-2 font-mono text-xs text-gray-500">{t("areMinimum")}</p>
        <p className="mt-1 font-mono text-xs text-gray-500">{t("areFunding")}</p>
      </section>

      {/* AME */}
      <section className="mb-10 rounded border border-danger/30 bg-[#0f1218] p-6">
        <h2 className="mb-2 font-display text-2xl font-bold uppercase tracking-wider text-danger">
          {t("ameTitle")}
        </h2>
        <p className="mb-6 font-mono text-sm leading-relaxed text-gray-300">
          {t("ameDesc")}
        </p>

        <h3 className="mb-3 font-display text-lg font-bold uppercase tracking-wider text-gray-100">
          {t("ameConditionsTitle")}
        </h3>
        <ul className="space-y-2 font-mono text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-danger">&#9656;</span> {t("ameCondition1")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-danger">&#9656;</span> {t("ameCondition2")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-danger">&#9656;</span> {t("ameCondition3")}
          </li>
        </ul>

        <h3 className="mb-3 mt-6 font-display text-lg font-bold uppercase tracking-wider text-gray-100">
          {t("ameStatsTitle")}
        </h3>
        <ul className="space-y-2 font-mono text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-danger">&#9656;</span> {t("ameBeneficiaries")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-danger">&#9656;</span> {t("ameBudget")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blanc">&#9656;</span> {t("ameCostPerCapita")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blanc">&#9656;</span> {t("ameShareHealth")}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blanc">&#9656;</span> {t("ameCoverage")}
          </li>
        </ul>

        <h3 className="mb-3 mt-6 font-display text-lg font-bold uppercase tracking-wider text-gray-100">
          {t("ameBreakdownTitle")}
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-3 rounded-full bg-danger" style={{ width: "60.8%" }} />
            <span className="font-mono text-xs text-slate-300">{t("ameHospital")}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-3 rounded-full bg-warning" style={{ width: "26.5%" }} />
            <span className="font-mono text-xs text-slate-300">{t("ameCityCare")}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-3 rounded-full bg-blanc" style={{ width: "12.7%" }} />
            <span className="font-mono text-xs text-slate-300">{t("amePharmacy")}</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 pt-4">
        <p className="font-mono text-xs text-gray-500">
          {td("sources")} : {t("sourceText")}
        </p>
        <p className="mt-1 font-mono text-xs text-gray-500">
          {td("lastUpdated", { date: "Mars 2026" })}
        </p>
      </footer>
    </>
  );
}
