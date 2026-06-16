"use client";

import type { RoundResult } from "@/hooks/useGameState";

interface ScoreBoardProps {
  results: RoundResult[];
  currentRound: number;
}

export default function ScoreBoard({ results, currentRound }: ScoreBoardProps) {
  if (results.length === 0) return null;

  return (
    <div className="flex flex-col gap-1 w-full max-w-xs">
      <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-1">
        Rounds
      </h3>
      {results.map((r) => (
        <div
          key={r.round}
          className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/50"
        >
          <span className="text-sm font-medium tabular-nums">R{r.round}</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono tabular-nums">
            {Math.round(r.targetFreq)} Hz → {Math.round(r.guessedFreq)} Hz
          </span>
          <ScoreBadge label={r.score.label} points={r.score.points} />
        </div>
      ))}
      {/* Future rounds */}
      {Array.from({ length: Math.max(0, 5 - results.length) }, (_, i) => (
        <div
          key={`future-${i}`}
          className="flex items-center gap-3 px-3 py-2 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-700 opacity-40"
        >
          <span className="text-sm font-medium tabular-nums">
            R{results.length + i + 1}
          </span>
          <span className="text-xs text-zinc-400">—</span>
        </div>
      ))}
    </div>
  );
}

function ScoreBadge({
  label,
  points,
}: {
  label: string;
  points: number;
}) {
  const colors: Record<string, string> = {
    Perfect:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    Great: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
    Good: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    Okay: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
    Miss: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  };
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full tabular-nums ${
        colors[label] || colors.Miss
      }`}
    >
      {label} ({points})
    </span>
  );
}
