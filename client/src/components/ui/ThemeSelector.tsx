import React, { useContext, useCallback, useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { ThemeContext } from '~/hooks';

declare global {
  interface Window {
    lastThemeChange?: number;
  }
}

const Theme = ({ theme, onChange }: { theme: string; onChange: (value: string) => void }) => {
  const themeIcons: Record<string, React.ReactNode> = {
    system: <Monitor className="h-5 w-5" aria-hidden="true" />,
    dark: <Moon className="h-5 w-5" aria-hidden="true" />,
    light: <Sun className="h-5 w-5" aria-hidden="true" />,
  };

  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  const label = `Switch to ${nextTheme} theme`;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        onChange(nextTheme);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextTheme, onChange]);

  return (
    <button
      className="flex items-center gap-2 rounded-lg p-2 text-text-primary transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-xheavy"
      aria-label={label}
      aria-keyshortcuts="Ctrl+Shift+T"
      onClick={(e) => {
        e.preventDefault();
        onChange(nextTheme);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onChange(nextTheme);
        }
      }}
    >
      {themeIcons[theme] ?? themeIcons.system}
    </button>
  );
};

const ThemeSelector = ({ returnThemeOnly }: { returnThemeOnly?: boolean }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [announcement, setAnnouncement] = useState('');

  const changeTheme = useCallback(
    (value: string) => {
      const now = Date.now();
      if (typeof window.lastThemeChange === 'number' && now - window.lastThemeChange < 500) {
        return;
      }
      window.lastThemeChange = now;

      setTheme(value);
      setAnnouncement(value === 'dark' ? 'Dark theme enabled' : 'Light theme enabled');
    },
    [setTheme],
  );

  useEffect(() => {
    if (theme === 'system') {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDarkScheme ? 'dark' : 'light');
    }
  }, [theme, setTheme]);

  useEffect(() => {
    if (announcement) {
      const timeout = setTimeout(() => setAnnouncement(''), 1000);
      return () => clearTimeout(timeout);
    }
  }, [announcement]);

  return (
    <>
      <Theme theme={theme} onChange={changeTheme} />
      {!returnThemeOnly && announcement && (
        <div aria-live="polite" className="sr-only">
          {announcement}
        </div>
      )}
    </>
  );
};

export default ThemeSelector;
