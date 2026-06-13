import { KANDAS } from '@/constants/kandas';
import { getChaptersOfKanda } from '@/lib/content';
import { getSarga } from '@/lib/content';
import { stripHtml } from '@/utils/html';
import type { TKanda } from '@/types/content';

const REFLECTIONS = [
  'How does the pursuit of dharma shape the choices we make when duty and desire pull in different directions?',
  'Where in your life do patience and restraint ask more of you than action?',
  'What does rightful conduct look like when no one is watching?',
  'How might exile—literal or inner—become a place of growth rather than loss?',
  'When loyalty to family conflicts with loyalty to truth, how do you choose?',
  'What would it mean to serve others without losing yourself?',
  'Where do you see grace in unexpected companions on your path?',
  'How does grief, when honored, open the way to clarity?',
  'What promise would you keep even at great personal cost?',
  'Where in daily life can small acts of courage mirror the epic?',
];

type ChapterRef = { kanda: TKanda; sarga: string };

const ALL_CHAPTERS: ChapterRef[] = KANDAS.flatMap((kanda) =>
  getChaptersOfKanda(kanda.id).map((chapter) => ({
    kanda: chapter.kanda as TKanda,
    sarga: chapter.sarga,
  }))
);

function dateSeed(date: Date): number {
  const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export type DailyWisdom = {
  dateKey: string;
  issueNumber: number;
  kanda: TKanda;
  sarga: string;
  title: string;
  verseHtml: string;
  versePlain: string;
  overview: string;
  reflection: string;
  kandaName: string;
};

export function formatDispatchDate(date = new Date()): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getIssueNumber(date = new Date()): number {
  const start = new Date('2026-01-01T00:00:00');
  const ms = date.getTime() - start.getTime();
  return Math.max(1, Math.floor(ms / (1000 * 60 * 60 * 24)) + 1);
}

export function getDailyWisdom(date = new Date()): DailyWisdom | null {
  const seed = dateSeed(date);
  const chapter = ALL_CHAPTERS[seed % ALL_CHAPTERS.length];
  if (!chapter) return null;

  const sarga = getSarga(chapter.kanda, chapter.sarga);
  if (!sarga) return null;

  const verseBlock =
    sarga.content.find((block) => block.type === 'verse') ??
    sarga.content.find((block) => block.type === 'commentary') ??
    sarga.content[0];

  if (!verseBlock) return null;

  const kandaName = KANDAS.find((k) => k.id === chapter.kanda)?.name ?? chapter.kanda;
  const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  return {
    dateKey,
    issueNumber: getIssueNumber(date),
    kanda: chapter.kanda,
    sarga: chapter.sarga,
    title: sarga.title,
    verseHtml: verseBlock.text,
    versePlain: stripHtml(verseBlock.text).slice(0, 280),
    overview: stripHtml(sarga.overview).slice(0, 200),
    reflection: REFLECTIONS[seed % REFLECTIONS.length],
    kandaName,
  };
}
