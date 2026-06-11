import type { ChapterMeta, Sarga, TKanda } from '@/types/content';
import { sargaContentMap } from '@/generated/sargaContentMap';

const chaptersByKanda: Record<TKanda, ChapterMeta[]> = {
  bala: require('../../assets/data/kanda/bala/chapters.json'),
  ayodhya: require('../../assets/data/kanda/ayodhya/chapters.json'),
  aranya: require('../../assets/data/kanda/aranya/chapters.json'),
  kishkindha: require('../../assets/data/kanda/kishkindha/chapters.json'),
  sundara: require('../../assets/data/kanda/sundara/chapters.json'),
  yuddha: require('../../assets/data/kanda/yuddha/chapters.json'),
};

export function getChaptersOfKanda(kanda: TKanda): ChapterMeta[] {
  return chaptersByKanda[kanda];
}

export function getSarga(kanda: TKanda, sargaNum: string): Sarga | null {
  const key = `${kanda}-${sargaNum}`;
  return sargaContentMap[key] ?? null;
}

export function getSargaKey(kanda: TKanda, sargaNum: number): string {
  return `${kanda}-${sargaNum}`;
}
