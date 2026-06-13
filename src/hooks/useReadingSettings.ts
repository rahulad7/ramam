import { useContext } from 'react';

import { ReadingSettingsContext } from '@/providers/ReadingSettingsProvider';

export function useReadingSettings() {
  const context = useContext(ReadingSettingsContext);
  if (!context) throw new Error('useReadingSettings must be used within ReadingSettingsProvider');
  return context;
}
