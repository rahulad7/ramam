import { router, type Href } from 'expo-router';

import type { TKanda } from '@/types/content';

export function goBackOr(fallback: Href) {
  if (router.canGoBack()) {
    router.back();
    return;
  }

  router.replace(fallback as never);
}

/** Always return to the library kanda list (avoids jumping to Home when opened from Home strip). */
export function goBackToLibrary() {
  router.navigate('/(tabs)/library' as Href);
}

/** Return to a kanda's chapter list from the reader. */
export function goBackToKanda(kanda: TKanda) {
  router.navigate(`/library/${kanda}` as Href);
}
