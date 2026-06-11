import { useContext } from 'react';

import { ReadingProgressContext } from '@/providers/ReadingProgressProvider';

export function useReadingProgress() {
  const context = useContext(ReadingProgressContext);

  if (!context) {
    throw new Error('useReadingProgress must be used within ReadingProgressProvider');
  }

  return context;
}
