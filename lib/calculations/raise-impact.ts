import { calculateNetSalary } from './tax-calculator';

// ─── Types ───────────────────────────────────────────

export interface RaiseImpactInput {
  baseSalaryBrut: number;
  raiseAmount: number;
  parts: number;
  year: number;
}

export interface YearBreakdown {
  year: number;
  nettedRaiseAmount: number;
  cumulativeInflationErosion: number;
}

export interface RaiseImpactOutput {
  baseSalaryBrut: number;
  raiseAmount: number;
  netRaise: number;
  irOnRaise: number;
  socialContribOnRaise: number;
  csgCrdsOnRaise: number;
  taxesOnRaise: number;
  effectiveTaxRate: number; // (taxesOnRaise / raiseAmount) * 100
  inflationRate: number; // 2.1% (annual France inflation estimate)
  realPurchasingPowerGain: number; // netRaise with year 1 inflation applied
  yearBreakdown: YearBreakdown[];
}

// ─── Implementation ───────────────────────────────────

/**
 * Calculate the impact of a salary raise, including tax burden and inflation erosion.
 *
 * Algorithm:
 * 1. Calculate net salary before and after raise
 * 2. Compute tax components (IR, social, CSG/CRDS) on the raise
 * 3. Determine effective tax rate on raise
 * 4. Calculate purchasing power loss after 1 year of 2.1% inflation
 * 5. Build year-by-year breakdown (0-4 years) with cumulative inflation erosion
 *
 * @param input - baseSalaryBrut, raiseAmount, parts, year
 * @returns Complete raise impact analysis with breakdown
 */
export function calculateRaiseImpact(input: RaiseImpactInput): RaiseImpactOutput {
  const { baseSalaryBrut, raiseAmount, parts, year } = input;
  const INFLATION_RATE = 2.1; // Annual inflation estimate for France

  // Step 1: Calculate net salary before and after raise
  const oldNetSalary = calculateNetSalary({
    salaryBrut: baseSalaryBrut,
    parts,
    year,
  });

  const newNetSalary = calculateNetSalary({
    salaryBrut: baseSalaryBrut + raiseAmount,
    parts,
    year,
  });

  // Step 2: Compute raise components
  const netRaise = newNetSalary.netSalary - oldNetSalary.netSalary;
  const irOnRaise = newNetSalary.irAmount - oldNetSalary.irAmount;
  const socialContribOnRaise =
    newNetSalary.socialContributions - oldNetSalary.socialContributions;
  const csgCrdsOnRaise = newNetSalary.csgCrds - oldNetSalary.csgCrds;
  const taxesOnRaise = irOnRaise + socialContribOnRaise + csgCrdsOnRaise;

  // Step 3: Calculate effective tax rate on raise
  const effectiveTaxRate =
    raiseAmount > 0 ? (taxesOnRaise / raiseAmount) * 100 : 0;

  // Step 4: Calculate real purchasing power after 1 year of inflation
  // Formula: netRaise * (1 - inflationRate / 100)
  const realPurchasingPowerGain = Math.round(
    netRaise * (1 - INFLATION_RATE / 100)
  );

  // Step 5: Build year-by-year breakdown (years 0-4)
  const yearBreakdown: YearBreakdown[] = [];
  for (let year = 0; year < 5; year++) {
    // Cumulative inflation erosion: compound effect
    // Formula: (1 - inflation_rate/100)^year
    const cumulativeMultiplier = Math.pow(1 - INFLATION_RATE / 100, year);
    const cumulativeInflationErosion = Math.round(
      netRaise * (1 - cumulativeMultiplier)
    );
    const nettedRaiseAmount = Math.round(netRaise * cumulativeMultiplier);

    yearBreakdown.push({
      year,
      nettedRaiseAmount,
      cumulativeInflationErosion,
    });
  }

  return {
    baseSalaryBrut,
    raiseAmount,
    netRaise,
    irOnRaise,
    socialContribOnRaise,
    csgCrdsOnRaise,
    taxesOnRaise,
    effectiveTaxRate: Math.round(effectiveTaxRate * 100) / 100, // Round to 2 decimals
    inflationRate: INFLATION_RATE,
    realPurchasingPowerGain,
    yearBreakdown,
  };
}
