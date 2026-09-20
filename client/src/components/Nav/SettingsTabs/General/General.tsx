import React, { useContext, useCallback } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { ThemeContext, useLocalize } from '~/hooks';
import SegmentedControl from '../../Settings/SegmentedControl';
import { Dropdown } from '~/components';

export const ThemeSelector = ({
  theme,
  onChange,
}: {
  theme: string;
  onChange: (value: string) => void;
}) => {
  const localize = useLocalize();

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">{localize('com_nav_theme')}</div>
      <SegmentedControl
        value={theme}
        onChange={onChange}
        ariaLabel={localize('com_nav_theme')}
        testId="theme-selector"
        options={[
          {
            value: 'system',
            label: localize('com_nav_theme_system'),
            icon: <Monitor className="h-3.5 w-3.5" aria-hidden="true" />,
          },
          {
            value: 'light',
            label: localize('com_nav_theme_light'),
            icon: <Sun className="h-3.5 w-3.5" aria-hidden="true" />,
          },
          {
            value: 'dark',
            label: localize('com_nav_theme_dark'),
            icon: <Moon className="h-3.5 w-3.5" aria-hidden="true" />,
          },
        ]}
      />
    </div>
  );
};

export const LangSelector = ({
  langcode,
  onChange,
}: {
  langcode: string;
  onChange: (value: string) => void;
}) => {
  const localize = useLocalize();

  const languageOptions = [
    { value: 'auto', label: localize('com_nav_lang_auto') },
    { value: 'en-US', label: localize('com_nav_lang_english') },
    { value: 'zh-Hans', label: localize('com_nav_lang_chinese') },
    { value: 'zh-Hant', label: localize('com_nav_lang_traditional_chinese') },
    { value: 'ar-EG', label: localize('com_nav_lang_arabic') },
    { value: 'de-DE', label: localize('com_nav_lang_german') },
    { value: 'es-ES', label: localize('com_nav_lang_spanish') },
    { value: 'et-EE', label: localize('com_nav_lang_estonian') },
    { value: 'fa-IR', label: localize('com_nav_lang_persian') },
    { value: 'fr-FR', label: localize('com_nav_lang_french') },
    { value: 'he-HE', label: localize('com_nav_lang_hebrew') },
    { value: 'hu-HU', label: localize('com_nav_lang_hungarian') },
    { value: 'it-IT', label: localize('com_nav_lang_italian') },
    { value: 'pl-PL', label: localize('com_nav_lang_polish') },
    { value: 'pt-BR', label: localize('com_nav_lang_brazilian_portuguese') },
    { value: 'pt-PT', label: localize('com_nav_lang_portuguese') },
    { value: 'ru-RU', label: localize('com_nav_lang_russian') },
    { value: 'ja-JP', label: localize('com_nav_lang_japanese') },
    { value: 'ka-GE', label: localize('com_nav_lang_georgian') },
    { value: 'sv-SE', label: localize('com_nav_lang_swedish') },
    { value: 'ko-KR', label: localize('com_nav_lang_korean') },
    { value: 'vi-VN', label: localize('com_nav_lang_vietnamese') },
    { value: 'th-TH', label: localize('com_nav_lang_thai') },
    { value: 'tr-TR', label: localize('com_nav_lang_turkish') },
    { value: 'nl-NL', label: localize('com_nav_lang_dutch') },
    { value: 'id-ID', label: localize('com_nav_lang_indonesia') },
    { value: 'fi-FI', label: localize('com_nav_lang_finnish') },
  ];

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">{localize('com_nav_language')}</div>

      <Dropdown
        value={langcode}
        onChange={onChange}
        sizeClasses="[--anchor-max-height:16rem]"
        options={languageOptions}
        className="z-50"
      />
    </div>
  );
};

function General() {
  const { theme, setTheme } = useContext(ThemeContext);
  const changeTheme = useCallback((value: string) => setTheme(value), [setTheme]);

  return (
    <div className="flex flex-col gap-3 p-1 text-sm text-text-primary">
      <ThemeSelector theme={theme} onChange={changeTheme} />
    </div>
  );
}

export default React.memo(General);
