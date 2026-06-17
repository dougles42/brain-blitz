import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Brain Blitz — Free Browser Games",
  description:
    "A collection of free browser games that test your brain. Pitch recognition, typography knowledge, geography, and more. No signup, no downloads.",
};

const games = [
  {
    slug: "pitch",
    name: "Pitch Perfect",
    emoji: "🎹",
    description: "Hear a note. Recreate it from memory. How good is your musical ear?",
    color: "violet",
    available: true,
  },
  {
    slug: "font",
    name: "Font or Foe",
    emoji: "🔤",
    description: "See a letterform. Name the font. Are you a typography nerd?",
    color: "amber",
    available: false,
  },
  {
    slug: "map",
    name: "Map Blur",
    emoji: "🗺️",
    description: "A blurred country outline sharpens. Guess the country before time runs out.",
    color: "emerald",
    available: false,
  },
  {
    slug: "words",
    name: "Word Racer",
    emoji: "⌨️",
    description: "Type faster than your friends. Real-time typing battles.",
    color: "blue",
    available: false,
  },
  {
    slug: "logo",
    name: "Logo Legends",
    emoji: "🏷️",
    description: "Partial brand logos. Can you name them all?",
    color: "rose",
    available: false,
  },
  {
    slug: "chord",
    name: "Chord Crush",
    emoji: "🎸",
    description: "Hear a chord. Pick the right one. Test your harmonic ear.",
    color: "orange",
    available: false,
  },
];

const colorMap: Record<string, string> = {
  violet: "border-violet-200 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-600",
  amber: "border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600",
  emerald: "border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600",
  blue: "border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600",
  rose: "border-rose-200 dark:border-rose-800 hover:border-rose-400 dark:hover:border-rose-600",
  orange: "border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600",
};

export default function HomePage() {
  return (
    <main className="flex flex-col flex-1">
      {/* Hero */}
      <section className="relative flex flex-col items-center px-6 py-24 sm:py-32 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          Brain Blitz
        </h1>
        <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed">
          Free browser games that test your brain. No signup, no downloads.
          Just play.
        </p>
      </section>

      {/* Games grid */}
      <section className="max-w-4xl mx-auto px-4 pb-24 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <GameCard key={game.slug} game={game} borderClass={colorMap[game.color]} />
          ))}
        </div>
      </section>
    </main>
  );
}

function GameCard({
  game,
  borderClass,
}: {
  game: (typeof games)[0];
  borderClass: string;
}) {
  const CardWrapper = game.available ? Link : "div";

  return (
    <CardWrapper
      href={game.available ? `/${game.slug}` : "#"}
      className={`group relative flex flex-col gap-3 p-5 rounded-xl bg-white dark:bg-zinc-900 border transition-all duration-200 ${
        game.available
          ? `${borderClass} cursor-pointer hover:-translate-y-0.5 hover:shadow-lg`
          : "border-zinc-100 dark:border-zinc-800 opacity-50 cursor-default"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{game.emoji}</span>
        <div>
          <h2 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">
            {game.name}
          </h2>
          {!game.available && (
            <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
              Coming soon
            </span>
          )}
        </div>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
        {game.description}
      </p>
    </CardWrapper>
  );
}
