function hashString(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  return hash >>> 0;
}

function mulberry32(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createRng(seed: string): () => number {
  return mulberry32(hashString(seed));
}

/** Generate a random seed string — used by multiplayer to initialize a new challenge. */
export function randomSeed(): string;
/** Create a seeded RNG from the given seed. */
export function randomSeed(seed: string): () => number;
export function randomSeed(seed?: string): string | (() => number) {
  if (seed === undefined) {
    // Generate a random seed string
    return Math.random().toString(36).slice(2, 10);
  }
  return mulberry32(hashString(seed));
}

export function pickFromArray<T>(rng: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

export function getTodayString(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}
