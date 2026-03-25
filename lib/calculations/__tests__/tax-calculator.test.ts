import {
  calculateIR,
  calculateSocialContributions,
  calculateCSG_CRDS,
  calculateNetSalary,
  calculatePurchasingPower,
} from '../tax-calculator';

// Test utilities
function assertClose(
  actual: number,
  expected: number,
  tolerance: number = 1,
  message: string = ''
) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(
      `Expected ${expected} ± ${tolerance}, got ${actual}. ${message}`
    );
  }
}

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

// Test suite
const tests: Array<{ name: string; run: () => void }> = [];

function test(name: string, fn: () => void) {
  tests.push({ name, run: fn });
}

// ─── IR Tests ───────────────────────────────────────────

test('IR: salary entirely in 0% bracket (2500€)', () => {
  const ir = calculateIR({ salaryBrut: 2500, parts: 1, year: 2026 });
  assertClose(ir, 0, 1, 'Salary 2500€ with 1 part should have 0% tax');
});

test('IR: salary spanning multiple brackets (50000€)', () => {
  const ir = calculateIR({ salaryBrut: 50000, parts: 1, year: 2026 });
  // Expected:
  // 0-11600: 0€
  // 11601-29579: (29579-11601)*0.11 = 17978*0.11 = 1977.58€
  // 29580-50000: (50000-29580)*0.30 = 20420*0.30 = 6126€
  // Total: 8103.58€ ≈ 8104€
  assertClose(ir, 8104, 2, 'Salary 50000€ should tax ~8104€');
});

test('IR: with family quotient (2.5 parts)', () => {
  const irWithoutParts = calculateIR({ salaryBrut: 50000, parts: 1, year: 2026 });
  const irWithParts = calculateIR({ salaryBrut: 50000, parts: 2.5, year: 2026 });
  // With 2.5 parts, we divide by 2.5, apply brackets, multiply back.
  // Should be significantly lower than without parts.
  assert(
    irWithParts < irWithoutParts,
    'IR with family quotient should be lower than without'
  );
});

// ─── Social Contributions Tests ──────────────────────

test('Social contributions: ~9.3% of salary', () => {
  const contributions = calculateSocialContributions(2000);
  // Expected: ~186€ (2000 * 0.093)
  assertClose(contributions, 186, 5, '2000€ salary should yield ~186€ contributions');
});

test('Social contributions: various salaries', () => {
  const test1 = calculateSocialContributions(1000);
  const test2 = calculateSocialContributions(3000);
  // Should scale linearly
  assertClose(test2 / test1, 3, 0.1, 'Should scale linearly with salary');
});

// ─── CSG/CRDS Tests ────────────────────────────────

test('CSG/CRDS: ~8% of salary', () => {
  const csgCrds = calculateCSG_CRDS(2000);
  // Expected: ~160€ (2000 * 0.08)
  assertClose(csgCrds, 160, 5, '2000€ salary should yield ~160€ CSG/CRDS');
});

test('CSG/CRDS: various salaries', () => {
  const test1 = calculateCSG_CRDS(1000);
  const test2 = calculateCSG_CRDS(5000);
  // Should scale linearly
  assertClose(test2 / test1, 5, 0.1, 'Should scale linearly with salary');
});

// ─── Net Salary Tests ────────────────────────────────

test('Net salary breakdown: all components present', () => {
  const result = calculateNetSalary({ salaryBrut: 40000, parts: 1, year: 2026 });
  assert(result.irAmount !== undefined, 'Should have irAmount');
  assert(result.socialContributions !== undefined, 'Should have socialContributions');
  assert(result.csgCrds !== undefined, 'Should have csgCrds');
  assert(result.netSalary !== undefined, 'Should have netSalary');
});

test('Net salary breakdown: calculation integrity', () => {
  const result = calculateNetSalary({ salaryBrut: 40000, parts: 1, year: 2026 });
  // netSalary = salaryBrut - socialContributions - csgCrds - irAmount
  const expected =
    40000 - result.socialContributions - result.csgCrds - result.irAmount;
  assertClose(result.netSalary, expected, 2, 'Net salary should equal brut minus all deductions');
});

test('Net salary: example with 2400€ gross (median)', () => {
  const result = calculateNetSalary({ salaryBrut: 2400, parts: 1, year: 2026 });
  // Rough expectation:
  // social: ~223€
  // csg/crds: ~192€
  // ir: minimal (below bracket)
  // net: ~2400 - 223 - 192 - 0 = ~1985€
  assert(result.netSalary > 1800, 'Net salary should be reasonable');
  assert(result.netSalary < 2400, 'Net salary should be less than gross');
});

// ─── Purchasing Power Tests ─────────────────────────

test('Purchasing power: deducts default VAT (16.7%)', () => {
  const purchasing = calculatePurchasingPower(1000);
  // 1000 * (1 - 0.167) = 833€
  assertClose(purchasing, 833, 5, '1000€ net should yield ~833€ purchasing power with default VAT');
});

test('Purchasing power: custom VAT rate', () => {
  const purchasing = calculatePurchasingPower(1000, 20);
  // 1000 * (1 - 0.20) = 800€
  assertClose(purchasing, 800, 5, '1000€ net with 20% VAT should yield ~800€');
});

test('Purchasing power: no VAT', () => {
  const purchasing = calculatePurchasingPower(1000, 0);
  assertClose(purchasing, 1000, 1, '1000€ net with 0% VAT should remain 1000€');
});

// ─── Run all tests ──────────────────────────────────

export async function runTests() {
  console.log(`\n📋 Running ${tests.length} tests...\n`);
  let passed = 0;
  let failed = 0;

  for (const { name, run } of tests) {
    try {
      run();
      console.log(`✅ ${name}`);
      passed++;
    } catch (error) {
      console.error(`❌ ${name}`);
      console.error(`   ${(error as Error).message}\n`);
      failed++;
    }
  }

  console.log(`\n${passed} passed, ${failed} failed\n`);
  return failed === 0;
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().then((success) => {
    process.exit(success ? 0 : 1);
  });
}
