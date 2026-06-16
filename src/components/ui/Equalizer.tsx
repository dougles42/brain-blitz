'use client';

export function Equalizer({ playing = false }: { playing?: boolean }) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 h-1 flex items-end gap-px z-40 bg-zinc-900 dark:bg-zinc-900 light:bg-zinc-100 border-t border-zinc-800 dark:border-zinc-800 light:border-zinc-200 px-0.5 transition-opacity duration-500 ${playing ? 'opacity-100' : 'opacity-60'}`}
    >
      {Array.from({ length: 32 }).map((_, i) => (
        <div key={i} className="flex-1 h-full flex items-end">
          <span
            className="block w-full rounded-t-sm animate-eq-bar"
            style={{
              animationDuration: `${playing ? 0.3 + (i % 3) * 0.1 : 0.7 + (i % 5) * 0.1}s`,
              animationDelay: `${i * 0.03}s`,
              backgroundColor: i % 3 === 0 ? '#a855f7' : i % 3 === 1 ? '#6366f1' : '#06b6d4',
            }}
          />
        </div>
      ))}
    </div>
  );
}
