import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const OrdersContext = createContext();

OrdersContext.displayName = 'OrdersContext';

const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const { token } = JSON.parse(localStorage.getItem('user')) || {};
    try {
      const { data, status } = await axios({
        method: 'GET',
        url: 'http://localhost:3001/sales',
        headers: { Authorization: token },
      });
      const statusOk = 200;
      if (status === statusOk) {
        setOrders(data.sales);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const context = {
    orders,
    getOrders,
  };

  return <OrdersContext.Provider value={ context }>{children}</OrdersContext.Provider>;
};

OrdersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OrdersProvider;
