import { useCallback, useEffect, useMemo, useState } from 'react';

import { searchChapters, type SearchResult } from '@/lib/search';

const DEBOUNCE_MS = 280;

export function useSearch(query: string) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const trimmed = query.trim();
  const isValidQuery = trimmed.length >= 2;

  useEffect(() => {
    if (!isValidQuery) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      setResults(searchChapters(trimmed));
      setIsSearching(false);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [isValidQuery, trimmed]);

  const clear = useCallback(() => {
    setResults([]);
    setIsSearching(false);
  }, []);

  return useMemo(
    () => ({
      results,
      isSearching,
      hasQuery: isValidQuery,
      clear,
    }),
    [results, isSearching, isValidQuery, clear]
  );
}
