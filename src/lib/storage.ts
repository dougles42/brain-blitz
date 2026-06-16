const KEYS = {
  attempt: (date: string) => `pit_attempt_${date}`,
  scores: "pit_scores",
};

export interface ChallengeAttempt {
  date: string;
  targetNote: string;
  guessedNote: string;
  correct: boolean;
  exactMatch: boolean;
  timestamp: number;
}

export interface ScoreEntry {
  date: string;
  correct: boolean;
  exactMatch: boolean;
  targetNote: string;
  guessedNote: string;
  timestamp: number;
}

export function hasAttemptedToday(dateString: string): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEYS.attempt(dateString)) !== null;
}

export function saveAttempt(attempt: ChallengeAttempt): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEYS.attempt(attempt.date), JSON.stringify(attempt));
  const scores = getScores();
  const idx = scores.findIndex((s) => s.date === attempt.date);
  const entry: ScoreEntry = {
    date: attempt.date,
    correct: attempt.correct,
    exactMatch: attempt.exactMatch,
    targetNote: attempt.targetNote,
    guessedNote: attempt.guessedNote,
    timestamp: attempt.timestamp,
  };
  if (idx >= 0) scores[idx] = entry;
  else scores.unshift(entry);
  localStorage.setItem(KEYS.scores, JSON.stringify(scores));
}

export function getTodayAttempt(dateString: string): ChallengeAttempt | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEYS.attempt(dateString));
  if (!raw) return null;
  try { return JSON.parse(raw) as ChallengeAttempt; } catch { return null; }
}

export function getScores(): ScoreEntry[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEYS.scores);
  if (!raw) return [];
  try { const s = JSON.parse(raw); return Array.isArray(s) ? s : []; } catch { return []; }
}

export function getStreak(): number {
  const scores = getScores();
  if (!scores.length) return 0;
  let streak = 0;
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  while (true) {
    const ds = d.toISOString().split("T")[0];
    const s = scores.find((x) => x.date === ds);
    if (s?.correct) { streak++; d.setUTCDate(d.getUTCDate() - 1); }
    else break;
  }
  return streak;
}

export function getWinRate(): string {
  const scores = getScores();
  if (!scores.length) return "0%";
  return `${Math.round((scores.filter((s) => s.correct).length / scores.length) * 100)}%`;
}

export function getTotalGames(): number {
  return getScores().length;
}
