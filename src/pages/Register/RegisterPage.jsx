import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../../services';
import AuthContext from '../../context/AuthContext';
import './registerPage.css';

const emailValidation = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return !!email && typeof email === 'string' && !!email.match(emailRegex);
};

const nameValidation = (name) => {
  const nameRegex = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/;
  return !!name && typeof name === 'string' && !!name.match(nameRegex);
};
const minimumNameLength = 12;
const isValidName = (name) => name.length >= minimumNameLength;

const minimumLength = 6;
const isPasswordValid = (password) => password.length >= minimumLength;

const submitUser = async (name, email, password, role) => {
  const userRole = role ? 'administrator' : 'client';
  const token = await registerUser(name, email, password, userRole);
  return token;
};

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const { setToken } = useContext(AuthContext);

  useEffect(() => {
    if (
      emailValidation(email)
      && isPasswordValid(password)
      && nameValidation(name)
      && isValidName(name)
    ) { return setIsValid(true); }

    if (
      !emailValidation(email)
      || !isPasswordValid(password)
      || !nameValidation(name)
      || !isValidName(name)
    ) { return setIsValid(false); }

    return () => setIsValid(false);
  }, [email, password, name]);

  useEffect(() => {
    if (!isSubmit) return undefined;
    submitUser(name, email, password, isAdmin).then(
      (response) => {
        setToken(response);
        setRedirect(true);
      },
      (response) => {
        setError(response);
        setIsSubmit(false);
      },
    );

    return () => {
      setIsAdmin(false);
      setIsValid(false);
      setIsSubmit(false);
      setRedirect(false);
    };
  }, [isSubmit, isAdmin, name, email, password, setToken]);

  if (redirect) {
    return isAdmin === true ? <Redirect to="/admin/orders" /> : <Redirect to="/products" />;
  }

  return (
    <div style={ { margin: 'auto', height: '640px', display: 'flex' } }>
      {error && <h2>{error}</h2>}
      <form
        className="reg-form-container"
        onSubmit={ (event) => {
          event.preventDefault();
          setIsSubmit(true);
        } }
      >
        <h2 className="title">Cadastre-se!</h2>
        <div className="reg-login-div-inputs  reg-login-labels">
          <label className="reg-login-labels" htmlFor="name">
            <p>Nome</p>
            <input
              className="reg-inputs"
              id="name"
              data-testid="signup-name"
              placeholder="Nome"
              type="text"
              value={ name }
              onChange={ (e) => setName(e.target.value) }
              required
              minLength={ 12 }
              maxLength={ 100 }
            />
          </label>
        </div>
        <div className="reg-login-div-inputs">
          <label className="reg-login-labels" htmlFor="email">
            <p>Email</p>
            <input
              className="reg-inputs"
              id="email"
              data-testid="signup-email"
              placeholder="Email"
              type="email"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
              required
            />
          </label>
        </div>
        <div className="reg-login-div-inputs">
          <label className="reg-login-labels" htmlFor="password">
            <p>Password</p>
            <input
              className="reg-inputs"
              id="password"
              data-testid="signup-password"
              placeholder="Senha"
              type="password"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
              required
              minLength={ 6 }
            />
          </label>
        </div>
        <div className="reg-login-div-inputs">
          <label htmlFor="role">
            Quero Vender
            <input
              onClick={ () => setIsAdmin(!isAdmin) }
              data-testid="signup-seller"
              type="checkbox"
              id="role"
            />
          </label>
        </div>
        <div style={ { marginTop: '10px' } }>
          <button
            className="reg-signup-button"
            type="submit"
            disabled={ !isValid }
            style={ { width: '150px', margin: 'auto' } }
            data-testid="signup-btn"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
