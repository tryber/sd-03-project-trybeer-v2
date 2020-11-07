import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import '../styles/Orders.css';

function OrdersAdmin(props) {
  const [ordersAdminList, setOrdersAdminList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!currentUser) return props.history.push('/login');
    const headers = new Headers({
      "Authorization": currentUser.token
    });

    fetch('http://localhost:3001/admin/orders', { headers })
      .then((response) => response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))))
      .then((data) => setOrdersAdminList(data))
      .catch((_err) => setLoggedIn(false))
  }, [])

  if (!loggedIn) return <Redirect to="/login" />

  return (
    <div>
      <AdminHeader title='Pedidos' />
      <section className="OrdersContainer">
        {ordersAdminList.map((order, index) => (
          <Link to={`/admin/orders/${order.id}`}>
            <div data-testid={`${index}-order-card-container`} className="OrdersCard">
              <p data-testid={`${index}-order-number`}>Pedido {order.id}</p>
              <p data-testid={`${index}-order-address`}>
                {order.deliveryAddress}, {order.deliveryNumber}
              </p>
              <p data-testid={`${index}-order-total-value`}>
                R$ {order.totalPrice.toFixed(2).toString().replace('.', ',')}
              </p>
              <label data-testid={`${index}-order-status`}>{order.status}</label>
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
};

export default OrdersAdmin;
