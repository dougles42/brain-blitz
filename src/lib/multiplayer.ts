/**
 * Multiplayer URL-state sharing.
 *
 * Encodes challenge parameters into URL hash fragments so a friend can
 * play the exact same challenge — same notes, same instrument, same difficulty.
 * No backend needed.
 *
 * Hash format:
 *   #d=easy&w=sine&s=abc123&sc=4
 *
 *   d  = difficulty (easy | medium | hard)
 *   w  = waveform / instrument sound
 *   s  = seed string for deterministic note sequence
 *   sc = challenger score (optional, appended after round finishes)
 */

import { createRng, pickFromArray } from "./seeded-random";
import { type Note, ALL_NOTES, isBlackKey } from "./notes";

/** White-key-only notes (no sharps). */
const WHITE_NOTES: Note[] = ALL_NOTES.filter((n) => !isBlackKey(n.name));

// ── Types ──────────────────────────────────────────────────────────────────

export type Difficulty = "easy" | "medium" | "hard";
export type Waveform = "sine" | "triangle" | "square" | "sawtooth";

export interface ChallengeConfig {
  difficulty: Difficulty;
  waveform: Waveform;
  seed: string;
  challengerScore?: number;
}

// ── Constants ──────────────────────────────────────────────────────────────

export const ROUNDS_PER_CHALLENGE = 5;

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export const WAVEFORM_LABELS: Record<Waveform, { label: string; emoji: string }> = {
  sine: { label: "Piano", emoji: "🎹" },
  triangle: { label: "Guitar", emoji: "🎸" },
  square: { label: "Organ", emoji: "🎛️" },
  sawtooth: { label: "Synth", emoji: "🎧" },
};

/** Note pool per difficulty. */
const DIFFICULTY_POOL: Record<Difficulty, Note[]> = {
  easy: WHITE_NOTES, // white keys, 2 octaves = 14 notes
  medium: ALL_NOTES, // all notes, 2 octaves = 24 notes
  hard: ALL_NOTES, // same pool but harder because shorter playback
};

/** Note playback duration per difficulty (seconds). */
export const DIFFICULTY_DURATION: Record<Difficulty, number> = {
  easy: 2.0,
  medium: 1.5,
  hard: 0.8,
};

// ── URL hash encoding / decoding ───────────────────────────────────────────

export function encodeChallenge(config: ChallengeConfig): string {
  const params = new URLSearchParams();
  params.set("d", config.difficulty);
  params.set("w", config.waveform);
  params.set("s", config.seed);
  if (config.challengerScore !== undefined) {
    params.set("sc", String(config.challengerScore));
  }
  return `#${params.toString()}`;
}

export function decodeChallenge(hash: string): ChallengeConfig | null {
  if (!hash || !hash.startsWith("#")) return null;
  const raw = hash.slice(1);
  const params = new URLSearchParams(raw);

  const d = params.get("d");
  const w = params.get("w");
  const s = params.get("s");

  if (!d || !w || !s) return null;
  if (!["easy", "medium", "hard"].includes(d)) return null;
  if (!["sine", "triangle", "square", "sawtooth"].includes(w)) return null;

  const sc = params.get("sc");
  return {
    difficulty: d as Difficulty,
    waveform: w as Waveform,
    seed: s,
    challengerScore: sc ? parseInt(sc, 10) : undefined,
  };
}

export function buildShareUrl(config: ChallengeConfig): string {
  return `${window.location.origin}${window.location.pathname}${encodeChallenge(config)}`;
}

// ── Challenge sequence generation ──────────────────────────────────────────

/**
 * Generate a deterministic note sequence from the config.
 * Same seed + difficulty → same sequence every time.
 * Prevents the same note appearing twice in a row.
 */
export function generateSequence(
  config: ChallengeConfig,
  count: number = ROUNDS_PER_CHALLENGE,
): Note[] {
  const pool = DIFFICULTY_POOL[config.difficulty];
  const rng = createRng(config.seed);
  const seq: Note[] = [];
  for (let i = 0; i < count; i++) {
    let note: Note;
    do {
      note = pickFromArray(rng, pool);
    } while (
      seq.length > 0 &&
      note.name === seq[seq.length - 1].name &&
      note.octave === seq[seq.length - 1].octave
    );
    seq.push(note);
  }
  return seq;
}
