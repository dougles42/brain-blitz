export interface Song {
  id?: string;
  title: string;
  artist: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  genre?: string;
  year?: number;
}

export type Round = RoundData;

export interface RoundData {
  correct: Song;
  options: Song[];
  correctIndex: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface GameState {
  round: number;
  totalRounds: number;
  score: number;
  correct: number;
  streak: number;
  bestStreak: number;
  totalTime: number;
  timeLeft: number;
  timePerRound: number;
  active: boolean;
  answered: boolean;
  rounds?: RoundData[];
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  level: number;
  isYou?: boolean;
}

export interface PodiumEntry {
  rank: 1 | 2 | 3;
  name: string;
  avatar: string;
  score: number;
}

export type Screen = 'landing' | 'game' | 'results' | 'daily' | 'leaderboard';

export type Theme = 'dark' | 'light';
