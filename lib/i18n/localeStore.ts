import type { Locale } from "@/lib/i18n/translations"

const LOCALE_STORAGE_KEY = "solid-locale"

let currentLocale: Locale = "ht"
const listeners = new Set<() => void>()

if (typeof window !== "undefined") {
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored === "fr") {
    currentLocale = "fr"
  }
}

export function subscribe(callback: () => void) {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

export function getSnapshot(): Locale {
  return currentLocale
}

/**
 * Toujours "ht" pendant le rendu serveur (DESIGN.md §6 : créole par défaut).
 * useSyncExternalStore bascule vers getSnapshot() après l'hydratation sans
 * déclencher d'avertissement de mismatch — c'est exactement le problème
 * qu'il résout (état externe qui peut différer entre serveur et client).
 */
export function getServerSnapshot(): Locale {
  return "ht"
}

export function setStoredLocale(next: Locale) {
  currentLocale = next
  window.localStorage.setItem(LOCALE_STORAGE_KEY, next)
  listeners.forEach((listener) => listener())
}
