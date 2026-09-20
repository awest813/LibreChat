import 'test/matchMedia.mock';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeSelector } from './General';
import { RecoilRoot } from 'recoil';

describe('ThemeSelector', () => {
  let mockOnChange: jest.Mock;

  beforeEach(() => {
    mockOnChange = jest.fn();
  });

  const renderSelector = (theme = 'system') =>
    render(
      <RecoilRoot>
        <ThemeSelector theme={theme} onChange={mockOnChange} />
      </RecoilRoot>,
    );

  it('renders a segmented control with the current theme selected', () => {
    const { getByText, getByRole, getByTestId } = renderSelector();

    expect(getByText('Theme')).toBeInTheDocument();
    expect(getByTestId('theme-selector')).toHaveAttribute('role', 'radiogroup');
    expect(getByRole('radio', { name: 'System' })).toHaveAttribute('aria-checked', 'true');
    expect(getByRole('radio', { name: 'Light' })).toHaveAttribute('aria-checked', 'false');
    expect(getByRole('radio', { name: 'Dark' })).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onChange when another theme is selected', () => {
    const { getByRole } = renderSelector();

    fireEvent.click(getByRole('radio', { name: 'Dark' }));
    expect(mockOnChange).toHaveBeenCalledWith('dark');
  });

  it('moves between options with arrow keys', () => {
    const { getByTestId } = renderSelector('light');

    fireEvent.keyDown(getByTestId('theme-selector'), { key: 'ArrowRight' });
    expect(mockOnChange).toHaveBeenCalledWith('dark');
  });
});
