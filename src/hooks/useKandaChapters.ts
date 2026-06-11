import { useMemo } from 'react';

import { getChaptersOfKanda } from '@/lib/content';
import type { ChapterMeta, TKanda } from '@/types/content';

export function useKandaChapters(kanda: TKanda) {
  const chapters = useMemo<ChapterMeta[]>(() => getChaptersOfKanda(kanda), [kanda]);

  return { chapters, count: chapters.length };
}
