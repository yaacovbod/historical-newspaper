# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
```

No test suite exists in this project.

## Required Environment Variables

```
GEMINI_API_KEY        # Google Gemini API key
REDIS_URL             # Redis connection string (ioredis)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
```

## Architecture Overview

This is a Next.js 16 App Router application ("מחולל העיתון ההיסטורי") that helps Israeli high school students generate historical newspaper articles for their Bagrut (matriculation) project.

### User Flow

The entire generation experience lives in a single client component (`src/app/page.tsx`) with a multi-stage state machine:

`cluster` → `select` (article type) → `form` → `loading` → `result`

1. User picks one of 3 curriculum clusters (each has its own concept list)
2. User picks an article type: `news`, `secondary`, or `editorial`
3. The matching form component collects inputs (topic, concepts, sources, notes)
4. `POST /api/generate` builds a Hebrew prompt and calls Gemini 2.5 Flash
5. On success, the result is silently saved to Redis via `POST /api/articles`
6. User can refine the result via `POST /api/refine`

### AI Layer (`src/lib/prompts.ts`)

Three prompt builders — `buildNewsPrompt`, `buildSecondaryPrompt`, `buildEditorialPrompt` — produce `{ system, user }` pairs sent directly to the Gemini REST API (`gemini-2.5-flash:generateContent`). No AI SDK is used; it's a raw `fetch` call in each route handler.

### Data Layer (`src/lib/redis.ts`)

Redis via `ioredis` (singleton pattern on `globalThis`). Two data structures per user:

- `article:{userId}:{timestamp}` — JSON blob with title, content, articleType, clusterTitle
- `user:{userId}:articles` — list of timestamps (used for ordering)
- `articles_count:{userId}` — generation counter (max 5 per user, enforced in `/api/generate`)

The admin email (configured in `src/app/api/generate/route.ts`) bypasses the 5-article quota. Replace with your own email address.

### Auth (`src/middleware.ts`)

Clerk v7 protects all routes except `/sign-in`, `/sign-up`, `/terms`, `/accessibility`. The middleware uses `clerkMiddleware` + `createRouteMatcher`.

### Curriculum Data (`src/lib/`)

- `clusters.ts` — defines the 3 `Cluster` objects, each referencing a concept array
- `concepts.ts`, `concepts-hakamat-medina.ts`, `concepts-decolonization.ts` — flat string arrays of Hebrew historical terms per cluster

### Key Types (`src/lib/types.ts`)

```
FormData = NewsFormData | SecondaryFormData | EditorialFormData
```

`SecondaryFormData` has a `subGenre` field (`interview` | `opinion` | `letter`) and `authorGender`. `EditorialFormData` takes pre-generated article texts as input (it synthesizes them into an editorial).

### Pages

- `/` — main generator (client component)
- `/my-articles` — saved articles list (fetches `GET /api/articles`)
- `/guide` — usage guide
- `/sign-in`, `/sign-up` — Clerk auth pages
- `/terms`, `/accessibility` — public static pages
