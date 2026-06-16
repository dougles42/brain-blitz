import type { Song } from './types';

export const SONG_DB: Song[] = [
  { title: 'Blinding Lights', artist: 'The Weeknd', difficulty: 'Easy' },
  { title: 'Shape of You', artist: 'Ed Sheeran', difficulty: 'Easy' },
  { title: 'Bohemian Rhapsody', artist: 'Queen', difficulty: 'Hard' },
  { title: 'Billie Jean', artist: 'Michael Jackson', difficulty: 'Medium' },
  { title: 'Rolling in the Deep', artist: 'Adele', difficulty: 'Medium' },
  { title: 'Smells Like Teen Spirit', artist: 'Nirvana', difficulty: 'Hard' },
  { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', difficulty: 'Easy' },
  { title: 'Stairway to Heaven', artist: 'Led Zeppelin', difficulty: 'Hard' },
  { title: 'Dance Monkey', artist: 'Tones and I', difficulty: 'Easy' },
  { title: 'Hotel California', artist: 'Eagles', difficulty: 'Medium' },
  { title: 'Bad Guy', artist: 'Billie Eilish', difficulty: 'Medium' },
  { title: "Sweet Child O' Mine", artist: "Guns N' Roses", difficulty: 'Hard' },
  { title: 'Watermelon Sugar', artist: 'Harry Styles', difficulty: 'Easy' },
  { title: 'Lose Yourself', artist: 'Eminem', difficulty: 'Medium' },
  { title: 'Purple Rain', artist: 'Prince', difficulty: 'Hard' },
  { title: 'Levitating', artist: 'Dua Lipa', difficulty: 'Easy' },
  { title: 'Thunderstruck', artist: 'AC/DC', difficulty: 'Hard' },
  { title: 'Shallow', artist: 'Lady Gaga & Bradley Cooper', difficulty: 'Medium' },
  { title: 'Happy', artist: 'Pharrell Williams', difficulty: 'Easy' },
  { title: 'Dreams', artist: 'Fleetwood Mac', difficulty: 'Medium' },
  { title: 'Circles', artist: 'Post Malone', difficulty: 'Easy' },
  { title: 'Humble', artist: 'Kendrick Lamar', difficulty: 'Medium' },
  { title: 'Clocks', artist: 'Coldplay', difficulty: 'Medium' },
  { title: 'Toxic', artist: 'Britney Spears', difficulty: 'Easy' },
];

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateRound(): import('./types').RoundData {
  const correct = SONG_DB[Math.floor(Math.random() * SONG_DB.length)];
  const others = shuffleArray(SONG_DB.filter((s) => s.title !== correct.title)).slice(0, 3);
  const options = shuffleArray([correct, ...others]);

  return {
    correct,
    options,
    correctIndex: options.findIndex((o) => o.title === correct.title),
    difficulty: correct.difficulty,
  };
}
