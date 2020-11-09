import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import MenuTop from '../../components/menuTop/MenuTop';
import ListProductsCards from '../../components/listProductsCards/ListProductsCards';
import getAllProducts from '../../services/productsService';
import formatPrice from '../../utils/formatPrice';
import {
  getCartFromLocalStorage,
  getUserFromLocalStorage,
} from '../../utils/localStorageFunctions';
import Sidebar from '../../components/sidebar/Sidebar';
import './ProductsPage.css';

function ProductsPage() {
  const [products, setProducts] = useState(null);
  const [totalPrice, setTotalPrice] = useState('0,00');
  const [successMessage, setSuccessMessage] = useState('');
  const user = getUserFromLocalStorage();
  const token = user ? user.token : '';
  const lengthValidation = 0;

  const fetchAllProducts = async () => getAllProducts(token).then((result) => setProducts(result));

  const getTotalPrice = () => {
    const cart = getCartFromLocalStorage();

    if (cart && cart.length > lengthValidation) {
      const total = cart.reduce(
        (acc, { price, amount }) => (acc += price * amount),
        lengthValidation,
      );
      const price = formatPrice(total);
      return setTotalPrice(price);
    }
    return setTotalPrice('0,00');
  };

  useEffect(() => getTotalPrice(), []);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const message = urlParams.get('msg');
    setSuccessMessage(message);
  }, []);

  if (!user) return <Redirect to="/login" />;

  return (
    <div>
      <MenuTop />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <p className="text-center">{successMessage}</p>
          {products && products.length > lengthValidation ? (
            <div id="wrapper" className="product-page">
              <ListProductsCards
                products={ products }
                getTotalPrice={ getTotalPrice }
                totalPrice={ totalPrice }
              />
            </div>
          ) : (
            <h1 className="text-center message-geral">
              {products && products.length === 0
                ? 'Nenhum produto disponível'
                : 'Loading...'}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
