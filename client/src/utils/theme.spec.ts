import { UI_SCALE_DEFAULT, applyUiScale, clampUiScale, snapUiScale, stepUiScale } from './theme';

describe('UI scale helpers', () => {
  beforeEach(() => {
    document.documentElement.style.removeProperty('--ui-scale');
  });

  it('clamps non-finite and out-of-range values', () => {
    expect(clampUiScale(undefined)).toBe(UI_SCALE_DEFAULT);
    expect(clampUiScale('nope')).toBe(UI_SCALE_DEFAULT);
    expect(clampUiScale(Number.NaN)).toBe(UI_SCALE_DEFAULT);
    expect(clampUiScale(10)).toBe(50);
    expect(clampUiScale(200)).toBe(150);
    expect(clampUiScale(87.4)).toBe(87);
  });

  it('snaps to the nearest stop, including off-stop values', () => {
    expect(snapUiScale(100)).toBe(100);
    expect(snapUiScale(104)).toBe(100);
    expect(snapUiScale(116)).toBe(110);
    expect(snapUiScale(122)).toBe(125);
    expect(snapUiScale(40)).toBe(50);
    expect(snapUiScale(999)).toBe(150);
  });

  it('steps to range ends without overshooting', () => {
    expect(stepUiScale(50, -1)).toBe(50);
    expect(stepUiScale(150, 1)).toBe(150);
    expect(stepUiScale(100, 1)).toBe(110);
    expect(stepUiScale(110, 1)).toBe(125);
    expect(stepUiScale(125, -1)).toBe(110);
    expect(stepUiScale(103, 1)).toBe(110);
  });

  it('applies a CSS custom property for the snapped scale', () => {
    expect(applyUiScale(125)).toBe(125);
    expect(document.documentElement.style.getPropertyValue('--ui-scale')).toBe('1.25');
    expect(applyUiScale('bad')).toBe(UI_SCALE_DEFAULT);
    expect(document.documentElement.style.getPropertyValue('--ui-scale')).toBe('1');
  });
});
