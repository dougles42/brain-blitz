'use client';

import { useState } from 'react';

interface LeaderboardScreenProps {
  onBack: () => void;
}

type Tab = 'global' | 'friends' | 'daily';

export function LeaderboardScreen({ onBack }: LeaderboardScreenProps) {
  const [activeTab, setActiveTab] = useState<Tab>('global');

  const tabs: { key: Tab; label: string }[] = [
    { key: 'global', label: 'Global' },
    { key: 'friends', label: 'Friends' },
    { key: 'daily', label: 'Daily' },
  ];

  return (
    <div className="flex-1 flex flex-col gap-4 pt-2 px-4 pb-20 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-100 dark:hover:text-zinc-100 light:hover:text-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-zinc-100 transition-colors cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h2 className="text-xl font-extrabold text-zinc-100 dark:text-zinc-100 light:text-zinc-800 flex-1">Leaderboard</h2>

        {/* Tabs */}
        <div className="flex bg-zinc-900 dark:bg-zinc-900 light:bg-white border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 rounded-full p-0.5 gap-0.5">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-violet-500 text-white'
                  : 'text-zinc-500 hover:text-zinc-300 dark:hover:text-zinc-300 light:hover:text-zinc-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Your rank */}
      <div
        className="flex items-center gap-3 p-3.5 rounded-2xl border border-zinc-800 dark:border-zinc-800 light:border-zinc-200"
        style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(6,182,212,0.04))' }}
      >
        <div className="flex items-baseline gap-0.5">
          <span className="text-sm text-zinc-500 font-semibold">#</span>
          <span className="text-2xl font-extrabold font-mono text-zinc-100 dark:text-zinc-100 light:text-zinc-800">42</span>
        </div>
        <div className="flex-1 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}>V</div>
          <div>
            <span className="block text-sm font-semibold text-zinc-100 dark:text-zinc-100 light:text-zinc-800">You</span>
            <span className="block text-xs text-zinc-500">12,450 pts</span>
          </div>
        </div>
        <div className="flex items-center gap-0.5 text-green-400 text-sm font-bold font-mono">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
          +3
        </div>
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-3 pt-4 pb-2">
        {/* 2nd place */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-[100px]">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-extrabold border-3 border-slate-400 bg-slate-400/15">L</div>
          <span className="text-xs font-semibold text-zinc-300 dark:text-zinc-300 light:text-zinc-700 truncate max-w-full">LunaBeats</span>
          <span className="text-xs font-mono text-zinc-500">18,920</span>
          <div className="w-full flex items-center justify-center text-white font-bold text-lg rounded-t-lg py-2" style={{ background: 'linear-gradient(135deg, #94a3b8, #cbd5e1)', height: '48px' }}>2</div>
        </div>

        {/* 1st place */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-[100px]">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-extrabold border-3 border-amber-400 bg-amber-400/15">👑</div>
          <span className="text-xs font-semibold text-zinc-100 dark:text-zinc-100 light:text-zinc-800 truncate max-w-full">MelodyKing</span>
          <span className="text-xs font-mono text-amber-400">21,405</span>
          <div className="w-full flex items-center justify-center text-white font-bold text-lg rounded-t-lg py-2" style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', height: '64px' }}>1</div>
        </div>

        {/* 3rd place */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-[100px]">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-extrabold border-3 border-amber-700 bg-amber-700/15">R</div>
          <span className="text-xs font-semibold text-zinc-300 dark:text-zinc-300 light:text-zinc-700 truncate max-w-full">RhythmX</span>
          <span className="text-xs font-mono text-zinc-500">17,150</span>
          <div className="w-full flex items-center justify-center text-white font-bold text-lg rounded-t-lg py-2" style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)', height: '36px' }}>3</div>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-1.5">
        <LeaderboardRow rank={4} avatar="A" name="AudioPhile" level={24} score="15,800" isYou />
        <LeaderboardRow rank={5} avatar="B" name="BassDrop" level={19} score="14,200" />
        <LeaderboardRow rank={6} avatar="T" name="TempoTitan" level={22} score="13,900" />
        <LeaderboardRow rank={7} avatar="E" name="EchoWave" level={18} score="12,100" />
        <LeaderboardRow rank={8} avatar="N" name="NoteCrusher" level={20} score="11,650" />
      </div>
    </div>
  );
}

function LeaderboardRow({ rank, avatar, name, level, score, isYou }: { rank: number; avatar: string; name: string; level: number; score: string; isYou?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 p-3 rounded-xl border transition-colors ${
      isYou
        ? 'border-violet-500 bg-violet-500/5'
        : 'border-zinc-800/50 dark:border-zinc-800/50 light:border-zinc-200 bg-zinc-900/50 dark:bg-zinc-900/50 light:bg-white'
    }`}>
      <span className="text-sm font-bold font-mono text-zinc-500 w-6 text-center">{rank}</span>
      <div className="w-9 h-9 rounded-full bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-100 flex items-center justify-center font-bold text-xs text-zinc-400 flex-shrink-0">{avatar}</div>
      <div className="flex-1 flex flex-col">
        <span className="text-sm font-semibold text-zinc-100 dark:text-zinc-100 light:text-zinc-800">{name}</span>
        <span className="text-xs text-zinc-500">Lv. {level}</span>
      </div>
      <span className="text-sm font-bold font-mono text-zinc-400">{score}</span>
    </div>
  );
}
