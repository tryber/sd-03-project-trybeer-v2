import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import OrdersContext from '../../contexts/OrdersContext.jsx';
import ProductsContext from '../../contexts/ProductsContext.jsx';

const renderWithContext = (children, route = '/', path = route) => {
  const initialEntries = [route];
  const history = createMemoryHistory({ initialEntries });
  return {
    ...render(
      <Router history={history}>
        <Route path={path}>
          <ProductsContext>
            <OrdersContext>{children}</OrdersContext>
          </ProductsContext>
        </Route>
      </Router>,
    ),
    history,
  };
};

export default renderWithContext;
