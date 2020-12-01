/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import './orderDetailsCard.css';
import ProductContext from '../../../context/ProductContext';

const initialFloat = 2;

function OrderDetailsCard({ object = {} }) {
  const { id, data } = useParams();
  console.log(data);
  // const date = object[0] === undefined ? '' : object[0].status.sale_date;
  const { date } = useContext(ProductContext);

  return (
    <div className="details-order-info">
      {console.log(object.map((e) => e))}
      <div className="details-order-text">
        <h3 data-testid="order-number">{`Pedido ${id}`}</h3>
        <span className="details-order-date">
          <p>Data: </p>
          <p data-testid="order-date">
            {' '}
            {date}
          </p>
        </span>
      </div>
      {object
        && object.map((order, index) => (
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
    </div>
  );
}

OrderDetailsCard.propTypes = {
  object: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.string,
  })).isRequired,
};

export default OrderDetailsCard;
