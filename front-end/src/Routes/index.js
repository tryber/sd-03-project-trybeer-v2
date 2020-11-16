import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BeerProvider from '../Context/BeerContext/BeerProvider';
import {
  register,
  login,
  clientProfile,
  products,
  orders,
  ordersDetails,
  checkout,
  adminProfile,
  adminOrders,
  adminOrdersDetail,
} from '../pages';
const { ClientChat }=require('../Components')
const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ login } />
      <Route exact path="/login" component={ login } />
      <Route exact path="/register" component={ register } />
      <Route exact path="/profile" component={ clientProfile } />
      <Route exact path="/chat" component={ ClientChat } />
      <BeerProvider>
        <Route exact path="/products" component={ products } />
        <Route exact path="/orders" component={ orders } />
        <Route exact path="/checkout" component={ checkout } />
        <Route exact path="/orders/:id" component={ ordersDetails } />
        <Route exact path="/admin/orders" component={ adminOrders } />
        <Route exact path="/admin/orders/:id" component={ adminOrdersDetail } />
        <Route exact path="/admin/profile" component={ adminProfile } />
      </BeerProvider>
    </Switch>
  </BrowserRouter>
);

export default Routes;
