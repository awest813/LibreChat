export const UI_SCALE_MIN = 50;
export const UI_SCALE_MAX = 150;
export const UI_SCALE_DEFAULT = 100;
export const UI_SCALE_STORAGE_KEY = 'uiScale';
export const UI_SCALE_STOPS = [50, 60, 70, 80, 90, 100, 110, 125, 150] as const;

export const applyFontSize = (val: string) => {
  const root = document.documentElement;
  const size = val.split('-')[1]; // This will be 'xs', 'sm', 'base', 'lg', or 'xl'

  switch (size) {
    case 'xs':
      root.style.setProperty('--markdown-font-size', '0.75rem'); // 12px
      break;
    case 'sm':
      root.style.setProperty('--markdown-font-size', '0.875rem'); // 14px
      break;
    case 'base':
      root.style.setProperty('--markdown-font-size', '1rem'); // 16px
      break;
    case 'lg':
      root.style.setProperty('--markdown-font-size', '1.125rem'); // 18px
      break;
    case 'xl':
      root.style.setProperty('--markdown-font-size', '1.25rem'); // 20px
      break;
  }
};

export const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs;
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return 'dark';
    }
  }

  return 'light'; // light theme as the default;
};

export function clampUiScale(value: unknown): number {
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n)) {
    return UI_SCALE_DEFAULT;
  }
  return Math.min(UI_SCALE_MAX, Math.max(UI_SCALE_MIN, Math.round(n)));
}

export function snapUiScale(value: unknown): number {
  const clamped = clampUiScale(value);
  let nearest: number = UI_SCALE_STOPS[0];
  let best = Number.POSITIVE_INFINITY;
  for (const stop of UI_SCALE_STOPS) {
    const distance = Math.abs(stop - clamped);
    if (distance < best) {
      best = distance;
      nearest = stop;
    }
  }
  return nearest;
}

export function stepUiScale(value: unknown, direction: -1 | 1): number {
  const current = snapUiScale(value);
  const index = UI_SCALE_STOPS.indexOf(current as (typeof UI_SCALE_STOPS)[number]);
  const nextIndex = Math.min(UI_SCALE_STOPS.length - 1, Math.max(0, index + direction));
  return UI_SCALE_STOPS[nextIndex];
}

export function applyUiScale(value: unknown): number {
  const scale = snapUiScale(value);
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--ui-scale', String(scale / 100));
  }
  return scale;
}

export function readStoredUiScale(): number {
  if (typeof window === 'undefined' || !window.localStorage) {
    return UI_SCALE_DEFAULT;
  }
  try {
    const raw = window.localStorage.getItem(UI_SCALE_STORAGE_KEY);
    if (raw == null) {
      return UI_SCALE_DEFAULT;
    }
    return snapUiScale(JSON.parse(raw));
  } catch {
    return UI_SCALE_DEFAULT;
  }
}
