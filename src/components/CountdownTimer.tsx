"use client";

import { useEffect, useState } from "react";
import { getMsUntilNextChallenge } from "@/lib/daily-challenge";

interface Props {
  onExpire?: () => void;
}

export function CountdownTimer({ onExpire }: Props) {
  const [ms, setMs] = useState<number | null>(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => { setMs(getMsUntilNextChallenge()); }, []);

  useEffect(() => {
    if (ms === null) return;
    if (ms <= 0) { setExpired(true); onExpire?.(); return; }
    const t = setInterval(() => {
      setMs((prev) => {
        if (prev === null || prev <= 1000) { setExpired(true); onExpire?.(); return 0; }
        return prev - 1000;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [onExpire]);

  if (expired) {
    return (
      <div className="text-center">
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">New challenge available!</p>
        <p className="text-xs text-zinc-500 mt-1">Refresh to play today&apos;s challenge.</p>
      </div>
    );
  }

  if (ms === null) {
    return <div className="text-center"><div className="h-5 w-40 mx-auto bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" /></div>;
  }

  const h = String(Math.floor(ms / 3600000)).padStart(2, "0");
  const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
  const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");

  return (
    <div className="text-center">
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Next challenge in</p>
      <div className="flex items-center justify-center gap-1 mt-1 font-mono text-2xl font-bold tabular-nums text-zinc-800 dark:text-zinc-100">
        <span className="bg-zinc-100 dark:bg-zinc-800 rounded-md px-2 py-0.5">{h}</span>
        <span className="text-zinc-400">:</span>
        <span className="bg-zinc-100 dark:bg-zinc-800 rounded-md px-2 py-0.5">{m}</span>
        <span className="text-zinc-400">:</span>
        <span className="bg-zinc-100 dark:bg-zinc-800 rounded-md px-2 py-0.5">{s}</span>
      </div>
    </div>
  );
}
