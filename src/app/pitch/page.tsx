import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pitch Perfect",
  description:
    "Train your musical ear. Hear a note, then recreate it from memory. Solo practice, daily challenges, and multiplayer duels.",
};

export default function PitchPage() {
  return (
    <main className="relative flex-1 overflow-hidden flex flex-col items-center justify-center px-4 py-16">
      {/* Ambient blobs */}
      <div className="blob w-[500px] h-[500px] -top-20 -left-20" style={{ background: "rgba(124,58,237,0.1)" }} />
      <div className="blob w-[400px] h-[400px] -bottom-20 -right-20" style={{ background: "rgba(59,130,246,0.06)" }} />

      <div className="relative z-10 text-center mb-12 animate-fade-in-up">
        <span className="text-6xl mb-5 block">🎹</span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          <span className="gradient-text">Pitch Perfect</span>
        </h1>
        <p className="text-white/40 max-w-sm mx-auto leading-relaxed">
          Hear a note, then recreate it from memory.
          <br />
          How good is your musical ear?
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl stagger">
        <Link
          href="/pitch/solo"
          className="glass-card flex flex-col items-center gap-3 p-6 text-center group cursor-pointer"
        >
          <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🎵</span>
          <div>
            <h2 className="font-semibold text-sm text-white/90">Solo Practice</h2>
            <p className="text-xs text-white/35 mt-1">5 rounds. Instant feedback.</p>
          </div>
        </Link>

        <Link
          href="/pitch/daily"
          className="glass-card flex flex-col items-center gap-3 p-6 text-center group cursor-pointer relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400/0 via-amber-400 to-amber-400/0" />
          <span className="text-3xl group-hover:scale-110 transition-transform duration-300">📅</span>
          <div>
            <h2 className="font-semibold text-sm text-white/90">Daily Challenge</h2>
            <p className="text-xs text-white/35 mt-1">Same note. One attempt.</p>
          </div>
          <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-amber-950">
            Daily
          </span>
        </Link>

        <Link
          href="/pitch/multiplayer"
          className="glass-card flex flex-col items-center gap-3 p-6 text-center group cursor-pointer"
        >
          <span className="text-3xl group-hover:scale-110 transition-transform duration-300">⚔️</span>
          <div>
            <h2 className="font-semibold text-sm text-white/90">Duel Mode</h2>
            <p className="text-xs text-white/35 mt-1">Challenge friends.</p>
          </div>
        </Link>
      </div>
    </main>
  );
}
