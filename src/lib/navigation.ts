import { router, type Href } from 'expo-router';

import { routes } from '@/lib/routes';
import type { TKanda } from '@/types/content';

/** Go back in history, or replace with a fallback when there is no stack. */
export function goBack(fallback?: Href) {
  if (router.canGoBack()) {
    router.back();
    return;
  }

  if (fallback) {
    router.replace(fallback as never);
  }
}

export function goBackOr(fallback: Href) {
  goBack(fallback);
}

export function openTab(href: Href) {
  router.navigate(href as never);
}

export function openScreen(href: Href) {
  router.push(href as never);
}

export function openChapter(kanda: TKanda, sarga: string | number) {
  openScreen(routes.chapter(kanda, sarga));
}

export function openKanda(kanda: TKanda) {
  openScreen(routes.kanda(kanda));
}

export function openCharacter(id: string) {
  openScreen(routes.character(id));
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
