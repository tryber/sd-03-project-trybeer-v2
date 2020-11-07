import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import { MainContext } from '../context/context';
import '../styles/Checkout.css';

const Checkout = (props) => {
  const { setOkMessage } = useContext(MainContext);
  const [list, setList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const carts = JSON.parse(localStorage.getItem('carts'));
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    var cartIndex = carts.findIndex((e) => e.user === user.email);
  }

  useEffect(() => {
    if (!user) return props.history.push('/login');
    const cart = carts.find((e) => e.user === user.email);
    setList(cart.list);
    setTotalPrice(cart.list.reduce((acc, e) => acc + Number(e.price) * Number(e.qty), 0));
  }, [])

  useEffect(() => {
    setTotalPrice(list.reduce((acc, e) => acc + Number(e.price) * Number(e.qty), 0));
  }, [list]);

  const removeProduct = (id) => {
    const newList = list.filter((e) => e.id !== id);
    setList(newList);
    const newCarts = ([...carts, carts[cartIndex].list = newList]);
    return localStorage.setItem('carts', JSON.stringify(newCarts));
  }

  return (
    <div>
      <Header title='Finalizar Pedido' />
      <div className="ListItem">
        {(list.length === 0) ? <h2>Não há produtos no carrinho</h2> : null}
        {list.map((product, ind) =>
          <div className="Itens">
            <h4 data-testid={`${ind}-product-name`} >{product.name}</h4>
            <h4 data-testid={`${ind}-product-total-value`}>{`R$ ${(product.price * product.qty).toFixed(2).toString().replace('.', ',')}`}</h4>
            <p data-testid={`${ind}-product-unit-price`}>{`(R$ ${product.price.toFixed(2).toString().replace('.', ',')} un)`}</p>
            <span data-testid={`${ind}-product-qtd-input`}>{product.qty}</span>
            <button data-testid={`${ind}-removal-button`} onClick={() => removeProduct(product.id)}>X</button>
          </div>
        )}
      </div>
      <form className="FormCheckout">
        <h3>Endereço</h3>
        <label htmlFor="address">
          Rua
          <input
            id="address" type="text" value={address} data-testid="checkout-street-input"
            onChange={(event) => setAddress(event.target.value)}
          />
        </label>
        <label htmlFor="number">
          Número
          <input
            id="number" type="text" value={number} data-testid="checkout-house-number-input"
            onChange={(event) => setNumber(event.target.value)}
          />
        </label>
      </form>
      <footer className="FooterCheckout">
        <p data-testid="order-total-value">{`R$ ${(Math.round(totalPrice * 100) / 100).toFixed(2).toString().replace('.', ',')}`}
          <button
            disabled={totalPrice === 0 || address.length < 1 || number.length < 1}
            data-testid="checkout-finish-btn"
            onClick={async () => {
              const body = JSON.stringify({ "address": address, "number": number, "price": totalPrice, "products": list });
              const headers = new Headers({
                "Content-Type": "application/json",
                "Content-Length": body.length,
                "Authorization": user.token
              })
              await
                fetch(`http://localhost:3001/orders`, { method: 'POST', body, headers })
                  .then((response) => response.json()
                    .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))))
                  .then(() => {
                    carts[cartIndex].list = [];
                    localStorage.setItem('carts', JSON.stringify(carts))
                    return setOkMessage('Compra realizada com sucesso!')
                  });;

              return props.history.push('/products');
            }}>
            Finalizar Pedido
            </button>
        </p>
      </footer>
    </div>
  )
};

export default Checkout;