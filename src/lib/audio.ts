/**
 * Tone.js audio wrapper. Uses Tone.Synth for note playback.
 * Must call initAudio() from a user gesture first.
 */
import * as Tone from "tone";
import { type Note, noteFrequency } from "./notes";

let synth: Tone.Synth | null = null;
let initialized = false;

export async function initAudio(): Promise<void> {
  if (initialized) return;
  await Tone.start();
  synth = new Tone.Synth({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.02, decay: 0.3, sustain: 0.4, release: 0.8 },
  }).toDestination();
  synth.volume.value = -6;
  initialized = true;
}

export function playNote(note: Note, duration = "4n"): void {
  if (!synth) return;
  synth.triggerAttackRelease(noteFrequency(note), duration);
}

/** Play a raw frequency in Hz (for pitch-matching games). */
export function playFrequency(freq: number, duration = 1.2): void {
  if (!synth) return;
  synth.triggerAttackRelease(freq, duration);
}

export function getSynth(): Tone.Synth | null {
  return synth;
}

export function isAudioInitialized(): boolean {
  return initialized;
}
