import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Details.css';

function OrderDetail(props) {
  const [loggedIn, setLoggedIn] = useState(true);
  const [orderInfo, setOrderInfo] = useState();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!currentUser) return props.history.push('/login');
    const headers = new Headers({
      "Authorization": currentUser.token
    });

    fetch(`http://localhost:3001/orders/${props.match.params.id}`, { headers })
      .then((response) => response.json()
      .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))))
      .then((data) =>  setOrderInfo(data))
      .catch((err) => {
        if(err.message === 'Order not found') return setOrderInfo({ message: err.message });
        setLoggedIn(false);
      })
  }, [])

  if (!loggedIn) return <Redirect to="/login" />

  const setTime = (date) => {
    const format = new Date(date);
    format.setHours(format.getHours() + 3)
    return format;
  }

  const dateFormat = { day: '2-digit', month: '2-digit' };

  if(orderInfo && orderInfo.message) return (<div>
    <Header title="Detalhes de Pedido" />
    <h1>{orderInfo.message}</h1>
  </div>);

  return (orderInfo && orderInfo.orderById ?
    <div>
      <Header title="Detalhes de Pedido" />
      <section className="DetailsContainer">
        <div className="DetailsTitle">
          <h2 data-testid="order-number">Pedido {orderInfo.orderById.id}</h2>
          <h2 data-testid="order-date">{setTime(orderInfo.orderById.saleDate).toLocaleDateString('pt-BR', dateFormat)}</h2>
        </div>
        <div className="InfoDetails">
          {orderInfo.orderDetail.map(({ quantity, name, price }, index) => (
            <div className="CardDetails">
              <p data-testid={`${index}-product-qtd`} className="DetailsItem">{quantity}</p>
              <p data-testid={`${index}-product-name`} className="DetailsItem">{name}</p>
              <p data-testid={`${index}-product-total-value`} className="DetailsItem">{`R$ ${(Math.round((price * quantity) * 100) / 100).toFixed(2).toString().replace('.', ',')}`}</p>
            </div>
          ))}
          <h3 data-testid="order-total-value">Total {`R$ ${(Math.round((orderInfo.orderById.totalPrice) * 100) / 100).toFixed(2).toString().replace('.', ',')}`}</h3>
        </div>
      </section>
    </div>
    :
    <p>Carregando...</p>
  )
}

export default OrderDetail;
