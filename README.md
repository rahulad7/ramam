# Ramam

React Native mobile app for reading Valmiki Ramayana with an editorial, newspaper-style UI.

## Stack

- Expo SDK 56 + Expo Router
- TypeScript
- NativeWind (Tailwind CSS)
- React Context + custom hooks for state (no Zustand / Redux)
- AsyncStorage for local progress + theme
- Bundled JSON content from `read-ramayana/__data`

## Getting Started

```bash
cd ramayana
npm install
npm start
```

Then press `i` for iOS simulator or `a` for Android emulator, or scan the QR code in **Expo Go**.

### Expo Go on your phone

This project uses **Expo SDK 54** so it works with the Expo Go app from the Play Store / App Store.

> SDK 56 is not available on the public app stores yet. If you see “requires a newer version of Expo Go”, update Expo Go from the store and restart `npm start`.

## Regenerate content map

After updating chapter JSON files:

```bash
npm run generate:content
```

## Project structure

```
app/                 Expo Router screens
src/components/      UI + reading components
src/hooks/           Custom hooks
src/providers/       React Context providers
src/lib/             Content loaders
src/generated/       Auto-generated sarga map
assets/data/         Ramayana JSON (copied from read-ramayana)
docs/learning/       Plain-English learning notes
```

## Phase status

- Phase 0: complete (setup, design system, splash, tabs, library, reading, hooks)
- Phase 1: auth + bookmarks (Supabase skipped for now)
- Phase 2+: daily wisdom API, highlights, offline sync

## Rules

- Do not modify the `read-ramayana` web project.
- Content is copied into `assets/data/` — not linked at runtime.
