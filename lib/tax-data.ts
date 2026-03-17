// Centralized tax data — source of truth: docs/tax-data-2025.md
// Every number must have a source and year annotation.

export const TAX_DATA_YEAR = 2025;
export const DATA_LAST_UPDATED = "2026-03";

// ─── Interfaces ───────────────────────────────────────────────

export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

export interface SocialContribution {
  key: string;
  employer: number | null;
  employee: number | null;
  total: number;
}

export interface BreakdownComponent {
  key: string;
  amount: number;
  percent: number;
  isTax: boolean;
}

export interface OECDCountry {
  key: string;
  taxToGdp: number;
  isAverage?: boolean;
}

export interface TimelineEvent {
  year: number;
  key: string;
}

// ─── Section 5: Journey of 100€ ──────────────────────────────
// Source: Proportions from docs/tax-data-2025.md §5, normalized to 100€ base
// Based on median net salary ~2,400€/month, TMI 30%

export const JOURNEY_STEPS = [
  { key: "employerCost" as const, amount: 100, isTax: false },
  { key: "employerContributions" as const, amount: -23, isTax: true },
  { key: "grossSalary" as const, amount: 77, isTax: false },
  { key: "employeeContributions" as const, amount: -11, isTax: true },
  { key: "netBeforeTax" as const, amount: 66, isTax: false },
  { key: "incomeTax" as const, amount: -9, isTax: true },
  { key: "netAfterTax" as const, amount: 57, isTax: false },
  { key: "vatOnSpending" as const, amount: -9, isTax: true },
  { key: "realPurchasingPower" as const, amount: 48, isTax: false },
] as const;

export const JOURNEY_SUMMARY = {
  employerCost: 100, // What the employer pays — source: URSSAF barème 2025
  realPurchasingPower: 48, // What actually buys goods — source: estimation
  totalExtracted: 52, // 100 - 48 = 52€ extracted
  extractionRate: 52, // 52/100 = 52%
};

// ─── Ticker data ─────────────────────────────────────────────
// Sources: see docs/tax-data-2025.md sections 5, 4, 9

export const TICKER_DATA = {
  smicNet: "1 426 €", // SMIC net 2025 — source: INSEE
  plafondSS: "3 925 €", // PMSS 2025 — source: URSSAF
  tvaNormale: "20%", // TVA taux normal — source: impots.gouv.fr
  csg: "9.2%", // CSG rate 2025 — source: URSSAF
  publicDebt: "3 228 Mds €", // Estimation fin 2024 — source: INSEE
  debtToGdp: "112%", // Ratio dette/PIB — source: INSEE
  taxToGdp: "46.1%", // France tax/GDP — source: OECD Revenue Statistics 2024
  deficit: "-5.4%", // Déficit 2025 — source: LFI 2025
  flatTax2026: "31.4%", // PFU 2026 — source: LFSS 2026
  irTopRate: "45%", // TMI max — source: Loi de finances 2026
};

// ─── Section 1: IR brackets (barème 2026, revenus 2025) ──────
// Source: Loi de finances 2026, Service-Public.fr

export const IR_BRACKETS: TaxBracket[] = [
  { min: 0, max: 11600, rate: 0 },
  { min: 11601, max: 29579, rate: 11 },
  { min: 29580, max: 84577, rate: 30 },
  { min: 84578, max: 181917, rate: 41 },
  { min: 181918, max: null, rate: 45 },
];

// ─── Section 2: Corporate tax (IS) ──────────────────────────
// Source: economie.gouv.fr, entreprendre.service-public.fr

export const CORPORATE_TAX = {
  normalRate: 25, // Taux normal toutes entreprises
  pmeRate: 15, // Taux réduit PME
  pmeThreshold: 42500, // Premiers 42 500€ de bénéfice
  pmeMaxCA: 10_000_000, // CA HT ≤ 10 M€
  socialContribution: 3.3, // Pour IS > 763 000€
};

// ─── Section 3: Flat Tax / PFU ──────────────────────────────
// Source: LFSS 2026, Ramify.fr, Shine.fr

export const FLAT_TAX_2025 = {
  ir: 12.8, // IR forfaitaire
  social: 17.2, // Prélèvements sociaux
  total: 30, // Total PFU
};

export const FLAT_TAX_2026 = {
  ir: 12.8, // IR forfaitaire (inchangé)
  social: 18.6, // Prélèvements sociaux (hausse CSG 9.2% → 10.6%)
  total: 31.4, // Total PFU
};

// ─── Section 4: TVA ─────────────────────────────────────────
// Source: impots.gouv.fr, economie.gouv.fr

export const VAT_RATES = [
  { rate: 20, key: "normal" as const },
  { rate: 10, key: "intermediate" as const },
  { rate: 5.5, key: "reduced" as const },
  { rate: 2.1, key: "superReduced" as const },
];

// ─── Section 5: Social contributions (salariés, secteur privé) ─
// Source: URSSAF barème 2025, CAPEB 2025

export const SOCIAL_CONTRIBUTIONS: SocialContribution[] = [
  { key: "health", employer: 7.0, employee: null, total: 7.0 },
  { key: "pensionCapped", employer: 8.55, employee: 6.9, total: 15.45 },
  { key: "pensionUncapped", employer: 2.02, employee: 0.4, total: 2.42 },
  { key: "family", employer: 3.45, employee: null, total: 3.45 },
  { key: "unemployment", employer: 4.0, employee: null, total: 4.0 },
  { key: "csg", employer: null, employee: 9.2, total: 9.2 },
  { key: "crds", employer: null, employee: 0.5, total: 0.5 },
  { key: "agircArrco", employer: 4.72, employee: 3.15, total: 7.87 },
  { key: "workAccident", employer: 2.0, employee: null, total: 2.0 },
  { key: "fnal", employer: 0.1, employee: null, total: 0.1 },
  { key: "autonomy", employer: 0.3, employee: null, total: 0.3 },
];

export const SOCIAL_CONTRIBUTIONS_TOTALS = {
  employer: 32, // ~32% — source: URSSAF
  employee: 20, // ~20% — source: URSSAF
  total: 52, // ~52% — source: URSSAF
};

// ─── Section 6: Fuel tax (SP95, février 2026) ───────────────
// Source: UFIP Énergies & Mobilités, Fipeco, Connaissance des Énergies

export const FUEL_PRICE = 1.71; // €/L SP95, février 2026

export const FUEL_BREAKDOWN: BreakdownComponent[] = [
  { key: "crudeOil", amount: 0.48, percent: 28, isTax: false },
  { key: "distribution", amount: 0.21, percent: 12, isTax: false },
  { key: "accise", amount: 0.67, percent: 39, isTax: true },
  { key: "vatProduct", amount: 0.15, percent: 9, isTax: true },
  { key: "vatAccise", amount: 0.13, percent: 8, isTax: true },
];

export const FUEL_TAX_PERCENT = 55; // ~55% du prix est taxes

// ─── Section 7: Behavioral taxes (tobacco) ──────────────────
// Source: Douanes, Revue des Tabacs, Smoking.fr

export const TOBACCO_PACK_PRICE = 13; // € par paquet de 20 cigarettes (objectif 2026)

export const TOBACCO_BREAKDOWN: BreakdownComponent[] = [
  { key: "accise", amount: 8.5, percent: 65, isTax: true },
  { key: "vat", amount: 2.17, percent: 17, isTax: true },
  { key: "retailer", amount: 1.34, percent: 10, isTax: false },
  { key: "manufacturer", amount: 0.99, percent: 8, isTax: false },
];

export const TOBACCO_TAX_PERCENT = 82; // ~82% du prix est taxes

// ─── Section 8: Welfare system ──────────────────────────────
// Sources: aide-sociale.fr, Service-Public.fr, France Travail, Sénat

export const WELFARE_DATA = {
  rsa: {
    amountSingle: 646.52, // €/mois, personne seule, avril 2025
    beneficiaries: 2_000_000, // ~2M foyers
    nonTakeUpRate: 30, // ~30% de non-recours
  },
  aah: {
    amountMax: 1033.32, // €/mois, taux plein, avril 2025
    amount2026: 1042.62, // €/mois estimé avril 2026 (+0.9%)
  },
  are: {
    calcRate: 57, // ~57% du salaire journalier de référence
    minDaily: 31.59, // €/jour minimum
    minMonthly: 948, // ~948 €/mois
  },
  ame: {
    beneficiaries: 466_000, // fin 2023, ~480 000 estimé 2025
    budget: 1.386, // Mds € dépenses réelles 2024
    costPerCapita: 17.91, // €/an par habitant
    shareOfHealthSpending: 0.5, // % des dépenses de santé totales
  },
};

// ─── Section 9: OECD comparison ─────────────────────────────
// Source: OECD Revenue Statistics 2024

export const OECD_COMPARISON: OECDCountry[] = [
  { key: "france", taxToGdp: 46.1 },
  { key: "denmark", taxToGdp: 43.4 },
  { key: "belgium", taxToGdp: 42.9 },
  { key: "austria", taxToGdp: 42.7 },
  { key: "italy", taxToGdp: 42.1 },
  { key: "sweden", taxToGdp: 41.3 },
  { key: "germany", taxToGdp: 37.6 },
  { key: "uk", taxToGdp: 35.3 },
  { key: "oecdAverage", taxToGdp: 33.5, isAverage: true },
  { key: "canada", taxToGdp: 33.2 },
  { key: "japan", taxToGdp: 33.2 },
  { key: "usa", taxToGdp: 27.7 },
  { key: "switzerland", taxToGdp: 27.6 },
  { key: "mexico", taxToGdp: 17.7 },
];

export const FRANCE_OECD_DELTA = 12.6; // points above OECD average

// ─── USSR historical comparison ─────────────────────────────
// Sources: NBER Working Papers, IMF retrospectives, World Bank Soviet studies
// Note: Soviet fiscal data is estimated — no market economy baseline existed.
// The commonly cited range for total state extraction (taxes + profits + turnover tax)
// is 40–45% of GDP at peak (1980s). Social contributions extraction ~38-42%.

export const USSR_COMPARISON = {
  taxToGdpPeak: 43, // % — estimated peak tax-to-GDP, late 1980s
  socialContributions: 40, // % — estimated total payroll extraction
  spendingToGdp: 50, // % — estimated public spending/GDP, 1980s
  period: "1980–1991",
  source: "IMF, World Bank — Soviet fiscal estimates",
};

// ─── Section 9: Macro indicators ────────────────────────────
// Sources: INSEE, Eurostat

export const MACRO_INDICATORS = {
  debtToGdp: 112, // % — dette/PIB, estimation fin 2024
  spendingToGdp: 56.5, // % — dépenses publiques/PIB, 2024 estimé
  deficit: -5.4, // % du PIB — déficit budgétaire 2025
  publicDebt: 3228, // Mds € — dette publique, estimation fin 2024
};

// ─── Section 10: Historical timeline ────────────────────────
// Source: docs/tax-data-2025.md §10

// ─── Section 11: Property tax (Taxe foncière) ───────────────
// Source: DGFiP Statistiques n°34 (mai 2025), impots.gouv.fr, IFRAP

export const PROPERTY_TAX = {
  totalRevenue: 55.3, // Mds€ — recettes totales 2024
  avgPerTaxpayer: 1082, // € — montant moyen par contribuable 2024
  taxpayerCount: 33_000_000, // 33 millions de contribuables
  avgHouse: 1090, // € — montant moyen maison 2025
  avgApartment: 865, // € — montant moyen appartement 2025
  increase10Years: 30, // % — hausse cumulée en 10 ans
};

export const PROPERTY_TAX_REVALUATION = [
  { year: 2023, rate: 7.1 },
  { year: 2024, rate: 3.9 },
  { year: 2025, rate: 1.7 },
  { year: 2026, rate: 0.8 }, // suspendue par le PM
];

export const PROPERTY_TAX_RATES = [
  { key: "paris", rate: 20.5 },
  { key: "lyon", rate: 32.44 },
  { key: "marseille", rate: 47.13 },
  { key: "toulouse", rate: 48.55 },
  { key: "amiens", rate: 56.05 },
  { key: "angers", rate: 56.42 },
  { key: "grenoble", rate: 67.92 },
];

// ─── Section 12: LMNP & Airbnb (Loi Le Meur) ───────────────
// Source: Loi n°2024-1039, LF 2025 & 2026, jedeclaremonmeuble.com

export const LMNP_MICRO_BIC = [
  { key: "unclassifiedTourism", ceiling: 15000, allowance: 30, before: "77 700 € / 50%" },
  { key: "classifiedTourism", ceiling: 77700, allowance: 50, before: "77 700 € / 71%" },
  { key: "longTerm", ceiling: 77700, allowance: 50, before: "Inchangé" },
];

export const AIRBNB_STATS = {
  activeListings: 1_310_000, // /mois en France — source: Welkeys 2024-2025
  parisListings: 87_000, // ~84-90k
  avgAnnualIncome: 11200, // €/an par hôte
  avgNightlyRate: 118, // €/nuit
  growth2021to2023: 30, // % de croissance des annonces
};

// ─── Section 13: Inheritance & gift tax ──────────────────────
// Source: Service-Public.fr, art. 777 CGI, OECD

export interface InheritanceBracket {
  min: number;
  max: number | null;
  rate: number;
}

export const INHERITANCE_BRACKETS: InheritanceBracket[] = [
  { min: 0, max: 8072, rate: 5 },
  { min: 8072, max: 12109, rate: 10 },
  { min: 12109, max: 15932, rate: 15 },
  { min: 15932, max: 552324, rate: 20 },
  { min: 552324, max: 902838, rate: 30 },
  { min: 902838, max: 1805677, rate: 40 },
  { min: 1805677, max: null, rate: 45 },
];

export const INHERITANCE_DATA = {
  childAllowance: 100_000, // € par parent par enfant
  renewalPeriod: 15, // ans
  siblingRate1: 35, // % jusqu'à 24 430 €
  siblingRate2: 45, // % au-delà
  nonRelativeRate: 60, // % taux unique
  totalRevenue: 18.5, // Mds€ DMTG 2023
  successionsTaxed: 15, // % des successions effectivement taxées
  medianInheritance: 70_000, // € — héritage médian
  avgInheritance: 230_000, // € — héritage moyen
  lifeInsuranceAllowance: 152_500, // € par bénéficiaire (avant 70 ans)
};

// ─── Section 14: Highway tolls ───────────────────────────────
// Source: ART, Sénat (rapport Maurey), Public Sénat, L'Argus

export const HIGHWAY_TOLLS = {
  networkLength: 9300, // km d'autoroutes à péage
  totalRevenue: 11.9, // Mds€ de péages 2023
  totalProfits: 4.4, // Mds€ bénéfices nets 2023 (record)
  dividendsPaid: 4.1, // Mds€ versés aux actionnaires
  stateShare: 42, // % des recettes revenant à l'État
  avgIncrease2026: 0.86, // % hausse moyenne 1er février 2026
};

export const HIGHWAY_ROUTES = [
  { key: "parisLyon", toll: 41.85 },
  { key: "parisMarseille", toll: 68.38 },
  { key: "parisBordeaux", toll: 46.60 },
];

export const HIGHWAY_CONCESSIONS = [
  { key: "sanef", group: "Abertis", endDate: "12/2031" },
  { key: "cofiroute", group: "Vinci", endDate: "06/2034" },
  { key: "aprr", group: "Eiffage", endDate: "11/2035" },
  { key: "asf", group: "Vinci", endDate: "04/2036" },
];

// ─── Section 15: Railway tolls ───────────────────────────────
// Source: SNCF Réseau, ART, economiematin.fr

export const RAILWAY_TOLLS = {
  totalRevenue: 7, // Mds€ recettes péages 2024
  tgvShare: 40, // % du prix d'un billet TGV = péage réseau
  terShare: 15, // % du prix d'un billet TER = péage réseau
  annualIncrease: 4.1, // % hausse péages 2026
  vatDomestic: 10, // % TVA transport intérieur
  groupRevenue: 43, // Mds€ CA groupe SNCF 2024
};

// ─── Section 16: Capital gains outside PEA (S&P 500) ────────
// Source: Service-Public.fr, Ramify.fr, convention France-USA

export const CAPITAL_GAINS_CTO = {
  flatTax2025: { ir: 12.8, social: 17.2, total: 30 },
  flatTax2026: { ir: 12.8, social: 18.6, total: 31.4 },
};

export const CAPITAL_GAINS_PEA = {
  ir: 0, // exonéré après 5 ans
  social2025: 17.2,
  social2026: 18.6,
  ceiling: 150_000, // € plafond versements
};

export const CAPITAL_GAINS_COMPARISON = {
  initialInvestment: 10000, // €
  annualReturn: 8, // %
  years: 10,
  finalGross: 21589, // €
  capitalGain: 11589, // €
  taxCTO2026: 3639, // €
  netCTO2026: 17950, // €
  taxPEA2026: 2156, // €
  netPEA2026: 19433, // €
  savings: 1483, // € économie PEA vs CTO
};

export const US_DIVIDEND_TAX = {
  withholdingRate: 15, // % retenue source USA (convention)
  frenchCreditRate: 12.8, // % crédit d'impôt FR
  leakage: 2.2, // % perte sèche (15 - 12.8)
};

// ─── Section 10: Historical timeline ────────────────────────
// Source: docs/tax-data-2025.md §10

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { year: 1914, key: "ir1914" },
  { year: 1928, key: "tip1928" },
  { year: 1945, key: "secu1945" },
  { year: 1954, key: "tva1954" },
  { year: 1991, key: "csg1991" },
  { year: 1996, key: "crds1996" },
  { year: 2000, key: "ame2000" },
  { year: 2012, key: "tmi2012" },
  { year: 2018, key: "pfu2018" },
  { year: 2019, key: "carbon2019" },
  { year: 2025, key: "csg2025" },
  { year: 2026, key: "cdhr2026" },
];
