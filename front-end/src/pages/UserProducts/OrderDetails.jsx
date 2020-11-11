import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import { DateTime } from 'luxon';
import MenuTop from '../../components/MenuTop';
import { formatPrice } from '../../utils/utils';
import Auth from '../../utils/Auth';

const getOrderProducts = async (id, setOrderDetails) => {
  const { token } = JSON.parse(localStorage.getItem('user')) || {};
  try {
    const { data, status } = await axios({
      method: 'GET',
      url: `http://localhost:3001/sales/${id}`,
      headers: { Authorization: token },
    });
    const statusOk = 200;
    if (status === statusOk) {
      setOrderDetails(data);
    }
  } catch (err) {
    console.log(err.message);
  }
};

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getOrderProducts(id, setOrderDetails);
  }, []);

  if (!orderDetails) return <span>Loading...</span>;
  return (
    <Auth>
      <MenuTop title="Detalhes do Pedido" />
      <h4 data-testid="order-number">{`Pedido ${id}`}</h4>
      <span data-testid="order-date">{DateTime.fromMillis(orderDetails.date).toFormat('dd/LL')}</span>
      <ul>
        {orderDetails.products.map((product, index) => (
          <li key={ product.id }>
            <span data-testid={ `${index}-product-qtd` }>{product.quantity}</span>
            <span data-testid={ `${index}-product-name` }>{product.name}</span>
            <span data-testid={ `${index}-product-total-value` }>{formatPrice(product.quantity * product.price)}</span>
          </li>
        ))}
      </ul>
      <span data-testid="order-total-value">{formatPrice(orderDetails.totalPrice)}</span>
    </Auth>
  );
};

export default OrderDetails;
