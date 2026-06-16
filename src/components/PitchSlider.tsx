"use client";

import { MIN_FREQ, MAX_FREQ } from "@/lib/game-constants";

interface PitchSliderProps {
  value: number;
  onChange: (freq: number) => void;
  disabled?: boolean;
}

/**
 * Logarithmic frequency slider.
 * Maps a normalized [0, 1] position to a log-scaled frequency so the
 * slider feels linear to the ear (equal physical distances ≈ equal pitch ratios).
 */
export default function PitchSlider({
  value,
  onChange,
  disabled = false,
}: PitchSliderProps) {
  const logMin = Math.log2(MIN_FREQ);
  const logMax = Math.log2(MAX_FREQ);
  const logRange = logMax - logMin;

  // Convert frequency to normalized slider position [0, 1]
  const freqToNorm = (freq: number) =>
    (Math.log2(freq) - logMin) / logRange;
  // Convert normalized position back to frequency
  const normToFreq = (norm: number) =>
    Math.pow(2, logMin + norm * logRange);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const norm = parseFloat(e.target.value) / 100;
    onChange(Math.round(normToFreq(norm) * 10) / 10);
  };

  const noteLabel = freqToNoteName(value);

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
      <div className="text-4xl font-mono font-bold tabular-nums text-foreground">
        {Math.round(value)}{" "}
        <span className="text-lg text-zinc-400 dark:text-zinc-500">Hz</span>
      </div>
      <div className="text-lg font-medium text-zinc-500 dark:text-zinc-400">
        {noteLabel}
      </div>
      <div className="relative w-full h-16 flex items-center">
        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={Math.round(freqToNorm(value) * 1000) / 10}
          onChange={handleChange}
          disabled={disabled}
          className="w-full h-3 rounded-full appearance-none cursor-pointer
            bg-gradient-to-r from-purple-500 via-blue-500 to-red-500
            disabled:opacity-40 disabled:cursor-not-allowed
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-8
            [&::-webkit-slider-thumb]:h-8
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-zinc-800
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            dark:[&::-webkit-slider-thumb]:bg-zinc-200
            dark:[&::-webkit-slider-thumb]:border-zinc-600"
          aria-label="Frequency slider"
        />
      </div>
      <div className="flex justify-between w-full text-xs text-zinc-400 dark:text-zinc-500 font-mono">
        <span>{Math.round(MIN_FREQ)} Hz</span>
        <span>{Math.round(MAX_FREQ)} Hz</span>
      </div>
    </div>
  );
}

/** Convert a frequency to the nearest note name + octave (e.g. "A4 +3¢") */
function freqToNoteName(freq: number): string {
  const NOTE_NAMES = [
    "C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B",
  ];
  // A4 = 440 Hz
  const semitonesFromA4 = 12 * Math.log2(freq / 440);
  const rounded = Math.round(semitonesFromA4);
  const octave = 4 + Math.floor((rounded + 9) / 12);
  const noteIdx = ((rounded + 9) % 12 + 12) % 12;
  const cents = Math.round((semitonesFromA4 - rounded) * 100);
  const centStr = cents === 0 ? "" : cents > 0 ? ` +${cents}¢` : ` ${cents}¢`;
  return `${NOTE_NAMES[noteIdx]}${octave}${centStr}`;
}
