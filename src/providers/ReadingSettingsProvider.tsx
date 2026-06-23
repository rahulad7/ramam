import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { STORAGE_KEYS } from '@/constants/storage';
import type { FontSize, ReadingSettings } from '@/types/settings';

type ReadingSettingsContextValue = {
  settings: ReadingSettings;
  isReady: boolean;
  setFontSize: (size: FontSize) => Promise<void>;
  resetSettings: () => Promise<void>;
};

export const ReadingSettingsContext = createContext<ReadingSettingsContextValue | null>(null);

const DEFAULT: ReadingSettings = { fontSize: 'md' };

export function ReadingSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ReadingSettings>(DEFAULT);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEYS.READING_SETTINGS);
        if (raw) setSettings(JSON.parse(raw) as ReadingSettings);
      } finally {
        setIsReady(true);
      }
    }
    load();
  }, []);

  const setFontSize = useCallback(async (fontSize: FontSize) => {
    const next = { ...settings, fontSize };
    setSettings(next);
    await AsyncStorage.setItem(STORAGE_KEYS.READING_SETTINGS, JSON.stringify(next));
  }, [settings]);

  const resetSettings = useCallback(async () => {
    setSettings(DEFAULT);
    await AsyncStorage.setItem(STORAGE_KEYS.READING_SETTINGS, JSON.stringify(DEFAULT));
  }, []);

  const value = useMemo(
    () => ({ settings, isReady, setFontSize, resetSettings }),
    [settings, isReady, setFontSize, resetSettings]
  );

  return (
    <ReadingSettingsContext.Provider value={value}>{children}</ReadingSettingsContext.Provider>
  );
}
