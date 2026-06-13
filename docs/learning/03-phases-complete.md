# Phases 3–5 — Wisdom, Highlights, Polish

All planned reader features are now in the app (except cloud auth/API, which stay optional).

## Phase 3 — Daily Wisdom & Highlights

### Daily Wisdom
- `src/lib/dailyWisdom.ts` picks a chapter + verse by **calendar date** (stable each day)
- **Issue number** on Home masthead (days since Jan 1, 2026)
- **Today's Wisdom** card on Home
- Full **Daily Wisdom** screen (menu or Home)
- **Share verse** via native share sheet

### Highlights
- Tap the **color icon** on any passage block while reading
- Saved in `HighlightsProvider` → `@ramam/highlights`
- **Highlights** screen (menu or Profile)
- Long press to remove

### Reading settings
- **Font size**: Small / Medium / Large (`ReadingSettingsProvider`)
- Applies to all `HtmlText` rendering
- **Scroll position** restored per chapter when you return

---

## Phase 4 — Stats & Settings

### Reading stats (Profile)
- Chapters opened count
- Reading streak (consecutive days)
- Overall progress %
- Bookmarks + highlights counts

### Settings screen
- Font size
- Theme toggle
- Clear all local data

### Share
- Share chapter from reading header
- Share reflection / daily verse

---

## Phase 5 — Polish

### Onboarding
- First-launch **3-slide** intro (`OnboardingOverlay`)
- Skip or continue; stored in `@ramam/onboarding-done`

### Home dispatch masthead
- Date, issue number, RAMAM wordmark

### Chapter reading
- **Reflection card** at end of each chapter
- **Highlightable** content blocks
- **Share** + **bookmark** in header

### Offline
- All 534 chapters remain **bundled** — no network required to read, search, or use daily wisdom

---

## What's intentionally not included

| Feature | Reason |
|---------|--------|
| Supabase auth | Skipped per project choice; guest mode is full-featured locally |
| Node.js API | Content is bundled; no server needed for reading |
| AI / LLM | Discussed separately; needs RAG + API |
| Text-range selection highlights | Block-level highlights are more reliable on mobile HTML |

---

## Try everything

1. **Cold start** → splash → onboarding (first time only)
2. **Home** → Today's Wisdom → Read chapter
3. **Reading** → highlight a passage → Profile → Highlights
4. **Settings** → Large font → read a chapter
5. **Profile** → check streak after reading two days in a row

```bash
cd /Users/grx10/Documents/radProjects/ramayana
npm start
```
