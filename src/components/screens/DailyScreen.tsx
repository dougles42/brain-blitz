'use client';

import { useEffect, useState } from 'react';

interface DailyScreenProps {
  onBack: () => void;
  onPlay: () => void;
}

export function DailyScreen({ onBack, onPlay }: DailyScreenProps) {
  const [countdown, setCountdown] = useState({ hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const diff = tomorrow.getTime() - now.getTime();
      setCountdown({
        hours: String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0'),
        minutes: String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
        seconds: String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0'),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex-1 flex flex-col gap-5 pt-2 px-4 pb-20 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-100 dark:hover:text-zinc-100 light:hover:text-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-zinc-100 transition-colors cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h2 className="text-xl font-extrabold text-zinc-100 dark:text-zinc-100 light:text-zinc-800 flex-1">Daily Challenge</h2>
        <span className="text-xs text-zinc-500 font-medium">{today}</span>
      </div>

      <div className="bg-zinc-900 dark:bg-zinc-900 light:bg-white border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 rounded-3xl p-6 flex flex-col gap-6">
        {/* Countdown */}
        <div className="text-center">
          <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-3">Next challenge in</p>
          <div className="flex items-center justify-center gap-1.5">
            <CountdownUnit value={countdown.hours} label="hrs" />
            <span className="text-2xl font-bold text-zinc-600 pb-4">:</span>
            <CountdownUnit value={countdown.minutes} label="min" />
            <span className="text-2xl font-bold text-zinc-600 pb-4">:</span>
            <CountdownUnit value={countdown.seconds} label="sec" />
          </div>
        </div>

        {/* Theme */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-base font-bold text-zinc-100 dark:text-zinc-100 light:text-zinc-800 mb-1.5">
              Today&apos;s Theme: <span className="bg-gradient-to-br from-violet-400 to-cyan-400 bg-clip-text text-transparent">2010s Throwbacks</span>
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              5 songs from the golden era of pop. One chance — get them all right for a special badge!
            </p>
          </div>

          {/* Rewards */}
          <div className="flex flex-col gap-2">
            <RewardItem emoji="🎖️" text="3/5 — Bronze Badge" />
            <RewardItem emoji="🥈" text="4/5 — Silver Badge" />
            <RewardItem emoji="👑" text="5/5 — Gold Badge + 500 XP" />
          </div>
        </div>

        {/* Play button */}
        <button
          onClick={onPlay}
          className="w-full py-3.5 rounded-2xl font-semibold text-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
          style={{ background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #06b6d4 100%)', boxShadow: '0 4px 24px rgba(168,85,247,0.35)' }}
        >
          Start Today&apos;s Challenge
        </button>

        {/* Streak */}
        <div
          className="flex items-center justify-center gap-2.5 py-3 rounded-xl"
          style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(6,182,212,0.06))' }}
        >
          <span className="text-2xl animate-flame-flicker">🔥</span>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold font-mono text-zinc-100 dark:text-zinc-100 light:text-zinc-800">7</span>
            <span className="text-xs text-zinc-500 font-medium">Day Streak</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-3xl font-extrabold font-mono bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-100 border border-zinc-700 dark:border-zinc-700 light:border-zinc-200 rounded-xl px-3.5 py-2 min-w-[64px] text-center text-zinc-100 dark:text-zinc-100 light:text-zinc-800">
        {value}
      </span>
      <span className="text-[0.6rem] font-bold text-zinc-500 uppercase">{label}</span>
    </div>
  );
}

function RewardItem({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-zinc-400 py-2 px-3 bg-zinc-800/50 dark:bg-zinc-800/50 light:bg-zinc-100 rounded-xl">
      <span className="text-lg">{emoji}</span>
      <span>{text}</span>
    </div>
  );
}
