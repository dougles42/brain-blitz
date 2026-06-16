"use client";

import type { RoundResult } from "@/hooks/useGameState";

interface RoundResultProps {
  result: RoundResult;
  onNext: () => void;
  isLastRound: boolean;
}

export default function RoundResultDisplay({
  result,
  onNext,
  isLastRound,
}: RoundResultProps) {
  const { targetFreq, guessedFreq, score, direction } = result;

  const freqDiff = Math.abs(guessedFreq - targetFreq);
  const barPct = Math.min(100, Math.max(0, 100 - score.centsOff));

  const colors: Record<string, { bar: string; text: string; emoji: string }> =
    {
      Perfect: {
        bar: "bg-amber-400",
        text: "text-amber-600 dark:text-amber-400",
        emoji: "🎯",
      },
      Great: {
        bar: "bg-green-500",
        text: "text-green-600 dark:text-green-400",
        emoji: "👏",
      },
      Good: {
        bar: "bg-blue-500",
        text: "text-blue-600 dark:text-blue-400",
        emoji: "👍",
      },
      Okay: {
        bar: "bg-zinc-400",
        text: "text-zinc-500 dark:text-zinc-400",
        emoji: "🤔",
      },
      Miss: {
        bar: "bg-red-500",
        text: "text-red-600 dark:text-red-400",
        emoji: "😅",
      },
    };

  const c = colors[score.label];

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="text-5xl">{c.emoji}</div>

      <h2
        className={`text-2xl font-bold ${c.text}`}
      >
        {score.label}!
      </h2>

      <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-4 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${c.bar}`}
          style={{ width: `${barPct}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-center text-sm">
        <div className="text-zinc-500 dark:text-zinc-400">Target</div>
        <div className="text-zinc-500 dark:text-zinc-400">Your Guess</div>
        <div className="font-mono text-lg font-bold tabular-nums">
          {Math.round(targetFreq)} Hz
        </div>
        <div className="font-mono text-lg font-bold tabular-nums">
          {Math.round(guessedFreq)} Hz
        </div>
      </div>

      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        Off by <span className="font-bold font-mono">{score.centsOff}¢</span>{" "}
        {direction === "exact" ? "" : `(${direction})`} ·{" "}
        <span className="font-bold">{score.points} pts</span>
      </div>

      <button
        onClick={onNext}
        className="mt-2 px-8 py-3 rounded-2xl bg-foreground text-background font-semibold
          hover:opacity-90 active:scale-95 transition-all"
      >
        {isLastRound ? "See Results" : "Next Round"}
      </button>
    </div>
  );
}
