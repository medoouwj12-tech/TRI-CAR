/** Persist hero search fields for pre-filling the booking form. */

export const SEARCH_PREFS_KEY = 'fc_search_prefs';

export type SearchPrefs = {
  pickupLocation?: string;
  dropoffLocation?: string;
  date?: string;
  passengers?: number;
};

export function saveSearchPrefs(prefs: SearchPrefs): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(SEARCH_PREFS_KEY, JSON.stringify(prefs));
  } catch {
    /* ignore quota / private mode */
  }
}

export function loadSearchPrefs(): SearchPrefs | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(SEARCH_PREFS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SearchPrefs;
  } catch {
    return null;
  }
}
