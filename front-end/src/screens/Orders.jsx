import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../styles/Orders.css';

function Orders(props) {
  const [ordersList, setOrdersList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const { history } = props;
    if (!currentUser) return history.push('/login');
    const headers = new Headers({
      Authorization: currentUser.token,
    });

    fetch('http://localhost:3001/orders', { headers })
      .then((response) => response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))))
      .then((data) => setOrdersList(data))
      .catch(() => setLoggedIn(false));
    return () => (console.log(''));
  }, [currentUser, props]);

  if (!loggedIn) return <Redirect to="/login" />;

  const setTime = (date) => {
    const three = 3;
    const format = new Date(date);
    format.setHours(format.getHours() + three);
    return format;
  };

  const dateFormat = { day: '2-digit', month: '2-digit' };

  const two = 2;

  return (
    <div>
      <Header title="Meus Pedidos" />
      <section className="OrdersContainer">
        {ordersList.map((order, index) => (
          <Link to={ `/orders/${order.id}` } key={ order.id }>
            <div data-testid={ `${index}-order-card-container` } className="OrdersCard">
              <p data-testid={ `${index}-order-number` }>
                Pedido
                {order.id}
              </p>
              <p data-testid={ `${index}-order-date` }>
                {setTime(order.saleDate).toLocaleDateString('pt-BR', dateFormat)}
              </p>
              <p data-testid={ `${index}-order-total-value` }>
                R$
                {order.totalPrice.toFixed(two).toString().replace('.', ',')}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}

Orders.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Orders;
