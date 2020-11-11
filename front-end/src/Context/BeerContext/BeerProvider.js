import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BeerContext from './BeerContext';
import { getProductsLocalStorage, removeLocalStorage } from '../../utils/localStorage';
import { getProductsFromAPI } from '../../services/api_endpoints';

const BeerProvider = ({ children }) => {
  const { token } = getProductsLocalStorage('user');
  const zero = 0;
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(zero);

  const handleProductList = (productList) => setProducts(productList.map((product) => ({
    ...product, quantity: 0,
  })));

  useEffect(() => {
    const fetchProducts = async () => {
      const productsDB = await getProductsFromAPI(token) || [];
      handleProductList(productsDB);
    };
    fetchProducts();
  }, [token]);

  useEffect(() => {
    const cartProducts = getProductsLocalStorage('cart');
    setProducts((currentProducts) => currentProducts.map(
      (element) => cartProducts.reduce((newProduct, { productName, quantity }) => {
        if (productName === element.name) return { ...element, quantity };
        if (quantity === zero) removeLocalStorage(productName);
        return newProduct;
      }, element),
    ));
  }, [total]);

  const context = {
    handleProductList,
    products,
    total,
    setTotal,
    setProducts,
  };
  if (!token) {
    window.location.pathname = '/login';
    return null;
  }
  return (
    <BeerContext.Provider value={ context }>
      {children}
    </BeerContext.Provider>
  );
};

BeerProvider.propTypes = { children: PropTypes.node.isRequired };

export default BeerProvider;
