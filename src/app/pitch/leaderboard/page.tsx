"use client";

import { useState } from "react";
import { Podium } from "@/components/ui/Podium";
import type { PodiumEntry, LeaderboardEntry } from "@/lib/types";
import Link from "next/link";

const PODIUM_DATA: PodiumEntry[] = [
  { rank: 1, name: "MelodyKing", avatar: "👑", score: 21405 },
  { rank: 2, name: "LunaBeats", avatar: "L", score: 18920 },
  { rank: 3, name: "RhythmX", avatar: "R", score: 17150 },
];

const GLOBAL_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "MelodyKing", avatar: "👑", score: 21405, level: 32 },
  { rank: 2, name: "LunaBeats", avatar: "L", score: 18920, level: 28 },
  { rank: 3, name: "RhythmX", avatar: "R", score: 17150, level: 25 },
  { rank: 4, name: "AudioPhile", avatar: "A", score: 15800, level: 24, isYou: true },
  { rank: 5, name: "BassDrop", avatar: "B", score: 14200, level: 19 },
  { rank: 6, name: "TempoTitan", avatar: "T", score: 13900, level: 22 },
  { rank: 7, name: "EchoWave", avatar: "E", score: 12100, level: 18 },
  { rank: 8, name: "NoteCrusher", avatar: "N", score: 11650, level: 20 },
  { rank: 9, name: "ChordMaster", avatar: "C", score: 10300, level: 17 },
  { rank: 10, name: "VibeCheck", avatar: "V", score: 9800, level: 15 },
];

const FRIENDS_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "AudioPhile", avatar: "A", score: 15800, level: 24, isYou: true },
  { rank: 2, name: "BassDrop", avatar: "B", score: 14200, level: 19 },
  { rank: 3, name: "EchoWave", avatar: "E", score: 12100, level: 18 },
];

const DAILY_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "MelodyKing", avatar: "👑", score: 980, level: 32 },
  { rank: 2, name: "TempoTitan", avatar: "T", score: 950, level: 22 },
  { rank: 3, name: "AudioPhile", avatar: "A", score: 920, level: 24, isYou: true },
];

type Tab = "global" | "friends" | "daily";

const TAB_DATA: Record<Tab, LeaderboardEntry[]> = {
  global: GLOBAL_LEADERBOARD,
  friends: FRIENDS_LEADERBOARD,
  daily: DAILY_LEADERBOARD,
};

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("global");
  const entries = TAB_DATA[activeTab];
  const you = entries.find((e) => e.isYou);

  return (
    <div className="flex flex-1 flex-col px-4 py-8 max-w-md mx-auto w-full gap-5 animate-screen-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors p-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
        <h1 className="text-xl font-bold text-zinc-100 light:text-zinc-900 flex-1">Leaderboard</h1>
        {/* Tabs */}
        <div className="flex bg-zinc-900 dark:bg-zinc-900 light:bg-zinc-100 rounded-full border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 p-0.5 gap-0.5">
          {(["global", "friends", "daily"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 capitalize ${
                activeTab === tab
                  ? "bg-violet-500 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Podium (global only) */}
      {activeTab === "global" && <Podium entries={PODIUM_DATA} />}

      {/* Your rank card */}
      {you && (
        <div className="flex items-center gap-3 p-3.5 rounded-xl gradient-brand-soft border border-violet-500/20">
          <div className="flex items-baseline gap-0.5">
            <span className="text-sm text-zinc-500 font-semibold">#</span>
            <span className="text-2xl font-extrabold font-mono text-zinc-100 light:text-zinc-900">
              {you.rank}
            </span>
          </div>
          <div className="flex items-center gap-2.5 flex-1">
            <div className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center font-bold text-sm text-white">
              {you.avatar}
            </div>
            <div>
              <span className="block text-sm font-semibold text-zinc-200 light:text-zinc-800">You</span>
              <span className="block text-xs text-zinc-500">{you.score.toLocaleString()} pts</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-green-500 text-sm font-bold font-mono">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
            +3
          </div>
        </div>
      )}

      {/* Leaderboard list */}
      <div className="flex flex-col gap-1.5">
        {entries.map((entry) => (
          <div
            key={entry.rank}
            className={`flex items-center gap-2.5 p-3 rounded-xl transition-all duration-200 ${
              entry.isYou
                ? "gradient-brand-soft border border-violet-500/20"
                : "bg-zinc-900/50 dark:bg-zinc-900/50 light:bg-zinc-50 border border-zinc-800/50 dark:border-zinc-800/50 light:border-zinc-200/50 hover:border-violet-500/30"
            }`}
          >
            <span className="w-6 text-center text-sm font-bold font-mono text-zinc-500">
              {entry.rank}
            </span>
            <div className="w-9 h-9 rounded-full bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-200 flex items-center justify-center font-bold text-sm text-zinc-300 light:text-zinc-600 flex-shrink-0">
              {entry.avatar}
            </div>
            <div className="flex-1">
              <span className="block text-sm font-semibold text-zinc-200 light:text-zinc-800">
                {entry.name}
              </span>
              <span className="block text-[0.65rem] text-zinc-500">Lv. {entry.level}</span>
            </div>
            <span className="text-sm font-bold font-mono text-zinc-400">
              {entry.score.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
