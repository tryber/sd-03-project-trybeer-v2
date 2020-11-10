import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const cardOrders = (orders) => (
  orders.map(({ id, delivery_number, delivery_address, total_price, status }, i) => (
    <Link key={id} to={`/admin/orders/${id}`}>
      <div style={{ border: '1px solid black', color: 'blue' }} >
        <p data-testid={`${i}-order-number`}>{`Pedido ${id}`}</p>
        <p data-testid={`${i}-order-address`}>{delivery_address}, {delivery_number}</p>
        <p data-testid={`${i}-order-total-value`}>R$ {total_price.toFixed(2).replace('.', ',')}</p>
        <label data-testid={`${i}-order-status`}>{status}</label>
      </div>
    </Link>
  ))
);

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/adminOrders').then(({ data }) => setOrders(data));
  }, []);

  console.log(orders);

  return (
    <div>
      {cardOrders(orders)}
    </div>
  );
}

export default AdminOrders;
