/**
 * Synth wrapper — re-exports from audio.ts.
 * Exists so useGameState.ts can import initAudio and playNote
 * (where playNote accepts a raw frequency, not a Note object).
 */
export { initAudio, isAudioInitialized } from "./audio";
import { playFrequency } from "./audio";

export function playNote(freq: number, duration: number): void {
  playFrequency(freq, duration);
}
