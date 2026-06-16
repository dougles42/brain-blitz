"use client";

import type { RoundResult } from "@/hooks/useGameState";
import { getMaxScore } from "@/lib/scoring";

interface GameSummaryProps {
  results: RoundResult[];
  onPlayAgain: () => void;
}

export default function GameSummary({
  results,
  onPlayAgain,
}: GameSummaryProps) {
  const totalScore = results.reduce((sum, r) => sum + r.score.points, 0);
  const maxScore = getMaxScore(results.length);
  const pct = Math.round((totalScore / maxScore) * 100);

  const grade =
    pct >= 90
      ? { label: "S", emoji: "🏆", color: "text-amber-500" }
      : pct >= 70
        ? { label: "A", emoji: "🌟", color: "text-green-500" }
        : pct >= 50
          ? { label: "B", emoji: "🎵", color: "text-blue-500" }
          : pct >= 30
            ? { label: "C", emoji: "🎶", color: "text-zinc-500" }
            : { label: "D", emoji: "🔊", color: "text-red-400" };

  const perfects = results.filter((r) => r.score.label === "Perfect").length;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="text-6xl">{grade.emoji}</div>

      <h2 className={`text-3xl font-bold ${grade.color}`}>Grade {grade.label}</h2>

      <div className="text-5xl font-mono font-bold tabular-nums">
        {totalScore}
        <span className="text-xl text-zinc-400 dark:text-zinc-500">
          /{maxScore}
        </span>
      </div>

      <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-3 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-red-400 via-amber-400 to-green-500 transition-all duration-1000 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        {pct}% accuracy · {perfects} perfect{perfects !== 1 ? "s" : ""}
      </div>

      {/* Round details */}
      <div className="w-full space-y-1 mt-2">
        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-2">
          Round Details
        </h3>
        {results.map((r) => (
          <div
            key={r.round}
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 text-sm"
          >
            <span className="font-medium tabular-nums">Round {r.round}</span>
            <span className="text-zinc-500 dark:text-zinc-400 text-xs font-mono">
              {Math.round(r.targetFreq)} → {Math.round(r.guessedFreq)} Hz · {r.score.centsOff}¢ {r.direction !== "exact" ? r.direction : ""}
            </span>
            <span className="font-semibold tabular-nums">
              {r.score.points} pts
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onPlayAgain}
        className="mt-4 px-10 py-3 rounded-2xl bg-foreground text-background font-semibold
          hover:opacity-90 active:scale-95 transition-all"
      >
        Play Again
      </button>
    </div>
  );
}
