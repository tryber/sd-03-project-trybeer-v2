import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { MainContext } from '../context/context';
import Header from '../components/Header';
import '../styles/Products.css';

const Products = () => {
  const {
    products,
    setProducts,
    okMessage,
    setOkMessage,
  } = useContext(MainContext);
  let ini = [];
  const zero = 0;
  const one = -1;
  const two = 2;
  const aHundred = 100;
  if (localStorage.getItem('carts')) {
    ini = (JSON.parse(localStorage.getItem('carts')));
  }
  const [carts, setCarts] = useState(ini);
  const [totalPrice, setTotalPrice] = useState();
  const [loggedIn, setLoggedIn] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  let cartIndex = carts.findIndex((e) => {
    if (currentUser) {
      return e.user === currentUser.email;
    }
    return one;
  });
  useEffect(() => {
    let headers;
    if (currentUser) {
      if (cartIndex < zero) {
        setCarts([...carts, { user: currentUser.email, list: [] }]);
        localStorage.setItem('carts', JSON.stringify(carts));
        cartIndex = carts.findIndex((e) => e.user === currentUser.email);
      }
      headers = new Headers({
        Authorization: currentUser.token,
      });
    }
    fetch('http://localhost:3001/products', { headers })
      .then((response) => response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))))
      .then((data) => setProducts(data))
      .catch(() => setLoggedIn(false));
  }, []);

  useEffect(() => {
    if (carts[cartIndex]) {
      setTotalPrice(carts[cartIndex].list
        .reduce((acc, e) => acc + Number(e.price) * Number(e.qty), zero));
    }
  }, [carts, cartIndex]);

  const addProduct = (product) => {
    setOkMessage('');
    const cartItemIndex = carts[cartIndex].list.findIndex((e) => e.id === product.id);
    const updateCart = [...carts];
    if (cartItemIndex >= zero) {
      updateCart[cartIndex].list[cartItemIndex].qty += 1;
      setCarts([...updateCart]);
      return localStorage.setItem('carts', JSON.stringify(carts));
    }
    updateCart[cartIndex].list = [...updateCart[cartIndex].list, { ...product, qty: 1 }];
    setCarts([...updateCart]);
    return localStorage.setItem('carts', JSON.stringify([...updateCart]));
  };

  const removeProduct = (product) => {
    const cartItemIndex = carts[cartIndex].list.findIndex((e) => e.id === product.id);
    if (cartItemIndex < zero) return;
    if ((carts[cartIndex].list[cartItemIndex].qty - 1) === zero) {
      const updateCart = [...carts];
      updateCart[cartIndex].list = updateCart[cartIndex].list.filter((e) => e.id !== product.id);
      setCarts([...updateCart]);
      localStorage.setItem('carts', JSON.stringify([...updateCart]));
    }
    const updateCart = [...carts];
    updateCart[cartIndex].list[cartItemIndex].qty -= 1;
    setCarts([...updateCart]);
    localStorage.setItem('carts', JSON.stringify(carts));
  };
  if (!loggedIn) return <Redirect to="/login" />;
  return (
    <div>
      <Header title="TryBeer" />
      {okMessage ? <h3>Compra realizada com sucesso!</h3> : null}
      <section className="ProductsContainer">
        {products.map((product, ind) => {
          let index;
          if (carts[cartIndex] && carts[cartIndex].list) {
            index = carts[cartIndex].list.findIndex((e) => e.id === product.id);
            return (
              <div className="ProductsCards">
                <div className="CardTitle">
                  <h3 data-testid={ `${ind}-product-name` }>{product.name}</h3>
                </div>
                <img data-testid={ `${ind}-product-img` } src={ product.urlImage } alt="Product" />
                <h4 data-testid={ `${ind}-product-price` }>{`R$ ${product.price.toFixed(two).toString().replace('.', ',')}`}</h4>
                <div className="BtnCard">
                  <button className="BtnMinus" type="button" data-testid={ `${ind}-product-minus` } onClick={ () => removeProduct(product) }>-</button>
                  <span id={ `id-${product.id}-qty` } data-testid={ `${ind}-product-qtd` }>
                    {(carts[cartIndex] && carts[cartIndex].list[index])
                      ? carts[cartIndex].list[index].qty
                      : zero}
                  </span>
                  <button className="BtnPlus" type="button" data-testid={ `${ind}-product-plus` } onClick={ () => addProduct(product) }>+</button>
                </div>
              </div>);
          }
          return null;
        })}
      </section>
      <footer className="FooterProducts">
        <p data-testid="checkout-bottom-btn-value">
          { `R$ ${(Math.round(totalPrice * aHundred) / aHundred).toFixed(two).toString().replace('.', ',')}` }
          <Link to="/checkout">
            <button data-testid="checkout-bottom-btn" disabled={ totalPrice === zero } type="button">Ver Carrinho</button>
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Products;
