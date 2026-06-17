"use client";

import { useGameState } from "@/hooks/useGameState";
import PitchSlider from "./PitchSlider";
import ScoreBoard from "./ScoreBoard";
import RoundResultDisplay from "./RoundResult";
import GameSummary from "./GameSummary";

export default function Game() {
  const {
    state, startGame, playTargetNote, replayNote,
    setSliderFreq, submitGuess, nextRound, resetGame,
  } = useGameState();

  const { phase, round, targetFreq, sliderFreq, results, canReplay } = state;

  // Welcome screen
  if (phase === "idle" && targetFreq === null) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 px-4 py-16 w-full max-w-lg mx-auto animate-fade-in">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="gradient-text">Pitch Perfect</span>
          </h1>
          <p className="text-base text-white/35 max-w-sm mx-auto leading-relaxed">
            Hear a note, then recreate it by ear. 5 rounds.
            The closer you get, the higher your score.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 text-xs">
          {[
            ["≤5¢ Perfect", "#f59e0b"],
            ["≤25¢ Great", "#10b981"],
            ["≤50¢ Good", "#3b82f6"],
            ["≤100¢ Okay", "rgba(255,255,255,0.3)"],
          ].map(([label, color]) => (
            <span
              key={label}
              className="px-3 py-1 rounded-full border"
              style={{ borderColor: `${color}30`, color }}
            >
              {label}
            </span>
          ))}
        </div>

        <button
          onClick={startGame}
          className="px-10 py-4 rounded-xl bg-white text-black text-base font-semibold
            hover:bg-white/90 active:scale-[0.97] transition-all"
        >
          Start Game
        </button>
      </div>
    );
  }

  // Game over
  if (phase === "done") {
    return <GameSummary results={results} onPlayAgain={resetGame} />;
  }

  // Round result
  if (phase === "result" && results.length > 0) {
    return (
      <RoundResultDisplay
        result={results[results.length - 1]}
        onNext={nextRound}
        isLastRound={round >= 5}
      />
    );
  }

  // Playing: idle between rounds or guessing
  if ((phase === "idle" || phase === "guessing") && targetFreq !== null) {
    return (
      <div className="flex flex-col items-center gap-8 px-4 py-12 w-full max-w-lg mx-auto animate-fade-in">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/25 mb-2">
            Round {round} of 5
          </div>
        </div>

        {/* Play button */}
        <div className="flex flex-col items-center gap-3">
          {phase === "idle" || !canReplay ? (
            <button onClick={playTargetNote} className="group relative">
              <span className="absolute inset-0 rounded-full bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-300" />
              <span className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white text-black shadow-2xl shadow-white/10 hover:scale-105 active:scale-95 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
          ) : (
            <button onClick={replayNote} className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 hover:border-white/20 text-white/50 hover:text-white/70 text-sm transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.636.848A7.5 7.5 0 0 1 6.843 17.8l-1.903-1.903h3.183a.75.75 0 0 0 0-1.5H3.13a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.12-4.227.75.75 0 0 0-.737-.583Z" clipRule="evenodd" />
              </svg>
              Replay
            </button>
          )}
          <p className="text-sm text-white/25">
            {phase === "idle" ? "Listen carefully..." : "Adjust the slider to match"}
          </p>
        </div>

        <PitchSlider value={sliderFreq} onChange={setSliderFreq} disabled={phase === "idle"} />

        <button
          onClick={submitGuess}
          disabled={phase === "idle"}
          className="px-8 py-3 rounded-xl bg-white text-black font-semibold text-sm
            hover:bg-white/90 active:scale-[0.97] transition-all
            disabled:opacity-20 disabled:cursor-not-allowed"
        >
          Lock In Guess
        </button>

        <ScoreBoard results={results} currentRound={round} />
      </div>
    );
  }

  return null;
}
