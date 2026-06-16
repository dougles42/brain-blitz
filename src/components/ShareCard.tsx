"use client";

import { useCallback } from "react";

interface Props {
  date: string;
  correct: boolean;
  exactMatch: boolean;
  targetNote: string;
  guessedNote: string;
  streak: number;
  totalGames: number;
  winRate: string;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r); ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r); ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r); ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r); ctx.closePath();
}

export function ShareCard(props: Props) {
  const generateImage = useCallback(async (): Promise<Blob | null> => {
    const canvas = document.createElement("canvas");
    canvas.width = 600; canvas.height = 340;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const g = ctx.createLinearGradient(0, 0, 600, 340);
    g.addColorStop(0, "#1a1a2e"); g.addColorStop(0.5, "#16213e"); g.addColorStop(1, "#0f3460");
    ctx.fillStyle = g; ctx.fillRect(0, 0, 600, 340);

    ctx.fillStyle = "rgba(255,255,255,0.05)"; ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 1;
    roundRect(ctx, 32, 16, 536, 308, 16); ctx.fill(); ctx.stroke();

    ctx.fillStyle = "#888"; ctx.font = "14px -apple-system, 'Segoe UI', sans-serif"; ctx.textAlign = "center";
    ctx.fillText(props.date, 300, 60);

    ctx.fillStyle = "#fff"; ctx.font = "bold 28px -apple-system, 'Segoe UI', sans-serif";
    ctx.fillText("Daily Pitch Challenge", 300, 100);

    const emoji = props.correct ? (props.exactMatch ? "🎯" : "✅") : "❌";
    ctx.font = "48px -apple-system, 'Segoe UI', sans-serif"; ctx.fillText(emoji, 300, 155);

    ctx.fillStyle = "#aaa"; ctx.font = "16px -apple-system, 'Segoe UI', sans-serif";
    ctx.fillText(`Target: ${props.targetNote}  →  Guess: ${props.guessedNote}`, 300, 185);

    ctx.fillStyle = "#fff"; ctx.font = "bold 18px -apple-system, 'Segoe UI', sans-serif";
    ctx.fillText(props.correct ? (props.exactMatch ? "Perfect pitch!" : "Correct note!") : "Not quite", 300, 215);

    ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.beginPath(); ctx.moveTo(80, 240); ctx.lineTo(520, 240); ctx.stroke();

    const stats = [
      { v: String(props.streak), l: "Streak" },
      { v: props.winRate, l: "Win Rate" },
      { v: String(props.totalGames), l: "Played" },
    ];
    stats.forEach((s, i) => {
      ctx.fillStyle = "#fff"; ctx.font = "bold 22px -apple-system, 'Segoe UI', sans-serif";
      ctx.fillText(s.v, 190 + i * 110, 270);
      ctx.fillStyle = "#888"; ctx.font = "11px -apple-system, 'Segoe UI', sans-serif";
      ctx.fillText(s.l, 190 + i * 110, 290);
    });

    ctx.fillStyle = "#555"; ctx.font = "12px -apple-system, 'Segoe UI', sans-serif";
    ctx.fillText("playpit.app", 300, 325);

    return new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/png"));
  }, [props]);

  const handleCopy = useCallback(async () => {
    const text = `🎵 Daily Pitch Challenge — ${props.date}\n${props.correct ? (props.exactMatch ? "🎯 Perfect pitch!" : "✅ Correct!") : "❌ Miss!"}\nTarget: ${props.targetNote} | Guess: ${props.guessedNote}\nStreak: ${props.streak} | Win Rate: ${props.winRate} | Played: ${props.totalGames}\n\nPlay at playpit.app`;
    try { await navigator.clipboard.writeText(text); alert("Copied!"); } catch { prompt("Copy:", text); }
  }, [props]);

  const handleDownload = useCallback(async () => {
    const blob = await generateImage();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `pit-challenge-${props.date}.png`; a.click();
    URL.revokeObjectURL(url);
  }, [generateImage, props.date]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="5" width="9" height="9" rx="1.5"/><path d="M11 5V3.5a1 1 0 0 0-1-1H3.5a1 1 0 0 0-1 1V10a1 1 0 0 0 1 1H5"/></svg>
        Copy Text
      </button>
      <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2v8M5 7l3 3 3-3"/><path d="M2 12v1.5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V12"/></svg>
        Save Image
      </button>
      {typeof navigator !== "undefined" && "share" in navigator && (
        <button onClick={async () => {
          const blob = await generateImage();
          if (!blob) return handleDownload();
          const file = new File([blob], `pit-${props.date}.png`, { type: "image/png" });
          if (navigator.canShare?.({ files: [file] })) {
            try { await navigator.share({ title: "Daily Pitch Challenge", text: `My result for ${props.date}!`, files: [file] }); return; } catch {}
          }
          handleDownload();
        }} className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-500 transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="3.5" cy="8" r="1.5"/><circle cx="12.5" cy="3" r="1.5"/><circle cx="12.5" cy="13" r="1.5"/><path d="M5 7.5l6-3M5 8.5l6 3"/></svg>
          Share
        </button>
      )}
    </div>
  );
}
