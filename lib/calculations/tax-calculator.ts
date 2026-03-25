import { IR_BRACKETS } from '@/lib/tax-data';

// ─── Types ───────────────────────────────────────────

export interface CalculateIRInput {
  salaryBrut: number;
  parts: number;
  year: number;
}

export interface NetSalaryBreakdown {
  irAmount: number;
  socialContributions: number;
  csgCrds: number;
  netSalary: number;
}

// ─── Core Calculation Functions ──────────────────────

/**
 * Calculate progressive income tax (Impôt sur le revenu) with family quotient.
 * Uses 2026 tax brackets and applies quotient familial.
 *
 * Algorithm:
 * 1. Divide salary by number of family parts
 * 2. Apply tax brackets (progressive)
 * 3. Multiply result back by number of parts
 * 4. Return rounded amount
 *
 * @param input - salaryBrut (gross annual salary), parts (family quotient), year
 * @returns Tax amount in euros (rounded to nearest euro)
 */
export function calculateIR(input: CalculateIRInput): number {
  const { salaryBrut, parts, year } = input;

  // Get brackets for the requested year (currently only 2026 supported)
  const brackets = IR_BRACKETS;

  // Divide salary by number of parts (quotient familial)
  const taxablePerPart = salaryBrut / parts;

  // Calculate tax on the per-part salary
  let taxPerPart = 0;

  for (const bracket of brackets) {
    const min = bracket.min;
    const max = bracket.max ?? Infinity;
    const rate = bracket.rate / 100;

    // Find the overlap between taxablePerPart and this bracket
    const bracketStart = Math.max(min, 0);
    const bracketEnd = Math.min(max, taxablePerPart);

    if (bracketEnd > bracketStart) {
      const taxableInBracket = bracketEnd - bracketStart;
      taxPerPart += taxableInBracket * rate;
    }

    // Stop if we've covered the entire salary
    if (taxablePerPart <= max) {
      break;
    }
  }

  // Multiply back by number of parts and round to nearest euro
  const totalTax = taxPerPart * parts;
  return Math.round(totalTax);
}

/**
 * Calculate employee-side social contributions (URSSAF).
 * Approximately 9.3% of gross salary (CSG, CRDS, pension, etc. combined).
 *
 * Based on 2025 URSSAF barème (employee contributions):
 * - Pension capped: 6.9%
 * - Pension uncapped: 0.4%
 * - AGIRC-ARRCO: 3.15%
 * - Roughly: 9.3-10.55% of gross salary
 *
 * Using 9.3% as standard approximation.
 *
 * @param salaryBrut - Gross annual salary
 * @returns Social contributions amount in euros (rounded)
 */
export function calculateSocialContributions(salaryBrut: number): number {
  const rate = 0.093; // ~9.3%
  return Math.round(salaryBrut * rate);
}

/**
 * Calculate CSG and CRDS (state and social contribution taxes).
 * Approximately 8% combined:
 * - CSG: 8.3% (employee-side, capped at PMSS)
 * - CRDS: 0.5% (employee-side)
 * Total effective: ~8%
 *
 * @param salaryBrut - Gross annual salary
 * @returns CSG+CRDS amount in euros (rounded)
 */
export function calculateCSG_CRDS(salaryBrut: number): number {
  const rate = 0.08; // CSG 8.3% + CRDS 0.5% ≈ 8%
  return Math.round(salaryBrut * rate);
}

/**
 * Calculate complete net salary breakdown.
 * Combines IR, social contributions, and CSG/CRDS into one result.
 *
 * Formula:
 * netSalary = salaryBrut - socialContributions - csgCrds - irAmount
 *
 * @param input - salaryBrut, parts, year
 * @returns Object with all tax/contribution amounts and final net salary
 */
export function calculateNetSalary(input: CalculateIRInput): NetSalaryBreakdown {
  const { salaryBrut } = input;

  const irAmount = calculateIR(input);
  const socialContributions = calculateSocialContributions(salaryBrut);
  const csgCrds = calculateCSG_CRDS(salaryBrut);

  const netSalary = Math.round(
    salaryBrut - socialContributions - csgCrds - irAmount
  );

  return {
    irAmount,
    socialContributions,
    csgCrds,
    netSalary,
  };
}

/**
 * Calculate purchasing power after VAT deduction.
 * Takes net salary and subtracts the average VAT burden.
 *
 * Default VAT rate: 16.7% (weighted average across economy)
 * Formula: purchasingPower = netSalary * (1 - vatRate / 100)
 *
 * @param netSalary - Net salary after taxes
 * @param vatRate - Optional VAT rate as percentage (default 16.7)
 * @returns Real purchasing power in euros (rounded)
 */
export function calculatePurchasingPower(
  netSalary: number,
  vatRate: number = 16.7
): number {
  const multiplier = 1 - vatRate / 100;
  return Math.round(netSalary * multiplier);
}
