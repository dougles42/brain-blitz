import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Brain Blitz",
  description:
    "Free browser games that test your brain. Pitch recognition, typography, geography, and more. No signup, no downloads.",
};

const games = [
  { slug: "pitch", name: "Pitch Perfect", desc: "Hear a note. Recreate it from memory.", emoji: "🎹", color: "#7c3aed", available: true },
  { slug: "font", name: "Font or Foe", desc: "See a letterform. Name the font.", emoji: "🔤", color: "#f59e0b", available: false },
  { slug: "map", name: "Map Blur", desc: "A blurred country. Guess before it sharpens.", emoji: "🗺️", color: "#10b981", available: false },
  { slug: "words", name: "Word Racer", desc: "Type faster than your friends.", emoji: "⌨️", color: "#3b82f6", available: false },
  { slug: "logo", name: "Logo Legends", desc: "Partial logos. Can you name them?", emoji: "🏷️", color: "#f43f5e", available: false },
  { slug: "chord", name: "Chord Crush", desc: "Hear a chord. Pick the right one.", emoji: "🎸", color: "#f97316", available: false },
];

export default function HomePage() {
  return (
    <main className="relative flex-1 overflow-hidden">
      {/* Ambient blobs */}
      <div
        className="blob w-[600px] h-[600px] -top-40 -left-40"
        style={{ background: "rgba(124,58,237,0.12)" }}
      />
      <div
        className="blob w-[500px] h-[500px] top-1/2 -right-40"
        style={{ background: "rgba(59,130,246,0.08)" }}
      />
      <div
        className="blob w-[400px] h-[400px] -bottom-40 left-1/3"
        style={{ background: "rgba(6,182,212,0.06)" }}
      />

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">
            1 game live · 5 coming soon
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 animate-fade-in-up">
          <span className="gradient-text">Brain Blitz</span>
        </h1>
        <p className="text-base sm:text-lg text-white/40 max-w-md animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Free browser games that test your brain.
          <br />
          No signup. No downloads. Just play.
        </p>
      </section>

      {/* Games grid */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 stagger">
          {games.map((game) => (
            <GameCard key={game.slug} {...game} />
          ))}
        </div>
      </section>
    </main>
  );
}

function GameCard({
  slug, name, desc, emoji, color, available,
}: (typeof games)[0]) {
  const Card = available ? Link : "div";

  return (
    <Card
      href={available ? `/${slug}` : "#"}
      className={`glass-card group relative flex items-start gap-4 p-5 ${
        available ? "cursor-pointer" : "cursor-default opacity-40"
      }`}
    >
      {/* Accent glow on hover */}
      {available && (
        <div
          className="absolute inset-0 rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${color}15, transparent 70%)`,
          }}
        />
      )}

      <span className="relative z-10 text-2xl flex-shrink-0 mt-0.5">{emoji}</span>
      <div className="relative z-10 min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-sm text-white/90">{name}</h2>
          {!available && (
            <span className="text-[10px] font-medium uppercase tracking-wider text-white/25">
              Soon
            </span>
          )}
        </div>
        <p className="text-xs text-white/35 mt-1 leading-relaxed">{desc}</p>
      </div>

      {available && (
        <span className="relative z-10 ml-auto text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all duration-200 text-sm flex-shrink-0 mt-0.5">
          →
        </span>
      )}
    </Card>
  );
}
