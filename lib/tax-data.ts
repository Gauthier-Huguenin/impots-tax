// Centralized tax data — source of truth: docs/tax-data-2025.md
// Every number must have a source and year annotation.

export const TAX_DATA_YEAR = 2025;
export const DATA_LAST_UPDATED = "2026-03";

// Section 5: The Journey of 100€ employer cost
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

// Ticker data — key figures
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
