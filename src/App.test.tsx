import React from 'react';
import { render, screen } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom'; // Import the toBeInTheDocument matcher
import App from './App';

expect.extend({ toBeInTheDocument }); // Extend the expect object with the toBeInTheDocument matcher

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
