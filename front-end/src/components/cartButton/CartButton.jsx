import React from 'react';
import PropTypes from 'prop-types';
import './CartButton.css'

function CartButton({ totalPrice }) {
  return (
    <div
      id="cartButton"
      className="fixed-bottom cart-content"
      style={ { background: 'transparent' } }
    >
      <a href="/checkout">
        <button
          type="button"
          className="btn cart-button"
          data-testid="checkout-bottom-btn"
          disabled={ totalPrice === '0,00' }
        >
          Ver Carrinho
          <span data-testid="checkout-bottom-btn-value">{` R$ ${totalPrice}`}</span>
        </button>
      </a>
    </div>
  );
}

export default CartButton;

CartButton.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};
