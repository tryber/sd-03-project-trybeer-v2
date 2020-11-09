import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { MainContext } from '../context/context';
import '../styles/Checkout.css';

const Checkout = (props) => {
  let cartIndex;
  const zero = 0;
  const two = 2;
  const aHundred = 100;
  const { setOkMessage } = useContext(MainContext);
  const [list, setList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(zero);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const carts = JSON.parse(localStorage.getItem('carts'));
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    cartIndex = carts.findIndex((e) => e.user === user.email);
  }

  useEffect(() => {
    const { history } = props;
    if (!user) return history.push('/login');
    const cart = carts.find((e) => e.user === user.email);
    setList(cart.list);
    return setTotalPrice(cart.list.reduce((acc, e) => acc + Number(e.price) * Number(e.qty), zero));
  }, [user, carts, props]);

  useEffect(() => {
    setTotalPrice(list.reduce((acc, e) => acc + Number(e.price) * Number(e.qty), zero));
  }, [list]);

  const removeProduct = (id) => {
    const newList = list.filter((e) => e.id !== id);
    setList(newList);
    const newCarts = ([...carts, carts[cartIndex].list = newList]);
    return localStorage.setItem('carts', JSON.stringify(newCarts));
  };

  return (
    <div>
      <Header title="Finalizar Pedido" />
      <div className="ListItem">
        {(list.length === zero) ? <h2>Não há produtos no carrinho</h2> : null}
        {list.map((product, ind) => (
          <div className="Itens" key={ product.name }>
            <h4 data-testid={ `${ind}-product-name` }>{product.name}</h4>
            <h4 data-testid={ `${ind}-product-total-value` }>{`R$ ${(product.price * product.qty).toFixed(two).toString().replace('.', ',')}`}</h4>
            <p data-testid={ `${ind}-product-unit-price` }>{`(R$ ${product.price.toFixed(two).toString().replace('.', ',')} un)`}</p>
            <span data-testid={ `${ind}-product-qtd-input` }>{product.qty}</span>
            <button data-testid={ `${ind}-removal-button` } type="button" onClick={ () => removeProduct(product.id) }>X</button>
          </div>))}
      </div>
      <form className="FormCheckout">
        <h3>Endereço</h3>
        <label htmlFor="address">
          Rua
          <input
            id="address"
            type="text"
            value={ address }
            data-testid="checkout-street-input"
            onChange={ (event) => setAddress(event.target.value) }
          />
        </label>
        <label htmlFor="number">
          Número
          <input
            id="number"
            type="text"
            value={ number }
            data-testid="checkout-house-number-input"
            onChange={ (event) => setNumber(event.target.value) }
          />
        </label>
      </form>
      <footer className="FooterCheckout">
        <p data-testid="order-total-value">
          {`R$ ${(Math.round(totalPrice * aHundred) / aHundred).toFixed(two).toString().replace('.', ',')}`}
          <button
            type="button"
            disabled={ totalPrice === zero || address.length < 1 || number.length < 1 }
            data-testid="checkout-finish-btn"
            onClick={ async () => {
              const body = JSON.stringify({
                address, number, price: totalPrice, products: list,
              });
              const headers = new Headers({
                'Content-Type': 'application/json',
                'Content-Length': body.length,
                Authorization: user.token,
              });
              await
              fetch('http://localhost:3001/orders', { method: 'POST', body, headers })
                .then((response) => response.json()
                  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))))
                .then(() => {
                  carts[cartIndex].list = [];
                  localStorage.setItem('carts', JSON.stringify(carts));
                  return setOkMessage('Compra realizada com sucesso!');
                });

              return props.history.push('/products');
            } }
          >
            Finalizar Pedido
          </button>
        </p>
      </footer>
    </div>
  );
};

Checkout.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Checkout;
