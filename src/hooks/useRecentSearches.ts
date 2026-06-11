import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

import { STORAGE_KEYS } from '@/constants/storage';

const MAX_RECENT = 8;

export function useRecentSearches() {
  const [recent, setRecent] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
        if (raw) {
          setRecent(JSON.parse(raw) as string[]);
        }
      } finally {
        setIsReady(true);
      }
    }

    load();
  }, []);

  const addRecent = useCallback(async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const next = [trimmed, ...recent.filter((item) => item.toLowerCase() !== trimmed.toLowerCase())].slice(
      0,
      MAX_RECENT
    );
    setRecent(next);
    await AsyncStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(next));
  }, [recent]);

  const clearRecent = useCallback(async () => {
    setRecent([]);
    await AsyncStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES);
  }, []);

  return { recent, isReady, addRecent, clearRecent };
}
