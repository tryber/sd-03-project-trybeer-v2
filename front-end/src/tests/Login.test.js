import React from 'react';
import { cleanup, fireEvent, waitForDomChange } from '@testing-library/react';
import Register from '../pages/Login/Register';
import Login from '../pages/Login/Login';
import renderWithContext from './services/renderWithContext';

afterEach(cleanup);

describe('Login and register tests', () => {
  test('Register user', async () => {
    const { getByTestId, history } = renderWithContext(<Register />, '/register');

    const nameInput = getByTestId('signup-name');
    const emailInput = getByTestId('signup-email');
    const passwordInput = getByTestId('signup-password');
    const signupBtn = getByTestId('signup-btn');

    fireEvent.change(nameInput, { target: { value: 'Henrique Rezende' } })
    fireEvent.change(emailInput, { target: { value: 'asdf@asdf.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })
    fireEvent.click(signupBtn);

    await waitForDomChange();

    expect(history.location.pathname).toBe('/products');
  });

  test('If user is not admin, redirect to /products', async() => {
    const { getByTestId, history } = renderWithContext(<Login />, '/login');

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const signinBtn = getByTestId('signin-btn');

    fireEvent.change(emailInput, { target: { value: 'asdf@asdf.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })
    fireEvent.click(signinBtn);

    await waitForDomChange();

    expect(history.location.pathname).toBe('/products');
  });

  test('If user is admin, redirect to /admin/orders', async() => {
    const { getByTestId, history } = renderWithContext(<Login />, '/login');

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const signinBtn = getByTestId('signin-btn');

    fireEvent.change(emailInput, { target: { value: 'tryber@trybe.com.br' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })
    fireEvent.click(signinBtn);

    await waitForDomChange();

    expect(history.location.pathname).toBe('/admin/orders');
  });
});
