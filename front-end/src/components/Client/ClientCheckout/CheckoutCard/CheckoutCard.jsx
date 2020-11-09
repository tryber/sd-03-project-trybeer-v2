import React from 'react';
import PropTypes from 'prop-types';
import './checkoutCard.css';

const initialFloat = 2;

const CheckoutCard = ({
  index, quantity, name, price, onClick,
}) => (
  <div className="checkout-card">
    <div>
      <div style={ { flexDirection: 'row', display: 'flex' } }>
        <span>
          <p data-testid={ `${index}-product-qtd-input` }>
            {quantity}
            {' '}
            x
          </p>
        </span>
        <span>
          <p data-testid={ `${index}-product-name` }>
            {name}
            {' '}
            -
          </p>
        </span>
        <span>
          <p data-testid={ `${index}-product-unit-price` }>
            {`(R$ ${price.toFixed(initialFloat).replace('.', ',')}
        un)`}
          </p>
        </span>
      </div>
      <div style={ { flexDirection: 'row', display: 'flex' } }>
        <span>
          <p>
            <strong>TOTAL:</strong>
          </p>
        </span>
        <span>
          <p data-testid={ `${index}-product-total-value` }>
            {`R$ ${(price * quantity).toFixed(initialFloat).replace('.', ',')}`}
          </p>
        </span>
      </div>
    </div>
    <button
      className="remove-btn"
      type="button"
      onClick={ onClick }
      data-testid={ `${index}-removal-button` }
    >
      x
    </button>
  </div>
);

CheckoutCard.propTypes = {
  index: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CheckoutCard;
