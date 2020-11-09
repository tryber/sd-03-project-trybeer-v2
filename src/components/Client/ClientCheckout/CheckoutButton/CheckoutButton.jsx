import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductsContext from '../../../../context/ProductContext';
import { zero, getCartTotal } from '../../../../utils/products';
import './checkoutButton.css'
const CheckoutButton = () => {
  const { productCart, update } = useContext(ProductsContext);

  useEffect(() => {
  }, [productCart, update]);

  return (
    <div>
      <Link disabled={ productCart.length === zero } to="/checkout">
        <button className="footer-container" disabled={ productCart.length === zero } data-testid="checkout-bottom-btn" type="button">
          <p className="checkout-text" data-testid="checkout-bottom-btn-value">
            {`Ver Carrinho - R$ ${getCartTotal(productCart)}`}
          </p>
        </button>
      </Link>
    </div>
  );
};

export default CheckoutButton;
