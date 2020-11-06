import React from 'react';

const minusOne = -1;
const plusOne = 1;
const zero = 0;
const two = 2;

const defineQnt = (p, cart) => {
  const answer = cart.filter((item) => item.id === p.id);
  if (answer.length !== zero) {
    return answer[0].quantity;
  }
  return zero;
};

const ProductCard = (p, index, cart, addItem) => {
  const { name, price, image } = p;
  return (
    <div className="product-card">
      <img src={ image } alt={ name } data-testid={ `${index}-product-img` } />
      <h3 data-testid={ `${index}-product-name` }>{ name }</h3>
      <p data-testid={ `${index}-product-price` }>
        R$
        { ` ${price.toFixed(two).toString().replace('.', ',')}` }
      </p>
      <div className="quantity-div">
        <button type="button" data-testid={ `${index}-product-minus` } onClick={ () => addItem(p, minusOne) }> - </button>
        <p data-testid={ `${index}-product-qtd` }>{ defineQnt(p, cart) }</p>
        <button type="button" data-testid={ `${index}-product-plus` } onClick={ () => addItem(p, plusOne) }> + </button>
      </div>
    </div>
  );
};

export default ProductCard;
