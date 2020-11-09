import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductContext from './ProductContext';

const cartData = JSON.parse(localStorage.getItem('productCart') || '[]');

const ProductContextProvider = ({ children }) => {
  const [productCart, setProductCart] = useState(cartData);
  const [update, setUpdate] = useState(false);

  const context = {
    productCart,
    setProductCart,
    update,
    setUpdate,
  };

  return <ProductContext.Provider value={ context }>{children}</ProductContext.Provider>;
};

ProductContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductContextProvider;
