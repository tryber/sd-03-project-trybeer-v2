import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';

import AdminOrders from './pages/adminOrder/AdminOrders';
import CheckoutPage from './pages/checkoutPage/CheckoutPage';
import AdminProfile from './pages/adminProfile/AdminProfile';
import LoginPage from './pages/loginPage/LoginPage';
import ProductsPage from './pages/productsPage/ProductsPage';
import SignupPage from './pages/signupPage/SignupPage';
import ProfilePage from './pages/clientProfilePage/ProfilePage';
import ClientOrdersPage from './pages/clientOrdersPage/ClientOrdersPage';
import ClientOrderDetail from './pages/clientOrderDetail/ClientOrderDetail';
import AdminOrderDetail from './pages/adminOrderDetail/AdminOrderDetail';
import AdminChatPage from './pages/chat/AdminChatPage';
import AdminChat from './pages/chat/AdminChat';
import ChatPage from './pages/chat/ChatPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin/orders/:id" component={ AdminOrderDetail } />
        <Route path="/admin/orders" component={ AdminOrders } />
        <Route path="/admin/profile" component={ AdminProfile } />
        <Route path="/admin/chats" component={ AdminChatPage } />
        <Route path="/admin/chat" component={ AdminChat } />
        <Route path="/orders/:id" component={ ClientOrderDetail } />
        <Route path="/orders" component={ ClientOrdersPage } />
        <Route path="/profile" component={ ProfilePage } />
        <Route path="/checkout" component={ CheckoutPage } />
        <Route path="/register" component={ SignupPage } />
        <Route path="/products" component={ ProductsPage } />
        <Route path="/login" component={ LoginPage } />
        <Route path="/chat" component={ ChatPage } />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
