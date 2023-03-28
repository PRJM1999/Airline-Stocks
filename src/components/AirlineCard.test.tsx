import React from 'react';
import { render } from '@testing-library/react';
import { AirlineCard } from './AirlineCard';
import '@testing-library/jest-dom';

describe('AirlineCard', () => {
  it('renders the airline code and country', () => {
    const airline = {
      code: 'AA',
      Country: 'USA',
    };

    const { getByText } = render(<AirlineCard airline={airline} />);

    expect(getByText('AA (USA)')).toBeInTheDocument();
  });

  it('renders the stock change with an up arrow and green text if stock_2023 is positive', () => {
    const airline = {
      stock_2023: 5,
    };

    const { getByText } = render(<AirlineCard airline={airline} />);

    expect(getByText('Stock Change 2023:')).toBeInTheDocument();
    expect(getByText('5%')).toHaveClass('text-green-500');
  });

  it('renders the stock change with a down arrow and red text if stock_2023 is negative', () => {
    const airline = {
      stock_2023: -5,
    };

    const { getByText } = render(<AirlineCard airline={airline} />);

    expect(getByText('Stock Change 2023:')).toBeInTheDocument();
    expect(getByText('-5%')).toHaveClass('text-red-500');
  });

  it('renders the number of passengers carried', () => {
    const airline = {
      passengers_carried: 1000000,
    };

    const { getByText } = render(<AirlineCard airline={airline} />);

    expect(getByText('Passengers carried:')).toBeInTheDocument();
    expect(getByText('1000000')).toBeInTheDocument();
  });
});