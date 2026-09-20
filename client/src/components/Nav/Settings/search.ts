import type { SettingEntry, SettingsContextValue } from './types';

export function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

export function matchesQuery(
  query: string,
  haystack: { label: string; keywords?: string[] },
): boolean {
  const q = normalize(query);
  if (q.length === 0) {
    return true;
  }
  if (normalize(haystack.label).includes(q)) {
    return true;
  }
  return (haystack.keywords ?? []).some((keyword) => normalize(keyword).includes(q));
}

export interface SearchResult {
  entry: SettingEntry;
  label: string;
}

export function filterSettings(
  entries: SettingEntry[],
  query: string,
  ctx: SettingsContextValue,
  localize: (key: SettingEntry['labelKey']) => string,
): SearchResult[] {
  const results: SearchResult[] = [];
  for (const entry of entries) {
    if (entry.show && !entry.show(ctx)) {
      continue;
    }
    const label = localize(entry.labelKey);
    if (matchesQuery(query, { label, keywords: entry.keywords })) {
      results.push({ entry, label });
    }
  }
  return results;
}
