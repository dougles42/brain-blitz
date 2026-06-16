/**
 * Calculate the difference in cents between two frequencies.
 * 1 semitone = 100 cents.
 */
export function centDifference(f1: number, f2: number): number {
  return Math.abs(1200 * Math.log2(f1 / f2));
}

export interface ScoreResult {
  label: "Perfect" | "Great" | "Good" | "Okay" | "Miss";
  points: number;
  centsOff: number;
}

const SCORE_TIERS: { maxCents: number; label: ScoreResult["label"]; points: number }[] = [
  { maxCents: 5, label: "Perfect", points: 100 },
  { maxCents: 25, label: "Great", points: 80 },
  { maxCents: 50, label: "Good", points: 60 },
  { maxCents: 100, label: "Okay", points: 40 },
  { maxCents: Infinity, label: "Miss", points: 0 },
];

export function scoreGuess(targetFreq: number, guessedFreq: number): ScoreResult {
  const centsOff = centDifference(targetFreq, guessedFreq);
  const tier = SCORE_TIERS.find((t) => centsOff <= t.maxCents)!;
  return { label: tier.label, points: tier.points, centsOff: Math.round(centsOff * 10) / 10 };
}

export function getMaxScore(rounds: number): number {
  return rounds * 100;
}
