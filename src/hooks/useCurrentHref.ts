import { useSegments, type Href } from 'expo-router';

import { routes } from '@/lib/routes';

/** Map expo-router segments to a stable href for return navigation. */
export function segmentsToHref(segments: string[]): Href {
  const parts = segments.filter((segment) => segment !== '(tabs)');

  if (parts.length === 0 || (parts.length === 1 && parts[0] === 'index')) {
    return routes.home;
  }

  return `/(tabs)/${parts.join('/')}` as Href;
}

export function useCurrentHref(): Href {
  const segments = useSegments();
  return segmentsToHref(segments);
}
