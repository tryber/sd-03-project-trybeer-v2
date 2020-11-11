import React from 'react';
import {
  Switch, Route, BrowserRouter as Router, Redirect,
} from 'react-router-dom';
import Login from './screens/Login';
import Profile from './screens/Profile';
import MainProvider from './context/context';
import Products from './screens/Products';
import Register from './screens/Register';
import OrderDetail from './screens/OrderDetail';
import Checkout from './screens/Checkout';
import Orders from './screens/Orders';
import AdminDetail from './screens/AdminDetail';
import OrdersAdmin from './screens/OrdersAdmin';
import AdminProfile from './screens/AdminProfile';
import AdminChatList from './screens/AdminChatList';
import Chat from './screens/Chat';
import AdminChat from './screens/AdminChat';

// Finalizado

function App() {
  return (
    <MainProvider>
      <Router>
        <Switch>
          <center>
            <Route exact path="/chat" component={ Chat } />
            <Route exact path="/admin/chats" component={ AdminChatList } />
            <Route exact path="/admin/chat" component={ AdminChat } />
            <Route exact path="/checkout" component={ Checkout } />
            <Route exact path="/products" component={ Products } />
            <Route exact path="/admin/profile" component={ AdminProfile } />
            <Route exact path="/admin/orders" component={ OrdersAdmin } />
            <Route path="/login" component={ Login } />
            <Route path="/profile" component={ Profile } />
            <Route path="/register" component={ Register } />
            <Route path="/orders/:id" component={ OrderDetail } />
            <Route path="/admin/orders/:id" component={ AdminDetail } />
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route exact path="/orders" component={ Orders } />
          </center>
        </Switch>
      </Router>
    </MainProvider>
  );
}

export default App;
