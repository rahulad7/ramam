import type { TKanda } from '@/types/content';

export type Highlight = {
  id: string;
  kanda: TKanda;
  sarga: string;
  blockIndex: number;
  blockType: string;
  excerpt: string;
  note?: string;
  createdAt: string;
};
