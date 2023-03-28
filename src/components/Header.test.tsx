import React from 'react';
import { render, screen, fireEvent, getByText } from '@testing-library/react';
import { MemoryRouter, Route, Routes, Router } from 'react-router-dom';
import Header from './Header';
import { createMemoryHistory } from 'history';

describe('Header', () => {
  it('navigates to home page when home button is clicked', () => {
    const history = createMemoryHistory({ initialEntries: ['/casestudy'] });

    const { getByText } = render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path="*" element={<Header />} />
        </Routes>
      </Router>
    );

    fireEvent.click(getByText('Home'));

    expect(history.location.pathname).toBe('/');
  });

  it('navigates to case studies page when case studies button is clicked', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });

    const { getByText } = render(
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path="*" element={<Header />} />
        </Routes>
      </Router>
    );

    fireEvent.click(getByText('Case Studies'));

    expect(history.location.pathname).toBe('/casestudy');
  });
});
