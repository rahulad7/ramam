export type TKanda = 'bala' | 'ayodhya' | 'aranya' | 'kishkindha' | 'sundara' | 'yuddha';

export type SargaBlockType = 'verse' | 'commentary' | 'conceptual' | 'sanskrit';

export interface SargaBlock {
  type: SargaBlockType;
  text: string;
}

export interface ChapterMeta {
  id: string;
  kanda: string;
  sarga: string;
  chapter: string;
  title: string;
}

export interface Sarga {
  id: string;
  kanda: TKanda;
  sarga: string;
  title: string;
  chapter: string;
  overview: string;
  content: SargaBlock[];
}

export interface KandaMeta {
  id: TKanda;
  slug: TKanda;
  name: string;
  subtitle: string;
  description: string;
  chapterCount: number;
  sortOrder: number;
}

export type ThemeMode = 'light' | 'dark';
