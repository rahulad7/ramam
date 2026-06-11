# Phase 1 — Splash, Navbar, Bookmarks

Phase 1 polishes the shell of **Ramam**: animated splash, custom top/bottom navigation, bookmarks, and richer reading.

## What you built

### 1. Animated splash (`app/index.tsx`)

- Uses **Reanimated** `FadeIn` / `FadeInDown` for logo, title, tagline, and footer.
- After 2.8 seconds, `router.replace('/(tabs)')` sends the user to the main app.
- Separate from Expo’s native splash (`expo-splash-screen`), which hides once fonts and theme load in `app/_layout.tsx`.

### 2. Custom navbar

**Top — `AppHeader`**

- Menu icon (placeholder for Phase 2 drawer).
- Centered **RAMAM** wordmark.
- Bookmark + search shortcuts in the header.

**Bottom — `TabBar`**

- Four tabs: Home, Library, Search, Account.
- Ionicons with filled/outline states.
- Hides automatically on chapter reading screens and the bookmarks list (cleaner reading UX).

**`ScreenShell`** wraps tab screens with `AppHeader` so every main screen looks consistent.

**`ReadingHeader`** is used on the sarga (chapter) screen: back button, kanda name, bookmark toggle.

### 3. Bookmarks

| Piece | Role |
|-------|------|
| `BookmarksProvider` | Stores bookmarks in AsyncStorage (`@ramam/bookmarks`) |
| `useBookmarks()` | `toggleBookmark`, `isBookmarked`, `removeBookmark` |
| `app/(tabs)/bookmarks.tsx` | Hidden tab — opened from header bookmark icon |
| `ReadingHeader` | Bookmark button while reading |

### 4. Per-kanda progress

`ReadingProgressProvider` now tracks the highest chapter reached per kanda in `@ramam/kanda-progress`.

- `getKandaProgress(kanda, chapterCount)` → 0–1 for each kanda card.
- `getOverallProgress(totalChapters)` → overall % on the Library screen.

### 5. HTML rendering

`HtmlText` uses `react-native-render-html` so `<em>` tags in chapter overviews render as italics.

## File map

```
app/index.tsx                    → animated splash
app/(tabs)/_layout.tsx           → custom TabBar
src/components/layout/
  AppHeader.tsx                  → top navbar
  TabBar.tsx                     → bottom tabs
  ScreenShell.tsx                → header + content wrapper
  ReadingHeader.tsx              → reading screen header
app/(tabs)/bookmarks.tsx         → saved chapters
src/providers/BookmarksProvider.tsx
```

## Concepts to remember

1. **Provider + hook pattern** — same as theme and reading progress; no Redux needed.
2. **Hidden routes** — `href: null` in tab layout keeps bookmarks off the tab bar but routable.
3. **Stack inside tab** — Library is a tab with its own stack (`library/_layout.tsx`); `headerShown: false` lets custom headers take over.
4. **Segments** — `useSegments()` in `TabBar` detects nested library routes to hide the bottom bar.

## Try it

```bash
cd /Users/grx10/Documents/radProjects/ramayana
npm start
```

1. Watch the splash animation → lands on Home.
2. Tap Library → see kanda cards with progress %.
3. Open a chapter → bookmark it → header icon → Saved Chapters.
4. Use bottom tabs to switch between Home, Library, Search, Account.

## Next (Phase 2)

- Full-text search
- Menu / settings drawer
- Auth (Supabase) when ready
- Dark mode styling pass
