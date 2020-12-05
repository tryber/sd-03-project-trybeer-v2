import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './clientOrderCard.css';

const initialFloat = 2;

const convertMySQLDatetime = (date = '') => {
  const initialDateIndex = 5;
  const finalDateIndex = 10;
  const extractDayAndMonth = date
    .slice(initialDateIndex, finalDateIndex)
    .split('-')
    .reverse()
    .join('/');
  return extractDayAndMonth;
};

const OrderCard = ({
  index, id, saleDate, totalPrice, status,
}) => {
  const orderDayAndMonth = convertMySQLDatetime(saleDate);

  return (
    <div className="order-card" data-testid={ `${index}-order-card-container` }>
      <Link to={ `/orders/${id}` }>
        <h4 data-testid={ `${index}-order-number` }>{`Pedido ${id}`}</h4>
        <p className={ status }>{status}</p>
      </Link>
      <div>
        <div className="order-info">
          <p>Data:</p>
          <p data-testid={ `${index}-order-date` }>{orderDayAndMonth}</p>
        </div>
        <div className="order-info">
          <p>Valor: </p>
          <p data-testid={ `${index}-order-total-value` }>
            R$
            {' '}
            {`${parseFloat(totalPrice).toFixed(initialFloat).replace('.', ',')}`}
          </p>
        </div>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default OrderCard;
