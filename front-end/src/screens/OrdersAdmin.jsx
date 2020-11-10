import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminHeader from '../components/AdminHeader';
import '../styles/Orders.css';

function OrdersAdmin(props) {
  const [ordersAdminList, setOrdersAdminList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const two = 2;
  useEffect(() => {
    if (!currentUser) return props.history.push('/login');
    const headers = new Headers({
      Authorization: currentUser.token,
    });

    return fetch('http://localhost:3001/admin/orders', { headers })
      .then((response) => response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))))
      .then((data) => setOrdersAdminList(data))
      .catch(() => setLoggedIn(false));
  }, [currentUser, props]);

  if (!loggedIn) return <Redirect to="/login" />;

  return (
    <div>
      <AdminHeader title="Pedidos" />
      <section className="OrdersContainer">
        {ordersAdminList.map((order, index) => (
          <Link to={ `/admin/orders/${order.id}` } key="index">
            <div data-testid={ `${index}-order-card-container` } className="OrdersCard">
              <p data-testid={ `${index}-order-number` }>
                Pedido
                {order.id}
              </p>
              <p data-testid={ `${index}-order-address` }>
                {order.deliveryAddress}
                {order.deliveryNumber}
              </p>
              <p data-testid={ `${index}-order-total-value` }>
                R$
                { order.totalPrice.toFixed(two).toString().replace('.', ',') }
              </p>
              <p data-testid={ `${index}-order-status` }>
                {order.status}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}

OrdersAdmin.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default OrdersAdmin;
