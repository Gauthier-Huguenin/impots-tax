import { calculateRaiseImpact } from '../raise-impact';

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

// ─── Raise Impact Tests ──────────────────────────────────

test('Raise: 1000€ raise results in netRaise < 1000€ (taxes reduce it)', () => {
  const result = calculateRaiseImpact({
    baseSalaryBrut: 50000,
    raiseAmount: 1000,
    parts: 1,
    year: 2026,
  });

  assert(
    result.netRaise < 1000,
    `netRaise (${result.netRaise}€) should be less than 1000€ due to taxes`
  );
  assert(
    result.netRaise > 0,
    `netRaise (${result.netRaise}€) should be positive`
  );
});

test('Raise: realPurchasingPowerGain < netRaise (inflation reduces it further)', () => {
  const result = calculateRaiseImpact({
    baseSalaryBrut: 50000,
    raiseAmount: 1000,
    parts: 1,
    year: 2026,
  });

  assert(
    result.realPurchasingPowerGain < result.netRaise,
    `realPurchasingPowerGain (${result.realPurchasingPowerGain}€) should be less than netRaise (${result.netRaise}€) due to inflation`
  );
});

test('Raise: inflationRate is 2.1%', () => {
  const result = calculateRaiseImpact({
    baseSalaryBrut: 50000,
    raiseAmount: 1000,
    parts: 1,
    year: 2026,
  });

  assertClose(
    result.inflationRate,
    2.1,
    0.01,
    'inflationRate should be 2.1%'
  );
});

test('Raise: yearBreakdown exists with 5 entries (years 0-4)', () => {
  const result = calculateRaiseImpact({
    baseSalaryBrut: 50000,
    raiseAmount: 1000,
    parts: 1,
    year: 2026,
  });

  assert(
    result.yearBreakdown !== undefined,
    'yearBreakdown should exist'
  );
  assert(
    result.yearBreakdown.length === 5,
    `yearBreakdown should have 5 entries, got ${result.yearBreakdown.length}`
  );

  // Verify years 0-4
  for (let i = 0; i < 5; i++) {
    const yearData = result.yearBreakdown[i];
    assert(
      yearData.year === i,
      `yearBreakdown[${i}] should have year=${i}, got ${yearData.year}`
    );
    assert(
      yearData.nettedRaiseAmount >= 0,
      `yearBreakdown[${i}].nettedRaiseAmount should be non-negative`
    );
    assert(
      yearData.cumulativeInflationErosion >= 0,
      `yearBreakdown[${i}].cumulativeInflationErosion should be non-negative`
    );
  }
});

test('Raise: year 0 has zero inflation erosion', () => {
  const result = calculateRaiseImpact({
    baseSalaryBrut: 50000,
    raiseAmount: 1000,
    parts: 1,
    year: 2026,
  });

  assertClose(
    result.yearBreakdown[0].cumulativeInflationErosion,
    0,
    0.01,
    'Year 0 should have zero inflation erosion'
  );
  assertClose(
    result.yearBreakdown[0].nettedRaiseAmount,
    result.netRaise,
    1,
    'Year 0 nettedRaiseAmount should equal netRaise'
  );
});

test('Raise: year 4 erosion > year 0 (inflation accumulates)', () => {
  const result = calculateRaiseImpact({
    baseSalaryBrut: 50000,
    raiseAmount: 1000,
    parts: 1,
    year: 2026,
  });

  assert(
    result.yearBreakdown[4].cumulativeInflationErosion >
      result.yearBreakdown[0].cumulativeInflationErosion,
    'Inflation erosion should accumulate over years'
  );
  assert(
    result.yearBreakdown[4].nettedRaiseAmount <
      result.yearBreakdown[0].nettedRaiseAmount,
    'Netted raise amount should decrease as inflation erodes value'
  );
});

test('Raise: tax breakdown shows IR, social, CSG components', () => {
  const result = calculateRaiseImpact({
    baseSalaryBrut: 50000,
    raiseAmount: 1000,
    parts: 1,
    year: 2026,
  });

  assert(
    result.irOnRaise >= 0,
    'irOnRaise should be non-negative'
  );
  assert(
    result.socialContribOnRaise >= 0,
    'socialContribOnRaise should be non-negative'
  );
  assert(
    result.csgCrdsOnRaise >= 0,
    'csgCrdsOnRaise should be non-negative'
  );

  const sumTaxes = result.irOnRaise + result.socialContribOnRaise + result.csgCrdsOnRaise;
  assertClose(
    result.taxesOnRaise,
    sumTaxes,
    1,
    'taxesOnRaise should equal sum of IR + social + CSG/CRDS'
  );
});

// ─── Run all tests ───────────────────────────────────────

async function runTests() {
  let passed = 0;
  let failed = 0;

  console.log(`\nRunning ${tests.length} tests...\n`);

  for (const test of tests) {
    try {
      test.run();
      console.log(`✓ ${test.name}`);
      passed++;
    } catch (error) {
      console.error(`✗ ${test.name}`);
      console.error(`  ${(error as Error).message}\n`);
      failed++;
    }
  }

  console.log(`\n${passed} passed, ${failed} failed\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((error) => {
  console.error('Test runner error:', error);
  process.exit(1);
});
