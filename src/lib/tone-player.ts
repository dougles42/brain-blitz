import * as Tone from 'tone';

let synth: Tone.Synth | null = null;
let isInitialized = false;

export async function initAudio(): Promise<void> {
  if (isInitialized) return;
  await Tone.start();
  synth = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: {
      attack: 0.02,
      decay: 0.1,
      sustain: 0.3,
      release: 1,
    },
  }).toDestination();
  synth.volume.value = -10;
  isInitialized = true;
}

const NOTES = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'];
const CHORD_PROGRESSIONS = [
  ['C4', 'E4', 'G4', 'C5'],
  ['A3', 'C4', 'E4', 'A4'],
  ['F3', 'A3', 'C4', 'F4'],
  ['G3', 'B3', 'D4', 'G4'],
  ['D4', 'F4', 'A4', 'D5'],
  ['E4', 'G4', 'B4', 'E5'],
];

export function playNote(): void {
  if (!synth) return;
  const note = NOTES[Math.floor(Math.random() * NOTES.length)];
  synth.triggerAttackRelease(note, '8n');
}

export function playChord(): void {
  if (!synth) return;
  const chord = CHORD_PROGRESSIONS[Math.floor(Math.random() * CHORD_PROGRESSIONS.length)];
  const now = Tone.now();
  chord.forEach((note, i) => {
    synth?.triggerAttackRelease(note, '4n', now + i * 0.05);
  });
}

export function playCorrectSound(): void {
  if (!synth) return;
  const now = Tone.now();
  ['C5', 'E5', 'G5', 'C6'].forEach((note, i) => {
    synth?.triggerAttackRelease(note, '8n', now + i * 0.1);
  });
}

export function playWrongSound(): void {
  if (!synth) return;
  const now = Tone.now();
  synth.triggerAttackRelease('C3', '8n', now);
  synth.triggerAttackRelease('B2', '8n', now + 0.1);
}

export function playTickSound(): void {
  if (!synth) return;
  synth.triggerAttackRelease('C6', '32n', undefined, 0.2);
}
