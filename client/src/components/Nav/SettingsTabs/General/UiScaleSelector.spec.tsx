import 'test/matchMedia.mock';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { RecoilRoot } from 'recoil';
import UiScaleSelector from './UiScaleSelector';
import { UI_SCALE_DEFAULT } from '~/utils/theme';

describe('UiScaleSelector', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.style.removeProperty('--ui-scale');
  });

  const renderSelector = () =>
    render(
      <RecoilRoot>
        <UiScaleSelector />
      </RecoilRoot>,
    );

  it('renders the current scale and steps up and down', () => {
    const { getByTestId } = renderSelector();

    expect(getByTestId('ui-scale-value')).toHaveTextContent(`${UI_SCALE_DEFAULT}%`);

    fireEvent.click(getByTestId('ui-scale-increase'));
    expect(getByTestId('ui-scale-value')).toHaveTextContent('110%');
    expect(document.documentElement.style.getPropertyValue('--ui-scale')).toBe('1.1');

    fireEvent.click(getByTestId('ui-scale-decrease'));
    expect(getByTestId('ui-scale-value')).toHaveTextContent('100%');
    expect(document.documentElement.style.getPropertyValue('--ui-scale')).toBe('1');
  });

  it('disables the decrease control at the minimum stop', () => {
    localStorage.setItem('uiScale', JSON.stringify(50));
    const { getByTestId } = renderSelector();

    expect(getByTestId('ui-scale-value')).toHaveTextContent('50%');
    expect(getByTestId('ui-scale-decrease')).toBeDisabled();
    expect(getByTestId('ui-scale-increase')).not.toBeDisabled();
  });

  it('disables the increase control at the maximum stop', () => {
    localStorage.setItem('uiScale', JSON.stringify(150));
    const { getByTestId } = renderSelector();

    expect(getByTestId('ui-scale-value')).toHaveTextContent('150%');
    expect(getByTestId('ui-scale-increase')).toBeDisabled();
    fireEvent.click(getByTestId('ui-scale-increase'));
    expect(getByTestId('ui-scale-value')).toHaveTextContent('150%');
  });
});
