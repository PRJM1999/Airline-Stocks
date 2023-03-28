import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from './Footer';

describe('Footer', () => {
  it('renders the footer', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('© 2023 Airline Stocks')).toBeInTheDocument();
  });
});