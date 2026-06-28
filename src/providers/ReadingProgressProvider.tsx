import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import { STORAGE_KEYS } from '@/constants/storage';
import type { TKanda } from '@/types/content';

export type LastRead = {
  kanda: TKanda;
  sarga: string;
  updatedAt: string;
};

type KandaProgressMap = Partial<Record<TKanda, number>>;
type ScrollOffsetMap = Record<string, number>;
type OpenedChaptersMap = Record<string, true>;

export type ReadingStats = {
  chaptersOpened: number;
  streakDays: number;
  lastReadDate: string | null;
};

type ReadingProgressContextValue = {
  lastRead: LastRead | null;
  isReady: boolean;
  setLastRead: (kanda: TKanda, sarga: string) => Promise<void>;
  getKandaProgress: (kanda: TKanda, chapterCount: number) => number;
  getOverallProgress: (totalChapters: number) => number;
  saveScrollOffset: (kanda: TKanda, sarga: string, offset: number) => void;
  getScrollOffset: (kanda: TKanda, sarga: string) => number;
  markChapterOpened: (kanda: TKanda, sarga: string) => Promise<void>;
  stats: ReadingStats;
  resetProgress: () => Promise<void>;
};

export const ReadingProgressContext = createContext<ReadingProgressContextValue | null>(null);

function chapterKey(kanda: TKanda, sarga: string) {
  return `${kanda}-${sarga}`;
}

function todayKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function ReadingProgressProvider({ children }: { children: ReactNode }) {
  const [lastRead, setLastReadState] = useState<LastRead | null>(null);
  const [kandaProgress, setKandaProgress] = useState<KandaProgressMap>({});
  const [scrollOffsets, setScrollOffsets] = useState<ScrollOffsetMap>({});
  const [openedChapters, setOpenedChapters] = useState<OpenedChaptersMap>({});
  const [streakDays, setStreakDays] = useState(0);
  const [lastReadDate, setLastReadDate] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const scrollPersistTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollOffsetsRef = useRef<ScrollOffsetMap>({});

  useEffect(() => {
    async function loadProgress() {
      try {
        const [lastRaw, kandaRaw, scrollRaw, openedRaw, streakRaw] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.LAST_READ),
          AsyncStorage.getItem(STORAGE_KEYS.KANDA_PROGRESS),
          AsyncStorage.getItem(STORAGE_KEYS.SCROLL_OFFSETS),
          AsyncStorage.getItem(STORAGE_KEYS.OPENED_CHAPTERS),
          AsyncStorage.getItem(STORAGE_KEYS.READING_STREAK),
        ]);

        if (lastRaw) setLastReadState(JSON.parse(lastRaw) as LastRead);
        if (kandaRaw) setKandaProgress(JSON.parse(kandaRaw) as KandaProgressMap);
        if (scrollRaw) {
          const parsed = JSON.parse(scrollRaw) as ScrollOffsetMap;
          setScrollOffsets(parsed);
          scrollOffsetsRef.current = parsed;
        }
        if (openedRaw) setOpenedChapters(JSON.parse(openedRaw) as OpenedChaptersMap);
        if (streakRaw) {
          const parsed = JSON.parse(streakRaw) as { streakDays: number; lastReadDate: string | null };
          setStreakDays(parsed.streakDays);
          setLastReadDate(parsed.lastReadDate);
        }
      } finally {
        setIsReady(true);
      }
    }

    loadProgress();
  }, []);

  const updateStreak = useCallback(async () => {
    const today = todayKey();
    let nextStreak = 1;

    if (lastReadDate === today) {
      nextStreak = Math.max(streakDays, 1);
    } else if (lastReadDate) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      nextStreak = lastReadDate === todayKey(yesterday) ? streakDays + 1 : 1;
    }

    setStreakDays(nextStreak);
    setLastReadDate(today);
    await AsyncStorage.setItem(
      STORAGE_KEYS.READING_STREAK,
      JSON.stringify({ streakDays: nextStreak, lastReadDate: today })
    );
  }, [lastReadDate, streakDays]);

  const setLastRead = useCallback(
    async (kanda: TKanda, sarga: string) => {
      const sargaNum = Number(sarga);
      const next: LastRead = {
        kanda,
        sarga,
        updatedAt: new Date().toISOString(),
      };

      setLastReadState(next);
      setKandaProgress((prev) => {
        const highest = Math.max(prev[kanda] ?? 0, sargaNum);
        const updated = { ...prev, [kanda]: highest };
        AsyncStorage.setItem(STORAGE_KEYS.KANDA_PROGRESS, JSON.stringify(updated));
        return updated;
      });

      await AsyncStorage.setItem(STORAGE_KEYS.LAST_READ, JSON.stringify(next));
      await updateStreak();
    },
    [updateStreak]
  );

  const markChapterOpened = useCallback(
    async (kanda: TKanda, sarga: string) => {
      const key = chapterKey(kanda, sarga);
      if (openedChapters[key]) return;
      const updated = { ...openedChapters, [key]: true as const };
      setOpenedChapters(updated);
      await AsyncStorage.setItem(STORAGE_KEYS.OPENED_CHAPTERS, JSON.stringify(updated));
      await updateStreak();
    },
    [openedChapters, updateStreak]
  );

  const saveScrollOffset = useCallback((kanda: TKanda, sarga: string, offset: number) => {
    const key = chapterKey(kanda, sarga);
    setScrollOffsets((prev) => {
      const updated = { ...prev, [key]: offset };
      scrollOffsetsRef.current = updated;
      return updated;
    });

    if (scrollPersistTimer.current) {
      clearTimeout(scrollPersistTimer.current);
    }

    scrollPersistTimer.current = setTimeout(() => {
      void AsyncStorage.setItem(
        STORAGE_KEYS.SCROLL_OFFSETS,
        JSON.stringify(scrollOffsetsRef.current)
      );
    }, 450);
  }, []);

  const getScrollOffset = useCallback(
    (kanda: TKanda, sarga: string) => scrollOffsets[chapterKey(kanda, sarga)] ?? 0,
    [scrollOffsets]
  );

  const getKandaProgress = useCallback(
    (kanda: TKanda, chapterCount: number) => {
      const highest = kandaProgress[kanda] ?? 0;
      if (!chapterCount) return 0;
      return Math.min(highest / chapterCount, 1);
    },
    [kandaProgress]
  );

  const getOverallProgress = useCallback(
    (totalChapters: number) => {
      const readCount = Object.keys(openedChapters).length;
      if (!totalChapters) return 0;
      return Math.min(readCount / totalChapters, 1);
    },
    [openedChapters]
  );

  const resetProgress = useCallback(async () => {
    setLastReadState(null);
    setKandaProgress({});
    setScrollOffsets({});
    setOpenedChapters({});
    setStreakDays(0);
    setLastReadDate(null);
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.LAST_READ,
      STORAGE_KEYS.KANDA_PROGRESS,
      STORAGE_KEYS.SCROLL_OFFSETS,
      STORAGE_KEYS.OPENED_CHAPTERS,
      STORAGE_KEYS.READING_STREAK,
    ]);
  }, []);

  const stats = useMemo<ReadingStats>(
    () => ({
      chaptersOpened: Object.keys(openedChapters).length,
      streakDays,
      lastReadDate,
    }),
    [openedChapters, streakDays, lastReadDate]
  );

  const value = useMemo(
    () => ({
      lastRead,
      isReady,
      setLastRead,
      getKandaProgress,
      getOverallProgress,
      saveScrollOffset,
      getScrollOffset,
      markChapterOpened,
      stats,
      resetProgress,
    }),
    [
      lastRead,
      isReady,
      setLastRead,
      getKandaProgress,
      getOverallProgress,
      saveScrollOffset,
      getScrollOffset,
      markChapterOpened,
      stats,
      resetProgress,
    ]
  );

  return <ReadingProgressContext.Provider value={value}>{children}</ReadingProgressContext.Provider>;
}
