import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import MenuBar from '../MenuBar/index';
import validateInput from '../../utils/validate';
import { postNewUserAPI } from '../../services/api_endpoints';
import './styles.css';

const friends = require('../../images/friends.png');

const RegisterUser = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    seller: false,
  });
  const [error, setError] = useState({});
  const [userCreated, setRedirect] = useState({ redirect: false, role: '' });
  const {
    email,
    password,
    name,
    seller,
  } = form;
  const { redirect, role } = userCreated;

  const handleInput = (e) => {
    if (e === 'seller') return setForm({ ...form, seller: !seller });
    const { name: userName, value } = e.target;
    return validateInput(userName, value)
      ? setForm({ ...form, [userName]: value })
      : setForm({ ...form, [userName]: '' });
  };

  const createNewUser = async () => {
    const unprocessableEntityCode = 422;
    const { message, status, token } = await postNewUserAPI(name, email, password, seller);
    if (status === unprocessableEntityCode) return setError({ message });
    if (token) {
      const data = { name, email, token };
      localStorage.setItem('user', JSON.stringify(data));
      setRedirect({ redirect: true, role: seller ? 'administrador' : 'client' });
    }
    return null;
  };
  if (redirect) {
    return (role === 'client'
      ? <Redirect to="/products" />
      : <Redirect to="/admin/orders" />);
  }
  return (
    <>
      <MenuBar titleName="TryBeer" />
      <section className="register-container default-color shadow">
        <img src={ friends } alt="Icone de duas cervejas" width="100px" />
        {error.message && <p>{error.message}</p>}
        <form>
          <label htmlFor="userName">
            Nome
            <input
              className="input-register"
              onChange={ (e) => handleInput(e) }
              type="text"
              name="name"
              id="userName"
              data-testid="signup-name"
            />
          </label>
          <br />
          <label htmlFor="userEmail">
            Email
            <input
              className="input-register"
              onChange={ (e) => handleInput(e) }
              type="email"
              name="email"
              id="userEmail"
              data-testid="signup-email"
            />
          </label>
          <br />
          <label htmlFor="userPassword">
            Password
            <input
              className="input-register"
              onChange={ (e) => handleInput(e) }
              type="password"
              name="password"
              id="userPassword"
              minLength="6"
              data-testid="signup-password"
            />
          </label>
          <br />
          <label htmlFor="userSeller">
            Quero Vender
            <input
              type="checkbox"
              name="seller"
              id="userSeller"
              data-testid="signup-seller"
              onChange={ () => handleInput('seller') }
            />
          </label>
          <br />
          <button
            onClick={ () => createNewUser() }
            className="confirm-btn"
            disabled={ email === '' || password === '' || name === '' }
            type="button"
            data-testid="signup-btn"
          >
            Cadastrar
          </button>
        </form>
      </section>
    </>
  );
};

export default RegisterUser;
