'use client';

interface ScorePopupProps {
  points: number;
  isPenalty: boolean;
  onDismiss: () => void;
}

export function ScorePopup({ points, isPenalty, onDismiss }: ScorePopupProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      onAnimationEnd={onDismiss}
    >
      <span
        className={`text-4xl font-extrabold font-mono animate-score-popup ${
          isPenalty || points < 0
            ? 'text-red-500 [text-shadow:0_0_30px_rgba(239,68,68,0.5)]'
            : 'text-green-500 [text-shadow:0_0_30px_rgba(34,197,94,0.5)]'
        }`}
      >
        {points >= 0 ? `+${points}` : `${points}`}
      </span>
    </div>
  );
}
