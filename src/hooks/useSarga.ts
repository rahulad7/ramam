import { useMemo } from 'react';

import { getSarga } from '@/lib/content';
import type { Sarga, TKanda } from '@/types/content';

export function useSarga(kanda: TKanda, sargaNum: string) {
  const sarga = useMemo<Sarga | null>(() => getSarga(kanda, sargaNum), [kanda, sargaNum]);

  return {
    sarga,
    isLoading: false,
    error: sarga ? null : new Error(`Chapter ${sargaNum} not found in ${kanda}`),
  };
}
