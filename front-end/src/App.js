import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignupPage from './pages/UserCrud/Register';
import Login from './pages/UserCrud/Login';
import UserProfile from './pages/UserCrud/UserProfile';
import Products from './pages/UserProducts/Products';
import ProductsProvider from './contexts/ProductsContext';
import OrdersProvider from './contexts/OrdersContext';
import Checkout from './pages/UserProducts/Checkout';
import MyOrders from './pages/UserProducts/MyOrders';
import OrderDetails from './pages/UserProducts/OrderDetails';
import AdminOrders from './pages/AdminProducts/AdminOrders';
import AdminProfile from './pages/UserCrud/AdminProfile';
import AdminOrderDetails from './pages/AdminProducts/AdminOrderDetails';

function App() {
  return (
    <Router>
      <ProductsProvider>
        <Switch>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
        </Switch>
      </ProductsProvider>
      <OrdersProvider>
        <Switch>
          <Route exact path="/orders">
            <MyOrders />
          </Route>
          <Route exact path="/orders/:id">
            <OrderDetails />
          </Route>
          <Route exact path="/admin/orders/:id">
            <AdminOrderDetails />
          </Route>
          <Route exact path="/admin/orders">
            <AdminOrders />
          </Route>
        </Switch>
      </OrdersProvider>
      <Switch>
        <Route exact path="/register">
          <SignupPage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/profile">
          <UserProfile />
        </Route>
        <Route exact path="/admin/profile">
          <AdminProfile />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
