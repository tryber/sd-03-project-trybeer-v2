import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const MainContext = createContext(null);

MainContext.displayName = 'MainContext';

const MainProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [okMessage, setOkMessage] = useState('');

  const context = {
    products,
    setProducts,
    carts,
    setCarts,
    okMessage,
    setOkMessage,
  };

  return <MainContext.Provider value={ context }>{ children }</MainContext.Provider>;
};

MainProvider.propTypes = { children: PropTypes.node.isRequired };

export default MainProvider;
