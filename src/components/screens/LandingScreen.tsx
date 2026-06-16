'use client';

interface LandingScreenProps {
  onNavigate: (screen: string) => void;
}

function AnimatedStat({ target, label }: { target: number; label: string }) {
  // Simple static display for now; animation can be added client-side
  const formatted = target >= 1000 ? (target / 1000).toFixed(1) + 'k' : target.toFixed(1);
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xl font-bold font-mono text-zinc-100 dark:text-zinc-100 light:text-zinc-800">{formatted}</span>
      <span className="text-[0.65rem] font-semibold text-zinc-500 dark:text-zinc-500 light:text-zinc-400 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export function LandingScreen({ onNavigate }: LandingScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-10 px-6 pt-10 pb-20 text-center animate-fade-in">
      {/* Logo */}
      <div className="flex flex-col items-center gap-4">
        <div className="animate-logo-bounce">
          <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="url(#lg)" strokeWidth="3" />
            <circle cx="24" cy="24" r="6" fill="url(#lg)" />
            <circle cx="24" cy="14" r="3" fill="url(#lg)" opacity="0.7" />
            <circle cx="34" cy="28" r="3" fill="url(#lg)" opacity="0.5" />
            <circle cx="14" cy="28" r="3" fill="url(#lg)" opacity="0.5" />
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="48" y2="48">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight leading-none">
          <span className="bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">Note</span>
          <span className="text-zinc-100 dark:text-zinc-100 light:text-zinc-800">Rush</span>
        </h1>
        <p className="text-base text-zinc-400 dark:text-zinc-400 light:text-zinc-500 max-w-72 leading-relaxed">
          How sharp is your musical ear? Guess the song, race the clock.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 w-full max-w-80">
        <button
          onClick={() => onNavigate('game')}
          className="group relative flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-semibold text-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
          style={{ background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #06b6d4 100%)', boxShadow: '0 4px 24px rgba(168,85,247,0.35)' }}
        >
          Play Now
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
        </button>

        <button
          onClick={() => onNavigate('daily')}
          className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-semibold text-zinc-300 dark:text-zinc-300 light:text-zinc-700 border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 bg-zinc-900/80 dark:bg-zinc-900/80 light:bg-white/80 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:border-violet-500 hover:text-zinc-100 dark:hover:text-zinc-100 light:hover:text-zinc-900 active:scale-[0.97]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Daily Challenge
        </button>

        <button
          onClick={() => onNavigate('leaderboard')}
          className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-semibold text-zinc-300 dark:text-zinc-300 light:text-zinc-700 border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 bg-zinc-900/80 dark:bg-zinc-900/80 light:bg-white/80 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:border-violet-500 hover:text-zinc-100 dark:hover:text-zinc-100 light:hover:text-zinc-900 active:scale-[0.97]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 6 9 6 9z"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 18 9 18 9z"/><path d="M4 22h16"/><path d="M10 22V8h4v14"/><rect x="6" y="12" width="4" height="10"/><rect x="14" y="8" width="4" height="14"/></svg>
          Leaderboard
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-8">
        <AnimatedStat target={12483} label="Players Today" />
        <AnimatedStat target={847291} label="Songs Guessed" />
        <AnimatedStat target={99.7} label="Uptime" />
      </div>
    </div>
  );
}
