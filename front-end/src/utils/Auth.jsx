import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Auth = ({ children }) => {
  const [redirectTo, setRedirectTo] = useState('');

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user'))) setRedirectTo('/login');
  }, []);

  if (redirectTo) return <Redirect to={redirectTo} />;
  return children;
};

export default Auth;
