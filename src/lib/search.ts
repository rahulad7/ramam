import MiniSearch, { type AsPlainObject } from 'minisearch';

import engineJson from '../../assets/search/engine.json';
import type { SearchDocument } from '@/generated/searchIndex';

export type SearchResult = {
  id: string;
  kanda: SearchDocument['kanda'];
  sarga: string;
  title: string;
  matchField: 'title' | 'overview' | 'body';
  excerpt: string;
  score: number;
};

const SEARCH_FIELDS = ['title', 'overview', 'body'] as const;
const STORE_FIELDS = ['kanda', 'sarga', 'title', 'overview', 'body'] as const;

const ENGINE_OPTIONS = {
  fields: [...SEARCH_FIELDS],
  storeFields: [...STORE_FIELDS],
  searchOptions: {
    boost: { title: 5, overview: 2, body: 1 },
    fuzzy: 0.12,
    prefix: true,
  },
};

let engine: MiniSearch<SearchDocument> | null = null;
let engineReady: Promise<void> | null = null;

function loadEngine(): Promise<MiniSearch<SearchDocument>> {
  if (typeof engineJson === 'string') {
    return MiniSearch.loadJSONAsync<SearchDocument>(engineJson, ENGINE_OPTIONS);
  }

  return MiniSearch.loadJSAsync<SearchDocument>(engineJson as AsPlainObject, ENGINE_OPTIONS);
}

export function warmSearchIndex(): Promise<void> {
  if (engine) return Promise.resolve();
  if (!engineReady) {
    engineReady = loadEngine().then((loaded) => {
      engine = loaded;
    });
  }
  return engineReady;
}

async function getEngine(): Promise<MiniSearch<SearchDocument>> {
  await warmSearchIndex();
  return engine!;
}

function excerptFor(
  doc: Pick<SearchDocument, 'title' | 'overview' | 'body'>,
  query: string
): { field: SearchResult['matchField']; text: string } {
  const term = query.toLowerCase().split(/\s+/).filter(Boolean)[0] ?? '';
  if (!term) {
    return { field: 'overview', text: doc.overview.slice(0, 140) };
  }

  const fields: Array<{ key: SearchResult['matchField']; text: string }> = [
    { key: 'title', text: doc.title },
    { key: 'overview', text: doc.overview },
    { key: 'body', text: doc.body },
  ];

  for (const field of fields) {
    const lower = field.text.toLowerCase();
    const index = lower.indexOf(term);
    if (index === -1) continue;

    const start = Math.max(0, index - 60);
    const end = Math.min(field.text.length, index + term.length + 80);
    const slice = field.text.slice(start, end).trim();
    return {
      field: field.key,
      text: `${start > 0 ? '…' : ''}${slice}${end < field.text.length ? '…' : ''}`,
    };
  }

  return { field: 'overview', text: doc.overview.slice(0, 140) };
}

export async function searchChapters(query: string, limit = 30): Promise<SearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const index = await getEngine();
  let results = index.search(trimmed, { fuzzy: 0.12, prefix: true });

  if (results.length === 0 && trimmed.length > 3) {
    results = index.search(trimmed, { fuzzy: 0.2, prefix: true });
  }

  return results.slice(0, limit).map((result) => {
    const doc = {
      id: String(result.id),
      kanda: result.kanda as SearchDocument['kanda'],
      sarga: String(result.sarga),
      title: String(result.title),
      overview: String(result.overview),
      body: String(result.body),
    };
    const { field, text } = excerptFor(doc, trimmed);

    return {
      id: doc.id,
      kanda: doc.kanda,
      sarga: doc.sarga,
      title: doc.title,
      score: result.score,
      matchField: field,
      excerpt: text,
    };
  });
}

export function isSearchIndexReady() {
  return engine !== null;
}
