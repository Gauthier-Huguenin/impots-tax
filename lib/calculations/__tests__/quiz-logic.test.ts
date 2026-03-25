import {
  shuffleQuestions,
  calculateScore,
  getQuizSession,
} from '../quiz-logic';
import { GUESS_THE_TAX_QUESTIONS } from '@/lib/tax-data';

// Test utilities
function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertEqual(actual: any, expected: any, message: string) {
  if (actual !== expected) {
    throw new Error(`Expected ${expected}, got ${actual}. ${message}`);
  }
}

// Test suite
const tests: Array<{ name: string; run: () => void }> = [];

function test(name: string, fn: () => void) {
  tests.push({ name, run: fn });
}

// ─── shuffleQuestions Tests ───────────────────────────────────

test('shuffleQuestions: returns requested count of questions', () => {
  const shuffled = shuffleQuestions(GUESS_THE_TAX_QUESTIONS, 5);
  assertEqual(shuffled.length, 5, 'Should return 5 questions');
});

test('shuffleQuestions: returns all questions if pool smaller than requested', () => {
  const smallPool = GUESS_THE_TAX_QUESTIONS.slice(0, 3);
  const shuffled = shuffleQuestions(smallPool, 10);
  assertEqual(shuffled.length, 3, 'Should return 3 questions when pool has only 3');
});

test('shuffleQuestions: no duplicates in returned questions', () => {
  const shuffled = shuffleQuestions(GUESS_THE_TAX_QUESTIONS, 10);
  const ids = shuffled.map((q) => q.id);
  const uniqueIds = new Set(ids);
  assertEqual(uniqueIds.size, ids.length, 'All question IDs should be unique');
});

test('shuffleQuestions: returns QuizQuestion objects with required properties', () => {
  const shuffled = shuffleQuestions(GUESS_THE_TAX_QUESTIONS, 1);
  const q = shuffled[0];
  assert(q.id !== undefined, 'Question should have id');
  assert(q.question !== undefined, 'Question should have question text');
  assert(Array.isArray(q.options) && q.options.length === 4, 'Question should have 4 options');
  assert(q.correctIndex !== undefined, 'Question should have correctIndex');
  assert(q.explanation !== undefined, 'Question should have explanation');
});

// ─── calculateScore Tests ────────────────────────────────────

test('calculateScore: [true, true, false, true] = +28 points', () => {
  const answers = [true, true, false, true];
  const score = calculateScore(answers);
  assertEqual(score, 28, 'Score should be +10+10-2+10 = 28');
});

test('calculateScore: all correct = +50 points (5 questions)', () => {
  const answers = [true, true, true, true, true];
  const score = calculateScore(answers);
  assertEqual(score, 50, 'All correct should be 5 * 10 = 50');
});

test('calculateScore: all incorrect = -10 points (5 questions)', () => {
  const answers = [false, false, false, false, false];
  const score = calculateScore(answers);
  assertEqual(score, -10, 'All incorrect should be 5 * -2 = -10');
});

test('calculateScore: empty array = 0 points', () => {
  const answers: boolean[] = [];
  const score = calculateScore(answers);
  assertEqual(score, 0, 'Empty answers should be 0 points');
});

test('calculateScore: single correct answer = +10', () => {
  const answers = [true];
  const score = calculateScore(answers);
  assertEqual(score, 10, 'Single correct should be 10');
});

test('calculateScore: single incorrect answer = -2', () => {
  const answers = [false];
  const score = calculateScore(answers);
  assertEqual(score, -2, 'Single incorrect should be -2');
});

// ─── getQuizSession Tests ────────────────────────────────────

test('getQuizSession: default count = 5 questions', () => {
  const session = getQuizSession();
  assertEqual(session.length, 5, 'Should return 5 questions by default');
});

test('getQuizSession: custom count = 10 questions', () => {
  const session = getQuizSession(10);
  assertEqual(session.length, 10, 'Should return 10 questions when specified');
});

test('getQuizSession: returns valid quiz questions', () => {
  const session = getQuizSession(3);
  assertEqual(session.length, 3, 'Should have 3 questions');
  session.forEach((q) => {
    assert(q.id !== undefined, 'Each question should have id');
    assert(q.question !== undefined, 'Each question should have question text');
    assert(Array.isArray(q.options) && q.options.length === 4, 'Each question should have 4 options');
    assert(typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex < 4, 'correctIndex should be 0-3');
  });
});

// ─── Question Pool Validation ────────────────────────────────

test('GUESS_THE_TAX_QUESTIONS: has at least 20 questions', () => {
  assert(
    GUESS_THE_TAX_QUESTIONS.length >= 20,
    `Question pool should have at least 20 questions, has ${GUESS_THE_TAX_QUESTIONS.length}`
  );
});

test('GUESS_THE_TAX_QUESTIONS: all questions are valid', () => {
  GUESS_THE_TAX_QUESTIONS.forEach((q, idx) => {
    assert(typeof q.id === 'number', `Q${idx}: should have numeric id`);
    assert(typeof q.question === 'string' && q.question.length > 0, `Q${idx}: should have non-empty question`);
    assert(Array.isArray(q.options) && q.options.length === 4, `Q${idx}: should have exactly 4 options`);
    assert(
      typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex < 4,
      `Q${idx}: correctIndex should be 0-3`
    );
    assert(typeof q.explanation === 'string' && q.explanation.length > 0, `Q${idx}: should have non-empty explanation`);
  });
});

test('GUESS_THE_TAX_QUESTIONS: all IDs are unique', () => {
  const ids = GUESS_THE_TAX_QUESTIONS.map((q) => q.id);
  const uniqueIds = new Set(ids);
  assertEqual(uniqueIds.size, ids.length, 'All question IDs should be unique');
});

// Run all tests
async function runTests() {
  let passed = 0;
  let failed = 0;

  for (const { name, run } of tests) {
    try {
      run();
      console.log(`✓ ${name}`);
      passed++;
    } catch (error) {
      console.error(`✗ ${name}`);
      console.error(`  ${error instanceof Error ? error.message : String(error)}`);
      failed++;
    }
  }

  console.log(`\nTests: ${passed} passed, ${failed} failed out of ${passed + failed} total`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
