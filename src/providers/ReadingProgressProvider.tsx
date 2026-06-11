import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { STORAGE_KEYS } from '@/constants/storage';
import type { TKanda } from '@/types/content';

export type LastRead = {
  kanda: TKanda;
  sarga: string;
  updatedAt: string;
};

type KandaProgressMap = Partial<Record<TKanda, number>>;

type ReadingProgressContextValue = {
  lastRead: LastRead | null;
  isReady: boolean;
  setLastRead: (kanda: TKanda, sarga: string) => Promise<void>;
  getKandaProgress: (kanda: TKanda, chapterCount: number) => number;
  getOverallProgress: (totalChapters: number) => number;
};

export const ReadingProgressContext = createContext<ReadingProgressContextValue | null>(null);

type ReadingProgressProviderProps = {
  children: ReactNode;
};

export function ReadingProgressProvider({ children }: ReadingProgressProviderProps) {
  const [lastRead, setLastReadState] = useState<LastRead | null>(null);
  const [kandaProgress, setKandaProgress] = useState<KandaProgressMap>({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadProgress() {
      try {
        const [lastRaw, kandaRaw] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.LAST_READ),
          AsyncStorage.getItem(STORAGE_KEYS.KANDA_PROGRESS),
        ]);

        if (lastRaw) {
          setLastReadState(JSON.parse(lastRaw) as LastRead);
        }
        if (kandaRaw) {
          setKandaProgress(JSON.parse(kandaRaw) as KandaProgressMap);
        }
      } finally {
        setIsReady(true);
      }
    }

    loadProgress();
  }, []);

  const setLastRead = useCallback(async (kanda: TKanda, sarga: string) => {
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
  }, []);

  const getKandaProgress = useCallback(
    (kanda: TKanda, chapterCount: number) => {
      const highest = kandaProgress[kanda] ?? 0;
      if (!highest || !chapterCount) return 0;
      return Math.min(highest / chapterCount, 1);
    },
    [kandaProgress]
  );

  const getOverallProgress = useCallback(
    (totalChapters: number) => {
      const readCount = Object.values(kandaProgress).reduce((sum, n) => sum + (n ?? 0), 0);
      if (!totalChapters) return 0;
      return Math.min(readCount / totalChapters, 1);
    },
    [kandaProgress]
  );

  const value = useMemo(
    () => ({
      lastRead,
      isReady,
      setLastRead,
      getKandaProgress,
      getOverallProgress,
    }),
    [lastRead, isReady, setLastRead, getKandaProgress, getOverallProgress]
  );

  return <ReadingProgressContext.Provider value={value}>{children}</ReadingProgressContext.Provider>;
}
