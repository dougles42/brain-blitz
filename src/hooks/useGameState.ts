import { useCallback, useReducer } from "react";
import {
  MIN_FREQ,
  MAX_FREQ,
  TOTAL_ROUNDS,
  NOTE_DURATION,
} from "@/lib/game-constants";
import { initAudio, playFrequency } from "@/lib/audio";
import { scoreGuess, type ScoreResult } from "@/lib/scoring";

function randomFreq(): number {
  // Generate a random frequency within range
  return MIN_FREQ + Math.random() * (MAX_FREQ - MIN_FREQ);
}

/** Round-precise score (e.g. 262 Hz → 261.63 Hz → C4 plus ~2.5 cents → slightly sharp) */
type CentsDirection = "flat" | "sharp" | "exact";

export interface RoundResult {
  round: number;
  targetFreq: number;
  guessedFreq: number;
  score: ScoreResult;
  direction: CentsDirection;
}

type Phase = "idle" | "playing" | "guessing" | "result" | "done";

export interface GameState {
  phase: Phase;
  round: number;
  targetFreq: number | null;
  sliderFreq: number;
  results: RoundResult[];
  canReplay: boolean;
}

type Action =
  | { type: "START_GAME" }
  | { type: "NOTE_PLAYED" }
  | { type: "REPLAY_NOTE" }
  | { type: "SET_SLIDER"; freq: number }
  | { type: "SUBMIT_GUESS" }
  | { type: "NEXT_ROUND" }
  | { type: "RESET" };

function getDirection(target: number, guess: number): CentsDirection {
  if (Math.abs(target - guess) < 0.01) return "exact";
  return guess < target ? "flat" : "sharp";
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "START_GAME": {
      const targetFreq = randomFreq();
      return {
        ...state,
        phase: "idle",
        round: 1,
        targetFreq,
        results: [],
        canReplay: false,
        sliderFreq: Math.round(440), // default slider at A4
      };
    }

    case "NOTE_PLAYED":
      return { ...state, phase: "guessing", canReplay: true };

    case "REPLAY_NOTE":
      return { ...state, canReplay: true }; // no state change, just used as signal

    case "SET_SLIDER":
      return { ...state, sliderFreq: action.freq };

    case "SUBMIT_GUESS": {
      if (state.targetFreq === null) return state;
      const result: RoundResult = {
        round: state.round,
        targetFreq: state.targetFreq,
        guessedFreq: state.sliderFreq,
        score: scoreGuess(state.targetFreq, state.sliderFreq),
        direction: getDirection(state.targetFreq, state.sliderFreq),
      };
      return {
        ...state,
        phase: "result",
        results: [...state.results, result],
      };
    }

    case "NEXT_ROUND": {
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: "done" };
      }
      const nextRound = state.round + 1;
      return {
        ...state,
        phase: "idle",
        round: nextRound,
        targetFreq: randomFreq(),
        sliderFreq: Math.round(440),
        canReplay: false,
      };
    }

    case "RESET":
      return { ...initialState, phase: "idle" };

    default:
      return state;
  }
}

const initialState: GameState = {
  phase: "idle",
  round: 1,
  targetFreq: null,
  sliderFreq: 440,
  results: [],
  canReplay: false,
};

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startGame = useCallback(async () => {
    await initAudio();
    dispatch({ type: "START_GAME" });
  }, []);

  const playTargetNote = useCallback(() => {
    if (state.targetFreq === null) return;
    playFrequency(state.targetFreq, NOTE_DURATION);
    dispatch({ type: "NOTE_PLAYED" });
  }, [state.targetFreq]);

  const replayNote = useCallback(() => {
    if (state.targetFreq === null) return;
    playFrequency(state.targetFreq, NOTE_DURATION);
    dispatch({ type: "REPLAY_NOTE" });
  }, [state.targetFreq]);

  const setSliderFreq = useCallback((freq: number) => {
    dispatch({ type: "SET_SLIDER", freq });
  }, []);

  const submitGuess = useCallback(() => {
    dispatch({ type: "SUBMIT_GUESS" });
  }, []);

  const nextRound = useCallback(() => {
    dispatch({ type: "NEXT_ROUND" });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return {
    state,
    startGame,
    playTargetNote,
    replayNote,
    setSliderFreq,
    submitGuess,
    nextRound,
    resetGame,
  };
}
