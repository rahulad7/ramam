import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { STORAGE_KEYS } from '@/constants/storage';
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
  resetHighlights: () => Promise<void>;
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

  const commitHighlights = useCallback((updater: (prev: Highlight[]) => Highlight[]) => {
    setHighlights((prev) => {
      const next = updater(prev);
      if (next === prev) return prev;
      void AsyncStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(next));
      return next;
    });
  }, []);

  const addHighlight = useCallback(
    async (input: Omit<Highlight, 'id' | 'createdAt' | 'excerpt'> & { text: string }) => {
      const id = highlightId(input.kanda, input.sarga, input.blockIndex);
      const excerpt = stripHtml(input.text).slice(0, 220);
      const createdAt = new Date().toISOString();

      commitHighlights((prev) => {
        if (prev.some((item) => item.id === id)) return prev;

        return [
          {
            id,
            kanda: input.kanda,
            sarga: input.sarga,
            blockIndex: input.blockIndex,
            blockType: input.blockType,
            excerpt,
            note: input.note,
            createdAt,
          },
          ...prev,
        ];
      });
    },
    [commitHighlights]
  );

  const removeHighlight = useCallback(
    async (id: string) => {
      commitHighlights((prev) => prev.filter((item) => item.id !== id));
    },
    [commitHighlights]
  );

  const updateNote = useCallback(
    async (id: string, note: string) => {
      const trimmed = note.trim();
      commitHighlights((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, note: trimmed || undefined } : item
        )
      );
    },
    [commitHighlights]
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

  const resetHighlights = useCallback(async () => {
    setHighlights([]);
    await AsyncStorage.removeItem(STORAGE_KEYS.HIGHLIGHTS);
  }, []);

  const value = useMemo(
    () => ({
      highlights,
      isReady,
      addHighlight,
      removeHighlight,
      updateNote,
      isHighlighted,
      getChapterHighlights,
      resetHighlights,
    }),
    [highlights, isReady, addHighlight, removeHighlight, updateNote, isHighlighted, getChapterHighlights, resetHighlights]
  );

  return <HighlightsContext.Provider value={value}>{children}</HighlightsContext.Provider>;
}
