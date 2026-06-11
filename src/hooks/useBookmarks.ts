import { useContext } from 'react';

import { BookmarksContext } from '@/providers/BookmarksProvider';

export function useBookmarks() {
  const context = useContext(BookmarksContext);

  if (!context) {
    throw new Error('useBookmarks must be used within BookmarksProvider');
  }

  return context;
}
