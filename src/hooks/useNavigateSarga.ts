import type { Href } from 'expo-router';
import { useMemo } from 'react';

import { KANDAS, KANDA_CHAPTER_LENGTH } from '@/constants/kandas';
import { routes } from '@/lib/routes';
import type { TKanda } from '@/types/content';

type NavigateSargaResult = {
  prevHref: Href | null;
  nextHref: Href | null;
  hasPrevious: boolean;
  hasNext: boolean;
};

export function useNavigateSarga(kanda: TKanda, sargaNum: number): NavigateSargaResult {
  return useMemo(() => {
    const chapterCount = KANDA_CHAPTER_LENGTH[kanda];
    const currentIndex = KANDAS.findIndex((item) => item.id === kanda);
    const isFirstInKanda = sargaNum === 1;
    const isLastInKanda = sargaNum === chapterCount;

    let prevHref: Href | null = routes.chapter(kanda, sargaNum - 1);
    let nextHref: Href | null = routes.chapter(kanda, sargaNum + 1);

    if (isFirstInKanda) {
      if (currentIndex <= 0) {
        prevHref = null;
      } else {
        const prevKanda = KANDAS[currentIndex - 1].id;
        prevHref = routes.chapter(prevKanda, KANDA_CHAPTER_LENGTH[prevKanda]);
      }
    }

    if (isLastInKanda) {
      if (currentIndex >= KANDAS.length - 1) {
        nextHref = null;
      } else {
        const nextKanda = KANDAS[currentIndex + 1].id;
        nextHref = routes.chapter(nextKanda, 1);
      }
    }

    return {
      prevHref,
      nextHref,
      hasPrevious: prevHref !== null,
      hasNext: nextHref !== null,
    };
  }, [kanda, sargaNum]);
}
