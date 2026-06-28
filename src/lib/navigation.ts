import { router, type Href } from 'expo-router';

import { routes } from '@/lib/routes';
import type { TKanda } from '@/types/content';

export type NavigateOptions = {
  returnTo?: Href;
  blockIndex?: number;
};

/** Go back in history, or replace with a fallback when there is no stack. */
export function goBack(fallback?: Href) {
  if (router.canGoBack()) {
    router.back();
    return;
  }

  if (fallback) {
    router.navigate(fallback as never);
  }
}

export function goBackOr(fallback: Href) {
  goBack(fallback);
}

function stringifyHref(href: Href): string {
  return typeof href === 'string' ? href : String(href);
}

/** Jump to a screen outside the current nested stack (e.g. back to Bookmarks from a chapter). */
function goToReturnTarget(returnTo: Href) {
  router.navigate(returnTo as never);
}

/** Prefer an explicit return target over browser-style history. */
export function navigateBack(fallback: Href, returnTo?: string | null) {
  if (returnTo) {
    goToReturnTarget(returnTo as Href);
    return;
  }

  goBack(fallback);
}

/**
 * Navigate to a fixed parent route.
 * - replace: fast single-step back (chapter → kanda)
 * - pop: jump to a root screen without duplicating stack entries (kanda → library)
 */
export function navigateToParent(
  parent: Href,
  returnTo?: string | null,
  mode: 'replace' | 'pop' = 'replace'
) {
  if (returnTo) {
    goToReturnTarget(returnTo as Href);
    return;
  }

  if (mode === 'pop') {
    router.navigate(parent as never);
    return;
  }

  router.replace(parent as never);
}

export function openTab(href: Href) {
  router.navigate(href as never);
}

export function openScreen(href: Href, options?: NavigateOptions) {
  if (!options?.returnTo) {
    router.push(href as never);
    return;
  }

  const returnTo = stringifyHref(options.returnTo);
  const hrefStr = stringifyHref(href);

  if (hrefStr.includes('/characters/') && !hrefStr.endsWith('/characters')) {
    const id = hrefStr.split('/characters/')[1]?.split('?')[0];
    if (id) {
      router.push({
        pathname: '/(tabs)/characters/[id]',
        params: { id, returnTo },
      } as never);
      return;
    }
  }

  router.push({
    pathname: hrefStr,
    params: { returnTo },
  } as never);
}

export function openChapter(kanda: TKanda, sarga: string | number, options?: NavigateOptions) {
  const params: Record<string, string> = {
    kanda,
    sarga: String(sarga),
  };

  if (options?.returnTo) {
    params.returnTo = stringifyHref(options.returnTo);
  }

  if (options?.blockIndex !== undefined) {
    params.blockIndex = String(options.blockIndex);
  }

  const target = {
    pathname: '/(tabs)/library/[kanda]/[sarga]',
    params,
  } as never;

  // Cross-tab opens use navigate; in-library reading uses replace to avoid deep stacks.
  if (options?.returnTo) {
    router.navigate(target);
  } else {
    router.replace(target);
  }
}

export function openChapterFromHref(href: Href, options?: NavigateOptions) {
  const match = stringifyHref(href).match(/\/library\/([^/]+)\/([^/]+)$/);
  if (!match) return;

  openChapter(match[1] as TKanda, match[2], options);
}

export function openKanda(kanda: TKanda, options?: NavigateOptions) {
  openScreen(routes.kanda(kanda), options);
}

export function openCharacter(id: string, options?: NavigateOptions) {
  openScreen(routes.character(id), options);
}

export function popTabToRoot(tab: 'index' | 'library' | 'search' | 'profile' | 'characters') {
  const href =
    tab === 'index'
      ? routes.home
      : tab === 'library'
        ? routes.library
        : tab === 'search'
          ? routes.search
          : tab === 'profile'
            ? routes.profile
            : routes.characters;

  router.navigate(href as never);
}
