# Pitch Perfect — Train Your Ear, Crush the Leaderboard

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?logo=next.js&style=flat-square)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&style=flat-square)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-^5-3178C6?logo=typescript&style=flat-square)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&style=flat-square)](https://tailwindcss.com)
[![Tone.js](https://img.shields.io/badge/Tone.js-^15.1.22-ff69b4?style=flat-square)](https://tonejs.github.io/)
[![Vercel](https://img.shields.io/badge/Vercel-ready-black?logo=vercel&style=flat-square)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## Overview

**Pitch Perfect** is a browser-based ear training game built with Next.js 16 and Tone.js. Sharpen your musical ear by identifying intervals, recognizing chords, and matching pitches — then compete for the top spot on the leaderboard. Whether you're a beginner learning to distinguish a Major 3rd from a Minor 3rd or a seasoned musician polishing relative pitch, Pitch Perfect makes ear training fun and addictive.

Built with modern web technologies: Server Components for fast initial loads, Tailwind CSS 4 for a sleek dark-mode UI, and Tone.js for real-time audio synthesis — no downloads, no plugins, just your browser.

---

## Features

- **Interval Training** — Identify intervals from Minor 2nd through Octave across 20 progressive levels
- **Chord Recognition** — Hear triads and seventh chords; identify quality (Major, minor, diminished, augmented, dominant 7th, Major 7th, minor 7th)
- **Pitch Matching** — Listen to a target note and match it by selecting from nearby pitches
- **Daily Challenges** — A fixed 20-question challenge shared by all players each day; bonus XP for accuracy
- **Leaderboards** — Global and friends leaderboards updated in real time
- **15 Achievements** — Unlockable badges for milestones, streaks, and special feats
- **Streak System** — Consecutive correct answers build your streak multiplier (capped at 10x)
- **20-Level Progression** — Each level introduces new intervals/chords with increasing difficulty
- **Dark Mode** — Immersive game-themed dark UI with high-contrast accents
- **Responsive Design** — Play on desktop, tablet, or phone
- **Keyboard Shortcuts** — Number keys for answers, Space to replay, Escape to pause
- **Accessible** — ARIA labels, focus management, and screen-reader-friendly controls

---

## Screenshots

> Coming soon. Once the game UI is built, screenshots of the home screen, game modes, in-game play, and leaderboard will be added here.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.2.9 | App Router framework (Server Components, routing, API routes) |
| [React](https://react.dev) | 19.2.4 | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | ^5 | Type safety and developer experience |
| [Tailwind CSS](https://tailwindcss.com) | ^4 | Utility-first CSS with `@theme inline` tokens |
| [Tone.js](https://tonejs.github.io/) | ^15.1.22 | Web Audio API synthesis for game sounds |
| [PostCSS](https://postcss.org/) | (via @tailwindcss/postcss) | CSS processing pipeline |

---

## Project Structure

```
pitch-perfect/
├── src/
│   ├── app/              # App Router (routes, layouts, pages)
│   │   ├── layout.tsx     # Root layout with Geist fonts
│   │   ├── page.tsx       # Landing page
│   │   ├── globals.css    # Tailwind CSS 4 + theme tokens
│   │   ├── game/          # Game mode routes
│   │   ├── leaderboard/   # Leaderboard route
│   │   ├── profile/       # User profile route
│   │   └── api/           # API route handlers
│   ├── components/        # Shared UI components
│   ├── lib/               # Core logic (audio, game engine, scoring)
│   ├── hooks/             # Shared React hooks
│   ├── stores/            # Zustand client state stores
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
└── tests/                 # Test suites
```

---

## Setup Instructions

### Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** (comes with Node.js)

### Getting Started

```bash
# Clone the repository
git clone https://github.com/your-org/pitch-perfect.git
cd pitch-perfect

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

### Lint & Type Check

```bash
npm run lint
npx tsc --noEmit   # TypeScript type checking
```

---

## Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Yes | Base URL of the app (e.g., `http://localhost:3000`) |
| `DATABASE_URL` | Yes | Supabase Postgres connection string |
| `AUTH_SECRET` | Yes | Auth.js encryption secret |
| `AUTH_GITHUB_ID` | No | GitHub OAuth client ID |
| `AUTH_GOOGLE_ID` | No | Google OAuth client ID |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog analytics API key |

> **Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. All other variables are server-side only.

---

## Contributing

We welcome contributions! Please read [AGENTS.md](./AGENTS.md) for detailed project conventions.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes
4. Run quality checks: `npm run lint && npx tsc --noEmit`
5. Commit using conventional commits: `feat: add interval scoring`
6. Push and open a Pull Request

All PRs require:
- Description explaining what and why
- Test plan (how to verify the change)
- Passing CI checks

---

## License

[MIT](LICENSE) — feel free to use, modify, and distribute.
