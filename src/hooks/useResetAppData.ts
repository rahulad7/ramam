import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';

import { STORAGE_KEYS } from '@/constants/storage';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useHighlights } from '@/hooks/useHighlights';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { useReadingSettings } from '@/hooks/useReadingSettings';
import { useRecentSearches } from '@/hooks/useRecentSearches';

export function useResetAppData() {
  const { resetProgress } = useReadingProgress();
  const { resetBookmarks } = useBookmarks();
  const { resetHighlights } = useHighlights();
  const { resetSettings } = useReadingSettings();
  const { clearRecent } = useRecentSearches();

  return useCallback(async () => {
    await Promise.all([
      resetProgress(),
      resetBookmarks(),
      resetHighlights(),
      resetSettings(),
      clearRecent(),
      AsyncStorage.removeItem(STORAGE_KEYS.ONBOARDING_DONE),
    ]);
  }, [resetProgress, resetBookmarks, resetHighlights, resetSettings, clearRecent]);
}
