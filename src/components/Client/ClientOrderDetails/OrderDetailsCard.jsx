import React from 'react';
import PropTypes from 'prop-types';
import './orderDetailsCard.css';

const initialFloat = 2;

function OrderDetailsCard({ object, date }) {
  return (
    <div className="details-order-info">
      <div className="details-order-text">
        <h3 data-testid="order-number">{`Pedido ${object.saleID}`}</h3>
        <span className="details-order-date">
          <p>Data: </p>
          <p data-testid="order-date">
            {' '}
            {date}
          </p>
        </span>
      </div>
      {object.products
        && object.products.map((order, index) => (
          <div className="details-card" key={ `${order} card` }>
            <span className="details-info">
              <p data-testid={ `${index}-product-qtd` }>{`${order.soldQuantity}`}</p>
              <p>X</p>
              <p data-testid={ `${index}-product-name` }>{`${order.productName}`}</p>
              <p>-</p>
              <p data-testid={ `${index}-product-total-value` }>
                {`R$ ${order.productPrice
                  .toFixed(initialFloat)
                  .replace('.', ',')}`}

              </p>
              <p>(uni.)</p>
            </span>
            <span className="details-total-price">
              <p data-testid="order-total-value">
                <strong>
                  {`Total: R$  ${(order.soldQuantity * order.productPrice)
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
  date: PropTypes.string.isRequired,
};

export default OrderDetailsCard;
