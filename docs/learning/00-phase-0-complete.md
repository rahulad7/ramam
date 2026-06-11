# Phase 0 Complete — What We Built

## In plain English

Phase 0 set up **Ramam** — a brand-new mobile app in a separate folder called `ramayana`.
We did not touch the existing `read-ramayana` website.

The app can now:
- Show a splash screen
- Navigate with bottom tabs (Home, Library, Wisdom, Profile)
- List all 6 kandas (books)
- Open any of the 534 chapters
- Read verse + commentary content
- Move prev/next between chapters (including across kandas)
- Remember your last-read chapter on this device
- Toggle light/dark theme preference (saved locally)

## What we used for state (no Zustand, no Redux)

We used **React Context + custom hooks**:

| Piece | File | Job |
|-------|------|-----|
| ThemeProvider | `src/providers/ThemeProvider.tsx` | Stores theme, saves to AsyncStorage |
| useTheme | `src/hooks/useTheme.ts` | Read/toggle theme from any screen |
| ReadingProgressProvider | `src/providers/ReadingProgressProvider.tsx` | Stores last-read chapter |
| useReadingProgress | `src/hooks/useReadingProgress.ts` | Read/update progress |
| useSarga | `src/hooks/useSarga.ts` | Load one chapter |
| useKandaChapters | `src/hooks/useKandaChapters.ts` | Load chapter list |
| useNavigateSarga | `src/hooks/useNavigateSarga.ts` | Calculate prev/next URLs |

### Why Context + hooks?

- **Context** = shared state for the whole app (theme, progress)
- **Custom hook** = reusable logic any screen can call
- You learn the core React patterns before adding libraries like Zustand

## How content loads

1. JSON files live in `assets/data/` (copied from `read-ramayana/__data/`)
2. `scripts/generate-content-map.mjs` builds `src/generated/sargaContentMap.ts`
3. Metro bundles all 534 chapter files at build time
4. `getSarga('bala', '1')` returns chapter data instantly — no network needed

## Design system

Colors and fonts come from `stitch_ramayana_visual_exploration_concepts/classical_editorial/DESIGN.md`:

- Background: cream paper `#fdf8f7`
- Text: ink `#181512`
- Headlines: EB Garamond
- Body: Libre Franklin
- Labels: Work Sans

## Screens built

| Screen | Route |
|--------|-------|
| Splash | `/` |
| Home | `/(tabs)` |
| Library | `/(tabs)/library` |
| Kanda chapters | `/(tabs)/library/[kanda]` |
| Read chapter | `/(tabs)/library/[kanda]/[sarga]` |
| Daily Wisdom | `/(tabs)/daily-wisdom` |
| Profile | `/(tabs)/profile` |

## What we skipped (on purpose)

- Supabase (database + auth) → Phase 2
- Zustand / Redux → using hooks only
- Bookmarks UI → Phase 1
- Full dark mode styling → partial toggle only

## Next: Phase 1

1. Bookmark provider + `useBookmarks` hook
2. Improve HTML rendering (italics for Sanskrit terms)
3. Better reading progress per kanda
4. Optional: Supabase when you're ready
