import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import jwt from 'jwt-decode';
import AuthContext from './AuthContext';

const initialTokenState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
const initialUserState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const initialLoggedInState = !!localStorage.getItem('user');

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(initialTokenState);
  const [loggedIn, setLoggedIn] = useState(initialLoggedInState);
  const [user, setUser] = useState(initialUserState);

  useEffect(() => {
    if (!token) return undefined;
    const decodedData = jwt(token);
    const userData = { ...decodedData.data, token };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser((previousUser) => ({ ...previousUser, ...userData }));
    setLoggedIn(true);
    return () => {
      setToken(null);
      setUser(null);
      setLoggedIn(false);
    };
  }, [token, user]);

  const store = {
    setToken,
    loggedIn,
    user,
  };

  return <AuthContext.Provider value={ store }>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
