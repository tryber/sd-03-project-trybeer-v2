import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';
import formatPrice from '../../utils/formatPrice';
import './OrderCard.css';

function OrderCard({ order, index }) {
  const { id, total_price: totalPrice, sale_date: saleDate, status } = order;

  const onCardClick = () => {
    window.location.href = `/orders/${id}`;
  };

  return (
    <div
      className="card order-card"
      data-testid={`${index}-order-card-container`}
    >
      <div className="card-body" onClick={() => onCardClick()}>
        <h5 className="card-title" data-testid={`${index}-order-number`}>
          {`Pedido ${id}`}
        </h5>
        <h6 className="card-text" data-testid={`${index}-order-date`}>
          {formatDate(saleDate)}
        </h6>
        <h5 className="card-text" data-testid={`${index}-order-total-value`}>
          {`R$ ${formatPrice(totalPrice)}`}
        </h5>
        <h6 className="card-text" data-testid={`${index}-order-status`}>
          {status}
        </h6>
      </div>
    </div>
  );
}

export default OrderCard;

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    totalPrice: PropTypes.number,
    saleDate: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
