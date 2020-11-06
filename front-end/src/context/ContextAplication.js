import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ContextAplication = createContext();

const AplicationProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({ saleProducts: [] });
  const [id, setId] = useState('');
  const [contextMessage, setContextMessage] = useState('');

  const context = {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    orders,
    setOrders,
    order,
    setOrder,
    id,
    setId,
    contextMessage,
    setContextMessage,
  };

  return (
    <ContextAplication.Provider value={ context }>
      {children}
    </ContextAplication.Provider>
  );
};

AplicationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AplicationProvider;
