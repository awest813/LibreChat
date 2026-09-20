import { useMemo } from 'react';
import type { SettingsContextValue, SettingsTab, SettingEntry } from './types';
import { filterSettings } from './search';
import { useLocalize } from '~/hooks';
import { registry } from './registry';
import Section from './Section';
import { TABS } from './types';

interface ContentProps {
  activeTab: SettingsTab;
  query: string;
  ctx: SettingsContextValue;
}

function visible(entry: SettingEntry, ctx: SettingsContextValue): boolean {
  return !entry.show || entry.show(ctx);
}

function SettingRow({ entry }: { entry: SettingEntry }) {
  const Cmp = entry.Component;
  if (entry.bare) {
    return (
      <div key={entry.id} data-setting-id={entry.id}>
        <Cmp />
      </div>
    );
  }
  return (
    <div key={entry.id} className="px-4 py-3" data-setting-id={entry.id}>
      <Cmp />
    </div>
  );
}

export default function Content({ activeTab, query, ctx }: ContentProps) {
  const localize = useLocalize();
  const tab = TABS.find((item) => item.id === activeTab);

  const results = useMemo(
    () => (query.trim() ? filterSettings(registry, query, ctx, localize) : null),
    [query, ctx, localize],
  );

  if (results !== null) {
    return (
      <div aria-label={localize('com_ui_settings_results_aria')} aria-live="polite">
        {results.length === 0 ? (
          <p className="p-2 text-sm text-text-secondary">
            {localize('com_ui_settings_no_results')}
          </p>
        ) : (
          <div className="divide-y divide-border-light overflow-hidden rounded-xl border border-border-light text-sm text-text-primary">
            {results.map(({ entry, label }) => {
              const Cmp = entry.Component;
              const tabMeta = TABS.find((item) => item.id === entry.tab);
              const sectionMeta = tabMeta?.sections.find((section) => section.id === entry.section);
              return (
                <div key={entry.id} className="px-4 py-3" data-setting-id={entry.id}>
                  <div className="mb-1.5 text-xs text-text-tertiary">
                    {tabMeta ? localize(tabMeta.labelKey) : ''}
                    {sectionMeta ? ` › ${localize(sectionMeta.labelKey)}` : ''}
                    {` · ${label}`}
                  </div>
                  <Cmp />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  if (!tab) {
    return null;
  }

  return (
    <div>
      {tab.sections.map((section) => {
        const entries = registry.filter(
          (entry) => entry.tab === activeTab && entry.section === section.id && visible(entry, ctx),
        );
        if (entries.length === 0) {
          return null;
        }

        if (entries.every((entry) => entry.bare)) {
          return (
            <section key={section.id} className="mb-7">
              <h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                {localize(section.labelKey)}
              </h3>
              {entries.map((entry) => (
                <SettingRow key={entry.id} entry={entry} />
              ))}
            </section>
          );
        }

        return (
          <Section key={section.id} heading={localize(section.labelKey)} danger={section.danger}>
            {entries.map((entry) => (
              <SettingRow key={entry.id} entry={entry} />
            ))}
          </Section>
        );
      })}
    </div>
  );
}
