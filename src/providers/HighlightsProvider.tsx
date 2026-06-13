import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { STORAGE_KEYS } from '@/constants/storage';
import { getSarga } from '@/lib/content';
import type { Highlight } from '@/types/highlight';
import type { TKanda } from '@/types/content';
import { stripHtml } from '@/utils/html';

type HighlightsContextValue = {
  highlights: Highlight[];
  isReady: boolean;
  addHighlight: (input: Omit<Highlight, 'id' | 'createdAt' | 'excerpt'> & { text: string }) => Promise<void>;
  removeHighlight: (id: string) => Promise<void>;
  updateNote: (id: string, note: string) => Promise<void>;
  isHighlighted: (kanda: TKanda, sarga: string, blockIndex: number) => boolean;
  getChapterHighlights: (kanda: TKanda, sarga: string) => Highlight[];
};

export const HighlightsContext = createContext<HighlightsContextValue | null>(null);

function highlightId(kanda: TKanda, sarga: string, blockIndex: number) {
  return `${kanda}-${sarga}-${blockIndex}`;
}

export function HighlightsProvider({ children }: { children: ReactNode }) {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEYS.HIGHLIGHTS);
        if (raw) setHighlights(JSON.parse(raw) as Highlight[]);
      } finally {
        setIsReady(true);
      }
    }
    load();
  }, []);

  const persist = useCallback(async (next: Highlight[]) => {
    setHighlights(next);
    await AsyncStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(next));
  }, []);

  const addHighlight = useCallback(
    async (input: Omit<Highlight, 'id' | 'createdAt' | 'excerpt'> & { text: string }) => {
      const id = highlightId(input.kanda, input.sarga, input.blockIndex);
      if (highlights.some((item) => item.id === id)) return;

      const chapter = getSarga(input.kanda, input.sarga);
      const next: Highlight = {
        id,
        kanda: input.kanda,
        sarga: input.sarga,
        blockIndex: input.blockIndex,
        blockType: input.blockType,
        excerpt: stripHtml(input.text).slice(0, 220),
        note: input.note,
        createdAt: new Date().toISOString(),
      };

      await persist([next, ...highlights]);
    },
    [highlights, persist]
  );

  const removeHighlight = useCallback(
    async (id: string) => {
      await persist(highlights.filter((item) => item.id !== id));
    },
    [highlights, persist]
  );

  const updateNote = useCallback(
    async (id: string, note: string) => {
      await persist(highlights.map((item) => (item.id === id ? { ...item, note } : item)));
    },
    [highlights, persist]
  );

  const isHighlighted = useCallback(
    (kanda: TKanda, sarga: string, blockIndex: number) =>
      highlights.some((item) => item.id === highlightId(kanda, sarga, blockIndex)),
    [highlights]
  );

  const getChapterHighlights = useCallback(
    (kanda: TKanda, sarga: string) =>
      highlights.filter((item) => item.kanda === kanda && item.sarga === sarga),
    [highlights]
  );

  const value = useMemo(
    () => ({
      highlights,
      isReady,
      addHighlight,
      removeHighlight,
      updateNote,
      isHighlighted,
      getChapterHighlights,
    }),
    [highlights, isReady, addHighlight, removeHighlight, updateNote, isHighlighted, getChapterHighlights]
  );

  return <HighlightsContext.Provider value={value}>{children}</HighlightsContext.Provider>;
}
