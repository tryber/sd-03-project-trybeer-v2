import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import CheckoutCard from '../../../components/Client/ClientCheckout/CheckoutCard/CheckoutCard';
import ClientNavBar from '../../../components/Client/ClientNavBar/ClientNavBar';
import { registerOrder } from '../../../services';
import { saveCartAtLocalStorage } from '../../../utils/products';

const cartPrice = (cartProducts = []) => {
  const initialTotal = 0;
  const totalValue = cartProducts.reduce(
    (acc, product) => acc + product.quantity * product.price,
    initialTotal,
  );
  return totalValue;
};

const removeProduct = (name, products = [], callback1, callback2) => {
  const updateCart = products.filter((product) => product.name !== name);
  callback1([...updateCart]);
  callback2(cartPrice([...updateCart]));
  return saveCartAtLocalStorage([...updateCart]);
};

const initialTotal = 0;
const initialQuantity = 0;
const initialFloat = 2;

function Checkout() {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const cartData = JSON.parse(localStorage.getItem('productCart') || '[]');
  const [cartProducts, setCartProducts] = useState(cartData);
  const [totalPrice, setTotalPrice] = useState(cartPrice(cartData));
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const submitOrder = useCallback(
    () => registerOrder(
      userData.id,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      cartProducts,
    ).then(
      () => {
        setIsSubmit(false);
        setMessage('Compra realizada com sucesso!');
        localStorage.setItem('productCart', JSON.stringify([]));
        setCartProducts([]);
      },
      (response) => {
        setError(response);
        setIsSubmit(false);
      },
    ),
    [
      userData.id,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      cartProducts,
    ],
  );

  useEffect(() => {
    if (isSubmit === false) return undefined;
    submitOrder();
    return () => {
      setIsSubmit(false);
      setError('');
    };
  }, [isSubmit, submitOrder]);

  useEffect(() => {
    if (!message) return undefined;
    const timerCount = 3000;
    const timer = setTimeout(() => setRedirect(true), timerCount);
    return () => {
      setRedirect(false);
      clearTimeout(timer);
    };
  }, [isSubmit, message]);

  if (!userData.name) return <Redirect to="/login" />;

  if (redirect) return <Redirect to="/products" />;

  return (
    <div>
      <ClientNavBar title="Finalizar Pedido" />
      <div style={ { overflowY: 'scroll', height: '560px' } }>
        <h1>Produtos</h1>
        {!isSubmit && message && <h3>{message}</h3>}
        {!isSubmit && error && <h3>{error}</h3>}
        {!isSubmit && !cartProducts.length && (
          <h1>Não há produtos no carrinho</h1>
        )}
        {!isSubmit
          && cartProducts.length > initialQuantity
          && cartProducts.map((product, index) => (
            <CheckoutCard
              key={ product.id }
              index={ index }
              quantity={ product.quantity }
              name={ product.name }
              price={ product.price }
              onClick={ () => removeProduct(
                product.name,
                cartProducts,
                setCartProducts,
                setTotalPrice,
              ) }
            />
          ))}
        <div>
          <span
            style={ {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            } }
          >
            <p>
              <strong>Total:</strong>
            </p>
            <p data-testid="order-total-value">
              {`R$ ${totalPrice.toFixed(initialFloat).replace('.', ',')}`}
            </p>
          </span>
        </div>
        <div className="checkout-info-container">
          <div className="login-div-inputs login-labels">
            <p>Endereço</p>
            <label htmlFor="delivery_address">
              <p>Rua:</p>
              <input
                className="inputs"
                type="text"
                id="delivery_address"
                data-testid="checkout-street-input"
                value={ deliveryAddress }
                onChange={ (event) => setDeliveryAddress(event.target.value) }
              />
            </label>
            <div className="login-div-inputs login-labels">
              <label htmlFor="delivery_number">
                <p>Número:</p>
                <input
                  className="inputs"
                  type="number"
                  id="delivery_number"
                  data-testid="checkout-house-number-input"
                  value={ deliveryNumber }
                  onChange={ (event) => setDeliveryNumber(event.target.value) }
                />
              </label>
            </div>
          </div>
          <button
            className="checkout-btn"
            data-testid="checkout-finish-btn"
            type="button"
            onClick={ () => setIsSubmit(true) }
            disabled={
              totalPrice === initialTotal || !deliveryAddress || !deliveryNumber
            }
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
