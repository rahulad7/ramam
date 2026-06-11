# Phase 2 — Search, Menu Drawer, Dark Mode

Phase 2 makes Ramam feel like a complete reader: find any chapter instantly, navigate from a menu, and read comfortably at night.

## What you built

### 1. Full-text search

**Build time** — `scripts/generate-search-index.mjs` reads all 534 prose JSON files, strips HTML, and writes `src/generated/searchIndex.ts`.

**Runtime** — [MiniSearch](https://github.com/lucaong/minisearch) indexes `title`, `overview`, and `body` with fuzzy matching.

| File | Role |
|------|------|
| `src/lib/search.ts` | Lazy-loads MiniSearch, returns ranked results + excerpts |
| `src/hooks/useSearch.ts` | Debounced query (280ms), min 2 characters |
| `src/hooks/useRecentSearches.ts` | Last 8 queries in AsyncStorage |
| `app/(tabs)/search.tsx` | Live search UI + recent chips |
| `SearchResultCard` | Tap → open chapter |

Regenerate after content changes:

```bash
npm run generate:search
# or both maps together:
npm run generate
```

### 2. Menu drawer

| File | Role |
|------|------|
| `DrawerProvider` | `openDrawer` / `closeDrawer` state |
| `useDrawer()` | Hook for header + drawer |
| `MenuDrawer` | Slide-in panel: nav links + theme toggle |
| `AppHeader` | Menu icon opens drawer |

Uses React Native `Modal` + Reanimated `SlideInLeft` — no extra navigation library.

### 3. Dark mode pass

- `global.css` — CSS variables for light/dark palettes
- `tailwind.config.js` — semantic colors use `rgb(var(--color-*) / <alpha-value>)`
- Root `View` gets `dark` class when `useTheme().isDark`
- `StatusBar`, `HtmlText`, icons in headers/tab bar follow theme
- Toggle: Profile screen, menu drawer, or `useTheme().toggleTheme()`

## Concepts to remember

1. **Pre-built index** — search is fast because work happens at build time, not on every keystroke.
2. **Lazy MiniSearch init** — engine builds on first search, not at app launch.
3. **Provider pattern again** — drawer state is just Context, same as bookmarks/theme.
4. **CSS variables + NativeWind** — one `dark` class on a parent recolors the whole app.

## Try it

```bash
cd /Users/grx10/Documents/radProjects/ramayana
npm start
```

1. **Search** tab → type `Hanuman` or `Sita` → tap a result.
2. **Menu** (top-left) → jump to Library or toggle dark mode.
3. **Profile** → switch theme → read a chapter with updated colors.

## Next (Phase 3)

- Daily Wisdom screen
- Text highlights + notes
- Optional Supabase auth when ready
