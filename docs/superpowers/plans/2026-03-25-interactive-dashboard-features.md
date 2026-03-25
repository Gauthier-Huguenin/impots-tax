# Interactive Dashboard Features — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 3 interactive, ludic, and shareable components (calculators + quiz) to the dashboard, reorganized into a 4-act narrative structure, with full i18n support and shareable results.

**Architecture:** Build reusable calculation and UI components first, then create the 3 interactive features independently, then integrate them into a restructured dashboard. Use TDD for all calculation logic. i18n keys are added progressively as components are built.

**Tech Stack:** React 19, Next.js 16, TypeScript (strict), Tailwind CSS 4, next-intl 4.x, Canvas API (share images)

**Timeline:** 3-4 weeks, parallelizable work streams

---

## Task Phase 1: Foundation & Reusable Components

### Task 1: Create Tax Calculation Utilities

**Files:**
- Create: `lib/calculations/tax-calculator.ts`
- Modify: `lib/tax-data.ts`
- Test: `lib/calculations/__tests__/tax-calculator.test.ts`

**Goal:** Implement pure functions for tax calculations (IR, social contributions, VAT) that will be reused by multiple components.

- [ ] **Step 1: Write failing tests for IR calculation**

Create `lib/calculations/__tests__/tax-calculator.test.ts`:

```typescript
import { calculateIR } from '../tax-calculator';

describe('calculateIR', () => {
  it('calculates IR for single person with 2500 brut', () => {
    const result = calculateIR({
      salaryBrut: 2500,
      parts: 1,
      year: 2026,
    });
    // IR brackets 2026: 0-11600 (0%), 11601-29579 (11%), etc.
    // 2500 is all in 0% bracket
    expect(result).toBe(0);
  });

  it('calculates IR for person in multiple brackets', () => {
    const result = calculateIR({
      salaryBrut: 50000,
      parts: 1,
      year: 2026,
    });
    // Mix of 0%, 11%, 30% brackets
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(50000);
  });

  it('calculates IR with family quotient', () => {
    const result = calculateIR({
      salaryBrut: 50000,
      parts: 2.5, // Married + 1 child
      year: 2026,
    });
    const resultSingle = calculateIR({
      salaryBrut: 50000,
      parts: 1,
      year: 2026,
    });
    // Family quotient should reduce IR
    expect(result).toBeLessThan(resultSingle);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- lib/calculations/__tests__/tax-calculator.test.ts
```

Expected: FAIL — "calculateIR is not defined"

- [ ] **Step 3: Implement calculateIR function**

Create `lib/calculations/tax-calculator.ts`:

```typescript
import { IR_BRACKETS_2026 } from '../tax-data';

interface IRCalculationInput {
  salaryBrut: number; // euros
  parts: number; // 1, 1.5, 2, 2.5, etc.
  year: number; // 2025, 2026, etc.
}

/**
 * Calculate French income tax (Impôt sur le Revenu)
 * Uses progressive brackets with family quotient (quotient familial)
 */
export function calculateIR(input: IRCalculationInput): number {
  const { salaryBrut, parts, year } = input;

  // Step 1: Divide salary by family parts
  const taxableIncomePerPart = salaryBrut / parts;

  // Step 2: Calculate tax on one part using brackets
  let taxPerPart = 0;
  let remainingIncome = taxableIncomePerPart;

  for (const bracket of IR_BRACKETS_2026) {
    if (remainingIncome <= 0) break;

    const bracketSize = bracket.upper - bracket.lower;
    const incomeInBracket = Math.min(remainingIncome, bracketSize);
    taxPerPart += incomeInBracket * (bracket.rate / 100);
    remainingIncome -= incomeInBracket;
  }

  // Step 3: Multiply back by number of parts
  const totalTax = taxPerPart * parts;

  // Step 4: Apply ceiling on family quotient benefit (1 807€ per demi-part)
  // Simplified: skip for MVP (can be added in V2)

  return Math.max(0, Math.round(totalTax));
}

/**
 * Calculate social contributions (employee side)
 */
export function calculateSocialContributions(salaryBrut: number): number {
  // URSSAF barème 2025: roughly 9.3% (CSG, CRDS, pension, etc.)
  const rate = 9.3;
  return Math.round((salaryBrut * rate) / 100);
}

/**
 * Calculate CSG + CRDS
 */
export function calculateCSG_CRDS(salaryBrut: number): number {
  // Roughly 8% combined (4% CSG @ 8.3%, 0.5% CRDS)
  const rate = 8.0;
  return Math.round((salaryBrut * rate) / 100);
}

/**
 * Calculate net salary after all deductions
 */
export function calculateNetSalary(input: {
  salaryBrut: number;
  parts: number;
  year: number;
}): {
  irAmount: number;
  socialContributions: number;
  csgCrds: number;
  netSalary: number;
} {
  const ir = calculateIR(input);
  const socialContrib = calculateSocialContributions(input.salaryBrut);
  const csgCrds = calculateCSG_CRDS(input.salaryBrut);

  const netSalary = input.salaryBrut - ir - socialContrib - csgCrds;

  return {
    irAmount: ir,
    socialContributions: socialContrib,
    csgCrds: csgCrds,
    netSalary: Math.max(0, netSalary),
  };
}

/**
 * Calculate real purchasing power after VAT
 */
export function calculatePurchasingPower(netSalary: number, vatRate: number = 16.7): number {
  // If user spends 100% of net, apply average VAT
  const vat = (netSalary * vatRate) / (100 + vatRate);
  return netSalary - vat;
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- lib/calculations/__tests__/tax-calculator.test.ts
```

Expected: PASS (or close — you may need to adjust expected values based on real bracket data)

- [ ] **Step 5: Add remaining calculation tests**

Add to `lib/calculations/__tests__/tax-calculator.test.ts`:

```typescript
describe('calculateSocialContributions', () => {
  it('calculates ~9.3% for salary', () => {
    const result = calculateSocialContributions(2500);
    expect(result).toBeCloseTo(232, -1); // ~232 (9.3%)
  });
});

describe('calculateCSG_CRDS', () => {
  it('calculates ~8% for salary', () => {
    const result = calculateCSG_CRDS(2500);
    expect(result).toBeCloseTo(200, -1); // ~200 (8%)
  });
});

describe('calculateNetSalary', () => {
  it('returns breakdown for 2500 brut single person', () => {
    const result = calculateNetSalary({
      salaryBrut: 2500,
      parts: 1,
      year: 2026,
    });
    expect(result.netSalary).toBeGreaterThan(0);
    expect(result.irAmount).toBeGreaterThanOrEqual(0);
    expect(result.socialContributions).toBeGreaterThan(0);
  });
});

describe('calculatePurchasingPower', () => {
  it('deducts average VAT from net salary', () => {
    const net = 1979;
    const power = calculatePurchasingPower(net, 16.7);
    expect(power).toBeLessThan(net);
    expect(power).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 6: Run all tests**

```bash
npm test -- lib/calculations/__tests__/tax-calculator.test.ts
```

Expected: All tests PASS

- [ ] **Step 7: Verify IR_BRACKETS_2026 is correct in lib/tax-data.ts**

Check that `lib/tax-data.ts` exports:

```typescript
export const IR_BRACKETS_2026 = [
  { lower: 0, upper: 11600, rate: 0 },
  { lower: 11600, upper: 29579, rate: 11 },
  { lower: 29579, upper: 84577, rate: 30 },
  { lower: 84577, upper: 181917, rate: 41 },
  { lower: 181917, upper: Infinity, rate: 45 },
];
```

If not present, add it.

- [ ] **Step 8: Commit**

```bash
git add lib/calculations/ lib/tax-data.ts
git commit -m "feat(calculations): add tax calculation utilities with tests"
```

---

### Task 2: Create Quiz Logic & Utilities

**Files:**
- Create: `lib/calculations/quiz-logic.ts`
- Create: `lib/calculations/__tests__/quiz-logic.test.ts`
- Modify: `lib/tax-data.ts`
- Test: Tests above

**Goal:** Implement quiz question pool, scoring logic, and shuffle algorithm.

- [ ] **Step 1: Write failing tests for quiz logic**

Create `lib/calculations/__tests__/quiz-logic.test.ts`:

```typescript
import { shuffleQuestions, calculateScore } from '../quiz-logic';

describe('shuffleQuestions', () => {
  it('returns N random questions from pool', () => {
    const pool = [
      { id: 1, question: 'Q1', options: ['A', 'B'], correctIndex: 0 },
      { id: 2, question: 'Q2', options: ['A', 'B'], correctIndex: 1 },
      { id: 3, question: 'Q3', options: ['A', 'B'], correctIndex: 0 },
      { id: 4, question: 'Q4', options: ['A', 'B'], correctIndex: 1 },
    ];
    const result = shuffleQuestions(pool, 3);
    expect(result.length).toBe(3);
    expect(result[0].id).toBeDefined();
  });
});

describe('calculateScore', () => {
  it('returns +10 for correct, -2 for incorrect', () => {
    const answers = [true, true, false, true];
    const score = calculateScore(answers);
    expect(score).toBe(32); // 10 + 10 - 2 + 10
  });

  it('returns 0 if all wrong', () => {
    const answers = [false, false, false];
    const score = calculateScore(answers);
    expect(score).toBe(-6);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- lib/calculations/__tests__/quiz-logic.test.ts
```

Expected: FAIL

- [ ] **Step 3: Implement quiz logic**

Create `lib/calculations/quiz-logic.ts`:

```typescript
import { GUESS_THE_TAX_QUESTIONS } from '../tax-data';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

/**
 * Shuffle questions: randomly pick N questions from pool without replacement
 */
export function shuffleQuestions(pool: QuizQuestion[], count: number): QuizQuestion[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, pool.length));
}

/**
 * Calculate quiz score: +10 correct, -2 incorrect
 */
export function calculateScore(answers: boolean[]): number {
  return answers.reduce((score, isCorrect) => {
    return score + (isCorrect ? 10 : -2);
  }, 0);
}

/**
 * Get N random questions for quiz session
 */
export function getQuizSession(questionCount: number = 5): QuizQuestion[] {
  return shuffleQuestions(GUESS_THE_TAX_QUESTIONS, questionCount);
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- lib/calculations/__tests__/quiz-logic.test.ts
```

Expected: PASS

- [ ] **Step 5: Add GUESS_THE_TAX_QUESTIONS to lib/tax-data.ts**

Add to `lib/tax-data.ts` (at least 20-30 questions):

```typescript
export const GUESS_THE_TAX_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Une baguette coûte 1€ HT. Quel est le montant de TVA?",
    options: ["0,16€", "0,20€", "0,30€", "0,50€"],
    correctIndex: 1,
    explanation: "La TVA sur la majorité des biens est 20% (taux normal).",
  },
  {
    id: 2,
    question: "Cotisations sociales sur un salaire de 3 000€ bruts?",
    options: ["~200€", "~280€", "~400€", "~600€"],
    correctIndex: 1,
    explanation: "Les cotisations sociales (URSSAF) sont ~9.3% du salaire brut.",
  },
  {
    id: 3,
    question: "Taux du PFU (flat tax) en 2026 sur les plus-values crypto?",
    options: ["30%", "31.4%", "36%", "45%"],
    correctIndex: 1,
    explanation: "Le PFU passe de 30% en 2025 à 31.4% en 2026 (hausse CSG).",
  },
  {
    id: 4,
    question: "Montant moyen du RSA mensuel (célibataire)?",
    options: ["~500€", "~647€", "~800€", "~1 000€"],
    correctIndex: 1,
    explanation: "Le RSA est ~647€/mois pour un célibataire en 2026.",
  },
  {
    id: 5,
    question: "Quel % du prix à la pompe est une taxe (carburant)?",
    options: ["35%", "45%", "~55%", "65%"],
    correctIndex: 2,
    explanation: "~55% du prix à la pompe sont des taxes (TICPE).",
  },
  {
    id: 6,
    question: "Taux d'imposition sur les sociétés (normal)?",
    options: ["15%", "20%", "25%", "30%"],
    correctIndex: 2,
    explanation: "L'IS normal en France est 25% (15% pour PME sur premiers 42.5k).",
  },
  {
    id: 7,
    question: "Taux de TVA sur l'alimentation?",
    options: ["2.1%", "5.5%", "10%", "20%"],
    correctIndex: 1,
    explanation: "La TVA réduite sur l'alimentation est 5.5%.",
  },
  {
    id: 8,
    question: "CSG sur le salaire (approx.)?",
    options: ["~2%", "~4%", "~6%", "~10%"],
    correctIndex: 1,
    explanation: "La CSG est ~8.3% du salaire (mais certains revenus différents).",
  },
  // ... add 12-22 more questions (20-30 total)
];

export const INFLATION_RATE_2026 = 2.1; // %
```

- [ ] **Step 6: Commit**

```bash
git add lib/calculations/quiz-logic.ts lib/calculations/__tests__/quiz-logic.test.ts lib/tax-data.ts
git commit -m "feat(quiz): add quiz logic, questions, and tests"
```

---

### Task 3: Create Raise Impact Calculation Logic

**Files:**
- Create: `lib/calculations/raise-impact.ts`
- Create: `lib/calculations/__tests__/raise-impact.test.ts`
- Test: Tests below

**Goal:** Implement logic for calculating impact of a raise, including taxes and inflation erosion.

- [ ] **Step 1: Write failing tests**

Create `lib/calculations/__tests__/raise-impact.test.ts`:

```typescript
import { calculateRaiseImpact } from '../raise-impact';

describe('calculateRaiseImpact', () => {
  it('shows how a 1000 raise becomes less after taxes', () => {
    const result = calculateRaiseImpact({
      raiseAmount: 1000,
      baseSalaryBrut: 2500,
      familyParts: 1,
      year: 2026,
    });

    expect(result.raiseAmount).toBe(1000);
    expect(result.taxesOnRaise).toBeGreaterThan(0);
    expect(result.netRaise).toBeLessThan(1000);
    expect(result.netRaise).toBeGreaterThan(0);
  });

  it('deducts inflation to show real purchasing power', () => {
    const result = calculateRaiseImpact({
      raiseAmount: 1000,
      baseSalaryBrut: 2500,
      familyParts: 1,
      year: 2026,
    });

    expect(result.realPurchasingPowerGain).toBeLessThan(result.netRaise);
    expect(result.inflationRate).toBe(2.1);
  });

  it('shows 0-year breakdown', () => {
    const result = calculateRaiseImpact({
      raiseAmount: 1000,
      baseSalaryBrut: 2500,
      familyParts: 1,
      year: 2026,
    });

    expect(result.yearBreakdown).toBeDefined();
    expect(result.yearBreakdown[0]).toBeDefined();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- lib/calculations/__tests__/raise-impact.test.ts
```

Expected: FAIL

- [ ] **Step 3: Implement raise impact logic**

Create `lib/calculations/raise-impact.ts`:

```typescript
import { calculateNetSalary } from './tax-calculator';
import { INFLATION_RATE_2026 } from '../tax-data';

export interface RaiseImpactInput {
  raiseAmount: number; // euros
  baseSalaryBrut: number; // current brut salary
  familyParts: number;
  year: number;
}

export interface RaiseImpactOutput {
  raiseAmount: number;
  irOnRaise: number;
  socialContribOnRaise: number;
  taxesOnRaise: number;
  netRaise: number; // after taxes, year 0
  realPurchasingPowerGain: number; // after inflation
  inflationRate: number;
  yearBreakdown: YearBreakdown[];
  percentageRetained: number; // % of gross raise actually kept
}

export interface YearBreakdown {
  year: number;
  purchasingPowerRemaining: number;
  eroded: boolean; // has inflation eroded the gain?
}

/**
 * Calculate the true impact of a raise after taxes and inflation
 */
export function calculateRaiseImpact(input: RaiseImpactInput): RaiseImpactOutput {
  const { raiseAmount, baseSalaryBrut, familyParts, year } = input;

  // Step 1: New total salary after raise
  const newSalaryBrut = baseSalaryBrut + raiseAmount;

  // Step 2: Calculate net salaries
  const oldNet = calculateNetSalary({
    salaryBrut: baseSalaryBrut,
    parts: familyParts,
    year,
  });

  const newNet = calculateNetSalary({
    salaryBrut: newSalaryBrut,
    parts: familyParts,
    year,
  });

  // Step 3: Net raise (difference in net salaries)
  const netRaise = newNet.netSalary - oldNet.netSalary;

  // Step 4: Taxes paid on the raise
  const irOnRaise = newNet.irAmount - oldNet.irAmount;
  const socialContribOnRaise = newNet.socialContributions - oldNet.socialContributions;
  const csgCrdsOnRaise = newNet.csgCrds - oldNet.csgCrds;
  const totalTaxesOnRaise = irOnRaise + socialContribOnRaise + csgCrdsOnRaise;

  // Step 5: Inflation erosion (over years)
  const inflationRate = INFLATION_RATE_2026;
  const yearBreakdown: YearBreakdown[] = [];

  for (let y = 0; y <= 4; y++) {
    const erosionFactor = Math.pow(1 + inflationRate / 100, y);
    const remaining = netRaise / erosionFactor;
    yearBreakdown.push({
      year: year + y,
      purchasingPowerRemaining: remaining,
      eroded: remaining < netRaise * 0.9, // "eroded" if <90% of original
    });
  }

  const realPurchasingPowerGain = yearBreakdown[0].purchasingPowerRemaining; // Year 0 = same as netRaise

  return {
    raiseAmount,
    irOnRaise: Math.round(irOnRaise),
    socialContribOnRaise: Math.round(socialContribOnRaise),
    taxesOnRaise: Math.round(totalTaxesOnRaise),
    netRaise: Math.round(netRaise),
    realPurchasingPowerGain: Math.round(realPurchasingPowerGain),
    inflationRate,
    yearBreakdown: yearBreakdown.map(y => ({
      ...y,
      purchasingPowerRemaining: Math.round(y.purchasingPowerRemaining),
    })),
    percentageRetained: (netRaise / raiseAmount) * 100,
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- lib/calculations/__tests__/raise-impact.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add lib/calculations/raise-impact.ts lib/calculations/__tests__/raise-impact.test.ts
git commit -m "feat(calculations): add raise impact logic with inflation erosion"
```

---

## Task Phase 2: Reusable UI Components

### Task 4: Create Share Button Component

**Files:**
- Create: `components/dashboard/shared/share-button.tsx`
- Modify: `messages/fr.json`, `messages/en.json`

**Goal:** Create a reusable share button that generates OG images and copy-to-clipboard functionality.

- [ ] **Step 1: Add i18n keys**

Add to `messages/fr.json`:

```json
{
  "interactiveCalculators": {
    "shareButton": {
      "label": "Partager",
      "copyToClipboard": "Copié!",
      "shareOgImage": "Générer image"
    }
  }
}
```

Add to `messages/en.json`:

```json
{
  "interactiveCalculators": {
    "shareButton": {
      "label": "Share",
      "copyToClipboard": "Copied!",
      "shareOgImage": "Generate image"
    }
  }
}
```

- [ ] **Step 2: Create share button component**

Create `components/dashboard/shared/share-button.tsx`:

```typescript
'use client';

import { useTranslations } from 'next-intl';

export interface ShareButtonProps {
  shareText: string; // Text to copy/share
  imageDataUrl?: string; // Optional: data URL of image to share
  onShare?: () => void;
}

export function ShareButton({
  shareText,
  imageDataUrl,
  onShare,
}: ShareButtonProps) {
  const t = useTranslations('interactiveCalculators.shareButton');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      onShare?.();
      // Optionally show toast: "Copied!"
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'impots.tax',
          text: shareText,
        });
        onShare?.();
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleCopy}
        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded border border-cyan-500 transition-colors"
      >
        {t('label')}
      </button>
      {imageDataUrl && (
        <button
          onClick={() => {
            // Open image in new tab for user to save/share
            window.open(imageDataUrl, '_blank');
          }}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded border border-amber-500 transition-colors"
        >
          {t('shareOgImage')}
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/dashboard/shared/share-button.tsx messages/fr.json messages/en.json
git commit -m "feat(ui): add reusable share button component"
```

---

### Task 5: Create Tax Calculator Base Component

**Files:**
- Create: `components/dashboard/shared/tax-calculator-base.tsx`
- Modify: `messages/fr.json`, `messages/en.json`

**Goal:** Reusable component wrapper for calculator UIs (inputs, outputs, formatting).

- [ ] **Step 1: Add i18n keys**

Add to `messages/fr.json`:

```json
{
  "interactiveCalculators": {
    "labels": {
      "salaryBrut": "Salaire brut",
      "familySituation": "Situation familiale",
      "single": "Célibataire",
      "married": "Marié·e",
      "marriedChild1": "+ 1 enfant",
      "marriedChild2": "+ 2 enfants",
      "marriedChild3": "+ 3+ enfants"
    }
  }
}
```

Add to `messages/en.json`:

```json
{
  "interactiveCalculators": {
    "labels": {
      "salaryBrut": "Gross salary",
      "familySituation": "Family situation",
      "single": "Single",
      "married": "Married",
      "marriedChild1": "+ 1 child",
      "marriedChild2": "+ 2 children",
      "marriedChild3": "+ 3+ children"
    }
  }
}
```

- [ ] **Step 2: Create base calculator component**

Create `components/dashboard/shared/tax-calculator-base.tsx`:

```typescript
'use client';

import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

export interface TaxCalculatorBaseProps {
  title: string;
  description?: string;
  children: ReactNode; // Content between inputs and outputs
  footer?: ReactNode;
}

export function TaxCalculatorBase({
  title,
  description,
  children,
  footer,
}: TaxCalculatorBaseProps) {
  return (
    <div className="panel p-6 rounded border border-cyan-500 bg-slate-900 space-y-4">
      <div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        {description && <p className="text-slate-300 text-sm mt-2">{description}</p>}
      </div>

      <div className="space-y-4">{children}</div>

      {footer && <div className="border-t border-slate-700 pt-4">{footer}</div>}
    </div>
  );
}

export interface SliderInputProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  suffix?: string;
}

export function SliderInput({
  label,
  min,
  max,
  step,
  value,
  onChange,
  formatValue = (v) => v.toString(),
  suffix = '',
}: SliderInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-slate-300 text-sm font-medium">{label}</label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2 bg-slate-700 rounded cursor-pointer accent-cyan-500"
        />
        <span className="text-white font-mono text-lg min-w-32 text-right">
          {formatValue(value)} {suffix}
        </span>
      </div>
    </div>
  );
}

export interface DropdownInputProps {
  label: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}

export function DropdownInput({
  label,
  options,
  value,
  onChange,
}: DropdownInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-slate-300 text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 text-white rounded"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/dashboard/shared/tax-calculator-base.tsx messages/fr.json messages/en.json
git commit -m "feat(ui): add tax calculator base component with inputs"
```

---

### Task 6: Create Decomposition Bar Component (Animation)

**Files:**
- Create: `components/dashboard/shared/decomposition-bar.tsx`
- Modify: `styles/globals.css`

**Goal:** Create an animated bar showing how an amount "decomposes" through multiple deductions.

- [ ] **Step 1: Add CSS animation**

Add to `styles/globals.css`:

```css
@keyframes barShrink {
  from {
    width: 100%;
  }
  to {
    width: var(--shrink-to, 50%);
  }
}

.decomposition-segment {
  animation: barShrink 0.6s ease-out forwards;
  animation-delay: var(--segment-delay, 0s);
}
```

- [ ] **Step 2: Create decomposition bar component**

Create `components/dashboard/shared/decomposition-bar.tsx`:

```typescript
'use client';

import { useMemo } from 'react';

export interface DecompositionSegment {
  label: string;
  amount: number;
  percentage: number;
  color: 'red' | 'yellow' | 'green';
}

export interface DecompositionBarProps {
  initialAmount: number;
  segments: DecompositionSegment[];
  finalAmount: number;
}

export function DecompositionBar({
  initialAmount,
  segments,
  finalAmount,
}: DecompositionBarProps) {
  const colorMap = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  };

  // Calculate cumulative widths for animation
  const segmentsWithWidths = useMemo(() => {
    let runningTotal = initialAmount;
    return segments.map((seg, i) => {
      runningTotal -= seg.amount;
      const percentageRemaining = (runningTotal / initialAmount) * 100;
      return {
        ...seg,
        percentageRemaining,
        delayMs: i * 300, // 300ms between each animation
      };
    });
  }, [segments, initialAmount]);

  return (
    <div className="space-y-4">
      {/* Initial amount */}
      <div className="space-y-2">
        <p className="text-slate-300 text-sm">Montant initial</p>
        <div className="h-8 bg-green-600 rounded flex items-center justify-end pr-3">
          <span className="text-white font-mono font-bold text-lg">
            {initialAmount.toLocaleString('fr-FR')}€
          </span>
        </div>
      </div>

      {/* Decomposition steps */}
      {segmentsWithWidths.map((segment, i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-300">{segment.label}</span>
            <span className="text-slate-400 font-mono">-{segment.amount.toLocaleString('fr-FR')}€</span>
          </div>
          <div
            className={`h-8 rounded flex items-center justify-end pr-3 transition-all duration-600 ${colorMap[segment.color]}`}
            style={{
              width: `${segment.percentageRemaining}%`,
            }}
          >
            {segment.percentageRemaining > 15 && (
              <span className="text-white font-mono font-bold text-sm">
                {Math.round(finalAmount + segment.amount).toLocaleString('fr-FR')}€
              </span>
            )}
          </div>
        </div>
      ))}

      {/* Final amount */}
      <div className="space-y-2">
        <p className="text-slate-300 text-sm font-semibold">Montant final</p>
        <div className="h-8 bg-red-600 rounded flex items-center justify-end pr-3">
          <span className="text-white font-mono font-bold text-lg">
            {finalAmount.toLocaleString('fr-FR')}€
          </span>
        </div>
      </div>

      {/* Percentage retained */}
      <p className="text-amber-400 text-sm font-semibold">
        {((finalAmount / initialAmount) * 100).toFixed(1)}% du montant initial
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/dashboard/shared/decomposition-bar.tsx styles/globals.css
git commit -m "feat(ui): add animated decomposition bar component"
```

---

## Task Phase 3: Interactive Components

### Task 7: Implement "Charge Fiscale Totale" (Act 1 Calculator)

**Files:**
- Create: `components/dashboard/interactive-charge-fiscale.tsx`
- Modify: `messages/fr.json`, `messages/en.json`

**Goal:** Build the first interactive calculator: salary → taxes → net → purchasing power.

- [ ] **Step 1: Add i18n keys**

Add to `messages/fr.json`:

```json
{
  "interactiveCalculators": {
    "chargeFiscale": {
      "title": "Calcule ta Charge Fiscale Totale",
      "description": "Entre ton salaire brut et découvre l'impact réel des taxes.",
      "results": {
        "salaryBrut": "Salaire brut",
        "socialContributions": "Cotisations sociales",
        "csgCrds": "CSG/CRDS",
        "incomeTax": "Impôt sur le revenu",
        "netSalary": "Salaire net",
        "vat": "TVA (si dépense totale)",
        "realPurchasingPower": "Vrai pouvoir d'achat"
      },
      "share": "Partager ma charge fiscale",
      "shareMessage": "J'ai un salaire brut de {salary}€, mais je ne garde que {power}€ de pouvoir d'achat réel."
    }
  }
}
```

Add to `messages/en.json`:

```json
{
  "interactiveCalculators": {
    "chargeFiscale": {
      "title": "Calculate Your Total Tax Burden",
      "description": "Enter your gross salary and discover the real impact of taxes.",
      "results": {
        "salaryBrut": "Gross salary",
        "socialContributions": "Social contributions",
        "csgCrds": "CSG/CRDS",
        "incomeTax": "Income tax",
        "netSalary": "Net salary",
        "vat": "VAT (if total spending)",
        "realPurchasingPower": "Real purchasing power"
      },
      "share": "Share my tax burden",
      "shareMessage": "I have a gross salary of {salary}€, but keep only {power}€ of real purchasing power."
    }
  }
}
```

- [ ] **Step 2: Create calculator component**

Create `components/dashboard/interactive-charge-fiscale.tsx`:

```typescript
'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { calculateNetSalary, calculatePurchasingPower } from '@/lib/calculations/tax-calculator';
import { TaxCalculatorBase, SliderInput, DropdownInput } from './shared/tax-calculator-base';
import { ShareButton } from './shared/share-button';

const FAMILY_OPTIONS = [
  { value: '1', label: 'Célibataire' },
  { value: '1.5', label: 'Marié·e' },
  { value: '2', label: '+ 1 enfant' },
  { value: '2.5', label: '+ 2 enfants' },
  { value: '3', label: '+ 3+ enfants' },
];

export function ChargeFiscaleCalculator() {
  const t = useTranslations('interactiveCalculators.chargeFiscale');
  const [salaryBrut, setSalaryBrut] = useState(2500);
  const [familyParts, setFamilyParts] = useState('1');

  const result = useMemo(() => {
    return calculateNetSalary({
      salaryBrut,
      parts: Number(familyParts),
      year: 2026,
    });
  }, [salaryBrut, familyParts]);

  const purchasingPower = useMemo(() => {
    return calculatePurchasingPower(result.netSalary, 16.7);
  }, [result.netSalary]);

  const shareText = t('shareMessage', {
    salary: salaryBrut.toLocaleString('fr-FR'),
    power: Math.round(purchasingPower).toLocaleString('fr-FR'),
  });

  return (
    <TaxCalculatorBase
      title={t('title')}
      description={t('description')}
      footer={<ShareButton shareText={shareText} onShare={() => console.log('shared')} />}
    >
      {/* Inputs */}
      <div className="space-y-4 bg-slate-800 p-4 rounded">
        <SliderInput
          label="Salaire brut"
          min={1500}
          max={10000}
          step={50}
          value={salaryBrut}
          onChange={setSalaryBrut}
          formatValue={(v) => v.toLocaleString('fr-FR')}
          suffix="€"
        />
        <DropdownInput
          label="Situation familiale"
          options={FAMILY_OPTIONS}
          value={familyParts}
          onChange={setFamilyParts}
        />
      </div>

      {/* Results */}
      <div className="space-y-3 bg-slate-800 p-4 rounded text-sm">
        <ResultRow
          label={t('results.salaryBrut')}
          amount={salaryBrut}
          percentage={100}
        />
        <div className="border-t border-slate-600 pt-2"></div>
        <ResultRow
          label={t('results.socialContributions')}
          amount={result.socialContributions}
          percentage={(result.socialContributions / salaryBrut) * 100}
        />
        <ResultRow
          label={t('results.csgCrds')}
          amount={result.csgCrds}
          percentage={(result.csgCrds / salaryBrut) * 100}
        />
        <ResultRow
          label={t('results.incomeTax')}
          amount={result.irAmount}
          percentage={(result.irAmount / salaryBrut) * 100}
        />
        <div className="border-t border-slate-600 py-2"></div>
        <ResultRow
          label={t('results.netSalary')}
          amount={result.netSalary}
          percentage={(result.netSalary / salaryBrut) * 100}
          isBold
        />
        <div className="border-t border-slate-600 pt-2"></div>
        <ResultRow
          label={t('results.vat')}
          amount={salaryBrut - purchasingPower}
          percentage={((salaryBrut - purchasingPower) / salaryBrut) * 100}
        />
        <div className="border-t border-slate-600 py-2"></div>
        <ResultRow
          label={t('results.realPurchasingPower')}
          amount={Math.round(purchasingPower)}
          percentage={(purchasingPower / salaryBrut) * 100}
          isBold
          color="text-amber-400"
        />
      </div>
    </TaxCalculatorBase>
  );
}

interface ResultRowProps {
  label: string;
  amount: number;
  percentage: number;
  isBold?: boolean;
  color?: string;
}

function ResultRow({ label, amount, percentage, isBold, color }: ResultRowProps) {
  return (
    <div className="flex justify-between items-center">
      <span className={`${color || 'text-slate-300'} ${isBold ? 'font-bold' : ''}`}>{label}</span>
      <div className="text-right">
        <div className={`font-mono ${color || 'text-white'} ${isBold ? 'font-bold text-lg' : ''}`}>
          {amount.toLocaleString('fr-FR')}€
        </div>
        <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Add component to dashboard**

Modify `app/[locale]/page.tsx` to include `ChargeFiscaleCalculator` in Act 1 (after Journey of 100€ panel). For now, just import and place it:

```typescript
import { ChargeFiscaleCalculator } from '@/components/dashboard/interactive-charge-fiscale';

// In the JSX, after Journey panel:
<ChargeFiscaleCalculator />
```

- [ ] **Step 4: Run dev server and test**

```bash
pkill -f "next dev" 2>/dev/null; npm run dev
```

Navigate to http://localhost:3000 and verify the calculator renders and updates on slider change.

- [ ] **Step 5: Run type-check**

```bash
npm run type-check
```

Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add components/dashboard/interactive-charge-fiscale.tsx app/\[locale\]/page.tsx messages/fr.json messages/en.json
git commit -m "feat(dashboard): add charge fiscale calculator (Act 1)"
```

---

### Task 8: Implement "Guess the Tax" Quiz (Act 2)

**Files:**
- Create: `components/dashboard/interactive-guess-the-tax.tsx`
- Create: `components/dashboard/shared/quiz-question-card.tsx`
- Modify: `messages/fr.json`, `messages/en.json`

**Goal:** Build the quiz game with scoring, feedback, and mini-leaderboard.

*(Due to length, abbreviated. Full implementation includes timer logic, score tracking, localStorage leaderboard)*

- [ ] **Step 1: Create quiz question card component**

Create `components/dashboard/shared/quiz-question-card.tsx`:

```typescript
'use client';

interface QuizQuestionCardProps {
  question: string;
  options: string[];
  selectedIndex?: number;
  onSelect: (index: number) => void;
  correctIndex?: number;
  showResult?: boolean;
  disabled?: boolean;
}

export function QuizQuestionCard({
  question,
  options,
  selectedIndex,
  onSelect,
  correctIndex,
  showResult,
  disabled,
}: QuizQuestionCardProps) {
  return (
    <div className="space-y-4 bg-slate-800 p-6 rounded border border-slate-600">
      <p className="text-white text-lg">{question}</p>
      <div className="space-y-2">
        {options.map((option, i) => {
          const isSelected = selectedIndex === i;
          const isCorrect = correctIndex === i;
          const isWrong = isSelected && isCorrect === false;

          let buttonClass = 'bg-slate-700 hover:bg-slate-600 text-white';
          if (showResult) {
            if (isCorrect) buttonClass = 'bg-green-600 text-white';
            if (isWrong) buttonClass = 'bg-red-600 text-white';
          }
          if (isSelected && !showResult) buttonClass = 'bg-cyan-600 text-white';

          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              disabled={disabled || showResult}
              className={`w-full px-4 py-2 rounded border border-slate-500 transition-colors ${buttonClass}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create main quiz component**

Create `components/dashboard/interactive-guess-the-tax.tsx`:

```typescript
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { getQuizSession, calculateScore } from '@/lib/calculations/quiz-logic';
import { QuizQuestionCard } from './shared/quiz-question-card';
import { ShareButton } from './shared/share-button';
import { TaxCalculatorBase } from './shared/tax-calculator-base';

export function GuessTheTaxQuiz() {
  const t = useTranslations('interactiveCalculators.guessTheTax');
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(10);

  const questions = useMemo(() => getQuizSession(5), []);

  const currentQuestion = questions[currentQuestionIndex];
  const score = calculateScore(
    answers.map((answerIdx, i) => answerIdx === questions[i].correctIndex)
  );

  // Timer
  useEffect(() => {
    if (gameState !== 'playing' || !currentQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, currentQuestion]);

  const handleTimeUp = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Auto-advance (wrong answer)
      setAnswers([...answers, -1]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(10);
    } else {
      setGameState('finished');
    }
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(10);
    } else {
      setGameState('finished');
    }
  };

  const shareText = t('shareMessage', { score });

  if (gameState === 'start') {
    return (
      <TaxCalculatorBase title={t('title')} description={t('description')}>
        <button
          onClick={() => setGameState('playing')}
          className="w-full px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded border border-cyan-500 font-bold text-lg"
        >
          {t('startButton')}
        </button>
      </TaxCalculatorBase>
    );
  }

  if (gameState === 'finished') {
    return (
      <TaxCalculatorBase title={t('title')} footer={<ShareButton shareText={shareText} />}>
        <div className="bg-slate-800 p-6 rounded text-center space-y-4">
          <div className="text-5xl font-bold text-cyan-400">{score}/100</div>
          <p className="text-slate-300">{t('finishedMessage')}</p>
          <button
            onClick={() => {
              setGameState('start');
              setAnswers([]);
              setCurrentQuestionIndex(0);
              setTimeLeft(10);
            }}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded"
          >
            {t('restartButton')}
          </button>
        </div>
      </TaxCalculatorBase>
    );
  }

  // Playing state
  return (
    <TaxCalculatorBase title={t('title')}>
      <div className="space-y-4">
        {/* Progress */}
        <div className="flex justify-between text-sm text-slate-400">
          <span>
            {currentQuestionIndex + 1} / {questions.length}
          </span>
          <span>⏱ {timeLeft}s</span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-slate-700 rounded overflow-hidden">
          <div
            className="h-full bg-cyan-600 transition-all"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <QuizQuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          onSelect={handleAnswer}
          disabled={false}
        />
      </div>
    </TaxCalculatorBase>
  );
}
```

- [ ] **Step 3-6: Add i18n, integrate to dashboard, test, commit**

*(Same pattern as Task 7)*

```bash
git add components/dashboard/interactive-guess-the-tax.tsx components/dashboard/shared/quiz-question-card.tsx messages/fr.json messages/en.json app/\[locale\]/page.tsx
git commit -m "feat(dashboard): add guess the tax quiz game (Act 2)"
```

---

### Task 9: Implement "Impact d'une Augmentation" (Act 3 Calculator)

**Files:**
- Create: `components/dashboard/interactive-augmentation-impact.tsx`
- Modify: `messages/fr.json`, `messages/en.json`
- Modify: `app/[locale]/page.tsx`

**Goal:** Build the raise impact calculator with animated decomposition bar.

*(Abbreviated for length. Full implementation includes all decomposition bar integration)*

- [ ] **Step 1-2: Add i18n keys, create component**

Create `components/dashboard/interactive-augmentation-impact.tsx`:

```typescript
'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { calculateRaiseImpact } from '@/lib/calculations/raise-impact';
import { DecompositionBar } from './shared/decomposition-bar';
import { TaxCalculatorBase, SliderInput } from './shared/tax-calculator-base';
import { ShareButton } from './shared/share-button';

export function AugmentationImpactCalculator() {
  const t = useTranslations('interactiveCalculators.augmentationImpact');
  const [raiseAmount, setRaiseAmount] = useState(1000);
  const [baseSalary, setBaseSalary] = useState(2500);

  const result = useMemo(() => {
    return calculateRaiseImpact({
      raiseAmount,
      baseSalaryBrut: baseSalary,
      familyParts: 1,
      year: 2026,
    });
  }, [raiseAmount, baseSalary]);

  const shareText = t('shareMessage', {
    raise: raiseAmount.toLocaleString('fr-FR'),
    realGain: Math.round(result.realPurchasingPowerGain).toLocaleString('fr-FR'),
  });

  const decompositionSegments = [
    {
      label: t('segments.socialContrib'),
      amount: result.socialContribOnRaise,
      percentage: (result.socialContribOnRaise / raiseAmount) * 100,
      color: 'yellow' as const,
    },
    {
      label: t('segments.incomeTax'),
      amount: result.irOnRaise,
      percentage: (result.irOnRaise / raiseAmount) * 100,
      color: 'red' as const,
    },
  ];

  return (
    <TaxCalculatorBase
      title={t('title')}
      description={t('description')}
      footer={<ShareButton shareText={shareText} />}
    >
      {/* Inputs */}
      <div className="space-y-4 bg-slate-800 p-4 rounded">
        <SliderInput
          label={t('labels.raiseAmount')}
          min={100}
          max={5000}
          step={50}
          value={raiseAmount}
          onChange={setRaiseAmount}
          formatValue={(v) => v.toLocaleString('fr-FR')}
          suffix="€"
        />
        <SliderInput
          label={t('labels.baseSalary')}
          min={1500}
          max={10000}
          step={50}
          value={baseSalary}
          onChange={setBaseSalary}
          formatValue={(v) => v.toLocaleString('fr-FR')}
          suffix="€"
        />
      </div>

      {/* Decomposition bar */}
      <DecompositionBar
        initialAmount={raiseAmount}
        segments={decompositionSegments}
        finalAmount={result.netRaise}
      />

      {/* Year breakdown */}
      <div className="bg-slate-800 p-4 rounded space-y-2">
        <p className="text-slate-300 text-sm font-semibold">{t('inflation.label')}</p>
        {result.yearBreakdown.map((year) => (
          <div key={year.year} className="flex justify-between text-sm">
            <span className="text-slate-400">{year.year}</span>
            <span className={year.eroded ? 'text-red-400' : 'text-green-400'}>
              {year.purchasingPowerRemaining.toLocaleString('fr-FR')}€
            </span>
          </div>
        ))}
      </div>
    </TaxCalculatorBase>
  );
}
```

- [ ] **Step 3-6: Add i18n, integrate, test, commit**

```bash
git add components/dashboard/interactive-augmentation-impact.tsx messages/fr.json messages/en.json app/\[locale\]/page.tsx
git commit -m "feat(dashboard): add augmentation impact calculator (Act 3)"
```

---

## Task Phase 4: Dashboard Restructuring & Final Integration

### Task 10: Restructure Dashboard with 4-Act Narrative

**Files:**
- Modify: `app/[locale]/page.tsx`
- Modify: `components/dashboard/dashboard-layout.tsx` (new file for layout)

**Goal:** Reorganize the dashboard to follow the 4-act structure with visual separators.

- [ ] **Step 1: Create dashboard layout wrapper**

Create `components/dashboard/dashboard-layout.tsx`:

```typescript
import { ReactNode } from 'react';

export interface ActProps {
  title: string;
  children: ReactNode;
}

export function Act({ title, children }: ActProps) {
  return (
    <section className="space-y-6">
      {/* Act title & separator */}
      <div className="relative py-8">
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-blue-600 via-white to-red-600"></div>
        <div className="relative flex justify-center">
          <h2 className="px-4 bg-slate-950 text-xl font-bold text-cyan-400 uppercase tracking-widest">
            {title}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </section>
  );
}
```

- [ ] **Step 2: Restructure main dashboard page**

Modify `app/[locale]/page.tsx`:

```typescript
import { JourneyOf100 } from '@/components/dashboard/journey-of-100';
import { TaxBrackets } from '@/components/dashboard/tax-brackets';
// ... import all existing panels
import { ChargeFiscaleCalculator } from '@/components/dashboard/interactive-charge-fiscale';
import { GuessTheTaxQuiz } from '@/components/dashboard/interactive-guess-the-tax';
import { AugmentationImpactCalculator } from '@/components/dashboard/interactive-augmentation-impact';
import { Act } from '@/components/dashboard/dashboard-layout';

export default function DashboardPage() {
  return (
    <main className="space-y-12 p-6">
      {/* Act 1 */}
      <Act title="Le Choc">
        <JourneyOf100 />
        <ChargeFiscaleCalculator />
      </Act>

      {/* Act 2 */}
      <Act title="Les Détails">
        <TaxBrackets />
        <CorporateTax />
        <FlatTax />
        <GuessTheTaxQuiz />
        <TVA />
        <FuelTax />
        <BehavioralTax />
      </Act>

      {/* Act 3 */}
      <Act title="Le Dilemme">
        <SalaryContributions />
        <WelfareSystem />
        <AugmentationImpactCalculator />
      </Act>

      {/* Act 4 */}
      <Act title="Le Contexte">
        <OECDComparison />
        <MacroIndicators />
        <Timeline />
        <Ticker />
      </Act>
    </main>
  );
}
```

- [ ] **Step 3: Test layout**

```bash
npm run dev
```

Verify the 4-act structure displays correctly with visual separators.

- [ ] **Step 4: Commit**

```bash
git add app/\[locale\]/page.tsx components/dashboard/dashboard-layout.tsx
git commit -m "refactor(dashboard): restructure into 4-act narrative layout"
```

---

## Task Phase 5: Testing & Final Checks

### Task 11: Run Full Type Check & Linting

**Goal:** Ensure no TypeScript or ESLint errors.

- [ ] **Step 1: Run type-check**

```bash
npm run type-check
```

Expected: No errors. Fix any issues immediately.

- [ ] **Step 2: Run linting**

```bash
npm run lint
```

Expected: No errors. Fix any issues immediately.

- [ ] **Step 3: Commit (if fixes were needed)**

```bash
git add -A
git commit -m "fix: resolve type-check and linting errors"
```

---

### Task 12: Manual Testing & QA

**Goal:** Test all 3 interactive components end-to-end.

- [ ] **Step 1: Test Charge Fiscale Calculator**

- Verify slider updates and calculations change
- Verify family situation dropdown works
- Verify share button copies text
- Test on mobile (responsive)

- [ ] **Step 2: Test Guess the Tax Quiz**

- Start game, answer questions
- Verify timer counts down
- Verify scoring is correct
- Verify results screen shows score
- Test restart

- [ ] **Step 3: Test Augmentation Impact Calculator**

- Verify sliders update decomposition bar animation
- Verify year breakdown shows inflation erosion
- Verify share button works

- [ ] **Step 4: Test i18n (FR & EN)**

- Switch to English (`/en/`)
- Verify all text is translated correctly
- Verify layout is unchanged

- [ ] **Step 5: Test accessibility**

- Tab through all components
- Verify keyboard navigation works
- Run browser accessibility audit (DevTools)

- [ ] **Step 6: Document any bugs or issues**

If found, create GitHub issues or quick fix commits.

---

### Task 13: Final Cleanup & Documentation

**Goal:** Ensure code is clean, well-documented, and ready for production.

- [ ] **Step 1: Add code comments (minimal)**

Only add comments where logic is non-obvious. Example:

```typescript
// Calculate tax on one part using brackets, then multiply back by number of parts
// This is how the French quotient familial works
```

- [ ] **Step 2: Update README (if needed)**

If README needs updates for new components or features, do so.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "docs: add code comments and finalize interactive dashboard features"
```

- [ ] **Step 4: Verify all tests pass (if added)**

```bash
npm test
```

Expected: All tests pass (if you added component tests).

---

## Success Criteria

✅ All 3 interactive components implemented and working
✅ Dashboard restructured into 4-act narrative
✅ All i18n keys added (FR + EN)
✅ Responsive on mobile
✅ Type-check passes
✅ Linting passes
✅ Accessible (WCAG AA)
✅ All tests pass
✅ Code is clean and maintainable

---

## Execution Path

This plan is designed for **parallel execution**:

- **Stream 1:** Tasks 1, 2, 3 (calculations + utilities) — ~1 week
- **Stream 2:** Tasks 4, 5, 6 (reusable UI components) — ~1 week, can start after Stream 1
- **Stream 3:** Tasks 7, 8, 9 (interactive components) — ~1.5 weeks, parallelizable after Streams 1 & 2
- **Stream 4:** Task 10 (dashboard restructuring) — ~2-3 days, final integration
- **Stream 5:** Tasks 11, 12, 13 (testing & polish) — ~1 week

**Total:** 3-4 weeks with focused effort.

Use `superpowers:subagent-driven-development` to dispatch tasks in parallel and keep work moving quickly.
