'use client';

import type { GameState } from '@/lib/types';
import { Confetti } from '@/components/ui/Confetti';

interface ResultsScreenProps {
  game: GameState;
  showConfetti: boolean;
  onDismissConfetti: () => void;
  onPlayAgain: () => void;
  onLeaderboard: () => void;
  onHome: () => void;
}

export function ResultsScreen({
  game,
  showConfetti,
  onDismissConfetti,
  onPlayAgain,
  onLeaderboard,
  onHome,
}: ResultsScreenProps) {
  const pct = game.totalRounds > 0 ? Math.round((game.correct / game.totalRounds) * 100) : 0;
  const avgTime = game.totalRounds > 0 ? (game.totalTime / game.totalRounds).toFixed(1) : '0.0';
  const xpEarned = game.score + game.bestStreak * 50;

  let emoji = '🎧', title = 'Keep Listening!', subtitle = 'Practice makes perfect';
  if (pct >= 90) { emoji = '🏆'; title = 'Legendary!'; subtitle = 'You scored in the top 1% — incredible ear!'; }
  else if (pct >= 70) { emoji = '🎉'; title = 'Amazing!'; subtitle = 'You scored in the top 5%'; }
  else if (pct >= 50) { emoji = '👏'; title = 'Great Job!'; subtitle = "You're above average — keep it up!"; }
  else if (pct >= 30) { emoji = '💪'; title = 'Not Bad!'; subtitle = 'Room for improvement — try again!'; }

  return (
    <div className="flex-1 flex flex-col justify-center px-4 pt-4 pb-20">
      {showConfetti && <Confetti />}

      <div className="bg-zinc-900 dark:bg-zinc-900 light:bg-white border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 rounded-3xl p-8 flex flex-col items-center gap-6 text-center animate-slide-up">
        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-5xl animate-trophy-bounce">{emoji}</span>
          <h2 className="text-2xl font-extrabold text-zinc-100 dark:text-zinc-100 light:text-zinc-800">{title}</h2>
          <p className="text-sm text-zinc-400">{subtitle}</p>
        </div>

        {/* Score hero */}
        <div
          className="flex flex-col items-center py-5 px-10 rounded-2xl border border-violet-500/20"
          style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(6,182,212,0.06))' }}
        >
          <span className="text-5xl font-extrabold font-mono bg-gradient-to-br from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
            {game.score}
          </span>
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">points</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <StatBox value={String(game.correct)} label="Correct" valueClass="text-green-400" />
          <StatBox value={`${avgTime}s`} label="Avg Time" />
          <StatBox value={String(game.bestStreak)} label="Best Streak" />
          <StatBox value={`+${xpEarned}`} label="XP Earned" />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 w-full">
          <button
            onClick={onPlayAgain}
            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
            style={{ background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #06b6d4 100%)', boxShadow: '0 4px 24px rgba(168,85,247,0.35)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            Play Again
          </button>
          <button
            onClick={onLeaderboard}
            className="py-3.5 rounded-2xl font-semibold text-zinc-300 dark:text-zinc-300 light:text-zinc-700 border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 bg-zinc-900/80 dark:bg-zinc-900/80 light:bg-white/80 backdrop-blur-sm cursor-pointer transition-all hover:border-violet-500 active:scale-[0.97]"
          >
            View Leaderboard
          </button>
          <button
            onClick={onHome}
            className="py-2 text-sm text-zinc-500 hover:text-zinc-300 dark:hover:text-zinc-300 light:hover:text-zinc-600 cursor-pointer transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

function StatBox({ value, label, valueClass = 'text-zinc-100 dark:text-zinc-100 light:text-zinc-800' }: { value: string; label: string; valueClass?: string }) {
  return (
    <div className="flex flex-col items-center gap-1 py-3 bg-zinc-800/50 dark:bg-zinc-800/50 light:bg-zinc-100 rounded-xl border border-zinc-800 dark:border-zinc-800 light:border-zinc-200">
      <span className={`text-xl font-bold font-mono ${valueClass}`}>{value}</span>
      <span className="text-[0.65rem] font-semibold text-zinc-500 uppercase tracking-wider">{label}</span>
    </div>
  );
}
