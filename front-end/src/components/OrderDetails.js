import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import axios from 'axios';
import { ClientMenu } from './Menu/index';
import toBRCurrency from '../helpers/currency';

async function getOrder(id, setMessage, setOrder) {
  const user = JSON.parse(localStorage.getItem('user')) || null;
  try {
    const { token } = user;
    const headers = { authorization: token };
    const response = await axios.get(
      `http://localhost:3001/orders/${id}`, { headers },
    );
    if (!response) throw Error;
    return setOrder(response.data);
  } catch (_error) {
    // setOrder(orderMock.cart);
    return setMessage('Algum Erro aconteceu com seus pedidos, tente novamente mais tarde.');
  }
}

function productRow(
  {
    productName, productPrice, soldQuantity,
  },
  index,
) {
  return (
    <div key={ productName }>
      <p data-testid={ `${index}-product-qtd` }>{soldQuantity}</p>
      <h6 data-testid={ `${index}-product-name` }>{productName}</h6>
      <h6 data-testid={ `${index}-product-total-value` }>{toBRCurrency(soldQuantity * productPrice)}</h6>
    </div>
  );
}

export default function Checkout() {
  const user = JSON.parse(localStorage.getItem('user')) || null;

  const [message, setMessage] = useState('');
  const [order, setOrder] = useState('');
  const { id } = useParams();

  useEffect(() => {
    if (!order) getOrder(id, setMessage, setOrder);
  }, [order, id]);
  if (!user) return <Redirect to="/login" />;
  return (
    <div>
      <ClientMenu />
      <div style={ { padding: '10vh 20vh' } }>
        <h3 data-testid="top-title">Detalhes de Pedido</h3>
        <h2>{ message }</h2>
        <h4 data-testid="order-number">
          Pedido
          {' '}
          { order.saleId }
        </h4>
        <div>
          {
            order.saleProducts
            && order.saleProducts.map((product, index) => productRow(product, index))
          }
        </div>
        <h4 data-testid="order-date">
          {' '}
          {new Date(order.saleDate).toLocaleDateString('pt-BR')}
          {' '}
        </h4>
        <h6 data-testid="order-total-value">
          Total:
          {' '}
          { order.total && toBRCurrency(order.total) }
        </h6>
      </div>
    </div>
  );
}
