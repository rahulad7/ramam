import type { Href } from 'expo-router';

import type { TKanda } from '@/types/content';

export const routes = {
  home: '/(tabs)' as Href,
  library: '/(tabs)/library' as Href,
  search: '/(tabs)/search' as Href,
  profile: '/(tabs)/profile' as Href,
  bookmarks: '/(tabs)/bookmarks' as Href,
  highlights: '/(tabs)/highlights' as Href,
  settings: '/(tabs)/settings' as Href,
  dailyWisdom: '/(tabs)/daily-wisdom' as Href,
  characters: '/(tabs)/characters' as Href,
  kanda: (kanda: TKanda) => `/(tabs)/library/${kanda}` as Href,
  chapter: (kanda: TKanda, sarga: string | number) =>
    `/(tabs)/library/${kanda}/${sarga}` as Href,
  character: (id: string) => `/(tabs)/characters/${id}` as Href,
} as const;
