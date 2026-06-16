import { createRng, getTodayString, pickFromArray } from "./seeded-random";
import { type Note, ALL_NOTES } from "./notes";

export function getDailyNote(dateString?: string): Note {
  const seed = dateString ?? getTodayString();
  return pickFromArray(createRng(seed), ALL_NOTES);
}

export function getDailySeed(): string {
  return getTodayString();
}

export function getMsUntilNextChallenge(): number {
  const now = new Date();
  const tomorrow = new Date(Date.UTC(
    now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1
  ));
  return tomorrow.getTime() - now.getTime();
}
