'use client';

import { useState, useCallback } from 'react';
import type { GameState, RoundData } from '@/lib/types';
import { generateRound } from '@/lib/song-db';
import { initAudio, playCorrectSound, playWrongSound, playTickSound } from '@/lib/tone-player';

const INITIAL_GAME_STATE: GameState = {
  round: 0,
  totalRounds: 10,
  score: 0,
  correct: 0,
  streak: 0,
  bestStreak: 0,
  totalTime: 0,
  timeLeft: 15,
  timePerRound: 15,
  active: false,
  answered: false,
};

export function useGame() {
  const [game, setGame] = useState<GameState>(INITIAL_GAME_STATE);
  const [roundData, setRoundData] = useState<RoundData | null>(null);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [showScorePopup, setShowScorePopup] = useState<{ points: number; isPenalty: boolean } | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const startGame = useCallback((totalRounds = 10) => {
    initAudio();
    setGame({
      ...INITIAL_GAME_STATE,
      totalRounds,
      active: true,
    });
    setRoundData(generateRound());
    setPlaybackProgress(0);
    setShowConfetti(false);
  }, []);

  const nextRound = useCallback(() => {
    setGame((prev) => {
      const nextRound = prev.round + 1;
      if (nextRound > prev.totalRounds) {
        // Game complete
        if (prev.correct / prev.totalRounds >= 0.5) {
          setShowConfetti(true);
        }
        return { ...prev, active: false, answered: false };
      }
      return {
        ...prev,
        round: nextRound,
        answered: false,
        timeLeft: prev.timePerRound,
      };
    });
    setRoundData(generateRound());
    setPlaybackProgress(0);
  }, []);

  const handleAnswer = useCallback(
    (index: number): { correct: boolean; points: number } => {
      if (!roundData || game.answered || !game.active) {
        return { correct: false, points: 0 };
      }

      const timeTaken = game.timePerRound - game.timeLeft;
      const isCorrect = index === roundData.correctIndex;

      let points = 0;

      setGame((prev) => {
        if (isCorrect) {
          const newStreak = prev.streak + 1;
          const timeBonus = Math.floor((prev.timePerRound - timeTaken) * 10);
          const streakBonus = Math.min(newStreak - 1, 5) * 20;
          points = 100 + timeBonus + streakBonus;

          return {
            ...prev,
            answered: true,
            correct: prev.correct + 1,
            streak: newStreak,
            bestStreak: Math.max(prev.bestStreak, newStreak),
            totalTime: prev.totalTime + timeTaken,
            score: prev.score + points,
          };
        } else {
          points = -25;
          return {
            ...prev,
            answered: true,
            streak: 0,
            totalTime: prev.totalTime + timeTaken,
            score: Math.max(0, prev.score + points),
          };
        }
      });

      // Trigger score popup
      setShowScorePopup({ points, isPenalty: !isCorrect });

      // Play sound
      if (isCorrect) {
        playCorrectSound();
      } else {
        playWrongSound();
      }

      return { correct: isCorrect, points };
    },
    [roundData, game.answered, game.active, game.timePerRound, game.timeLeft]
  );

  const handleTimeout = useCallback(() => {
    setGame((prev) => ({
      ...prev,
      answered: true,
      streak: 0,
      totalTime: prev.totalTime + prev.timePerRound,
    }));
    setShowScorePopup({ points: 0, isPenalty: true });
  }, []);

  const updateTimeLeft = useCallback((newTime: number) => {
    setGame((prev) => ({ ...prev, timeLeft: newTime }));
  }, []);

  const dismissScorePopup = useCallback(() => setShowScorePopup(null), []);
  const dismissConfetti = useCallback(() => setShowConfetti(false), []);

  return {
    game,
    roundData,
    playbackProgress,
    setPlaybackProgress,
    showScorePopup,
    dismissScorePopup,
    showConfetti,
    dismissConfetti,
    startGame,
    nextRound,
    handleAnswer,
    handleTimeout,
    updateTimeLeft,
  };
}
