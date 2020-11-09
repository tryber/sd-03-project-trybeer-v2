import React from 'react';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../utils/utils';

const OrderCard = ({ order: { date, totalPrice, id }, index }) => (
  <Link to={`/orders/${id}`} data-testid={ `${index}-order-card-container` }>
    <h4 data-testid={ `${index}-order-number` }>{`Pedido ${index + 1}`}</h4>
    <p data-testid={ `${index}-order-date` }>{DateTime.fromMillis(date).toFormat('dd/LL')}</p>
    <p data-testid={ `${index}-order-total-value` }>{formatPrice(totalPrice)}</p>
  </Link>
);

export default OrderCard;
