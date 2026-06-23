import type { KandaMeta, TKanda } from '@/types/content';

export const KANDAS: KandaMeta[] = [
  {
    id: 'bala',
    slug: 'bala',
    name: 'Bala Kanda',
    subtitle: 'Book of Childhood',
    description: 'The birth and early life of Rama, from his divine origins to his marriage with Sita.',
    chapterCount: 77,
    sortOrder: 1,
    image: require('../../assets/kandas/bala.png'),
  },
  {
    id: 'ayodhya',
    slug: 'ayodhya',
    name: 'Ayodhya Kanda',
    subtitle: 'Book of Ayodhya',
    description: 'The exile of Rama, the grief of Ayodhya, and the departure to the forest.',
    chapterCount: 119,
    sortOrder: 2,
    image: require('../../assets/kandas/ayodhya.png'),
  },
  {
    id: 'aranya',
    slug: 'aranya',
    name: 'Aranya Kanda',
    subtitle: 'Book of the Forest',
    description: 'Life in the Dandaka forest and the abduction of Sita by Ravana.',
    chapterCount: 75,
    sortOrder: 3,
    image: require('../../assets/kandas/aranya.png'),
  },
  {
    id: 'kishkindha',
    slug: 'kishkindha',
    name: 'Kishkindha Kanda',
    subtitle: 'Book of Kishkindha',
    description: 'Rama\'s alliance with Sugriva and the search for Sita begins.',
    chapterCount: 67,
    sortOrder: 4,
    image: require('../../assets/kandas/kishkindha.png'),
  },
  {
    id: 'sundara',
    slug: 'sundara',
    name: 'Sundara Kanda',
    subtitle: 'Book of Beauty',
    description: 'Hanuman\'s heroic journey to Lanka and his meeting with Sita.',
    chapterCount: 68,
    sortOrder: 5,
    image: require('../../assets/kandas/sundara.png'),
  },
  {
    id: 'yuddha',
    slug: 'yuddha',
    name: 'Yuddha Kanda',
    subtitle: 'Book of War',
    description: 'The great war in Lanka and Rama\'s triumphant return.',
    chapterCount: 128,
    sortOrder: 6,
    image: require('../../assets/kandas/yuddha.png'),
  },
];

export function getKanda(id: TKanda): KandaMeta | undefined {
  return KANDAS.find((k) => k.id === id);
}

export function getKandaName(id: TKanda | string): string {
  return KANDAS.find((k) => k.id === id)?.name ?? String(id);
}

export const KANDA_CHAPTER_LENGTH: Record<TKanda, number> = {
  bala: 77,
  ayodhya: 119,
  aranya: 75,
  kishkindha: 67,
  sundara: 68,
  yuddha: 128,
};

export const APP_NAME = 'Ramam';
export const APP_TAGLINE = 'Ancient Wisdom, Daily Reflections';
export const APP_EST = 'EST. 2026';
