import type { CSSProperties, ReactElement } from "react";
import type { Locale } from "@/lib/i18n/config";
import {
  AIRBNB_STATS,
  CAPITAL_GAINS_COMPARISON,
  CAPITAL_GAINS_CTO,
  CAPITAL_GAINS_PEA,
  CORPORATE_TAX,
  FLAT_TAX_2026,
  FUEL_BREAKDOWN,
  FUEL_PRICE,
  FUEL_TAX_PERCENT,
  HIGHWAY_TOLLS,
  INHERITANCE_DATA,
  IR_BRACKETS,
  JOURNEY_STEPS,
  JOURNEY_SUMMARY,
  LMNP_MICRO_BIC,
  MACRO_INDICATORS,
  OECD_COMPARISON,
  PROPERTY_TAX,
  RAILWAY_TOLLS,
  SOCIAL_CONTRIBUTIONS_TOTALS,
  TOBACCO_BREAKDOWN,
  TOBACCO_PACK_PRICE,
  TOBACCO_TAX_PERCENT,
  VAT_RATES,
  WELFARE_DATA,
} from "@/lib/tax-data";

export const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
} as const;

export const OG_IMAGE_SLUGS = [
  "home",
  "income-tax",
  "corporate-tax",
  "flat-tax",
  "vat",
  "fuel-tax",
  "behavioral-tax",
  "salary-contributions",
  "welfare-system",
  "property-tax",
  "rental-tax",
  "inheritance-tax",
  "capital-gains",
  "highway-tolls",
  "railway-tolls",
  "comparison",
  "indicators",
  "donate",
] as const;

export type OgImageSlug = (typeof OG_IMAGE_SLUGS)[number];

type Tone = "danger" | "warning" | "info" | "favorable" | "neutral" | "violet";
type ChartType = "bars" | "journey" | "ranking" | "split";
type LocalizedText = Record<Locale, string>;

interface OgMetric {
  label: LocalizedText;
  value: string | LocalizedText;
  tone: Tone;
  weight?: number;
}

interface OgImageConfig {
  eyebrow: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  primary: OgMetric;
  metrics: [OgMetric, OgMetric, OgMetric];
  chart: ChartType;
  accent: Tone;
}

const toneColors: Record<Tone, string> = {
  danger: "#ff2d2d",
  warning: "#ffb020",
  info: "#00d4ff",
  favorable: "#00ff88",
  neutral: "#8b95a5",
  violet: "#8b5cf6",
};

const fr = (text: string): LocalizedText => ({ fr: text, en: text });
const localized = (frText: string, enText: string): LocalizedText => ({ fr: frText, en: enText });

function metric(
  value: string | LocalizedText,
  frLabel: string,
  enLabel: string,
  tone: Tone,
  weight = 50,
): OgMetric {
  return {
    value,
    label: localized(frLabel, enLabel),
    tone,
    weight,
  };
}

function formatPercent(value: number): string {
  return `${Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)}%`;
}

function formatEuro(value: number): string {
  return `${value.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €`;
}

function formatBillions(value: number): string {
  return `${value.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} Mds €`;
}

function formatEuroEn(value: number): string {
  return `€${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function euro(value: number, suffix = ""): LocalizedText {
  return localized(`${formatEuro(value)}${suffix}`, `${formatEuroEn(value)}${suffix}`);
}

function eurosPerMonth(value: number): LocalizedText {
  return localized(`${Math.round(value)} €/mois`, `${formatEuroEn(Math.round(value))}/mo`);
}

function billions(value: number): LocalizedText {
  const enValue = value.toLocaleString("en-US", { maximumFractionDigits: 1 });
  return localized(formatBillions(value), `€${enValue}B`);
}

function getMetricValue(metricItem: OgMetric, locale: Locale): string {
  return typeof metricItem.value === "string" ? metricItem.value : metricItem.value[locale];
}

function getOecdMetric(key: string): number {
  const metricValue = OECD_COMPARISON.find((country) => country.key === key)?.taxToGdp;
  if (metricValue === undefined) {
    throw new Error(`Missing OECD metric for ${key}`);
  }
  return metricValue;
}

const franceTaxToGdp = getOecdMetric("france");
const oecdAverageTaxToGdp = getOecdMetric("oecdAverage");
const franceOecdRank =
  OECD_COMPARISON
    .filter((country) => !country.isAverage)
    .sort((a, b) => b.taxToGdp - a.taxToGdp)
    .findIndex((country) => country.key === "france") + 1;

const fuelAccise = FUEL_BREAKDOWN.find((item) => item.key === "accise")?.amount ?? 0;
const tobaccoAccise = TOBACCO_BREAKDOWN.find((item) => item.key === "accise")?.amount ?? 0;
const unclassifiedTourism = LMNP_MICRO_BIC.find((item) => item.key === "unclassifiedTourism");

export const OG_IMAGE_CONFIG: Record<OgImageSlug, OgImageConfig> = {
  home: {
    eyebrow: localized("Centre de commandement fiscal", "Fiscal command center"),
    title: localized("Le parcours de 100 €", "The journey of €100"),
    subtitle: localized(
      "Données fiscales réelles, présentation satirique, sources officielles.",
      "Real fiscal data, satirical presentation, official sources.",
    ),
    primary: metric(
      localized(`${JOURNEY_SUMMARY.realPurchasingPower} €`, `€${JOURNEY_SUMMARY.realPurchasingPower}`),
      "pouvoir d'achat réel",
      "real purchasing power",
      "favorable",
      JOURNEY_SUMMARY.realPurchasingPower,
    ),
    metrics: [
      metric(localized(`${JOURNEY_SUMMARY.employerCost} €`, `€${JOURNEY_SUMMARY.employerCost}`), "coût employeur", "employer cost", "info", 100),
      metric(formatPercent(JOURNEY_SUMMARY.extractionRate), "taux d'extraction", "extraction rate", "danger", JOURNEY_SUMMARY.extractionRate),
      metric(localized(`${JOURNEY_STEPS.length} étapes`, `${JOURNEY_STEPS.length} steps`), "du brut au panier", "from payroll to cart", "warning", 70),
    ],
    chart: "journey",
    accent: "danger",
  },
  "income-tax": {
    eyebrow: localized("Escalade fiscale", "Fiscal escalation"),
    title: localized("Impôt sur le revenu", "France income tax"),
    subtitle: localized(
      "Le barème progressif 2026, de la tranquillité administrative au plafond orbital.",
      "The 2026 progressive bracket system, from calm paperwork to orbital ceiling.",
    ),
    primary: metric(`${IR_BRACKETS.at(-1)?.rate}%`, "taux marginal maximal", "top marginal rate", "danger", 45),
    metrics: [
      metric(`${IR_BRACKETS.length} tranches`, "barème officiel", "official brackets", "info", 70),
      metric(`${IR_BRACKETS[1].rate}%`, "première ponction", "first extraction", "warning", 35),
      metric(euro(IR_BRACKETS.at(-1)?.min ?? 0, "+"), "seuil de l'orbite", "orbital threshold", "danger", 90),
    ],
    chart: "bars",
    accent: "danger",
  },
  "corporate-tax": {
    eyebrow: localized("Coût d'existence", "Cost of existing"),
    title: localized("Impôt sur les sociétés", "Corporate tax"),
    subtitle: localized(
      "Le droit d'exister sur le territoire national, facturé aux entreprises.",
      "The right to exist on French territory, billed to companies.",
    ),
    primary: metric(formatPercent(CORPORATE_TAX.normalRate), "taux normal", "standard rate", "warning", CORPORATE_TAX.normalRate),
    metrics: [
      metric(formatPercent(CORPORATE_TAX.pmeRate), "taux PME", "SME rate", "favorable", CORPORATE_TAX.pmeRate),
      metric(formatPercent(CORPORATE_TAX.exceptionalHighRate), "surtaxe haute", "high surcharge", "danger", CORPORATE_TAX.exceptionalHighRate),
      metric(euro(CORPORATE_TAX.pmeThreshold), "seuil PME", "SME threshold", "info", 60),
    ],
    chart: "bars",
    accent: "warning",
  },
  "flat-tax": {
    eyebrow: localized("Capital sous surveillance", "Capital under watch"),
    title: localized("Flat Tax / PFU", "France flat tax"),
    subtitle: localized(
      "Prélèvement forfaitaire unique, plus forfaitaire que léger.",
      "The single flat levy, flatter than it is light.",
    ),
    primary: metric(formatPercent(FLAT_TAX_2026.total), "PFU 2026", "2026 PFU", "danger", FLAT_TAX_2026.total),
    metrics: [
      metric(formatPercent(FLAT_TAX_2026.ir), "impôt revenu", "income tax", "warning", FLAT_TAX_2026.ir),
      metric(formatPercent(FLAT_TAX_2026.social), "prélèvements sociaux", "social levies", "danger", FLAT_TAX_2026.social),
      metric("+1.4 pt", "hausse vs 2025", "increase vs 2025", "info", 45),
    ],
    chart: "split",
    accent: "danger",
  },
  vat: {
    eyebrow: localized("Taxe invisible", "Invisible tax"),
    title: localized("TVA", "France VAT"),
    subtitle: localized(
      "La taxe française la plus discrète, donc naturellement la plus efficace.",
      "France's quietest tax, and therefore naturally the most efficient.",
    ),
    primary: metric(formatPercent(VAT_RATES[0].rate), "taux normal", "standard rate", "danger", VAT_RATES[0].rate),
    metrics: [
      metric(formatPercent(VAT_RATES[1].rate), "taux intermédiaire", "intermediate rate", "warning", VAT_RATES[1].rate),
      metric(formatPercent(VAT_RATES[2].rate), "taux réduit", "reduced rate", "favorable", VAT_RATES[2].rate),
      metric(formatPercent(VAT_RATES[3].rate), "taux super-réduit", "super-reduced rate", "info", VAT_RATES[3].rate),
    ],
    chart: "bars",
    accent: "info",
  },
  "fuel-tax": {
    eyebrow: localized("Taxe sur taxe", "Tax on tax"),
    title: localized("Taxes carburant", "Fuel taxes"),
    subtitle: localized(
      "Accise, TVA sur produit, TVA sur accise. La pompe a plusieurs tuyaux.",
      "Excise, VAT on product, VAT on excise. The pump has several pipes.",
    ),
    primary: metric(formatPercent(FUEL_TAX_PERCENT), "du prix en taxes", "of pump price is tax", "danger", FUEL_TAX_PERCENT),
    metrics: [
      metric(localized(`${FUEL_PRICE.toFixed(3)} €/L`, `€${FUEL_PRICE.toFixed(3)}/L`), "SP95-E10", "SP95-E10", "info", 70),
      metric(localized(`${fuelAccise.toFixed(2)} €/L`, `€${fuelAccise.toFixed(2)}/L`), "accise", "excise duty", "warning", 45),
      metric("TVA²", "taxe sur taxe", "tax on tax", "danger", 80),
    ],
    chart: "split",
    accent: "danger",
  },
  "behavioral-tax": {
    eyebrow: localized("Hygiène par prélèvement", "Compliance by levy"),
    title: localized("Taxes comportementales", "Behavioral taxes"),
    subtitle: localized(
      "Tabac, alcool, sucre. La santé publique a un ticket de caisse.",
      "Tobacco, alcohol, sugar. Public health has a receipt.",
    ),
    primary: metric(formatPercent(TOBACCO_TAX_PERCENT), "d'un paquet en taxes", "of a pack is tax", "danger", TOBACCO_TAX_PERCENT),
    metrics: [
      metric(localized(`${TOBACCO_PACK_PRICE} €`, `€${TOBACCO_PACK_PRICE}`), "paquet de référence", "reference pack", "warning", 65),
      metric(localized(`${tobaccoAccise.toFixed(2)} €`, `€${tobaccoAccise.toFixed(2)}`), "accise tabac", "tobacco excise", "danger", 70),
      metric("20", "cigarettes surveillées", "monitored cigarettes", "info", 40),
    ],
    chart: "split",
    accent: "danger",
  },
  "salary-contributions": {
    eyebrow: localized("Dommages de terrain", "Field damage assessment"),
    title: localized("Salaires & cotisations", "Salary & contributions"),
    subtitle: localized(
      "Le salaire brut est une étape intermédiaire, pas une destination.",
      "Gross salary is an intermediate checkpoint, not a destination.",
    ),
    primary: metric(formatPercent(SOCIAL_CONTRIBUTIONS_TOTALS.total), "cotisations totales", "total contributions", "danger", SOCIAL_CONTRIBUTIONS_TOTALS.total),
    metrics: [
      metric(formatPercent(SOCIAL_CONTRIBUTIONS_TOTALS.employer), "part employeur", "employer side", "warning", SOCIAL_CONTRIBUTIONS_TOTALS.employer),
      metric(formatPercent(SOCIAL_CONTRIBUTIONS_TOTALS.employee), "part salarié", "employee side", "info", SOCIAL_CONTRIBUTIONS_TOTALS.employee),
      metric(localized(`${JOURNEY_SUMMARY.realPurchasingPower} €`, `€${JOURNEY_SUMMARY.realPurchasingPower}`), "reste réel sur 100 €", "real left from €100", "favorable", JOURNEY_SUMMARY.realPurchasingPower),
    ],
    chart: "journey",
    accent: "danger",
  },
  "welfare-system": {
    eyebrow: localized("Système social", "Welfare system"),
    title: localized("RSA, AAH, ARE, AME", "RSA, AAH, ARE, AME"),
    subtitle: localized(
      "Architecture de redistribution, montants officiels, acronymes inclus.",
      "Redistribution architecture, official amounts, acronyms included.",
    ),
    primary: metric(eurosPerMonth(WELFARE_DATA.aah.amountMax), "AAH taux plein", "AAH full rate", "info", 80),
    metrics: [
      metric(eurosPerMonth(WELFARE_DATA.rsa.amountSingle), "RSA personne seule", "RSA single adult", "warning", 60),
      metric(`${WELFARE_DATA.are.calcRate}%`, "ARE env. salaire", "ARE salary approx.", "favorable", 57),
      metric(billions(WELFARE_DATA.ame.budget), "budget AME", "AME budget", "danger", 65),
    ],
    chart: "bars",
    accent: "info",
  },
  "property-tax": {
    eyebrow: localized("Immobilier captif", "Captive real estate"),
    title: localized("Taxe foncière", "Property tax"),
    subtitle: localized(
      "Vous possédez le mur. Le mur possède une ligne fiscale annuelle.",
      "You own the wall. The wall owns an annual tax line.",
    ),
    primary: metric(billions(PROPERTY_TAX.totalRevenue), "recettes 2024", "2024 revenue", "danger", 80),
    metrics: [
      metric(euro(PROPERTY_TAX.avgPerTaxpayer), "moyenne par contribuable", "average per taxpayer", "warning", 65),
      metric(`+${PROPERTY_TAX.increase10Years}%`, "hausse sur 10 ans", "10-year increase", "danger", 75),
      metric(`${(PROPERTY_TAX.taxpayerCount / 1_000_000).toFixed(0)} M`, "contribuables", "taxpayers", "info", 55),
    ],
    chart: "bars",
    accent: "danger",
  },
  "rental-tax": {
    eyebrow: localized("Meublé sous contrôle", "Furnished rental watch"),
    title: localized("LMNP & Airbnb", "LMNP & Airbnb"),
    subtitle: localized(
      "La location meublée entre dans la zone de turbulence réglementaire.",
      "Furnished rentals enter the regulatory turbulence zone.",
    ),
    primary: metric(
      formatPercent(unclassifiedTourism?.allowance ?? 30),
      "abattement Airbnb non classé",
      "unclassified Airbnb allowance",
      "warning",
      unclassifiedTourism?.allowance ?? 30,
    ),
    metrics: [
      metric(euro(unclassifiedTourism?.ceiling ?? 15000), "plafond micro-BIC", "micro-BIC ceiling", "danger", 65),
      metric(`${(AIRBNB_STATS.activeListings / 1_000_000).toFixed(2)} M`, "annonces actives", "active listings", "info", 75),
      metric(euro(AIRBNB_STATS.avgAnnualIncome), "revenu annuel moyen", "average annual income", "favorable", 55),
    ],
    chart: "bars",
    accent: "warning",
  },
  "inheritance-tax": {
    eyebrow: localized("Transmission surveillée", "Monitored transfer"),
    title: localized("Succession & donation", "Inheritance & gifts"),
    subtitle: localized(
      "Même après vous, l'administration tient à rester dans la boucle.",
      "Even after you, the administration intends to stay in the loop.",
    ),
    primary: metric(formatPercent(INHERITANCE_DATA.nonRelativeRate), "non-parents", "non-relatives", "danger", INHERITANCE_DATA.nonRelativeRate),
    metrics: [
      metric("5% à 45%", "ligne directe", "direct line", "warning", 70),
      metric(euro(INHERITANCE_DATA.childAllowance), "abattement enfant", "child allowance", "favorable", 55),
      metric(billions(INHERITANCE_DATA.totalRevenue), "recettes DMTG", "DMTG revenue", "info", 65),
    ],
    chart: "bars",
    accent: "danger",
  },
  "capital-gains": {
    eyebrow: localized("Investisseur localisé", "Localized investor"),
    title: localized("Plus-values hors PEA", "Capital gains outside PEA"),
    subtitle: localized(
      "Le S&P 500 performe. Le CTO rappelle dans quel pays vous vivez.",
      "The S&P 500 performs. The taxable account reminds you where you live.",
    ),
    primary: metric(formatPercent(CAPITAL_GAINS_CTO.flatTax2026.total), "CTO 2026", "taxable account 2026", "danger", CAPITAL_GAINS_CTO.flatTax2026.total),
    metrics: [
      metric(formatPercent(CAPITAL_GAINS_PEA.social2026), "PEA après 5 ans", "PEA after 5 years", "favorable", CAPITAL_GAINS_PEA.social2026),
      metric(euro(CAPITAL_GAINS_COMPARISON.savings), "écart PEA vs CTO", "PEA vs taxable gap", "info", 55),
      metric(localized(`${CAPITAL_GAINS_COMPARISON.years} ans`, `${CAPITAL_GAINS_COMPARISON.years} years`), "simulation S&P 500", "S&P 500 simulation", "warning", 40),
    ],
    chart: "split",
    accent: "danger",
  },
  "highway-tolls": {
    eyebrow: localized("Infrastructure concédée", "Concession infrastructure"),
    title: localized("Péages autoroutiers", "Highway tolls"),
    subtitle: localized(
      "La route est publique dans l'esprit, monétisée dans le pare-brise.",
      "The road is public in spirit, monetized through the windshield.",
    ),
    primary: metric(billions(HIGHWAY_TOLLS.totalRevenue), "revenus péages", "toll revenue", "danger", 85),
    metrics: [
      metric(billions(HIGHWAY_TOLLS.totalProfits), "bénéfices nets", "net profits", "warning", 70),
      metric(formatPercent(HIGHWAY_TOLLS.stateShare), "part État", "state share", "info", HIGHWAY_TOLLS.stateShare),
      metric(localized(`${HIGHWAY_TOLLS.networkLength.toLocaleString("fr-FR")} km`, `${HIGHWAY_TOLLS.networkLength.toLocaleString("en-US")} km`), "réseau payant", "tolled network", "favorable", 55),
    ],
    chart: "bars",
    accent: "danger",
  },
  "railway-tolls": {
    eyebrow: localized("Rail à péage", "Track access toll"),
    title: localized("Péages ferroviaires", "Railway tolls"),
    subtitle: localized(
      "Le train roule aussi sur une facture d'accès au réseau.",
      "The train also runs on a network access invoice.",
    ),
    primary: metric(formatPercent(RAILWAY_TOLLS.tgvShare), "du prix d'un TGV", "of a TGV ticket", "danger", RAILWAY_TOLLS.tgvShare),
    metrics: [
      metric(localized(`>${formatBillions(RAILWAY_TOLLS.totalRevenue)}`, `>€${RAILWAY_TOLLS.totalRevenue}B`), "recettes réseau", "network revenue", "warning", 70),
      metric(`+${formatPercent(RAILWAY_TOLLS.annualIncrease)}`, "hausse annuelle", "annual increase", "danger", 45),
      metric(formatPercent(RAILWAY_TOLLS.terShare), "part TER", "regional train share", "info", RAILWAY_TOLLS.terShare),
    ],
    chart: "bars",
    accent: "danger",
  },
  comparison: {
    eyebrow: localized("Renseignement international", "International intelligence"),
    title: localized("Comparaison OCDE", "OECD comparison"),
    subtitle: localized(
      "La France reste dans le haut du tableau. Elle a le sens du podium.",
      "France remains near the top of the table. It has a sense for podiums.",
    ),
    primary: metric(localized(`№${franceOecdRank}`, `#${franceOecdRank}`), "rang OCDE", "OECD rank", "danger", 85),
    metrics: [
      metric(formatPercent(franceTaxToGdp), "France taxes/PIB", "France tax-to-GDP", "danger", franceTaxToGdp),
      metric(formatPercent(oecdAverageTaxToGdp), "moyenne OCDE", "OECD average", "info", oecdAverageTaxToGdp),
      metric(`+${formatPercent(franceTaxToGdp - oecdAverageTaxToGdp)}`, "écart France", "France gap", "warning", 65),
    ],
    chart: "ranking",
    accent: "danger",
  },
  indicators: {
    eyebrow: localized("Tableau macro", "Macro dashboard"),
    title: localized("Dette, déficit, dépenses", "Debt, deficit, spending"),
    subtitle: localized(
      "L'État prélève beaucoup, dépense davantage, puis appelle cela un cycle.",
      "The State collects a lot, spends more, then calls it a cycle.",
    ),
    primary: metric(formatPercent(MACRO_INDICATORS.debtToGdp), "dette / PIB", "debt / GDP", "danger", MACRO_INDICATORS.debtToGdp),
    metrics: [
      metric(billions(MACRO_INDICATORS.publicDebt), "dette publique", "public debt", "danger", 90),
      metric(formatPercent(MACRO_INDICATORS.spendingToGdp), "dépenses / PIB", "spending / GDP", "warning", MACRO_INDICATORS.spendingToGdp),
      metric(formatPercent(MACRO_INDICATORS.deficit), "déficit", "deficit", "info", 45),
    ],
    chart: "bars",
    accent: "danger",
  },
  donate: {
    eyebrow: localized("Soutenir le moniteur", "Fund the monitor"),
    title: localized("Même le don est taxé", "Even donations get taxed"),
    subtitle: localized(
      "Un don de 10 € traverse Stripe, l'URSSAF, l'IR et revient légèrement amaigri.",
      "A €10 donation crosses Stripe, URSSAF, income tax, and returns noticeably thinner.",
    ),
    primary: metric(localized("6.91 €", "€6.91"), "reste créateur", "creator receives", "favorable", 69.1),
    metrics: [
      metric(localized("10.00 €", "€10.00"), "vous donnez", "you give", "info", 100),
      metric(localized("2.69 €", "€2.69"), "État", "state gets", "danger", 26.9),
      metric(localized("0.40 €", "€0.40"), "Stripe", "Stripe", "warning", 4),
    ],
    chart: "split",
    accent: "favorable",
  },
};

export function isOgImageSlug(slug: string): slug is OgImageSlug {
  return OG_IMAGE_SLUGS.includes(slug as OgImageSlug);
}

export function getOgImageSlugFromPath(path: string): OgImageSlug {
  const slug = path.replace(/^\/+|\/+$/g, "") || "home";
  return isOgImageSlug(slug) ? slug : "home";
}

export function buildOgImageAlt(slug: OgImageSlug, locale: Locale): string {
  const config = OG_IMAGE_CONFIG[slug];
  return `${config.title[locale]} - ${getMetricValue(config.primary, locale)} ${config.primary.label[locale]} | impots.tax`;
}

export function OgImageTemplate({
  locale,
  slug,
}: {
  locale: Locale;
  slug: OgImageSlug;
}): ReactElement {
  const config = OG_IMAGE_CONFIG[slug];
  const accent = toneColors[config.accent];

  return (
    <div style={styles.frame}>
      <div style={styles.tricolore}>
        <div style={{ ...styles.tricoloreStripe, backgroundColor: "#002395" }} />
        <div style={{ ...styles.tricoloreStripe, backgroundColor: "#ffffff" }} />
        <div style={{ ...styles.tricoloreStripe, backgroundColor: "#ed2939" }} />
      </div>

      <div style={styles.scanline} />
      <div style={styles.content}>
        <div style={styles.header}>
          <div style={styles.brand}>
            <span style={{ color: "#ffffff" }}>impots</span>
            <span style={{ color: accent }}>.tax</span>
          </div>
          <div style={styles.routeCode}>{`/${slug === "home" ? "" : slug}`}</div>
        </div>

        <div style={styles.main}>
          <div style={styles.copy}>
            <div style={{ ...styles.eyebrow, color: accent }}>{config.eyebrow[locale]}</div>
            <div style={styles.title}>{config.title[locale]}</div>
            <div style={styles.subtitle}>{config.subtitle[locale]}</div>
          </div>

          <div style={{ ...styles.primaryPanel, borderColor: accent }}>
            <div style={styles.primaryLabel}>{config.primary.label[locale]}</div>
            <div style={{ ...styles.primaryValue, color: toneColors[config.primary.tone] }}>
              {getMetricValue(config.primary, locale)}
            </div>
            <div style={styles.primaryFooter}>
              {locale === "fr" ? "DONNÉES SOURCÉES" : "SOURCED DATA"}
            </div>
          </div>
        </div>

        <div style={styles.bottom}>
          <div style={styles.chartPanel}>{renderChart(config, locale)}</div>
          <div style={styles.metricStack}>
            {config.metrics.map((item) => (
              <MetricCard key={`${item.label.fr}-${getMetricValue(item, locale)}`} metric={item} locale={locale} />
            ))}
          </div>
        </div>
      </div>

      <div style={styles.tricolore}>
        <div style={{ ...styles.tricoloreStripe, backgroundColor: "#002395" }} />
        <div style={{ ...styles.tricoloreStripe, backgroundColor: "#ffffff" }} />
        <div style={{ ...styles.tricoloreStripe, backgroundColor: "#ed2939" }} />
      </div>
    </div>
  );
}

function MetricCard({ metric, locale }: { metric: OgMetric; locale: Locale }): ReactElement {
  return (
    <div style={styles.metricCard}>
      <div style={{ ...styles.metricValue, color: toneColors[metric.tone] }}>
        {getMetricValue(metric, locale)}
      </div>
      <div style={styles.metricLabel}>{metric.label[locale]}</div>
    </div>
  );
}

function renderChart(config: OgImageConfig, locale: Locale): ReactElement {
  if (config.chart === "journey") {
    return (
      <div style={styles.journeyChart}>
        {JOURNEY_STEPS.map((step) => {
          const value = Math.abs(step.amount);
          const color = step.isTax ? toneColors.danger : toneColors.favorable;

          return (
            <div key={step.key} style={styles.journeyRow}>
              <div style={styles.journeyLabel}>{formatJourneyLabel(step.key, locale)}</div>
              <div style={styles.journeyTrack}>
                <div
                  style={{
                    ...styles.journeyBar,
                    width: `${Math.max(10, value)}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
              <div style={{ ...styles.journeyValue, color }}>
                {formatJourneyValue(step.amount, locale)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (config.chart === "ranking") {
    return (
      <div style={styles.rankingChart}>
        {OECD_COMPARISON.filter((country) => !country.isAverage).slice(0, 5).map((country) => (
          <div key={country.key} style={styles.rankingRow}>
            <div style={styles.rankingCountry}>{formatCountry(country.key, locale)}</div>
            <div style={styles.rankingTrack}>
              <div
                style={{
                  ...styles.rankingBar,
                  width: `${country.taxToGdp * 1.8}%`,
                  backgroundColor: country.key === "france" ? toneColors.danger : toneColors.info,
                }}
              />
            </div>
            <div style={styles.rankingValue}>{formatPercent(country.taxToGdp)}</div>
          </div>
        ))}
      </div>
    );
  }

  if (config.chart === "split") {
    return (
      <div style={styles.splitChart}>
        {config.metrics.map((metricItem) => (
          <div
            key={`${metricItem.label.fr}-split`}
            style={{
              ...styles.splitSegment,
              width: `${Math.max(12, metricItem.weight ?? 50)}%`,
              backgroundColor: toneColors[metricItem.tone],
            }}
          >
            <span style={styles.splitValue}>{getMetricValue(metricItem, locale)}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={styles.barChart}>
      {[config.primary, ...config.metrics].map((metricItem) => (
        <div key={`${metricItem.label.fr}-bar`} style={styles.barRow}>
          <div style={styles.barLabel}>{metricItem.label[locale]}</div>
          <div style={styles.barTrack}>
            <div
              style={{
                ...styles.bar,
                width: `${Math.min(100, Math.max(12, metricItem.weight ?? 50))}%`,
                backgroundColor: toneColors[metricItem.tone],
              }}
            />
          </div>
          <div style={{ ...styles.barValue, color: toneColors[metricItem.tone] }}>
            {getMetricValue(metricItem, locale)}
          </div>
        </div>
      ))}
    </div>
  );
}

function formatJourneyLabel(key: (typeof JOURNEY_STEPS)[number]["key"], locale: Locale): string {
  const labels: Record<typeof key, LocalizedText> = {
    employerCost: localized("coût employeur", "employer cost"),
    employerContributions: localized("cotisations employeur", "employer charges"),
    grossSalary: localized("salaire brut", "gross salary"),
    employeeContributions: localized("cotisations salarié", "employee charges"),
    netBeforeTax: localized("net avant IR", "net before tax"),
    incomeTax: localized("impôt revenu", "income tax"),
    netAfterTax: localized("net après IR", "net after tax"),
    vatOnSpending: localized("TVA dépense", "VAT on spending"),
    realPurchasingPower: localized("pouvoir réel", "real purchasing"),
  };

  return labels[key][locale];
}

function formatJourneyValue(amount: number, locale: Locale): string {
  const absoluteAmount = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";
  return locale === "fr" ? `${sign}${absoluteAmount} €` : `${sign}€${absoluteAmount}`;
}

function formatCountry(key: string, locale: Locale): string {
  const countries: Record<string, LocalizedText> = {
    denmark: localized("Danemark", "Denmark"),
    france: fr("France"),
    austria: localized("Autriche", "Austria"),
    italy: localized("Italie", "Italy"),
    belgium: localized("Belgique", "Belgium"),
  };

  return countries[key]?.[locale] ?? key;
}

const styles = {
  frame: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: "#0a0c10",
    color: "#ffffff",
    fontFamily: "monospace",
  },
  tricolore: {
    display: "flex",
    width: "100%",
    height: 8,
    flexShrink: 0,
  },
  tricoloreStripe: {
    flex: 1,
  },
  scanline: {
    position: "absolute",
    inset: 0,
    backgroundImage: "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
    backgroundSize: "100% 8px",
    opacity: 0.7,
  },
  content: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "42px 54px 44px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    display: "flex",
    fontSize: 30,
    fontWeight: 900,
    letterSpacing: 1,
  },
  routeCode: {
    display: "flex",
    alignItems: "center",
    border: "1px solid rgba(139,149,165,0.45)",
    padding: "8px 14px",
    color: "#8b95a5",
    fontSize: 17,
    textTransform: "uppercase",
  },
  main: {
    display: "flex",
    gap: 34,
    marginTop: 36,
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  eyebrow: {
    fontSize: 18,
    fontWeight: 800,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  title: {
    marginTop: 12,
    fontSize: 62,
    lineHeight: 0.92,
    fontWeight: 950,
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  subtitle: {
    width: 650,
    marginTop: 18,
    color: "#cbd5e1",
    fontSize: 22,
    lineHeight: 1.25,
  },
  primaryPanel: {
    display: "flex",
    flexDirection: "column",
    width: 330,
    height: 184,
    border: "2px solid",
    backgroundColor: "#0f1218",
    padding: "22px 24px",
  },
  primaryLabel: {
    color: "#cbd5e1",
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  primaryValue: {
    marginTop: 16,
    fontSize: 64,
    lineHeight: 0.95,
    fontWeight: 950,
  },
  primaryFooter: {
    marginTop: "auto",
    color: "#8b95a5",
    fontSize: 13,
    letterSpacing: 2,
  },
  bottom: {
    display: "flex",
    gap: 22,
    marginTop: "auto",
  },
  chartPanel: {
    display: "flex",
    flex: 1,
    minHeight: 184,
    border: "1px solid rgba(139,149,165,0.28)",
    backgroundColor: "rgba(15,18,24,0.94)",
    padding: 22,
  },
  metricStack: {
    display: "flex",
    gap: 14,
    width: 500,
  },
  metricCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    border: "1px solid rgba(139,149,165,0.28)",
    backgroundColor: "#0f1218",
    padding: 18,
  },
  metricValue: {
    fontSize: 34,
    lineHeight: 1,
    fontWeight: 950,
  },
  metricLabel: {
    marginTop: 10,
    color: "#cbd5e1",
    fontSize: 13,
    lineHeight: 1.25,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  barChart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    gap: 14,
  },
  barRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  barLabel: {
    width: 184,
    color: "#cbd5e1",
    fontSize: 13,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  barTrack: {
    display: "flex",
    flex: 1,
    height: 18,
    backgroundColor: "#1f2937",
  },
  bar: {
    height: "100%",
  },
  barValue: {
    width: 104,
    fontSize: 20,
    fontWeight: 900,
    textAlign: "right",
  },
  journeyChart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    gap: 7,
  },
  journeyRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  journeyLabel: {
    width: 178,
    color: "#cbd5e1",
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  journeyTrack: {
    display: "flex",
    flex: 1,
    height: 13,
    backgroundColor: "#1f2937",
  },
  journeyBar: {
    height: "100%",
  },
  journeyValue: {
    width: 70,
    fontSize: 14,
    fontWeight: 900,
    textAlign: "right",
  },
  rankingChart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    gap: 12,
  },
  rankingRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  rankingCountry: {
    width: 130,
    color: "#cbd5e1",
    fontSize: 14,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  rankingTrack: {
    display: "flex",
    flex: 1,
    height: 20,
    backgroundColor: "#1f2937",
  },
  rankingBar: {
    height: "100%",
  },
  rankingValue: {
    width: 80,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: 900,
    textAlign: "right",
  },
  splitChart: {
    display: "flex",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.10)",
  },
  splitSegment: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 70,
  },
  splitValue: {
    color: "#0a0c10",
    fontSize: 24,
    fontWeight: 950,
  },
} satisfies Record<string, CSSProperties>;
