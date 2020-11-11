import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Login.css';

const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const carts = localStorage.getItem('carts');
    if (!carts || carts.length < 1) {
      localStorage.setItem('carts', JSON.stringify([]));
    }
  }, []);

  const six = 6;
  const validateLogin = () => (
    password.length >= six && email.match(emailTest)
  );

  const setLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <div className="ContainerLogin">
      <h1>Login</h1>
      <form className="FormLogin" id="login-form" method="POST">
        <label htmlFor="email">
          Email
          <br />
          <input
            className="InputLogin"
            data-testid="email-input"
            id="email"
            type="email"
            onChange={ (event) => setEmail(event.target.value) }
          />
        </label>
        <br />
        <label htmlFor="password">
          Password
          <br />
          <input
            className="InputLogin"
            data-testid="password-input"
            id="password"
            type="password"
            onChange={ (event) => setPassword(event.target.value) }
          />
        </label>
        <br />
        <button
          className="SigninBtn"
          data-testid="signin-btn"
          type="button"
          onClick={ async () => {
            const body = { email, password };
            const headers = new Headers({
              'Content-Type': 'application/json',
              'Content-Length': JSON.stringify(body).length,
            });
            const user = await
            fetch('http://localhost:3001/login', { method: 'POST', body: JSON.stringify(body), headers })
              .then((response) => response.json()
                .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));
            setLocalStorage(user);
            if (user.role === 'administrator') {
              return props.history.push('/admin/orders');
            }
            return props.history.push('/products');
          } }
          disabled={ !validateLogin() }
        >
          ENTRAR
        </button>
        <br />
        <Link to="/register">
          <button className="NoAccountBtn" data-testid="no-account-btn" type="button">Ainda não tenho conta</button>
        </Link>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Login;
