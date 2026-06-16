/** The 12 chromatic notes. */
export const NOTE_NAMES = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
] as const;

export type NoteName = (typeof NOTE_NAMES)[number];

export const OCTAVES = [3, 4, 5] as const;
export type Octave = (typeof OCTAVES)[number];

export interface Note {
  name: NoteName;
  octave: Octave;
}

export const ALL_NOTES: Note[] = OCTAVES.flatMap((octave) =>
  NOTE_NAMES.map((name) => ({ name, octave }))
);

const A4_FREQ = 440;

const SEMITONE_OFFSETS: Record<NoteName, number> = {
  C: -9, "C#": -8, D: -7, "D#": -6, E: -5, F: -4,
  "F#": -3, G: -2, "G#": -1, A: 0, "A#": 1, B: 2,
};

export function noteFrequency(note: Note): number {
  return A4_FREQ * Math.pow(2, ((note.octave - 4) * 12 + SEMITONE_OFFSETS[note.name]) / 12);
}

export function formatNote(note: Note): string {
  return `${note.name}${note.octave}`;
}

export function samePitchClass(a: Note, b: Note): boolean {
  return a.name === b.name;
}

export function sameNote(a: Note, b: Note): boolean {
  return a.name === b.name && a.octave === b.octave;
}

export function isBlackKey(noteName: NoteName): boolean {
  return noteName.includes("#");
}
