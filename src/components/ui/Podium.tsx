"use client";

import type { PodiumEntry } from "@/lib/types";

interface PodiumProps {
  entries: PodiumEntry[];
}

export function Podium({ entries }: PodiumProps) {
  const order = [1, 0, 2]; // 2nd, 1st, 3rd visual order
  const colors = [
    { avatar: "gold", stand: "gold", badge: "👑" },
    { avatar: "silver", stand: "silver", badge: "🥈" },
    { avatar: "bronze", stand: "bronze", badge: "🥉" },
  ];

  return (
    <div className="flex items-end justify-center gap-3 pt-4 pb-2">
      {order.map((idx) => {
        const entry = entries[idx];
        if (!entry) return null;
        const c = colors[idx];
        const heights = ["h-16", "h-12", "h-8"];

        return (
          <div key={entry.rank} className="flex flex-col items-center gap-2 flex-1 max-w-[120px]">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-extrabold border-3 ${
                c.avatar === "gold"
                  ? "bg-amber-500/15 border-amber-500 w-16 h-16 text-3xl"
                  : c.avatar === "silver"
                  ? "bg-slate-400/15 border-slate-400"
                  : "bg-amber-700/15 border-amber-700"
              }`}
            >
              {entry.avatar}
            </div>
            <span className="text-xs font-semibold text-center truncate max-w-full text-zinc-100 light:text-zinc-800">
              {entry.name}
            </span>
            <span className="text-[0.65rem] font-mono text-zinc-500 light:text-zinc-400 font-medium">
              {entry.score.toLocaleString()}
            </span>
            <div
              className={`w-full flex items-center justify-center rounded-t-lg font-bold text-base text-white ${
                heights[idx]
              } ${
                c.stand === "gold"
                  ? "gradient-gold"
                  : c.stand === "silver"
                  ? "gradient-silver"
                  : "gradient-bronze"
              }`}
            >
              {entry.rank}
            </div>
          </div>
        );
      })}
    </div>
  );
}
