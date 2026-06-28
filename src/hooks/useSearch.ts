import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { InteractionManager } from 'react-native';

import { searchChapters, warmSearchIndex, type SearchResult } from '@/lib/search';

const DEBOUNCE_MS = 120;

export function useSearch(query: string) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const requestId = useRef(0);

  const trimmed = query.trim();
  const isValidQuery = trimmed.length >= 2;

  useEffect(() => {
    void warmSearchIndex().then(() => setIsReady(true));
  }, []);

  useEffect(() => {
    if (!isValidQuery) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const currentRequest = ++requestId.current;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const interaction = InteractionManager.runAfterInteractions(() => {
      timer = setTimeout(() => {
        void searchChapters(trimmed).then((next) => {
          if (requestId.current !== currentRequest) return;
          setResults(next);
          setIsSearching(false);
        });
      }, DEBOUNCE_MS);
    });

    return () => {
      interaction.cancel();
      if (timer) clearTimeout(timer);
    };
  }, [isValidQuery, trimmed]);

  const clear = useCallback(() => {
    requestId.current += 1;
    setResults([]);
    setIsSearching(false);
  }, []);

  return useMemo(
    () => ({
      results,
      isSearching: isSearching || (isValidQuery && !isReady),
      hasQuery: isValidQuery,
      isReady,
      clear,
    }),
    [results, isSearching, isValidQuery, isReady, clear]
  );
}
