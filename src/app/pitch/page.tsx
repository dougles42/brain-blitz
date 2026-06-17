import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pitch Perfect — Ear Training Game",
  description:
    "Train your musical ear. Hear a note, then recreate it from memory. Solo practice, daily challenges, and multiplayer duels.",
};

export default function PitchPage() {
  return (
    <main className="flex flex-col flex-1 items-center px-4 py-16">
      <div className="text-center mb-12">
        <span className="text-5xl mb-4 block">🎹</span>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
          Pitch Perfect
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
          Hear a note, then recreate it from memory. How good is your musical
          ear?
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        <Link
          href="/pitch/solo"
          className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-white dark:bg-zinc-900 border border-violet-200 dark:border-violet-800 hover:-translate-y-0.5 hover:shadow-lg hover:border-violet-400 dark:hover:border-violet-600 transition-all duration-200"
        >
          <span className="text-3xl">🎵</span>
          <div className="text-center">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
              Solo Practice
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              5 rounds. Instant feedback. No pressure.
            </p>
          </div>
        </Link>

        <Link
          href="/pitch/daily"
          className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-white dark:bg-zinc-900 border border-indigo-200 dark:border-indigo-800 hover:-translate-y-0.5 hover:shadow-lg hover:border-indigo-400 dark:hover:border-indigo-600 transition-all duration-200 ring-2 ring-amber-400/30"
        >
          <span className="absolute -top-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-amber-900">
            Daily
          </span>
          <span className="text-3xl">📅</span>
          <div className="text-center">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
              Daily Challenge
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Same note for everyone. One attempt.
            </p>
          </div>
        </Link>

        <Link
          href="/pitch/multiplayer"
          className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-white dark:bg-zinc-900 border border-cyan-200 dark:border-cyan-800 hover:-translate-y-0.5 hover:shadow-lg hover:border-cyan-400 dark:hover:border-cyan-600 transition-all duration-200"
        >
          <span className="text-3xl">⚔️</span>
          <div className="text-center">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
              Duel Mode
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Challenge friends. Compare scores.
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}
