import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { STORAGE_KEYS } from '@/constants/storage';
import { getSarga } from '@/lib/content';
import type { Bookmark } from '@/types/bookmark';
import type { TKanda } from '@/types/content';

type BookmarksContextValue = {
  bookmarks: Bookmark[];
  isReady: boolean;
  addBookmark: (kanda: TKanda, sarga: string) => Promise<void>;
  removeBookmark: (id: string) => Promise<void>;
  toggleBookmark: (kanda: TKanda, sarga: string) => Promise<void>;
  isBookmarked: (kanda: TKanda, sarga: string) => boolean;
  resetBookmarks: () => Promise<void>;
};

export const BookmarksContext = createContext<BookmarksContextValue | null>(null);

type BookmarksProviderProps = {
  children: ReactNode;
};

function bookmarkId(kanda: TKanda, sarga: string) {
  return `${kanda}-${sarga}`;
}

export function BookmarksProvider({ children }: BookmarksProviderProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadBookmarks() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEYS.BOOKMARKS);
        if (raw) {
          setBookmarks(JSON.parse(raw) as Bookmark[]);
        }
      } finally {
        setIsReady(true);
      }
    }

    loadBookmarks();
  }, []);

  const persist = useCallback(async (next: Bookmark[]) => {
    setBookmarks(next);
    await AsyncStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(next));
  }, []);

  const addBookmark = useCallback(
    async (kanda: TKanda, sarga: string) => {
      const id = bookmarkId(kanda, sarga);
      if (bookmarks.some((item) => item.id === id)) return;

      const chapter = getSarga(kanda, sarga);
      const next: Bookmark[] = [
        {
          id,
          kanda,
          sarga,
          title: chapter?.title ?? `Chapter ${sarga}`,
          createdAt: new Date().toISOString(),
        },
        ...bookmarks,
      ];
      await persist(next);
    },
    [bookmarks, persist]
  );

  const removeBookmark = useCallback(
    async (id: string) => {
      await persist(bookmarks.filter((item) => item.id !== id));
    },
    [bookmarks, persist]
  );

  const toggleBookmark = useCallback(
    async (kanda: TKanda, sarga: string) => {
      const id = bookmarkId(kanda, sarga);
      if (bookmarks.some((item) => item.id === id)) {
        await removeBookmark(id);
      } else {
        await addBookmark(kanda, sarga);
      }
    },
    [addBookmark, bookmarks, removeBookmark]
  );

  const isBookmarked = useCallback(
    (kanda: TKanda, sarga: string) => bookmarks.some((item) => item.id === bookmarkId(kanda, sarga)),
    [bookmarks]
  );

  const resetBookmarks = useCallback(async () => {
    setBookmarks([]);
    await AsyncStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
  }, []);

  const value = useMemo(
    () => ({
      bookmarks,
      isReady,
      addBookmark,
      removeBookmark,
      toggleBookmark,
      isBookmarked,
      resetBookmarks,
    }),
    [bookmarks, isReady, addBookmark, removeBookmark, toggleBookmark, isBookmarked, resetBookmarks]
  );

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}
