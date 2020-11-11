import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import validateInput from '../../utils/validate';
import { getUserFromAPI } from '../../services/api_endpoints';
import Header from '../Header';
import Footer from '../Footer';
import './login.css';
import '../../index.css';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [userRole, setUserRole] = useState('');
  const { email, password } = form;

  const handleInput = (e) => {
    const { name, value } = e.target;
    return validateInput(name, value)
      ? setForm({ ...form, [name]: value })
      : setForm({ ...form, [name]: '' });
  };

  const getUserData = async () => {
    const response = await getUserFromAPI(email, password);
    if (response.message) {
      alert(response.message);
      return;
    }
    const { token, role } = response;
    if (token) {
      localStorage.setItem('user', JSON.stringify(response));
      setUserRole(role);
    }
    return true;
  };

  if (userRole === 'administrator') return <Redirect to="/admin/orders" />;
  if (userRole === 'client') return <Redirect to="/products" />;

  return (
    <>
      <Header title="Tente Cerveja" />
      <section className="login-container default-color box-shadow">
        <div className="form">
          <label htmlFor="email">
            Email
            <input
              id="email"
              className="text-box"
              name="email"
              data-testid="email-input"
              onChange={ (event) => handleInput(event) }
              type="email"
              required
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              id="password"
              className="text-box"
              data-testid="password-input"
              onChange={ (event) => handleInput(event) }
              name="password"
              required
              type="password"
            />
          </label>
          <button
            className="login-btn confirm-btn"
            disabled={ email === '' || password === '' }
            type="button"
            data-testid="signin-btn"
            onClick={ () => getUserData(email, password) }
          >
            ENTRAR
          </button>
          <Link to="./register">
            <button
              className="register-btn confirm-btn"
              type="button"
              data-testid="no-account-btn"
            >
              Ainda não tenho conta
            </button>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default LoginPage;
