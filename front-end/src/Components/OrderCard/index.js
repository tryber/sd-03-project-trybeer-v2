import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const OrderCard = ({
  id,
  totalPrice,
  deliveryNumber,
  deliveryAddress,
  status,
  dtttId,
}) => (
  <div className="order">
    <div className="order-info">
      <h2 data-testid={ `${dtttId}-order-number` }>
        {`Pedido ${id}`}
      </h2>
      <h3 data-testid={ `${dtttId}-order-address` }>
        {`${deliveryAddress}, ${deliveryNumber}`}
      </h3>
    </div>
    <div className="order-footer">
      <span
        data-testid={ `${dtttId}-order-total-value` }
        className="order-total"
      >
        { `R$ ${totalPrice.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })}` }
      </span>
      <span
        data-testid={ `${dtttId}-order-status` }
      >
        {status}
      </span>
    </div>
  </div>
);

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  totalPrice: PropTypes.string.isRequired,
  deliveryNumber: PropTypes.string.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  dtttId: PropTypes.number.isRequired,
};

export default OrderCard;
