import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginScreen from './components/Login';
import ProductsClient from './components/ProductsClient';
import RegisterScreen from './components/Register';
import ProfileScreen from './components/Profile';
import CheckoutScreen from './components/Checkout';
import OrdersScreen from './components/Orders';
import OrderDetailsScreen from './components/OrderDetails';
import AplicationProvider from './context/ContextAplication';
import AdminOrders from './components/AdminOrders';
import AdminDetails from './components/AdminDetails';
import Chat from './components/Chat';
import AdminChats from './components/AdminChats';

function App() {
  return (
    <AplicationProvider>
      <Switch>
        <Route exact path="/" component={ LoginScreen } />
        <Route exact path="/login" component={ LoginScreen } />
        <Route exact path="/products" component={ ProductsClient } />
        <Route exact path="/register" component={ RegisterScreen } />
        <Route exact path="/profile" component={ ProfileScreen } />
        <Route exact path="/orders/:id" component={ OrderDetailsScreen } />
        <Route exact path="/orders" component={ OrdersScreen } />
        <Route exact path="/checkout" component={ CheckoutScreen } />
        <Route exact path="/chat" component={ Chat } />
        <Route exact path="/admin/orders" component={ AdminOrders } />
        <Route exact path="/admin/profile" component={ ProfileScreen } />
        <Route exact path="/admin/orders/:id" component={ AdminDetails } />
        <Route exact path="/admin/chat" component={ Chat } />
        <Route exact path="/admin/chats" component={ AdminChats } />
      </Switch>
    </AplicationProvider>
  );
}

export default App;
