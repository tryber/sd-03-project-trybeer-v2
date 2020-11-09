import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../utils/utils';

const AdminOrderCard = ({ order: { totalPrice, id, deliveryAddress, deliveryNumber, status }, index }) => (
  <Link to={`/admin/orders/${id}`} data-testid={ `${index}-order-card-container` }>
    <h4 data-testid={ `${index}-order-number` }>{`Pedido ${index + 1}`}</h4>
    <p data-testid={ `${index}-order-address` }>{`${deliveryAddress}, ${deliveryNumber}`}</p>
    <p data-testid={ `${index}-order-total-value` }>{formatPrice(totalPrice)}</p>
    <p data-testid={ `${index}-order-status` }>{status}</p>
  </Link>
);

export default AdminOrderCard;
