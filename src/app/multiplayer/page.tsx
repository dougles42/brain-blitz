"use client";

import { useState, useEffect, useCallback } from "react";
import type { Note } from "@/lib/notes";
import { formatNote } from "@/lib/notes";
import { useAudio } from "@/components/useAudio";
import { PianoKeyboard } from "@/components/PianoKeyboard";
import { randomSeed } from "@/lib/seeded-random";
import type { Difficulty, Waveform, ChallengeConfig } from "@/lib/multiplayer";
import {
  DIFFICULTY_LABELS,
  WAVEFORM_LABELS,
  DIFFICULTY_DURATION,
  ROUNDS_PER_CHALLENGE,
  decodeChallenge,
  buildShareUrl,
  generateSequence,
} from "@/lib/multiplayer";

type Phase = "setup" | "countdown" | "playing" | "feedback" | "finished";

// ── Icons ──────────────────────────────────────────────────────────────────

function ShareIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function MultiplayerPage() {
  const { playNote } = useAudio();

  // Challenge config
  const [config, setConfig] = useState<ChallengeConfig>({
    difficulty: "medium",
    waveform: "sine",
    seed: randomSeed(),
  });
  const [fromFriend, setFromFriend] = useState(false);

  // Game state
  const [phase, setPhase] = useState<Phase>("setup");
  const [sequence, setSequence] = useState<Note[]>([]);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [copied, setCopied] = useState(false);

  // Load challenge from URL hash on mount
  useEffect(() => {
    const decoded = decodeChallenge(window.location.hash);
    if (decoded) {
      setConfig(decoded);
      setFromFriend(true);
    }
  }, []);

  // Start challenge
  const startChallenge = useCallback(() => {
    const seq = generateSequence(config, ROUNDS_PER_CHALLENGE);
    setSequence(seq);
    setRound(0);
    setScore(0);
    setLastCorrect(null);
    setPhase("countdown");
    setCountdown(3);
  }, [config]);

  // Countdown timer
  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown <= 0) {
      setPhase("playing");
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 700);
    return () => clearTimeout(t);
  }, [phase, countdown]);

  // Play current note on round start
  useEffect(() => {
    if (phase !== "playing" || sequence.length === 0) return;
    const note = sequence[round];
    const duration = DIFFICULTY_DURATION[config.difficulty];
    const timer = setTimeout(() => {
      playNote(note, duration, config.waveform);
    }, 200);
    return () => clearTimeout(timer);
  }, [phase, round, sequence, config, playNote]);

  // Handle guess
  const handleGuess = useCallback(
    (note: Note) => {
      if (phase !== "playing") return;
      const target = sequence[round];
      const correct = note.name === target.name && note.octave === target.octave;
      if (correct) setScore((s) => s + 1);
      setLastCorrect(correct);
      setPhase("feedback");

      const delay = correct ? 800 : 1600;
      setTimeout(() => {
        if (round + 1 >= sequence.length) {
          setPhase("finished");
        } else {
          setRound((r) => r + 1);
          setLastCorrect(null);
          setPhase("playing");
        }
      }, delay);
    },
    [phase, sequence, round],
  );

  // Replay current note
  const replayNote = useCallback(() => {
    if (phase !== "playing" || sequence.length === 0) return;
    const note = sequence[round];
    playNote(note, DIFFICULTY_DURATION[config.difficulty], config.waveform);
  }, [phase, round, sequence, config, playNote]);

  // Share
  const copyShareUrl = useCallback(
    (includeScore: boolean) => {
      const c: ChallengeConfig = { ...config };
      if (includeScore) c.challengerScore = score;
      const url = buildShareUrl(c);
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    },
    [config, score],
  );

  const resetGame = useCallback(() => {
    setPhase("setup");
    setRound(0);
    setScore(0);
    setLastCorrect(null);
    setFromFriend(false);
    setConfig({
      difficulty: "medium",
      waveform: "sine",
      seed: randomSeed(),
    });
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  // Score helpers
  const scorePercent =
    ROUNDS_PER_CHALLENGE > 0
      ? Math.round((score / ROUNDS_PER_CHALLENGE) * 100)
      : 0;

  const perfEmoji =
    scorePercent === 100 ? "🎉" : scorePercent >= 80 ? "👏" : scorePercent >= 60 ? "👍" : "💪";

  const perfMessage =
    scorePercent === 100
      ? "Perfect pitch!"
      : scorePercent >= 80
        ? "Great ear!"
        : scorePercent >= 60
          ? "Not bad!"
          : "Keep training!";

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <main className="flex flex-1 flex-col items-center px-4 py-6">
      <div className="w-full max-w-2xl flex flex-col items-center gap-6">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            🎵 Multiplayer Duel
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Challenge a friend — same notes, same order, compare scores. No
            backend needed.
          </p>
        </div>

        {/* ── Setup ──────────────────────────────────────────────────────── */}
        {phase === "setup" && (
          <div className="w-full max-w-sm flex flex-col gap-5">
            {/* Friend challenge banner */}
            {fromFriend && config.challengerScore !== undefined && (
              <div className="rounded-xl border-2 border-amber-400 bg-amber-50 p-4 text-center dark:bg-amber-950 dark:border-amber-600">
                <p className="text-lg font-semibold text-amber-800 dark:text-amber-200">
                  ⚡ A friend challenged you!
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Score to beat:{" "}
                  <strong>
                    {config.challengerScore}/{ROUNDS_PER_CHALLENGE}
                  </strong>
                </p>
              </div>
            )}
            {fromFriend && config.challengerScore === undefined && (
              <div className="rounded-xl border-2 border-indigo-400 bg-indigo-50 p-4 text-center dark:bg-indigo-950 dark:border-indigo-600">
                <p className="text-lg font-semibold text-indigo-800 dark:text-indigo-200">
                  🎵 Shared challenge!
                </p>
                <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
                  Play the same sequence and compare your scores.
                </p>
              </div>
            )}

            {/* Difficulty */}
            <fieldset>
              <legend className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Difficulty
              </legend>
              <div className="flex gap-2">
                {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setConfig((c) => ({ ...c, difficulty: d }))}
                    className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                      config.difficulty === d
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-indigo-300"
                    }`}
                  >
                    {DIFFICULTY_LABELS[d]}
                  </button>
                ))}
              </div>
              <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                {config.difficulty === "easy"
                  ? "White keys only, longer playback"
                  : config.difficulty === "medium"
                    ? "All notes, standard playback"
                    : "All notes, short playback"}
              </p>
            </fieldset>

            {/* Instrument */}
            <fieldset>
              <legend className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Instrument
              </legend>
              <div className="grid grid-cols-2 gap-2">
                {(
                  ["sine", "triangle", "square", "sawtooth"] as Waveform[]
                ).map((w) => {
                  const { label, emoji } = WAVEFORM_LABELS[w];
                  return (
                    <button
                      key={w}
                      onClick={() =>
                        setConfig((c) => ({ ...c, waveform: w }))
                      }
                      className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                        config.waveform === w
                          ? "bg-indigo-600 text-white shadow-md"
                          : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-indigo-300"
                      }`}
                    >
                      {emoji} {label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Start */}
            <button
              onClick={startChallenge}
              className="w-full rounded-xl bg-green-600 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-[0.98]"
            >
              {fromFriend ? "Accept Challenge" : "Start Challenge"}
            </button>

            {/* Challenge a friend (pre-game) */}
            <button
              onClick={() => copyShareUrl(false)}
              className="w-full rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-white dark:bg-zinc-800 py-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400 transition-all hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-zinc-700 flex items-center justify-center gap-2"
            >
              <ShareIcon />
              {copied ? "Link copied!" : "Challenge a Friend"}
            </button>
            {copied && (
              <p className="-mt-3 text-center text-xs text-green-600">
                Link copied! Send it — they&apos;ll play the exact same
                challenge.
              </p>
            )}
          </div>
        )}

        {/* ── Countdown ─────────────────────────────────────────────────── */}
        {phase === "countdown" && (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">
              Get ready...
            </p>
            <span className="text-7xl font-bold text-indigo-600 dark:text-indigo-400 animate-pulse">
              {countdown}
            </span>
          </div>
        )}

        {/* ── Playing / Feedback ────────────────────────────────────────── */}
        {(phase === "playing" || phase === "feedback") && (
          <div className="w-full flex flex-col items-center gap-4">
            {/* Progress bar */}
            <div className="w-full max-w-md flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 tabular-nums w-8">
                {round + 1}/{ROUNDS_PER_CHALLENGE}
              </span>
              <div className="flex-1 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((round + (phase === "feedback" ? 1 : 0)) /
                        ROUNDS_PER_CHALLENGE) *
                      100
                    }%`,
                  }}
                />
              </div>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 tabular-nums w-6 text-right">
                {score}
              </span>
            </div>

            {/* Replay button */}
            <button
              onClick={replayNote}
              disabled={phase === "feedback"}
              className="rounded-full w-12 h-12 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-all active:scale-90 disabled:opacity-50 disabled:cursor-default"
              title="Replay note"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="6,4 20,12 6,20" />
              </svg>
            </button>

            {/* Feedback */}
            {phase === "feedback" && (
              <div
                className={`flex items-center gap-2 text-lg font-bold ${
                  lastCorrect
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                {lastCorrect ? (
                  <>✅ Correct!</>
                ) : (
                  <>❌ It was {formatNote(sequence[round])}</>
                )}
              </div>
            )}

            {/* Piano keyboard */}
            <PianoKeyboard
              onNoteClick={handleGuess}
              disabled={phase === "feedback"}
              highlightNote={phase === "playing" ? sequence[round] : null}
            />
          </div>
        )}

        {/* ── Finished ──────────────────────────────────────────────────── */}
        {phase === "finished" && (
          <div className="w-full max-w-sm flex flex-col items-center gap-5">
            {/* Score card */}
            <div className="w-full rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-6 text-center shadow-sm">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Your Score
              </p>
              <p className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mt-1 tabular-nums">
                {score}
                <span className="text-2xl text-zinc-400 dark:text-zinc-500">
                  /{ROUNDS_PER_CHALLENGE}
                </span>
              </p>
              <p className="mt-2 text-lg">
                {perfEmoji} {perfMessage}
              </p>

              {/* Challenger comparison */}
              {config.challengerScore !== undefined && (
                <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-700">
                  {score > config.challengerScore ? (
                    <p className="text-green-600 dark:text-green-400 font-semibold">
                      🏆 You beat the challenger&apos;s score of{" "}
                      {config.challengerScore}!
                    </p>
                  ) : score === config.challengerScore ? (
                    <p className="text-amber-600 dark:text-amber-400 font-semibold">
                      🤝 Tie! Both scored {config.challengerScore}
                    </p>
                  ) : (
                    <p className="text-zinc-500 dark:text-zinc-400">
                      Challenger scored {config.challengerScore} — try again!
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Challenge a friend (with score) */}
            <button
              onClick={() => copyShareUrl(true)}
              className="w-full rounded-xl bg-indigo-600 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <ShareIcon />
              {copied
                ? "Link copied!"
                : "Challenge a Friend (with your score)"}
            </button>
            {copied && (
              <p className="-mt-3 text-center text-xs text-green-600">
                Link copied! Send it to a friend to compare scores.
              </p>
            )}

            {/* Play again */}
            <button
              onClick={resetGame}
              className="w-full rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-all hover:border-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
