import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders list header', () => {
  render(<App />);
  const headerElement = screen.getByText(/List of participants/i);
  expect(headerElement).toBeInTheDocument();
});
