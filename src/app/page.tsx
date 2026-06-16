import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-4 py-20 text-center overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-violet-500/20 blur-[120px] -top-32 -left-32 animate-[orb-float_20s_ease-in-out_infinite]" />
          <div className="absolute w-[400px] h-[400px] rounded-full bg-indigo-500/15 blur-[100px] -bottom-20 -right-20 animate-[orb-float_20s_-7s_ease-in-out_infinite]" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-cyan-400/10 blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[orb-float_20s_-14s_ease-in-out_infinite]" />
        </div>

        {/* Logo */}
        <div className="mb-8 animate-[logo-float_3s_ease-in-out_infinite]">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-[0_0_60px_rgba(168,85,247,0.3)]">
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" stroke="white" strokeOpacity="0.8" strokeWidth="3" />
              <circle cx="24" cy="24" r="6" fill="white" />
              <circle cx="24" cy="14" r="3" fill="white" fillOpacity="0.7" />
              <circle cx="34" cy="28" r="3" fill="white" fillOpacity="0.5" />
              <circle cx="14" cy="28" r="3" fill="white" fillOpacity="0.5" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
          <span className="bg-gradient-to-br from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">Pitch</span>{' '}
          <span className="text-zinc-900 dark:text-zinc-50">Perfect</span>
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed mb-10">
          Train your musical ear with interactive pitch recognition. Hear a note, find it on the keyboard, sharpen your skills.
        </p>

        {/* Mode cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
          <ModeCard
            href="/solo"
            emoji="🎹"
            title="Solo Practice"
            desc="Play at your own pace. 5 rounds, instant feedback, score tracking."
            color="violet"
          />
          <ModeCard
            href="/daily"
            emoji="📅"
            title="Daily Challenge"
            desc="One note per day. Same note for everyone. One attempt."
            color="indigo"
            featured
          />
          <ModeCard
            href="/multiplayer"
            emoji="⚔️"
            title="Duel Mode"
            desc="Challenge friends. Same notes, compare scores. No account needed."
            color="cyan"
          />
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
        <div className="max-w-2xl mx-auto px-4 py-6 flex justify-center gap-10">
          <StatItem value="12.4k" label="Players Today" />
          <StatItem value="847k" label="Notes Guessed" />
          <StatItem value="99.7%" label="Uptime" />
        </div>
      </section>
    </div>
  );
}

function ModeCard({
  href,
  emoji,
  title,
  desc,
  color,
  featured,
}: {
  href: string;
  emoji: string;
  title: string;
  desc: string;
  color: 'violet' | 'indigo' | 'cyan';
  featured?: boolean;
}) {
  const borderColors = {
    violet: 'border-violet-200 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-600',
    indigo: 'border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 dark:hover:border-indigo-600',
    cyan: 'border-cyan-200 dark:border-cyan-800 hover:border-cyan-400 dark:hover:border-cyan-600',
  };

  const shadowColors = {
    violet: 'hover:shadow-violet-500/10',
    indigo: 'hover:shadow-indigo-500/10',
    cyan: 'hover:shadow-cyan-500/10',
  };

  return (
    <Link
      href={href}
      className={`group relative flex flex-col items-center gap-3 p-6 rounded-2xl bg-white dark:bg-zinc-900 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] ${borderColors[color]} ${shadowColors[color]} ${featured ? 'ring-2 ring-amber-400/50 dark:ring-amber-400/30' : ''}`}
    >
      {featured && (
        <span className="absolute -top-3 px-3 py-0.5 rounded-full text-[0.65rem] font-bold uppercase tracking-wider bg-amber-400 text-amber-900">
          Featured
        </span>
      )}
      <span className="text-3xl group-hover:scale-110 transition-transform">{emoji}</span>
      <div className="text-center">
        <h2 className="font-bold text-zinc-900 dark:text-zinc-50">{title}</h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{desc}</p>
      </div>
    </Link>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-50">{value}</span>
      <span className="text-[0.65rem] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{label}</span>
    </div>
  );
}
