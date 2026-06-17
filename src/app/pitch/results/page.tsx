"use client";

import { Confetti } from "@/components/ui/Confetti";
import Link from "next/link";

// Demo results data — in a real app this comes from game state/URL params
const demoResults = {
  score: 850,
  correct: 8,
  totalRounds: 10,
  avgTime: 3.2,
  bestStreak: 5,
  pct: 80,
};

export default function ResultsPage() {
  const r = demoResults;
  const emoji = r.pct >= 90 ? "🏆" : r.pct >= 70 ? "🎉" : r.pct >= 50 ? "👏" : r.pct >= 30 ? "💪" : "🎧";
  const title = r.pct >= 90 ? "Legendary!" : r.pct >= 70 ? "Amazing!" : r.pct >= 50 ? "Great Job!" : r.pct >= 30 ? "Not Bad!" : "Keep Listening!";
  const subtitle =
    r.pct >= 90 ? "You scored in the top 1% — incredible ear!" :
    r.pct >= 70 ? "You scored in the top 5%" :
    r.pct >= 50 ? "You're above average!" :
    "Room for improvement — try again!";

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 animate-screen-in">
      <Confetti />
      <div className="w-full max-w-md space-y-6 animate-card-slide-up">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-5xl animate-trophy-bounce inline-block">{emoji}</span>
          <h1 className="text-2xl font-bold text-zinc-100 light:text-zinc-900">{title}</h1>
          <p className="text-sm text-zinc-500 light:text-zinc-400">{subtitle}</p>
        </div>

        {/* Score hero */}
        <div className="rounded-2xl p-6 text-center gradient-brand-soft border border-violet-500/20">
          <span className="text-5xl font-extrabold font-mono gradient-brand-text">{r.score.toLocaleString()}</span>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mt-2">points</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatBox value={String(r.correct)} label="Correct" color="text-green-500" />
          <StatBox value={`${r.avgTime}s`} label="Avg Time" />
          <StatBox value={String(r.bestStreak)} label="Best Streak" />
          <StatBox value={`+${r.score + r.bestStreak * 50}`} label="XP Earned" />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          <Link
            href="/solo"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white gradient-brand hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Play Again
          </Link>
          <Link
            href="/leaderboard"
            className="w-full text-center px-6 py-3 rounded-xl border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 font-semibold text-zinc-300 light:text-zinc-600 hover:border-violet-500 hover:text-zinc-100 transition-all duration-200"
          >
            View Leaderboard
          </Link>
          <Link href="/" className="text-sm text-center text-zinc-500 hover:text-zinc-300 transition-colors">
            ← Back to menu
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatBox({ value, label, color = "text-zinc-100 light:text-zinc-900" }: { value: string; label: string; color?: string }) {
  return (
    <div className="rounded-xl bg-zinc-900 dark:bg-zinc-900 light:bg-white border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 p-3 text-center">
      <span className={`text-xl font-bold font-mono ${color}`}>{value}</span>
      <p className="text-[0.6rem] font-semibold uppercase tracking-wider text-zinc-500 mt-1">{label}</p>
    </div>
  );
}
