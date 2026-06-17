"use client";

import { useCallback, useEffect, useState } from "react";
import { getDailyNote, getDailySeed } from "@/lib/daily-challenge";
import {
  hasAttemptedToday, saveAttempt, getTodayAttempt,
  getScores, getStreak, getWinRate, getTotalGames,
  type ChallengeAttempt,
} from "@/lib/storage";
import { type Note, formatNote, sameNote } from "@/lib/notes";
import { initAudio, playNote, isAudioInitialized } from "@/lib/audio";
import { PianoKeyboard } from "@/components/PianoKeyboard";
import { CountdownTimer } from "@/components/CountdownTimer";
import { ShareCard } from "@/components/ShareCard";

type GameState = "loading" | "ready" | "guessed" | "already_played";

export default function DailyPage() {
  const [gameState, setGameState] = useState<GameState>("loading");
  const [dailyNote, setDailyNote] = useState<Note | null>(null);
  const [dateString, setDateString] = useState("");
  const [prevAttempt, setPrevAttempt] = useState<ChallengeAttempt | null>(null);
  const [guessedNote, setGuessedNote] = useState<Note | null>(null);
  const [showingResult, setShowingResult] = useState(false);
  const [audioReady, setAudioReady] = useState(false);

  useEffect(() => {
    setAudioReady(isAudioInitialized());
    const date = getDailySeed();
    setDateString(date);
    const note = getDailyNote(date);
    setDailyNote(note);
    if (hasAttemptedToday(date)) {
      setPrevAttempt(getTodayAttempt(date));
      setGameState("already_played");
    } else {
      setGameState("ready");
    }
  }, []);

  const handleInitAudio = useCallback(async () => {
    await initAudio();
    setAudioReady(true);
  }, []);

  const handlePlayNote = useCallback(() => {
    if (dailyNote) playNote(dailyNote);
  }, [dailyNote]);

  const handleGuess = useCallback((note: Note) => {
    if (gameState !== "ready" || !dailyNote || showingResult) return;
    setGuessedNote(note);
    setShowingResult(true);
    setGameState("guessed");

    const correct = dailyNote.name === note.name;
    const exactMatch = sameNote(dailyNote, note);
    const date = getDailySeed();
    saveAttempt({ date, targetNote: formatNote(dailyNote), guessedNote: formatNote(note), correct, exactMatch, timestamp: Date.now() });

    setTimeout(() => {
      setShowingResult(false);
      setPrevAttempt(getTodayAttempt(date));
      setGameState("already_played");
    }, 2500);
  }, [gameState, dailyNote, showingResult]);

  const handleRefresh = useCallback(() => window.location.reload(), []);

  if (gameState === "loading") {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        <p className="text-sm text-zinc-500 mt-3">Loading today&apos;s challenge...</p>
      </div>
    );
  }

  // --- Ready ---
  if (gameState === "ready" && dailyNote) {
    return (
      <div className="flex flex-col flex-1 items-center w-full max-w-3xl mx-auto px-4 py-6 sm:py-12">
        <div className="text-center mb-6">
          <p className="text-xs font-medium text-indigo-600 uppercase tracking-widest">Daily Challenge</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">{dateString}</h1>
        </div>
        <div className="mb-6"><CountdownTimer onExpire={handleRefresh} /></div>
        <div className="text-center mb-6">
          {!audioReady ? (
            <button onClick={handleInitAudio} className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25">
              Start Challenge
            </button>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <button onClick={handlePlayNote} className="group flex items-center gap-3 px-8 py-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all active:scale-95">
                <svg className="w-8 h-8 text-indigo-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5.14v14l11-7-11-7z"/></svg>
                <span className="text-sm font-medium text-zinc-500">Play the note</span>
              </button>
              <p className="text-xs text-zinc-400">Listen carefully, then pick the note on the keyboard.</p>
            </div>
          )}
        </div>
        {showingResult && guessedNote && (
          <div className={`w-full max-w-sm text-center px-6 py-4 rounded-xl border mb-6 ${dailyNote.name === guessedNote.name ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800" : "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800"}`}>
            <p className="text-3xl mb-1">{dailyNote.name === guessedNote.name ? (sameNote(dailyNote, guessedNote) ? "🎯 Perfect!" : "✅ Correct!") : "❌ Miss!"}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              {dailyNote.name === guessedNote.name
                ? sameNote(dailyNote, guessedNote) ? `Exact match: ${formatNote(dailyNote)}` : `Right note! It was ${formatNote(dailyNote)}, you guessed ${formatNote(guessedNote)}`
                : `The note was ${formatNote(dailyNote)}, you guessed ${formatNote(guessedNote)}`}
            </p>
          </div>
        )}
        {audioReady && (
          <div className="w-full">
            <p className="text-sm font-medium text-center text-zinc-600 dark:text-zinc-300 mb-4">What note is this?</p>
            <PianoKeyboard onNoteClick={handleGuess} highlightNote={guessedNote} disabled={showingResult} />
          </div>
        )}
      </div>
    );
  }

  // --- Already played ---
  if (gameState === "already_played" && prevAttempt) {
    return (
      <div className="flex flex-col flex-1 items-center w-full max-w-3xl mx-auto px-4 py-6 sm:py-12">
        <div className="text-center mb-6">
          <p className="text-xs font-medium text-indigo-600 uppercase tracking-widest">Daily Challenge</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">{dateString}</h1>
        </div>
        <div className="mb-8"><CountdownTimer onExpire={handleRefresh} /></div>
        <button onClick={handlePlayNote} className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all active:scale-95 mb-6">
          <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5.14v14l11-7-11-7z"/></svg>
          <span className="text-sm font-medium text-zinc-500">Replay today&apos;s note</span>
        </button>
        <div className={`w-full max-w-sm text-center px-8 py-6 rounded-2xl border mb-8 ${prevAttempt.correct ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800" : "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800"}`}>
          <p className="text-4xl mb-2">{prevAttempt.correct ? (prevAttempt.exactMatch ? "🎯" : "✅") : "❌"}</p>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{prevAttempt.correct ? (prevAttempt.exactMatch ? "Perfect pitch!" : "Correct note!") : "Not quite!"}</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2">The note was <span className="font-bold text-zinc-900 dark:text-zinc-50">{prevAttempt.targetNote}</span>, you guessed <span className="font-bold text-zinc-900 dark:text-zinc-50">{prevAttempt.guessedNote}</span></p>
        </div>
        <div className="w-full mb-8">
          <PianoKeyboard onNoteClick={() => {}} disabled />
        </div>
        <div className="flex gap-8 text-center mb-8">
          <div><p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{getStreak()}</p><p className="text-xs text-zinc-500">Streak</p></div>
          <div><p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{getWinRate()}</p><p className="text-xs text-zinc-500">Win Rate</p></div>
          <div><p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{getTotalGames()}</p><p className="text-xs text-zinc-500">Played</p></div>
        </div>
        <div className="w-full max-w-sm mb-10">
          <p className="text-xs font-medium text-zinc-500 text-center mb-3 uppercase tracking-wide">Share Your Score</p>
          <ShareCard date={dateString} correct={prevAttempt.correct} exactMatch={prevAttempt.exactMatch} targetNote={prevAttempt.targetNote} guessedNote={prevAttempt.guessedNote} streak={getStreak()} totalGames={getTotalGames()} winRate={getWinRate()} />
        </div>
        <ScoreHistory />
      </div>
    );
  }
  return null;
}

function ScoreHistory() {
  const scores = getScores();
  if (!scores.length) return null;
  return (
    <div className="w-full max-w-sm">
      <h2 className="text-xs font-medium text-zinc-500 text-center mb-3 uppercase tracking-wide">Recent Results</h2>
      <div className="flex flex-col gap-1">
        {scores.slice(0, 7).map((s) => (
          <div key={s.date} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
            <span className="text-sm text-zinc-600 dark:text-zinc-300">{s.date}</span>
            <span className="text-sm font-medium">{s.correct ? (s.exactMatch ? "🎯" : "✅") : "❌"} <span className="text-zinc-500">{s.guessedNote} / {s.targetNote}</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}
