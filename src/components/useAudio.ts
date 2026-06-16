"use client";

import { useCallback, useRef } from "react";
import { type Note, noteFrequency } from "@/lib/notes";

/**
 * Web Audio API hook for playing musical notes.
 * Uses sine wave with smooth attack/decay envelope.
 */
export function useAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const stopAll = useCallback(() => {
    try {
      oscRef.current?.stop();
    } catch { /* already stopped */ }
    oscRef.current?.disconnect();
    gainRef.current?.disconnect();
    oscRef.current = null;
    gainRef.current = null;
  }, []);

  /**
   * Play a note for a given duration (seconds).
   * Pass `type` to override the oscillator waveform (default: sine).
   */
  const playNote = useCallback(
    (note: Note, duration = 1.5, type: OscillatorType = "sine") => {
      stopAll();
      const ctx = getCtx();
      const freq = noteFrequency(note);

      const gain = ctx.createGain();
      const osc = ctx.createOscillator();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.6, now + 0.02);
      gain.gain.setValueAtTime(0.6, now + duration - 0.3);
      gain.gain.linearRampToValueAtTime(0, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);

      oscRef.current = osc;
      gainRef.current = gain;
    },
    [getCtx, stopAll]
  );

  return { playNote, stopAll };
}
