import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContextProvider';
import ProductProvider from './context/ProductContextProvider';
import './App.css';
import AdminOrdersPage from './pages/Admin/AdminOrders/AdminOrdersPage';
import OrderDetailsPage from './pages/Admin/AdminOrders/AdminOrderDetailsPage';
import LoginPage from './pages/Login/LoginPage';
import ProductsPage from './pages/Client/ClientProducts/ProductsPage';
import RegisterPage from './pages/Register/RegisterPage';
import ClientProfile from './pages/Client/ClientProfile/ClientProfile';
import AdminProfile from './pages/Admin/AdminProfile/AdminProfile';
import ClientOrders from './pages/Client/ClientOrders/ClientOrders';
import OrderDetail from './pages/Client/OrderDetail/OrderDetail';
import CheckoutPage from './pages/Client/CheckoutPage/CheckoutPage';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ProductProvider>
          <Router>
            <Switch>
              <Route exact path="/login" component={ LoginPage } />
              <Route exact path="/" component={ LoginPage } />
              <Route exact path="/products" component={ ProductsPage } />
              <Route path="/checkout" component={ CheckoutPage } />
              <Route path="/register" component={ RegisterPage } />
              <Route path="/admin/profile" component={ AdminProfile } />
              <Route path="/admin/orders/:id" component={ OrderDetailsPage } />
              <Route path="/admin/orders" component={ AdminOrdersPage } />
              <Route path="/profile" component={ ClientProfile } />
              <Route path="/orders/:id" component={ OrderDetail } />
              <Route path="/orders" component={ ClientOrders } />
            </Switch>
          </Router>
        </ProductProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
