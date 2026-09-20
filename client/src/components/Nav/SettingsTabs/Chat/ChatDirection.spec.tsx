import 'test/matchMedia.mock';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { RecoilRoot } from 'recoil';
import ChatDirection from './ChatDirection';

describe('ChatDirection', () => {
  const renderSelector = () =>
    render(
      <RecoilRoot>
        <ChatDirection />
      </RecoilRoot>,
    );

  it('renders LTR selected by default and switches to RTL', () => {
    const { getByTestId, getByRole } = renderSelector();

    expect(getByTestId('chatDirection')).toHaveAttribute('role', 'radiogroup');
    expect(getByRole('radio', { name: 'Left to Right' })).toHaveAttribute('aria-checked', 'true');

    fireEvent.click(getByRole('radio', { name: 'Right to Left' }));
    expect(getByRole('radio', { name: 'Right to Left' })).toHaveAttribute('aria-checked', 'true');
    expect(getByRole('radio', { name: 'Left to Right' })).toHaveAttribute('aria-checked', 'false');
  });
});
