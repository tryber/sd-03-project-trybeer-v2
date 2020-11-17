import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductContext from '../../../context/ProductContext';
import {
  addProductToCart,
  removeProductFromCart,
  saveCartAtLocalStorage,
  getQuantityFromCart,
  formatPrice,
} from '../../../utils/products';
import './productCard.css';

export default function ProductCard({ product, index }) {
  const { productCart, setProductCart, update, setUpdate } = useContext(ProductContext);
  const { id, name, price, urlImage } = product;

  useEffect(() => {
    saveCartAtLocalStorage(productCart);
  }, [productCart, update]);

  return (
    <div className="products-display" key={name}>
      <div>
        <img
          className={`img-display skoll-chata-${index} `}
          data-testid={`${index}-product-img`}
          src={urlImage}
          alt={name}
        />
      </div>
      <div className="info-display">
        <div className="info-text">
          <p className="name-info" data-testid={`${index}-product-name`}>{name}</p>
          <p className="price-info" data-testid={`${index}-product-price`}>{`R$ ${formatPrice(price)}`}</p>
        </div>
        <div className="display-qty">
          <button
            className="qty-btn minus"
            data-testid={`${index}-product-minus`}
            type="button"
            onClick={
              getQuantityFromCart(id, productCart) < 1
                ? null
                : () => {
                    removeProductFromCart(product, productCart, setProductCart);
                    setUpdate(!update);
                  }
            }
          >
            -
          </button>
          <p className="qty-ind" data-testid={`${index}-product-qtd`}>
            {getQuantityFromCart(id, productCart)}
          </p>
          <button
            className="qty-btn plus"
            data-testid={`${index}-product-plus`}
            type="button"
            onClick={() => {
              addProductToCart(product, productCart, setProductCart);
              setUpdate(!update);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
