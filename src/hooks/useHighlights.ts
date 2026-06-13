import { useContext } from 'react';

import { HighlightsContext } from '@/providers/HighlightsProvider';

export function useHighlights() {
  const context = useContext(HighlightsContext);
  if (!context) throw new Error('useHighlights must be used within HighlightsProvider');
  return context;
}
