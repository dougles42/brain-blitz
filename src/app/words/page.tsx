import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Racer — Brain Blitz",
  description: "Typing speed battles. Race your friends in real-time.",
};

export default function Page() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center px-4 py-24 text-center">
      <span className="text-5xl mb-4 block">⌨️</span>
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
        Word Racer
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed mb-8">
        Typing speed battles. Race your friends in real-time.
      </p>
      <span className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
        Coming soon
      </span>
    </main>
  );
}
