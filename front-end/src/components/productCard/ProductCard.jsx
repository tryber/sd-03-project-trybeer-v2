import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import formatPrice from '../../utils/formatPrice';
import { saveToLocalStorage, getCartFromLocalStorage } from '../../utils/localStorageFunctions';
import './ProductCard.css';

function ProductCard({ product, index, getTotalPrice }) {
  const { name, url_image: urlImage, price } = product;
  const [amount, setAmount] = useState(0);

  const existsInCart = () => {
    const cart = getCartFromLocalStorage();

    if (!cart || cart.length === 0) return null;

    cart.forEach(({ id, amount: qnt }) => (
      id === product.id ? setAmount(qnt) : null
    ));
  };

  const updateProductAmount = (e) => {
    const value = e.target.innerText;

    if (value === '+') {
      return setAmount((state) => state + 1);
    }

    if (value === '-' && amount > 0) {
      return setAmount((state) => state - 1);
    }

    return null;
  };

  const updateCart = (productToAdd) => {
    const cart = getCartFromLocalStorage();

    if (!cart && productToAdd.amount > 0) {
      // cria carrinho
      saveToLocalStorage([productToAdd], 'cart');
    } else if (cart && productToAdd.amount === 0) {
      // remove do carrinho
      const newCart = cart.filter(({ id }) => id !== productToAdd.id);
      saveToLocalStorage([...newCart], 'cart');
    } else if (cart && productToAdd.amount > 0) {
      // adiciona a carrinho existente
      const newCart = cart.filter(({ id }) => id !== productToAdd.id);
      saveToLocalStorage([...newCart, productToAdd], 'cart');
    } else {
      return null;
    }
  };

  useEffect(() => {
    existsInCart();
  }, []);

  useEffect(() => {
    const productToAdd = { ...product, amount };

    updateCart(productToAdd);
    getTotalPrice();
  }, [amount]);

  return (
    <div className="card product-card" style={ { background: '#FCE694', border: 'none' } }>
      <img
        className="card-img-top img-card"
        data-testid={ `${index}-product-img` }
        src={ urlImage }
        alt={ name }
      />
      <div id="card-body" className="card-body">
        <h5 className="card-title" data-testid={ `${index}-product-name` }>
          {name}
        </h5>
        <p
          className="card-text"
          data-testid={ `${index}-product-price` }
        >
          { `R$ ${formatPrice(price)}` }
        </p>
        <button
          className="btn btn-custom"
          data-testid={ `${index}-product-plus` }
          type="button"
          onClick={ (event) => updateProductAmount(event) }
        >
          +
        </button>
        <span
          className="card-text product-qtd"
          data-testid={ `${index}-product-qtd` }
        >
          {amount}
        </span>
        <button
          className="btn btn-custom"
          data-testid={ `${index}-product-minus` }
          type="button"
          onClick={ (event) => updateProductAmount(event) }
        >
          -
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    urlImage: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
  getTotalPrice: PropTypes.func.isRequired,
};
