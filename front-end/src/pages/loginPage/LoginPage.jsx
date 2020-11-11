import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/useForm';
import { saveToLocalStorage } from '../../utils/localStorageFunctions';
import { login } from '../../services/userService';
import './LoginPage.css';

export default function Login() {
  const [isValid, setIsValid] = useState(true);
  const { values, handleChange } = useForm({ email: '', password: '' });

  const validate = (loginInfo) => {
    const minPasswd = 6;
    const password = loginInfo.password.length >= minPasswd;
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    const email = expression.test(String(loginInfo.email).toLowerCase());
    return password === email;
  };

  useEffect(() => {
    localStorage.clear();
  });

  useEffect(() => {
    setIsValid(validate(values));
  }, [values]);

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const rawResponse = login(values);

    const userInfo = await rawResponse;

    if (userInfo.role === 'administrator') {
      saveToLocalStorage(userInfo);
      window.location.href = '/admin/orders';
    }

    if (userInfo.role === 'client') {
      saveToLocalStorage(userInfo);
      window.location.href = '/products/';
    }
  };

  const handleNoAccountSubmit = (e) => {
    e.preventDefault();
    window.location.href = '/register';
  };

  return (
    <div className="main-page card">
      <h1 className="text-center">Trybeer - Login</h1>
      <div id="form-div" className="d-flex justify-content-center align-items-center">
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
              <input
                type="email"
                data-testid="email-input"
                value={ values.email }
                className="form-control"
                id="email"
                name="email"
                onChange={ (event) => handleChange(event) }
              />
            </label>
          </div>
          <div className="mb-3">
            <label
              value={ values.password }
              className="form-label"
              name="password"
              htmlFor="password"
            >
              Password:
              <input
                data-testid="password-input"
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={ (event) => handleChange(event) }
              />
            </label>
          </div>
          <div className="btn-group" role="group">
            <div className="mb-3 mr-2">
              <button
                data-testid="signin-btn"
                type="submit"
                className="btn form-button"
                disabled={ !isValid }
                onClick={ (event) => handleSignInSubmit(event) }
              >
                ENTRAR
              </button>
            </div>
            <div className="mb-3">
              <button
                onClick={ (event) => handleNoAccountSubmit(event) }
                type="submit"
                data-testid="no-account-btn"
                className="btn form-button"
              >
                Ainda não tenho conta
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
