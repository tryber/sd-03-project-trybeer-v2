import React, { useContext, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './clientOrderCard.css';
import ProductContext from '../../../context/ProductContext';

const initialFloat = 2;

// Baseado em: https://stackoverflow.com/questions/3075577/convert-mysql-datetime-stamp-into-javascripts-date-format
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
  index, id, saleDate, totalPrice,
}) => {
  const orderDayAndMonth = convertMySQLDatetime(saleDate);
  const { setDate } = useContext(ProductContext);

  const saveDate = useCallback(
    () => {
      setDate(orderDayAndMonth);
    },
    [setDate, orderDayAndMonth],
  );

  useEffect(() => {
    saveDate();
  }, [saveDate]);

  return (
    <div className="order-card" data-testid={ `${index}-order-card-container` }>
      <Link to={ { pathname: `/orders/${id}`, state: { date: orderDayAndMonth } } }>
        <h4 data-testid={ `${index}-order-number` }>{`Pedido ${id}`}</h4>
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
};

export default OrderCard;
