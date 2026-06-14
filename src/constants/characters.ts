import type { ImageSourcePropType } from 'react-native';

import type { TKanda } from '@/types/content';

export type CharacterRole = 'hero' | 'ally' | 'sage' | 'monarch' | 'antagonist';

export type CharacterMeta = {
  id: string;
  name: string;
  epithet: string;
  role: CharacterRole;
  summary: string;
  bio: string;
  traits: string[];
  kanda: TKanda;
  startSarga: string;
  image: ImageSourcePropType;
};

export const CHARACTERS: CharacterMeta[] = [
  {
    id: 'rama',
    name: 'Rama',
    epithet: 'Prince of Ayodhya',
    role: 'hero',
    summary: 'The ideal king — dharma made visible in human form.',
    bio: 'Seventh avatar of Vishnu and eldest son of Dasharatha. Rama embodies righteousness, restraint, and compassion through exile, war, and rule. His journey from Ayodhya to the forest and back defines the moral spine of the epic.',
    traits: ['Dharma', 'Patience', 'Leadership'],
    kanda: 'bala',
    startSarga: '1',
    image: require('../../assets/characters/rama.png'),
  },
  {
    id: 'sita',
    name: 'Sita',
    epithet: 'Daughter of the Earth',
    role: 'hero',
    summary: 'Incarnation of Lakshmi; steadfast through trial and exile.',
    bio: 'Born from the earth and raised in Mithila, Sita chooses Rama as her husband and follows him into exile. Her abduction by Ravana sets the great war in motion; her fidelity and courage remain central to the story.',
    traits: ['Devotion', 'Fortitude', 'Grace'],
    kanda: 'bala',
    startSarga: '73',
    image: require('../../assets/characters/sita.png'),
  },
  {
    id: 'lakshmana',
    name: 'Lakshmana',
    epithet: 'The Ever-Watchful Brother',
    role: 'ally',
    summary: 'Rama\'s devoted brother and guardian in exile.',
    bio: 'Son of Sumitra and inseparable companion to Rama. Lakshmana accompanies the exile, protects Sita, and stands as the model of loyal service — sleepless, swift to act, and fierce in battle.',
    traits: ['Loyalty', 'Vigilance', 'Courage'],
    kanda: 'ayodhya',
    startSarga: '31',
    image: require('../../assets/characters/lakshmana.png'),
  },
  {
    id: 'hanuman',
    name: 'Hanuman',
    epithet: 'Son of the Wind',
    role: 'ally',
    summary: 'The devoted vanara who leaps oceans for dharma.',
    bio: 'Minister to Sugriva and supreme devotee of Rama. Hanuman\'s journey to Lanka, meeting with Sita, and burning of the city make Sundara Kanda the emotional heart of the epic for many readers.',
    traits: ['Bhakti', 'Strength', 'Wisdom'],
    kanda: 'kishkindha',
    startSarga: '1',
    image: require('../../assets/characters/hanuman.png'),
  },
  {
    id: 'ravana',
    name: 'Ravana',
    epithet: 'Lord of Lanka',
    role: 'antagonist',
    summary: 'A scholar-king undone by pride and desire.',
    bio: 'Ten-headed ruler of Lanka, master of the Vedas, and brother of Kubera. Ravana\'s power is immense, yet his abduction of Sita brings about his downfall — a study in brilliance without restraint.',
    traits: ['Power', 'Pride', 'Scholarship'],
    kanda: 'aranya',
    startSarga: '31',
    image: require('../../assets/characters/ravana.png'),
  },
  {
    id: 'dasharatha',
    name: 'Dasharatha',
    epithet: 'Emperor of Kosala',
    role: 'monarch',
    summary: 'The father whose promise shapes the exile.',
    bio: 'King of Ayodhya and father of Rama. Dasharatha\'s boons to Kaikeyi and his anguish at sending Rama to the forest open Ayodhya Kanda — a portrait of duty colliding with love.',
    traits: ['Honor', 'Grief', 'Kingship'],
    kanda: 'bala',
    startSarga: '8',
    image: require('../../assets/characters/dasharatha.png'),
  },
  {
    id: 'sugriva',
    name: 'Sugriva',
    epithet: 'King of Kishkindha',
    role: 'ally',
    summary: 'Exiled vanara king who allies with Rama.',
    bio: 'Brother of Vali and ruler of the monkey kingdom. Rama helps Sugriva regain his throne; in return Sugriva mobilizes the search for Sita across land and sea.',
    traits: ['Alliance', 'Recovery', 'Rule'],
    kanda: 'kishkindha',
    startSarga: '1',
    image: require('../../assets/characters/sugriva.png'),
  },
  {
    id: 'valmiki',
    name: 'Valmiki',
    epithet: 'The First Poet',
    role: 'sage',
    summary: 'Hermit-sage who receives and records the epic.',
    bio: 'Adi Kavi — the first poet. Narada instructs Valmiki to compose the Ramayana; the epic unfolds through his vision, making him both witness and author of the story we read.',
    traits: ['Vision', 'Sanskrit', 'Transmission'],
    kanda: 'bala',
    startSarga: '1',
    image: require('../../assets/characters/valmiki.png'),
  },
];

export function getCharacter(id: string): CharacterMeta | undefined {
  return CHARACTERS.find((c) => c.id === id);
}

export const ROLE_LABELS: Record<CharacterRole, string> = {
  hero: 'Hero',
  ally: 'Ally',
  sage: 'Sage',
  monarch: 'Monarch',
  antagonist: 'Antagonist',
};
