<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Pitch Perfect v1 — Agent Guide

## Tech Stack

### Current (from package.json)

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.2.9 | App Router framework (Server Components by default) |
| React | 19.2.4 | UI library |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | ^4 | Utility-first CSS framework (`@import "tailwindcss"` syntax) |
| Tone.js | ^15.1.22 | Web Audio API abstraction (audio engine) |
| ESLint | ^9 | Linting (config via eslint.config.mjs) |
| PostCSS | (via @tailwindcss/postcss ^4) | CSS processing |

### Recommended Additions (planned, not yet installed)

| Category | Library | Purpose |
|---|---|---|
| State management | Zustand | Lightweight client-side game state |
| Server state | TanStack Query | Data fetching & caching (leaderboard, challenges) |
| Testing | Vitest + React Testing Library | Unit & component tests |
| E2E testing | Playwright | End-to-end browser tests |
| Database | Supabase (Postgres) | User profiles, scores, daily challenges |
| Auth | Auth.js v5 | Authentication (Google, GitHub, email) |
| Analytics | PostHog | Product analytics & feature flags |
| Hosting | Vercel | Deployment & serverless functions |

## Project Structure

The project follows Next.js 16 App Router conventions. All pages are Server Components by default. Client Components are explicitly marked with `'use client'`.

```
pitch-perfect/
├── src/
│   ├── app/                        # App Router (routes, layouts, pages)
│   │   ├── layout.tsx              # Root layout (Geist font, dark mode)
│   │   ├── page.tsx                # Home/landing page
│   │   ├── globals.css             # Global styles + Tailwind CSS 4
│   │   ├── not-found.tsx           # Custom 404 page
│   │   ├── error.tsx               # Global error boundary
│   │   ├── game/                   # /game routes
│   │   │   ├── page.tsx            # Game mode selection
│   │   │   └── [mode]/             # /game/interval, /game/chord, /game/pitch
│   │   ├── leaderboard/            # /leaderboard routes
│   │   │   └── page.tsx            # Leaderboard display
│   │   ├── profile/                # /profile routes
│   │   │   └── page.tsx            # User profile & stats
│   │   ├── daily/                  # /daily routes
│   │   │   └── page.tsx            # Daily challenge
│   │   └── api/                    # API route handlers
│   │       ├── leaderboard/route.ts
│   │       ├── challenges/route.ts
│   │       └── auth/[...nextauth]/route.ts
│   ├── components/                 # Shared UI components
│   │   ├── ui/                     # Primitives (Button, Card, Badge, etc.)
│   │   ├── game/                   # Game-specific (Piano, Staff, NoteDisplay)
│   │   └── layout/                 # Layout components (Header, Footer, Nav)
│   ├── lib/                        # Core logic
│   │   ├── audio/                  # Tone.js audio engine, sound generation
│   │   ├── game/                   # Game engine, question generator, scoring
│   │   └── utils/                  # Utility functions
│   ├── hooks/                      # Shared React hooks
│   ├── stores/                     # Zustand stores (game state, settings)
│   └── types/                      # TypeScript type definitions
├── public/                         # Static assets (sounds, images)
├── docs/                           # Architecture & design docs
└── tests/                          # Test files
    ├── unit/
    ├── integration/
    └── e2e/
```

## Build Commands

### Current (from package.json)

```bash
npm run dev          # Start development server on port 3000
npm run build        # Production build (Next.js)
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Recommended Additions (add to package.json)

```bash
npm run typecheck    # tsc --noEmit (TypeScript type checking)
npm test             # vitest (unit & component tests)
npm run test:e2e     # playwright (end-to-end tests)
npm run check        # lint + typecheck + test + build (CI gate)
```

## Design System

### Styling Architecture
- **Tailwind CSS 4** using the new `@import "tailwindcss"` syntax (no tailwind.config.js)
- **`@theme inline`** block in `globals.css` for custom design tokens
- **CSS custom properties** for dynamic theming (e.g., `--background`, `--foreground`)
- **Dark mode** via `prefers-color-scheme` media query

### Typography
- **Geist Sans** — body text (loaded via `next/font` in root layout)
- **Geist Mono** — code/monospace text

### Color Palette (game-themed)
- Dark background (`--background: #0a0a0a`) for immersive game feel
- Light foreground (`--foreground: #ededed`) for readability
- Accent colors for intervals and chords (green for correct, red for incorrect, blue for neutral)
- High-contrast variants for accessibility

### Component Patterns
- **Buttons**: Primary (CTA), secondary (outline), ghost (icon), game-specific (answer choices)
- **Cards**: Game mode selection, leaderboard entries, achievement display
- **Game UI**: Piano keyboard, staff display, interval visualization, progress bar
- **Modals**: Challenge results, achievement unlock, settings

### Accessibility
- ARIA labels on all game controls (play button, answer choices, navigation)
- Keyboard navigation: number keys for answers, space for replay, escape for pause
- Focus indicators visible
- Color not sole means of conveying information (interval names, chord labels)

## Game Mechanics Spec

### Game Modes

| Mode | Description | Question Type |
|---|---|---|
| **Interval Identification** | Hear two notes played sequentially. Identify the interval. | Minor 2nd through Octave |
| **Chord Recognition** | Hear a chord (3-4 notes simultaneously). Identify the chord quality. | Major, minor, diminished, augmented, 7th variants |
| **Pitch Matching** | Hear a target note. Sing/select the matching pitch. | Single note within vocal range |

### Scoring System

```
score = baseScore × timeMultiplier × levelMultiplier + streakBonus

baseScore = 100 points per correct answer
timeMultiplier = max(1.0, 3.0 - (responseTime / 5000))  // faster = higher multiplier
levelMultiplier = 1.0 + (level - 1) × 0.1                // harder levels worth more
streakBonus = consecutiveCorrect × 10                    // capped at 100 bonus
```

### Level Progression
- **20 levels** across all game modes
- Each level introduces new intervals/chords (e.g., Level 1: only Major 2nd and Minor 2nd)
- Every 5 levels: boss round (mixed content from all previous levels)
- Level completion requires 8/10 correct answers

### Daily Challenges
- **20 questions** per challenge
- Fixed set of intervals/chords (same for all players that day)
- Bonus XP awarded based on accuracy bracket
- Daily streak multiplier for consecutive day completions

### Data Models (TypeScript)

```typescript
interface Question {
  id: string;
  type: 'interval' | 'chord' | 'pitch';
  prompt: AudioConfig;    // notes to play, duration, instrument
  correctAnswer: string;
  choices: string[];       // answer options (4 for interval/chord, 8 for pitch)
  difficulty: number;      // 1-20 mapped to level
}

interface ScoreResult {
  correct: boolean;
  score: number;
  timeMs: number;
  streak: number;
  level: number;
  totalScore: number;
}

interface PlayerProgress {
  userId: string;
  levels: Record<string, LevelProgress>;  // mode → progress
  totalScore: number;
  achievements: string[];
  dailyStreak: number;
  lastPlayedDate: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: (progress: PlayerProgress) => boolean;
}

interface LeaderboardEntry {
  userId: string;
  displayName: string;
  score: number;
  level: number;
  achievedAt: string;
}
```

### Achievements (15 total)

| # | Name | Criteria |
|---|---|---|
| 1 | First Notes | Complete first game |
| 2 | Perfect Pitch | 10 correct answers in a row |
| 3 | Speed Demon | Answer in under 2 seconds, 5 times |
| 4 | Interval Master | Complete all interval levels |
| 5 | Chord Wizard | Complete all chord levels |
| 6 | Pitch Perfect | Complete all pitch levels |
| 7 | Dedicated | 7-day daily streak |
| 8 | Loyalist | 30-day daily streak |
| 9 | Sharp Ears | 90%+ accuracy in a game |
| 10 | Comeback Kid | Win after 3 consecutive wrong |
| 11 | Night Owl | Play after midnight, local time |
| 12 | Explorer | Play all three modes in one session |
| 13 | Century Club | Score 100+ on a single question |
| 14 | Top 10 | Reach top 10 on leaderboard |
| 15 | Grand Master | Complete all 20 levels in all modes |

### Audio Strategy (Tone.js)

- **Server Components**: Game metadata, question generation logic, scoring calculations
- **Client Components** (`'use client'`): Audio playback via Tone.js, real-time interaction, microphone access (pitch matching)
- Tone.js MUST only be imported and instantiated in Client Components — it depends on browser Web Audio API
- Audio context initialized on first user interaction (browser autoplay policy)
- Synth and sampler configurations defined in `lib/audio/`

## Next.js 16 Specific Conventions

- **Server Components by default** — ALL components are Server Components unless they need interactivity, event handlers, hooks, or browser APIs
- **`'use client'` directive** — required at the top of any file that uses hooks, state, effects, event handlers, or browser-only APIs
- **Tone.js in Client Components only** — Web Audio API is browser-only; never import Tone.js in Server Components
- **Data fetching** — use async Server Components with top-level `await` for database queries; avoid `useEffect` for data fetching
- **Route handlers** (`app/api/`) — for leaderboard CRUD, daily challenge generation, auth callbacks
- **`next/font`** — Geist already configured in root layout; use `variable` font for CSS variable access
- **`next/image`** — use for optimized images (achievement icons, profile avatars)
- **Metadata API** — export `metadata` or `generateMetadata` from page/layout files for SEO and OG tags
- **Error handling** — use `error.tsx` files for route-level error boundaries; `not-found.tsx` for 404
- **Loading states** — use `loading.tsx` files for Suspense fallbacks per route segment
- **No `pages/` directory** — App Router only; no `_app.tsx`, `_document.tsx`
- **No `public/index.html`** — `public/` is for static assets only; all HTML is generated by React

## Deployment Process

### Vercel (Recommended)
- Zero-config deployment for Next.js
- Connect GitHub repository → auto-deploys on push to main
- Environment variables configured in Vercel dashboard
- Preview deployments for every PR (instant URL)
- Analytics, speed insights, and log drains available

### Alternative Deployment
- **Node.js server**: `npm run build && npm run start` (standalone output mode via `output: "standalone"` in next.config.ts)
- **Docker**: Multi-stage build with `node:20-alpine`, copy `.next/standalone`
- **Static export**: If no SSR needed (limited for game with dynamic audio)

### Environment Variables
- `.env.local` — local development secrets (never committed)
- `.env.example` — documented template (committed)
- Vercel dashboard — production/staging/preview environments
- Prefix: `NEXT_PUBLIC_` for client-accessible variables

### CI/CD (GitHub Actions)
- Run `npm run check` (lint + typecheck + test) on every PR
- Run E2E tests on merge to main
- Deploy to Vercel via GitHub integration (auto)

## Agent Collaboration Guidelines

### Branch Naming
- `feat/<description>` — new features
- `fix/<description>` — bug fixes
- `chore/<description>` — tooling, dependencies, CI
- `docs/<description>` — documentation only

### Commit Messages
- Follow Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`
- Keep subject line under 72 characters
- Body explains what and why, not how

### Pull Requests
- Description includes: what changed, why, test plan, screenshots (if UI)
- Link to related issues
- Assign reviewer
- All CI checks must pass before merge
- Code review required (at least 1 approval)

### Quality Standards
- All new features need tests (unit + integration)
- TypeScript strict mode — no `any` without explicit justification comment
- No `console.log` in committed code (use `logger` utility)
- Handle edge cases: empty states, loading states, error states, offline

## Project Conventions

### Naming
- **Components**: PascalCase (`GameBoard.tsx`, `IntervalButton.tsx`)
- **Functions/variables**: camelCase (`calculateScore`, `generateQuestion`)
- **Files**: kebab-case (`game-mode-selector.tsx`, `audio-engine.ts`)
- **Types/interfaces**: PascalCase prefixed where meaningful (`IQuestion`, `TGameMode`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_STREAK_BONUS`, `DEFAULT_VOLUME`)

### Import Order
1. React / Next.js (`react`, `next/navigation`, `next/font`)
2. Third-party libraries (`tone`, `zustand`, `@tanstack/react-query`)
3. `@/lib/*` (core logic)
4. `@/components/*` (UI components)
5. `@/stores/*` (state management)
6. `@/types/*` (type definitions)
7. Relative imports (`./`, `../`)

### Error Handling
- **Async operations**: try/catch with meaningful error messages
- **Game logic**: Use discriminated union Result types (`{ ok: true, data: T } | { ok: false, error: Error }`)
- **API routes**: Return `NextResponse.json({ error: string }, { status })` on failure
- **Client-side**: Error boundaries (`error.tsx`) per route segment
- **Audio**: Graceful fallback if Web Audio API unavailable

### State Management Split
- **Server Components**: Direct database queries via Supabase client (data fetching, hydration)
- **Client game state**: Zustand stores (current question, score, timer, streak)
- **URL state**: Search params for game mode, level, shareable results
- **Form state**: React Hook Form + Zod validation (future: Auth.js forms)

### Audio (Tone.js) Rules
- ALL Tone.js imports and instantiation in files with `'use client'`
- Audio context started on user gesture (click/tap) to comply with browser autoplay policies
- Audio engine class in `lib/audio/` wrapped in a singleton pattern
- Dispose of Tone.js resources when component unmounts
- Use Tone.js `start()` / `Transport` for timing; avoid `setTimeout` for musical timing
