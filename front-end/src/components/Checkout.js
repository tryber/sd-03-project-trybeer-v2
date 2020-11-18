import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { ContextAplication } from '../context/ContextAplication';
import { ClientMenu } from './Menu/index';
import CheckoutCard from './CheckoutCard';
import toBRCurrency from '../helpers/currency';
import totalPrice from '../helpers/reduceCart';
import './Checkout.css';

// const localCart = JSON.parse(localStorage.getItem('cart'));
const zero = 0;
async function submitBuy(e, cart, street, streetNumber, setMessage, history) {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem('user')) || null;
  try {
    const { token } = user;
    const headers = { authorization: token };
    const response = await axios.post(
      'http://localhost:3001/checkout', { cart, street, streetNumber }, { headers },
    );
    if (!response) throw Error;
    await setMessage('Compra realizada com sucesso!');
    localStorage.removeItem('cart');
    return history.push('/products');
  } catch (_error) {
    return setMessage('Algum Erro aconteceu com sua compra, tente novamente mais tarde.');
  }
}

export default function Checkout() {
  const localCart = JSON.parse(localStorage.getItem('cart')) || null;
  function itemIndexAndCopyCart(id) {
    const copyCart = [...localCart];
    const item = copyCart.find((product) => id === product.id);
    const indexOfItem = copyCart.indexOf(item);
    return { copyCart, indexOfItem };
  }
  const user = JSON.parse(localStorage.getItem('user')) || null;

  const [cart, setCart] = useState(localCart);
  const [disabled, setDisabled] = useState(true);
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();
  const { setContextMessage } = useContext(ContextAplication);

  function removeItem(id) {
    const { copyCart, indexOfItem } = itemIndexAndCopyCart(id);
    copyCart.splice(indexOfItem, 1);
    localStorage.setItem('cart', JSON.stringify(copyCart));
    setCart(copyCart);
    if (!copyCart.lenght) setMessage('Não há produtos no carrinho');
  }

  useEffect(() => {
    if (totalPrice(localCart || []) <= zero || !street || !streetNumber) return setDisabled(true);
    return setDisabled(false);
  }, [streetNumber, street, localCart]);

  useEffect(() => {
    if (totalPrice(localCart || []) <= zero) setMessage('Não há produtos no carrinho');
  }, [cart, localCart]);

  return !user ? <Redirect to="/login" /> : (
    <div>
      <ClientMenu />
      <div style={ { padding: '5vh 10vw' } }>
        <h3>Produtos</h3>
        <h2>{ message }</h2>
        <div>
          {cart && cart.map((product, index) => CheckoutCard(product, index, removeItem))}
        </div>
        <h6 data-testid="order-total-value">
          {' '}
          { toBRCurrency(totalPrice(cart)) }
        </h6>
        <h3>Endereço</h3>
        <form display="block" className="form">
          <label htmlFor="street">
            Rua
            <input name="street" type="text" data-testid="checkout-street-input" value={ street } onChange={ ({ target }) => setStreet(target.value) } />
          </label>
          <label htmlFor="number">
            Número
            <input type="number" name="number" data-testid="checkout-house-number-input" min="1" value={ streetNumber } onChange={ ({ target }) => setStreetNumber(target.value) } />
          </label>
          <button
            type="submit"
            data-testid="checkout-finish-btn"
            disabled={ disabled }
            onClick={ (e) => submitBuy(e, cart, street, streetNumber, setContextMessage, history) }
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
