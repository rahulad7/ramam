import type { TKanda } from '@/types/content';

export type Bookmark = {
  id: string;
  kanda: TKanda;
  sarga: string;
  title: string;
  createdAt: string;
};
