import { useMemo } from 'react';

import { KANDAS, KANDA_CHAPTER_LENGTH } from '@/constants/kandas';
import type { TKanda } from '@/types/content';

type NavigateSargaResult = {
  prevHref: string;
  nextHref: string;
  isFirst: boolean;
  isLast: boolean;
};

export function useNavigateSarga(kanda: TKanda, sargaNum: number): NavigateSargaResult {
  return useMemo(() => {
    const chapterCount = KANDA_CHAPTER_LENGTH[kanda];
    const isFirst = sargaNum === 1;
    const isLast = sargaNum === chapterCount;

    let prevHref = `/library/${kanda}/${sargaNum - 1}`;
    let nextHref = `/library/${kanda}/${sargaNum + 1}`;

    if (isFirst) {
      const currentIndex = KANDAS.findIndex((item) => item.id === kanda);
      const prevIndex = (currentIndex - 1 + KANDAS.length) % KANDAS.length;
      const prevKanda = KANDAS[prevIndex].id;
      prevHref = `/library/${prevKanda}/${KANDA_CHAPTER_LENGTH[prevKanda]}`;
    }

    if (isLast) {
      const currentIndex = KANDAS.findIndex((item) => item.id === kanda);
      const nextIndex = (currentIndex + 1) % KANDAS.length;
      const nextKanda = KANDAS[nextIndex].id;
      nextHref = `/library/${nextKanda}/1`;
    }

    return { prevHref, nextHref, isFirst, isLast };
  }, [kanda, sargaNum]);
}
