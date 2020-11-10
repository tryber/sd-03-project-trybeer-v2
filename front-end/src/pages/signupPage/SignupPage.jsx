import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { saveToLocalStorage } from '../../utils/localStorageFunctions';
import { register } from '../../services/userService';
import './SignupPage.css';

function SignupPage() {
  const [name, setName] = useState({ text: '', able: false });
  const [email, setEmail] = useState({ text: '', able: false });
  const [password, setPassword] = useState({ text: '', able: false });
  const [seller, setSeller] = useState(false);
  const [ableToSubmit, setAbleToSubmit] = useState(false);
  const [error, setError] = useState('');
  const [redirectTo, setRedirectTo] = useState('/');

  useEffect(() => {
    if (name.able && email.able && password.able) {
      setAbleToSubmit(true);
    } else {
      setAbleToSubmit(false);
    }
  }, [name.able, email.able, password.able]);

  function handleNameChange(currentName) {
    // Fonte do regex : https://stackoverflow.com/questions/12778083/regex-with-space-and-letters-only
    const regex = new RegExp(/^[a-zA-Z\s]+$/);
    const minLength = 12;
    let able = false;
    if (regex.test(currentName) && currentName.length >= minLength) {
      able = true;
    }
    setName({
      text: currentName,
      able,
    });
  }

  function handleEmailChange(currentEmail) {
    // Fonte do regex : https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const regex = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    );
    let able = false;
    if (regex.test(currentEmail)) {
      able = true;
    }
    setEmail({
      text: currentEmail,
      able,
    });
  }

  function handlePasswordChange(currentPassword) {
    let able = false;
    const minLength = 6;
    if (currentPassword.length >= minLength) {
      able = true;
    }
    setPassword({
      text: currentPassword,
      able,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = register(name, email, password, seller);
    const user = await response;
    saveToLocalStorage(user);
    const page = user.role === 'administrator' ? '/admin/orders' : '/products';
    if (user.err) setError(user.err.message);
    else setRedirectTo(page);
  }

  if (redirectTo !== '/') return <Redirect to={ redirectTo } />;

  return (
    <div className="main-page card">
      <h1 className="text-center">Trybeer - Signup</h1>
      <div id="form-div" className="d-flex justify-content-center align-items-center">
        <form method="POST" onSubmit={ handleSubmit }>
          <div className="mb-3">
            <label htmlFor="name">
              Nome
              <input
                data-testid="signup-name"
                className="form-control"
                type="text"
                name="name"
                id="name"
                placeholder="Nome"
                onChange={ (e) => handleNameChange(e.target.value) }
                value={ name.text }
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              Email
              <input
                data-testid="signup-email"
                className="form-control"
                type="email"
                name="email"
                id="email"
                placeholder="E-mail válido"
                onChange={ (e) => handleEmailChange(e.target.value) }
                value={ email.text }
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              Password
              <input
                data-testid="signup-password"
                className="form-control"
                type="password"
                name="password"
                id="password"
                placeholder="Escolha uma senha"
                onChange={ (e) => handlePasswordChange(e.target.value) }
                value={ password.text }
                required
              />
            </label>
          </div>
          <div id="form-check" className="form-check">
            <label className="form-check-label" htmlFor="seller">
              <input
                data-testid="signup-seller"
                className="form-check-input"
                type="checkbox"
                name="seller"
                id="seller"
                onChange={ (e) => setSeller(e.target.checked) }
                value={ seller }
              />
              Quero Vender
            </label>
          </div>
          <input
            type="submit"
            value="Cadastrar"
            disabled={ !ableToSubmit }
            data-testid="signup-btn"
            className="btn form-button"
          />
        </form>
      </div>
      <p className="text-muted text-center">{error}</p>
    </div>
  );
}

export default SignupPage;
