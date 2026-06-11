import MiniSearch from 'minisearch';

import { searchDocuments, type SearchDocument } from '@/generated/searchIndex';

export type SearchResult = SearchDocument & {
  score: number;
  matchField: 'title' | 'overview' | 'body';
  excerpt: string;
};

let engine: MiniSearch<SearchDocument> | null = null;

function getEngine(): MiniSearch<SearchDocument> {
  if (!engine) {
    engine = new MiniSearch<SearchDocument>({
      fields: ['title', 'overview', 'body'],
      storeFields: ['kanda', 'sarga', 'title', 'overview', 'body'],
      searchOptions: {
        boost: { title: 4, overview: 2, body: 1 },
        fuzzy: 0.15,
        prefix: true,
      },
    });
    engine.addAll(searchDocuments);
  }

  return engine;
}

function excerptFor(doc: SearchDocument, query: string): { field: SearchResult['matchField']; text: string } {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const fields: Array<{ key: SearchResult['matchField']; text: string }> = [
    { key: 'title', text: doc.title },
    { key: 'overview', text: doc.overview },
    { key: 'body', text: doc.body },
  ];

  for (const field of fields) {
    const lower = field.text.toLowerCase();
    const hit = terms.find((term) => lower.includes(term));
    if (!hit) continue;

    const index = lower.indexOf(hit);
    const start = Math.max(0, index - 60);
    const end = Math.min(field.text.length, index + hit.length + 80);
    const slice = field.text.slice(start, end).trim();
    const prefix = start > 0 ? '…' : '';
    const suffix = end < field.text.length ? '…' : '';
    return { field: field.key, text: `${prefix}${slice}${suffix}` };
  }

  return { field: 'overview', text: doc.overview.slice(0, 140) };
}

export function searchChapters(query: string, limit = 40): SearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const results = getEngine().search(trimmed);

  return results.slice(0, limit).map((result) => {
    const doc: SearchDocument = {
      id: String(result.id),
      kanda: result.kanda as SearchDocument['kanda'],
      sarga: String(result.sarga),
      title: String(result.title),
      overview: String(result.overview),
      body: String(result.body),
    };
    const { field, text } = excerptFor(doc, trimmed);

    return {
      ...doc,
      score: result.score,
      matchField: field,
      excerpt: text,
    };
  });
}
