import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminHeader from '../components/AdminHeader';

function OrderDetail(props) {
  const [loggedIn, setLoggedIn] = useState(true);
  const [orderInfo, setOrderInfo] = useState();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const { history, match } = props;
    if (!currentUser) return history.push('/login');
    const headers = new Headers({
      Authorization: currentUser.token,
    });

    return fetch(`http://localhost:3001/orders/${match.params.id}`, { headers })
      .then((response) => response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))))
      .then((data) => setOrderInfo(data))
      .catch((err) => {
        if (err.message === 'Order not found') return setOrderInfo({ message: err.message });
        return setLoggedIn(false);
      });
  }, [currentUser, props]);

  if (!loggedIn) return <Redirect to="/login" />;
  const setTime = (date) => {
    const three = 3;
    const format = new Date(date);
    format.setHours(format.getHours() + three);
    return format;
  };

  const dateFormat = { day: '2-digit', month: '2-digit' };

  if (orderInfo && orderInfo.message) {
    return (
      <div>
        <AdminHeader title="Detalhes de Pedido" />
        <h1>{orderInfo.message}</h1>
      </div>
    );
  }

  const two = 2;
  const aHundred = 100;

  return (orderInfo && orderInfo.orderById
    ? <div>
      <AdminHeader title="Detalhes de Pedido" />
      <section className="DetailsContainer">
        <div className="DetailsTitle">
          <h2 data-testid="order-number">
            Pedido
            {orderInfo.orderById.id}
          </h2>
          <h2 data-testid="order-date">{setTime(orderInfo.orderById.saleDate).toLocaleDateString('pt-BR', dateFormat)}</h2>
        </div>
        <div className="InfoDetails">
          <h2 data-testid="order-status">{orderInfo.orderById.status}</h2>
          {orderInfo.orderDetail.map(({ quantity, name, price }, index) => (
            <div key={ name } className="CardDetailsAdmin">
              <p data-testid={ `${index}-product-qtd` }>{quantity}</p>
              <p data-testid={ `${index}-product-name` }>{name}</p>
              <p data-testid={ `${index}-order-unit-price` }>{`(R$ ${price.toFixed(two).toString().replace('.', ',')})`}</p>
              <p data-testid={ `${index}-product-total-value` }>{`R$ ${(Math.round((price * quantity) * aHundred) / aHundred).toFixed(two).toString().replace('.', ',')}`}</p>
            </div>
          ))}
          <h3 data-testid="order-total-value">
            Total
            { `R$ ${(Math.round((orderInfo.orderById.totalPrice) * aHundred) / aHundred).toFixed(two).toString().replace('.', ',')}` }
          </h3>
          {orderInfo.orderById.status === 'Pendente'
            ? <button
                data-testid="mark-as-delivered-btn"
                type="button"
                onClick={ async () => {
                  const headers = new Headers({ Authorization: currentUser.token });
                  await fetch(`http://localhost:3001/orders/${orderInfo.orderById.id}`, { method: 'PUT', headers })
                    .catch((err) => console.log(err));
                  setOrderInfo({ ...orderInfo, orderById: { ...orderInfo.orderById, status: 'Entregue' } });
                } }
            >
              Marcar como entregue
            </button>
            : null }
        </div>
      </section>
    </div>
    : <p>Carregando...</p>
  );
}

OrderDetail.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default OrderDetail;
