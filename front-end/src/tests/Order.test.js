import React from 'react';
import { cleanup, fireEvent, waitForDomChange } from '@testing-library/react';
import products from './mocks/products';
import axios from 'axios';
import Products from '../pages/User/Products';
import renderWithContext from './services/renderWithContext';

const URLs = {
  'http://localhost:3001/products': products,
};

const user = {
  name: "Henrique Rezende",
  email: "asdf@asdf.com",
  role: "client",
  token: "OjE2MDI1MTg1MTQsImV4cCI6MTYwNTExMDUxNH0.BT2Sf_q_hB1ln4JPmDLMULp74oorhzoKBjcEE2tA6zI"
}

jest.spyOn(axios, 'get').mockImplementation((URL) => {
  console.log(URLs[URL])
  return Promise.resolve({
  ok: 200,
  data: URLs[URL],
})});

afterEach(cleanup);

describe('Order test tests', () => {
  test('test "Ver Carrinho" button', async() => {
    localStorage.setItem('user', JSON.stringify(user));
    const { getByTestId, history } = renderWithContext(<Products />, '/products');

    await waitForDomChange();

    const productPlus = getByTestId('0-product-plus');
    const checkoutBtn = getByTestId('checkout-bottom-btn');
    fireEvent.click(productPlus);
    fireEvent.click(checkoutBtn);

    expect(history.location.pathname).toBe('/checkout');
  });
});
