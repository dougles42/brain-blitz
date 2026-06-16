'use client';

import { useEffect, useRef, useState } from 'react';
import type { GameState, RoundData } from '@/lib/types';
import { NoteVisualizer } from '@/components/ui/NoteVisualizer';
import { Timer } from '@/components/ui/Timer';

interface GameScreenProps {
  game: GameState;
  roundData: RoundData | null;
  playbackProgress: number;
  onAnswer: (index: number) => void;
  onTimeout: () => void;
  onUpdateTimeLeft: (t: number) => void;
  onBack: () => void;
  onNextRound: () => void;
}

export function GameScreen({
  game,
  roundData,
  playbackProgress,
  onAnswer,
  onTimeout,
  onUpdateTimeLeft,
  onBack,
  onNextRound,
}: GameScreenProps) {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const playbackRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [localPlayback, setLocalPlayback] = useState(0);
  const [localTimeLeft, setLocalTimeLeft] = useState(game.timePerRound);

  // Reset local state when round changes
  useEffect(() => {
    setLocalTimeLeft(game.timePerRound);
    setLocalPlayback(0);
  }, [game.round, game.timePerRound]);

  // Timer countdown
  useEffect(() => {
    if (!game.active || game.answered) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (playbackRef.current) clearInterval(playbackRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setLocalTimeLeft((prev) => {
        const next = Math.max(0, prev - 0.1);
        if (next <= 0) {
          clearInterval(timerRef.current!);
          clearInterval(playbackRef.current!);
          setTimeout(() => onTimeout(), 0);
        }
        return next;
      });
    }, 100);

    playbackRef.current = setInterval(() => {
      setLocalPlayback((prev) => Math.min(game.timePerRound, prev + 0.1));
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (playbackRef.current) clearInterval(playbackRef.current);
    };
  }, [game.active, game.answered, game.round, game.timePerRound, onTimeout]);

  if (!roundData) return null;

  const pct = ((game.round - 1) / game.totalRounds) * 100;

  return (
    <div className="flex-1 flex flex-col gap-5 pt-2 px-4 pb-24 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-100 dark:hover:text-zinc-100 light:hover:text-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-zinc-100 transition-colors cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        <div className="flex-1 flex items-center gap-2.5">
          <div className="flex-1 h-1.5 bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${pct}%`,
                background: 'linear-gradient(90deg, #a855f7, #6366f1, #06b6d4)',
              }}
            />
          </div>
          <span className="text-xs font-bold font-mono text-zinc-500 min-w-[36px] text-right">
            {game.round}/{game.totalRounds}
          </span>
        </div>

        <div className="flex flex-col items-center bg-zinc-900 dark:bg-zinc-900 light:bg-white border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 rounded-lg px-3.5 py-1.5 min-w-[60px]">
          <span className="text-lg font-extrabold font-mono text-violet-400 transition-all duration-300">{game.score}</span>
          <span className="text-[0.55rem] font-bold text-zinc-500 uppercase tracking-wider">pts</span>
        </div>
      </div>

      {/* Note Visualizer */}
      <NoteVisualizer
        roundData={roundData}
        gameActive={game.active}
        playbackProgress={localPlayback}
        timePerRound={game.timePerRound}
        answered={game.answered}
      />

      {/* Prompt */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-zinc-100 dark:text-zinc-100 light:text-zinc-800">Which song is playing?</h2>
        <span
          className="text-[0.7rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-xs"
          style={{
            background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(6,182,212,0.1))',
            color: roundData.difficulty === 'Easy' ? '#22c55e' : roundData.difficulty === 'Medium' ? '#f59e0b' : '#ef4444',
          }}
        >
          {roundData.difficulty}
        </span>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-2.5">
        {roundData.options.map((song, i) => {
          const letter = ['A', 'B', 'C', 'D'][i];
          let cardClass = 'flex items-center gap-2.5 p-3.5 bg-zinc-900 dark:bg-zinc-900 light:bg-white border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 rounded-xl cursor-pointer transition-all duration-150 text-left hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-zinc-100 hover:border-violet-500 hover:-translate-y-0.5 active:scale-[0.98]';

          if (game.answered) {
            if (i === roundData.correctIndex) {
              cardClass = 'flex items-center gap-2.5 p-3.5 bg-green-500/10 border border-green-500 rounded-xl text-left animate-correct-pulse';
            } else if (i === roundData.correctIndex) {
              // already handled above
            }
          }

          return (
            <button
              key={i}
              className={cardClass}
              onClick={() => onAnswer(i)}
              disabled={game.answered}
            >
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm flex-shrink-0 transition-colors ${
                  game.answered && i === roundData.correctIndex
                    ? 'bg-green-500 text-white'
                    : 'bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-100 text-zinc-500'
                }`}
              >
                {letter}
              </span>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-semibold text-zinc-100 dark:text-zinc-100 light:text-zinc-800 truncate">{song.title}</span>
                <span className="text-xs text-zinc-500">{song.artist}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Timer */}
      <Timer timeLeft={localTimeLeft} timePerRound={game.timePerRound} />
    </div>
  );
}
