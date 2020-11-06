import React from 'react';
import toBRCurrency from '../helpers/currency';
import './CheckoutCard.css';
// /* type="text" min="0" */
export default function card(
  {
    name, price, quantity,
  },
  index, removeItem,
) {
  return (
    <div key={ name } className="card">
      <p data-testid={ `${index}-product-qtd-input` }>{quantity}</p>
      <h6 data-testid={ `${index}-product-name` }>{name}</h6>
      <h6 data-testid={ `${index}-product-total-value` }>{toBRCurrency(quantity * price)}</h6>
      <p data-testid={ `${index}-product-unit-price` }>{`(${toBRCurrency(price)} un)`}</p>
      <button data-testid={ `${index}-removal-button` } type="button" onClick={ ({ target }) => removeItem(target) }>X</button>
    </div>
  );
}
