import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Map Blur",
  description: "Geography guessing. Guess the country from a blurred outline.",
};

export default function Page() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center px-4 py-24 text-center">
      <span className="text-6xl mb-5 block">🗺️</span>
      <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
        Map Blur
      </h1>
      <p className="text-white/35 max-w-sm leading-relaxed mb-8">
        Geography guessing. Guess the country from a blurred outline.
      </p>
      <span className="px-4 py-2 rounded-full border border-white/10 text-xs font-medium text-white/25 uppercase tracking-wider">
        Coming soon
      </span>
    </main>
  );
}
