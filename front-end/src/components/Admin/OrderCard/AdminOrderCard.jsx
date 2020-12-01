import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './adminOrderCard.css';

export default function AdminOrderCard(props) {
  const {
    id, address, totalPrice, status,
  } = props;

  const fixed = 2;

  return (
    <div className="admin-order-card">
      <Link to={ `/admin/orders/${id}` }>
        <h4 data-testid={ `${id - 1}-order-number` }>{`Pedido ${id}`}</h4>
      </Link>
      <div>
        <p data-testid={ `${id - 1}-order-address` }>{`${address}`}</p>
        <div className="admin-order-info">
          <p className="order-value" data-testid={ `${id - 1}-order-total-value` }>
            {`R$ ${totalPrice.toFixed(fixed).replace('.', ',')}`}
          </p>
          <p
            className={ status === 'Entregue' ? 'status-entregue' : 'status-pendente' }
            data-testid={ `${id - 1}-order-status` }
          >
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}

AdminOrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
