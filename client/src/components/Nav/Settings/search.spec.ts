import { filterSettings, matchesQuery, normalize } from './search';
import type { SettingEntry, SettingsContextValue } from './types';
import { SettingsTabValues } from 'librechat-data-provider';

const ctx: SettingsContextValue = {
  hasAccessToPrompts: true,
  hasAccessToMultiConvo: false,
  isLocalProvider: true,
  twoFactorEnabled: false,
};

const entries: SettingEntry[] = [
  {
    id: 'theme',
    tab: SettingsTabValues.GENERAL,
    section: 'appearance',
    labelKey: 'com_nav_theme',
    keywords: ['dark', 'light', 'appearance'],
    Component: () => null,
  },
  {
    id: 'plusCommand',
    tab: SettingsTabValues.COMMANDS,
    section: 'commands',
    labelKey: 'com_nav_plus_command',
    keywords: ['multi'],
    Component: () => null,
    show: (value) => value.hasAccessToMultiConvo,
  },
];

describe('settings search', () => {
  it('normalizes case and diacritics', () => {
    expect(normalize('  Thème  ')).toBe('theme');
  });

  it('matches labels and keywords', () => {
    expect(matchesQuery('dark', { label: 'Theme', keywords: ['dark', 'light'] })).toBe(true);
    expect(matchesQuery('zoom', { label: 'UI Scale', keywords: ['zoom'] })).toBe(true);
    expect(matchesQuery('xyz', { label: 'Theme', keywords: ['dark'] })).toBe(false);
  });

  it('filters hidden entries and returns localized labels', () => {
    const localize = (key: SettingEntry['labelKey']) =>
      key === 'com_nav_theme' ? 'Theme' : 'Plus command';

    expect(filterSettings(entries, 'theme', ctx, localize)).toEqual([
      { entry: entries[0], label: 'Theme' },
    ]);
    expect(filterSettings(entries, 'plus', ctx, localize)).toEqual([]);
    expect(
      filterSettings(entries, 'multi', { ...ctx, hasAccessToMultiConvo: true }, localize),
    ).toHaveLength(1);
  });
});
