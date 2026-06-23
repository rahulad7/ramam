import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { STORAGE_KEYS } from '@/constants/storage';
import type { ThemeMode } from '@/types/content';

type ThemeContextValue = {
  theme: ThemeMode;
  isDark: boolean;
  isReady: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  resetTheme: () => Promise<void>;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadTheme() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
        if (saved === 'light' || saved === 'dark') {
          setThemeState(saved);
        } else if (systemScheme === 'dark') {
          setThemeState('dark');
        }
      } finally {
        setIsReady(true);
      }
    }

    loadTheme();
  }, [systemScheme]);

  const setTheme = useCallback(async (mode: ThemeMode) => {
    setThemeState(mode);
    await AsyncStorage.setItem(STORAGE_KEYS.THEME, mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  const resetTheme = useCallback(async () => {
    setThemeState('light');
    await AsyncStorage.setItem(STORAGE_KEYS.THEME, 'light');
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      isDark: theme === 'dark',
      isReady,
      toggleTheme,
      setTheme,
      resetTheme,
    }),
    [theme, isReady, toggleTheme, setTheme, resetTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
