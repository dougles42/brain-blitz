"use client";

import { useGameState } from "@/hooks/useGameState";
import PitchSlider from "./PitchSlider";
import ScoreBoard from "./ScoreBoard";
import RoundResultDisplay from "./RoundResult";
import GameSummary from "./GameSummary";

export default function Game() {
  const {
    state,
    startGame,
    playTargetNote,
    replayNote,
    setSliderFreq,
    submitGuess,
    nextRound,
    resetGame,
  } = useGameState();

  const { phase, round, targetFreq, sliderFreq, results, canReplay } = state;

  // ── Idle: Welcome / start screen ──────────────────────────────────
  if (phase === "idle" && round === 1 && results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 px-4 py-12 w-full max-w-lg mx-auto animate-in fade-in duration-300">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">
            Pitch Perfect
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
            Hear a note, then recreate it by ear. 5 rounds.
            The closer you get, the higher your score.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 text-sm text-zinc-400 dark:text-zinc-500">
          <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
            ≤5¢ Perfect
          </span>
          <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
            ≤25¢ Great
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
            ≤50¢ Good
          </span>
          <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            ≤100¢ Okay
          </span>
        </div>

        <button
          onClick={startGame}
          className="px-10 py-4 rounded-2xl bg-foreground text-background text-lg font-semibold
            hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-zinc-300 dark:shadow-zinc-900"
        >
          Start Game
        </button>
      </div>
    );
  }

  // ── Done: Game over summary ───────────────────────────────────────
  if (phase === "done") {
    return <GameSummary results={results} onPlayAgain={resetGame} />;
  }

  // ── Result: Show round feedback ───────────────────────────────────
  if (phase === "result" && results.length > 0) {
    const lastResult = results[results.length - 1];
    return (
      <RoundResultDisplay
        result={lastResult}
        onNext={nextRound}
        isLastRound={round >= 5}
      />
    );
  }

  // ── Idle between rounds (after START_GAME but before NOTE_PLAYED) ─
  // and Guessing: Player adjusts slider
  if (
    (phase === "idle" || phase === "guessing") &&
    targetFreq !== null
  ) {
    return (
      <div className="flex flex-col items-center gap-6 px-4 py-8 w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Round {round} of 5
          </div>
        </div>

        {/* Play / replay button */}
        <div className="flex flex-col items-center gap-3">
          {phase === "idle" || !canReplay ? (
            <button
              onClick={playTargetNote}
              className="relative group"
            >
              <span className="absolute inset-0 rounded-full bg-foreground/10 scale-0 group-hover:scale-100 transition-transform" />
              <span
                className="relative flex items-center justify-center w-20 h-20 rounded-full
                  bg-foreground text-background shadow-lg
                  hover:scale-105 active:scale-95 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
          ) : (
            <button
              onClick={replayNote}
              className="flex items-center gap-2 px-6 py-3 rounded-xl
                bg-zinc-100 dark:bg-zinc-800 text-foreground font-medium
                hover:bg-zinc-200 dark:hover:bg-zinc-700
                active:scale-95 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.636.848A7.5 7.5 0 0 1 6.843 17.8l-1.903-1.903h3.183a.75.75 0 0 0 0-1.5H3.13a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.12-4.227.75.75 0 0 0-.737-.583Z"
                  clipRule="evenodd"
                />
              </svg>
              Replay Note
            </button>
          )}
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            {phase === "idle"
              ? "Listen carefully..."
              : "Adjust the slider to match what you heard"}
          </p>
        </div>

        {/* Pitch slider */}
        <PitchSlider
          value={sliderFreq}
          onChange={setSliderFreq}
          disabled={phase === "idle"}
        />

        {/* Submit guess */}
        <button
          onClick={submitGuess}
          disabled={phase === "idle"}
          className="px-8 py-3 rounded-2xl bg-foreground text-background font-semibold
            hover:opacity-90 active:scale-95 transition-all
            disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Lock In Guess
        </button>

        {/* Scoreboard sidebar on wider screens */}
        <ScoreBoard results={results} currentRound={round} />
      </div>
    );
  }

  // Fallback (shouldn't reach here)
  return null;
}
