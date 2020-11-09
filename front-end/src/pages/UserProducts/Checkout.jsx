import React, { useContext, useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { ProductsContext } from '../../contexts/ProductsContext';
import Header from '../../components/MenuTop';
import Footer from '../../components/Footer';
import Line from './styles/ProductLine';
import { formatPrice } from '../../utils/utils';
import Orders from './styles/OrdersComponent';

const productLine = ({ quantity, name, price, id }, index, deleteProduct) => (
  <Line>
    <th data-testid={`${index}-product-qtd-input`}>{quantity}</th>
    <th data-testid={`${index}-product-name`}>{name}</th>
    <th data-testid={`${index}-product-total-value`}>{formatPrice(quantity * price)}</th>
    <th data-testid={`${index}-product-unit-price`}>{`(${formatPrice(price)} un)`}</th>
    <th>
      <button
        data-testid={`${index}-removal-button`}
        type="button"
        onClick={() => deleteProduct(id)}
      >
        <i className="material-icons">clear</i>
      </button>
    </th>
  </Line>
);

const postCheckout = async (
  { deliveryAddress, deliveryNumber },
  products,
  { token },
  totalPrice,
  setMessage,
  setRedirectTo,
) => {
  try {
    const productsCart = products.reduce((acc, { quantity, id }) => {
      if (quantity !== 0) acc.push({ productId: id, quantity });
      return acc;
    }, []);
    const { status } = await axios({
      method: 'POST',
      url: 'http://localhost:3001/sales',
      data: {
        totalPrice,
        deliveryAddress,
        deliveryNumber,
        products: productsCart,
      },
      headers: { Authorization: token },
    });
    const statusOk = 201;
    if (status === statusOk) {
      setMessage('Compra realizada com sucesso!');
      setRedirectTo('/products');
    }
  } catch (err) {
    console.log(err.message);
  }
};

const Checkout = () => {
  const { products, cartTotalPrice, deleteProduct, setMessage } = useContext(ProductsContext);
  const [redirectTo, setRedirectTo] = useState('');

  const [address, setAddress] = useState({
    street: '',
    number: '',
  });

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) setRedirectTo('/login');
  }, []);

  if (redirectTo) return <Redirect to={redirectTo} />;

  const onChange = (e) => {
    setAddress({
      ...address,
      [e.name]: e.value,
    });
  };

  const cart = products.reduce((acc, product, index) => {
    if (product.quantity) acc.push(productLine(product, index, deleteProduct));
    return acc;
  }, []);

  return (
    <Fragment>
      <Header title="Finalizar Pedido" />
      <Orders>
        {cart.length === 0 ? 'Não há produtos no carrinho' : <table> {cart} </table>}
        <span className="total-price" data-testid="order-total-value">Total: {formatPrice(cartTotalPrice)}</span>
        <div>
          Rua:
          <input
            type="text"
            data-testid="checkout-street-input"
            name="deliveryAddress"
            className="ipt_form"
            onChange={(e) => onChange(e.target)}
          />
        </div>
        <span>Número: </span>
        <input
          type="text"
          data-testid="checkout-house-number-input"
          className="ipt_form"
          name="deliveryNumber"
          onChange={(e) => onChange(e.target)}
        />
        <button
          type="button"
          data-testid="checkout-finish-btn"
          className="btn_ok"
          onClick={() =>
            postCheckout(address, products, user, cartTotalPrice, setMessage, setRedirectTo)
          }
          disabled={cart.length === 0 || !address.deliveryAddress || !address.deliveryNumber}
        >
          Finalizar Pedido
        </button>
      </Orders>
      <Footer />
    </Fragment>
  );
};

export default Checkout;
