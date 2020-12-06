import React from 'react';
import '@testing-library/jest-dom';
import renderWithRouter from './renderWithRouter';
import App from './App';

describe('renders buttons', () => {
  it('should ', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getByTestId('password-input')).toBeInTheDocument();
  });
});
