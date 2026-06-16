'use client';

interface TimerProps {
  timeLeft: number;
  timePerRound: number;
}

export function Timer({ timeLeft, timePerRound }: TimerProps) {
  const pct = timePerRound > 0 ? timeLeft / timePerRound : 0;
  const circumference = 2 * Math.PI * 24; // r=24
  const offset = circumference * (1 - pct);

  const isWarning = timeLeft <= 5 && timeLeft > 3;
  const isDanger = timeLeft <= 3;

  const strokeColor = isDanger ? '#ef4444' : isWarning ? '#f59e0b' : '#a855f7';
  const textColor = isDanger ? 'text-red-500 animate-pulse' : isWarning ? 'text-amber-500' : 'text-zinc-100 dark:text-zinc-100 light:text-zinc-800';

  return (
    <div className="flex items-center justify-center relative">
      <svg className="transform -rotate-90" width="56" height="56" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-800 dark:text-zinc-800 light:text-zinc-200" />
        <circle
          cx="28"
          cy="28"
          r="24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.3s linear, stroke 0.3s ease' }}
        />
      </svg>
      <span className={`absolute text-lg font-bold font-mono ${textColor}`}>
        {Math.ceil(timeLeft)}
      </span>
    </div>
  );
}
