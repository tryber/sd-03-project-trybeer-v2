/* eslint-disable react/jsx-indent */
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
  const {
    productCart, setProductCart, update, setUpdate,
  } = useContext(ProductContext);
  const {
    id, name, price, url_image: urlImage,
  } = product;

  useEffect(() => {
    saveCartAtLocalStorage(productCart);
  }, [productCart, update]);

  const minusButton = (idParam, productCartParam) => {
    if (getQuantityFromCart(idParam, productCartParam) < 1) return null;
    return () => {removeProductFromCart(product, productCartParam, setProductCart);
    setUpdate(!update);
    }
  };

  return (
    <div className="products-display" key={ name }>
      <div>
        <img
          className={ `img-display skoll-chata-${index} ` }
          data-testid={ `${index}-product-img` }
          // eslint-disable-next-line camelcase
          src={ urlImage }
          alt={ name }
        />
      </div>
      <div className="info-display">
        <div className="info-text">
          <p className="name-info" data-testid={ `${index}-product-name` }>{name}</p>
          <p className="price-info" data-testid={ `${index}-product-price` }>{`R$ ${formatPrice(price)}`}</p>
        </div>
        <div className="display-qty">
          <button
            className="qty-btn minus"
            data-testid={ `${index}-product-minus` }
            type="button"
            onClick={ minusButton(id, productCart) }
          >
            -
          </button>
          <p className="qty-ind" data-testid={ `${index}-product-qtd` }>
            {getQuantityFromCart(id, productCart)}
          </p>
          <button
            className="qty-btn plus"
            data-testid={ `${index}-product-plus` }
            type="button"
            onClick={ () => {
              addProductToCart(product, productCart, setProductCart);
              setUpdate(!update);
            } }
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
    url_image: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
