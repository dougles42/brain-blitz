'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { RoundData } from '@/lib/types';

interface NoteVisualizerProps {
  roundData: RoundData | null;
  gameActive: boolean;
  playbackProgress: number;
  timePerRound: number;
  answered: boolean;
}

export function NoteVisualizer({ roundData, gameActive, playbackProgress, timePerRound, answered }: NoteVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = 80 * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = '80px';

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    const difficultyMult = roundData?.difficulty === 'Hard' ? 1.5 : roundData?.difficulty === 'Medium' ? 1.0 : 0.6;

    const time = performance.now() * 0.001;
    const barCount = 48;
    const barWidth = (w * 0.8) / barCount;
    const gap = 2 * dpr;
    const startX = w * 0.1;

    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < barCount; i++) {
      const freq1 = Math.sin(i * 0.3 + time * 2) * 0.5;
      const freq2 = Math.cos(i * 0.15 + time * 1.3) * 0.3;
      const freq3 = Math.sin(i * 0.08 + time * 0.7) * 0.5;
      const bassBoost = Math.sin(i * 0.05 + time * 0.5) * 0.4;

      let amplitude = Math.abs((freq1 + freq2 + freq3 + bassBoost) * difficultyMult);
      amplitude = Math.max(0.08, Math.min(1, amplitude));
      amplitude += Math.sin(i * 7 + time * 15) * 0.08;
      amplitude = Math.max(0.05, Math.min(1, amplitude));

      const barHeight = amplitude * (h * 0.8);
      const x = startX + i * (barWidth + gap);
      const y = cy - barHeight / 2;

      const pos = i / barCount;
      const r = Math.floor(168 - pos * 100);
      const g = Math.floor(85 - pos * 30);
      const b = Math.floor(247 - pos * 200);

      const gradient = ctx.createLinearGradient(x, cy + barHeight / 2, x, cy - barHeight / 2);
      gradient.addColorStop(0, `rgba(${r},${g},${b},0.85)`);
      gradient.addColorStop(0.5, `rgba(${Math.floor(r * 0.6)},${Math.floor(g + 30)},${Math.floor(b * 1.2)},0.92)`);
      gradient.addColorStop(1, 'rgba(6,182,212,0.85)');
      ctx.fillStyle = gradient;

      const radius = Math.min(barWidth / 2, 3 * dpr);
      ctx.beginPath();
      ctx.moveTo(x, cy + barHeight / 2);
      ctx.lineTo(x, cy - barHeight / 2 + radius);
      ctx.quadraticCurveTo(x, cy - barHeight / 2, x + radius, cy - barHeight / 2);
      ctx.lineTo(x + barWidth - radius, cy - barHeight / 2);
      ctx.quadraticCurveTo(x + barWidth, cy - barHeight / 2, x + barWidth, cy - barHeight / 2 + radius);
      ctx.lineTo(x + barWidth, cy + barHeight / 2);
      ctx.closePath();
      ctx.fill();

      if (amplitude > 0.5) {
        ctx.shadowColor = `rgba(168,85,247,${amplitude * 0.5})`;
        ctx.shadowBlur = 8 * dpr;
        ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }
    }

    // Center glow
    const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.15);
    centerGlow.addColorStop(0, 'rgba(168,85,247,0.1)');
    centerGlow.addColorStop(1, 'rgba(168,85,247,0)');
    ctx.fillStyle = centerGlow;
    ctx.fillRect(0, 0, w, h);

    animRef.current = requestAnimationFrame(draw);
  }, [roundData]);

  useEffect(() => {
    if (gameActive) {
      animRef.current = requestAnimationFrame(draw);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [gameActive, draw]);

  const pct = timePerRound > 0 ? (playbackProgress / timePerRound) * 100 : 0;

  return (
    <div className="relative bg-zinc-900 dark:bg-zinc-900 light:bg-white border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 rounded-2xl p-5 overflow-hidden">
      {/* Pulse ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-15 h-15 rounded-full bg-radial from-violet-500/20 to-transparent opacity-0 pointer-events-none animate-pulse-ring" />

      {/* Canvas */}
      <div className="w-full h-20 relative">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Playback track */}
      <div className="w-full mt-4 flex flex-col gap-1.5">
        <div className="w-full h-1 bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-200 rounded-full relative overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-100 linear"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #a855f7, #6366f1, #06b6d4)',
            }}
          />
        </div>
        <span className="text-[0.65rem] font-mono text-zinc-500 dark:text-zinc-500 light:text-zinc-400 text-right tabular-nums">
          {`0:${String(Math.min(Math.floor(playbackProgress), Math.ceil(timePerRound))).padStart(2, '0')}`} / 0:{String(Math.ceil(timePerRound)).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
