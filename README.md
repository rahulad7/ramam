# Ramam

React Native mobile app for reading Valmiki Ramayana with an editorial, newspaper-style UI.

## Stack

- Expo SDK 54 + Expo Router
- TypeScript
- NativeWind (Tailwind CSS)
- React Context + custom hooks (no Zustand / Redux)
- AsyncStorage for local data
- MiniSearch for full-text search
- Bundled JSON content (534 chapters, offline)

## Getting Started

```bash
cd ramayana
npm install
npm start
```

Scan the QR code in **Expo Go** (SDK 54).

## Generate content indexes

```bash
npm run generate          # content map + search index
npm run generate:content  # sarga map only
npm run generate:search   # search index only
```

## Phase status

| Phase | Status |
|-------|--------|
| 0 — Scaffold, reading, tabs | ✅ |
| 1 — Splash, navbar, bookmarks, progress | ✅ |
| 2 — Search, drawer, dark mode | ✅ |
| 3 — Daily wisdom, highlights, font size, scroll restore | ✅ |
| 4 — Stats, settings, share | ✅ |
| 5 — Onboarding, masthead, reading polish | ✅ |
| Auth / Supabase / API / AI | Optional future |

## Learning notes

See `docs/learning/` for plain-English explanations of each phase.

## Rules

- Do not modify the `read-ramayana` web project.
- Content lives in `assets/data/` (copied from read-ramayana).
