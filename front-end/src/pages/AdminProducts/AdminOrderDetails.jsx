import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import AdminMenu from './components/AdminMenu';
import { formatPrice } from '../../utils/utils';

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

const postAsDelivered = async (id, orderDetails, setOrderDetails) => {
  const { token } = JSON.parse(localStorage.getItem('user')) || {};
  try {
    const { status } = await axios({
      method: 'PUT',
      url: `http://localhost:3001/sales/${id}/delivered`,
      data: { id },
      headers: { Authorization: token },
    });
    const statusOk = 200;
    if (status === statusOk) {
      setOrderDetails({ ...orderDetails, status: 'Entregue' });
    }
  } catch (err) {
    console.log(err.message);
  }
};

const AdminOrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(false);
  const [redirectTo, setRedirectTo] = useState('');
  const { id } = useParams();

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user'))) setRedirectTo('/login');
    getOrderProducts(id, setOrderDetails);
  }, []);

  if (redirectTo) return <Redirect to={redirectTo} />;
  if (!orderDetails) return <span>Loading...</span>;
  return (
    <div>
      <AdminMenu />
      <h4>
        <span data-testid="order-number">{`Pedido ${id}`}</span>
        <span data-testid="order-status">{orderDetails.status}</span>
      </h4>
      <ul>
        {orderDetails.products.map((product, index) => (
          <li key={product.id}>
            <span data-testid={`${index}-product-qtd`}>{product.quantity}</span>
            <span data-testid={`${index}-product-name`}>{product.name}</span>
            <span data-testid={`${index}-order-unit-price`}>
              {`(${formatPrice(product.price)})`}
            </span>
            <span data-testid={`${index}-product-total-value`}>
              {formatPrice(product.quantity * product.price)}
            </span>
          </li>
        ))}
      </ul>
      <span data-testid="order-total-value">{formatPrice(orderDetails.totalPrice)}</span>
      {(orderDetails.status === 'Pendente') ? <button type="button" onClick={() => postAsDelivered(id, orderDetails, setOrderDetails)} data-testid="mark-as-delivered-btn">Marcar como entregue</button> : ''}
    </div>
  );
};

export default AdminOrderDetails;
