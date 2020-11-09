import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { userLogin } from '../../services';
import './loginPage.css';

const isEmailValid = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return !!email && typeof email === 'string' && !!email.match(emailRegex);
};
// guardando numero numa variavel como pede o Eslint (No magic number rule)
const minimumLength = 6;
const isPasswordValid = (password) => password.length >= minimumLength;

const LoginPage = () => {
  const { role } = JSON.parse(localStorage.getItem('user')) || {};
  const { setToken } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (isEmailValid(email) && isPasswordValid(password)) setIsValid(true);
    if (!isEmailValid(email) || !isPasswordValid(password)) setIsValid(false);
  }, [email, password]);

  useEffect(() => {
    if (!isSubmit) return undefined;
    userLogin(email, password).then(
      (response) => {
        setToken(response);
        setRedirect(true);
      },
      (response) => {
        setError(response);
        setIsSubmit(false);
      }
    );

    return () => {
      setIsSubmit(false);
      setError(null);
      setRedirect(false);
    };
  }, [isSubmit, email, error, password, setToken]);

  if (redirect || role) {
    return role && role === 'administrator' ? <Redirect to="/admin/orders" /> : <Redirect to="/products" />;
  }

  return (
    <div style={{ margin: 'auto', height: '640px', display: 'flex' }}>
      <form
        className="form-container"
        onSubmit={(event) => {
          event.preventDefault();
          setIsSubmit(!isSubmit);
        }}
      >
        <h2>Trybeer</h2>
        <div className="login-div-inputs login-labels">
          <label className="login-labels" htmlFor="email">
            <p>Email</p>
            <input
              className="inputs"
              id="email"
              data-testid="email-input"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="login-div-inputs login-labels">
          <label className="login-labels" htmlFor="password">
            <p>Password</p>
            <input
            className="inputs"
              data-testid="password-input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </label>
          {error && <p style={{fontSize: "10px"}}>{error}</p>}
        </div>
        <div>
          <button
            className="login-button"
            type="submit"
            data-testid="signin-btn"
            disabled={!isValid}
          >
            ENTRAR
          </button>
        </div>
        <div>
          <Link to="/register">
            <button className="sign-in-button" type="button" data-testid="no-account-btn">
              Ainda não tenho conta
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
