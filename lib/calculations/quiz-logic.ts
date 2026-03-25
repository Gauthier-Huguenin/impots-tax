import { GUESS_THE_TAX_QUESTIONS } from '@/lib/tax-data';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number; // 0-based index of correct answer
  explanation: string;
}

/**
 * Randomly pick N questions from pool WITHOUT replacement.
 * Uses Fisher-Yates inspired shuffle algorithm.
 * Returns up to N questions (fewer if pool is smaller).
 */
export function shuffleQuestions(pool: QuizQuestion[], count: number): QuizQuestion[] {
  // Handle edge cases
  if (pool.length === 0) return [];
  if (count <= 0) return [];
  if (count >= pool.length) return [...pool].sort(() => Math.random() - 0.5);

  // Fisher-Yates: shuffle and take first N
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, pool.length));
}

/**
 * Calculate score from array of answer correctness.
 * +10 points for each correct answer
 * -2 points for each incorrect answer
 */
export function calculateScore(answers: boolean[]): number {
  return answers.reduce((sum, isCorrect) => {
    return sum + (isCorrect ? 10 : -2);
  }, 0);
}

/**
 * Get a random session of N quiz questions.
 * Wrapper around shuffleQuestions using the global question pool.
 */
export function getQuizSession(questionCount: number = 5): QuizQuestion[] {
  return shuffleQuestions(GUESS_THE_TAX_QUESTIONS, questionCount);
}
