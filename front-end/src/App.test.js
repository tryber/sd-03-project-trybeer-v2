import React from 'react';
import '@testing-library/jest-dom';
import renderWithRouter from './renderWithRouter';
import App from './App';
import LoginPage from './pages/Login/LoginPage';

describe('renders loginPage', () => {
  it('should ', () => {
    const { getByTestId } = renderWithRouter(<App><LoginPage /></App>);
    expect(getByTestId('password-input')).toBeInTheDocument();
  });
});
