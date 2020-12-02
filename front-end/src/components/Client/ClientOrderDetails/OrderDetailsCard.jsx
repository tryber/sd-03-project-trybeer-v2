/* eslint-disable react/prop-types */
import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import './orderDetailsCard.css';

const initialFloat = 2;

const convertMySQLDatetime = (date = []) => {
  const initialDateIndex = 5;
  const finalDateIndex = 10;
  const extractDayAndMonth = date
    .toString()
    .slice(initialDateIndex, finalDateIndex)
    .split('-')
    .reverse()
    .join('/');
  return extractDayAndMonth;
};

const OrderDetailsCard = ({ details, saleDate }) => {
  const orderDayAndMonth = convertMySQLDatetime(saleDate);
  const totalPrice = details.map((e) => e.saleInfo[0].total_price);
  const saleStatus = details.map((e) => e.saleInfo[0].status);
  console.log(saleStatus[0]);

  const { id } = useParams();

  return (
    <div className="details-order-info">
      <div className="details-order-text">
        <h3 data-testid="order-number">{`Pedido ${id}`}</h3>
        <span className="details-order-date">
          <p>Data: </p>
          <p data-testid="order-date">
            {orderDayAndMonth}
          </p>
        </span>
        <p data-testid="order-status" className={ `${saleStatus[0]}-details` }>
          {saleStatus[0]}
        </p>
      </div>
      {details
        && details.map((order, index) => (
          <div className="details-card" key={ `${order.name} card` }>
            <span className="details-info">
              <p data-testid={ `${index}-product-qtd` }>{`${order.quantity}`}</p>
              <p>X</p>
              <p data-testid={ `${index}-product-name` }>{`${order.name}`}</p>
              <p>-</p>
              <p data-testid={ `${index}-product-total-value` }>
                R$
                {` ${parseFloat(order.price)
                  .toFixed(initialFloat)
                  .replace('.', ',')}`}
              </p>
              <p>(uni.)</p>
            </span>
            <span className="details-total-price">
              <p data-testid="order-total-value">
                <strong>
                  {`Total: R$  ${(order.quantity * order.price)
                    .toFixed(initialFloat)
                    .replace('.', ',')}`}
                </strong>
              </p>
            </span>
          </div>
        ))}
      <h3>
        <strong>
          Total: R$
          {' '}
          {` ${parseFloat(totalPrice).toFixed(initialFloat).replace('.', ',')}`}
        </strong>
      </h3>
    </div>
  );
};

OrderDetailsCard.propTypes = {
  details: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
  })).isRequired,
  saleDate: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default OrderDetailsCard;
