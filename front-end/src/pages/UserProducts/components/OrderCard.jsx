import React from 'react';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../utils/utils';

const OrderCard = ({ order: { sale_date, total_price, id }, index }) => (
  <Link to={`/orders/${id}`} data-testid={ `${index}-order-card-container` }>
    <h4 data-testid={ `${index}-order-number` }>{`Pedido ${index + 1}`}</h4>
    <p data-testid={ `${index}-order-date` }>{DateTime.fromMillis(Date.parse(sale_date)).toFormat('dd/LL')}</p>
    <p data-testid={ `${index}-order-total-value` }>{formatPrice(total_price)}</p>
  </Link>
);

export default OrderCard;
