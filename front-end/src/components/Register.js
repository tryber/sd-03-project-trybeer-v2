import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ContextAplication } from '../context/ContextAplication';
import './Register.css';

async function submitRegister(e, email, password, name, checkbox, history, setError) {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:3001/register', {
      email,
      password,
      name,
      role: checkbox,
    });
    localStorage.setItem('user', JSON.stringify(response.data.token));
    setError('');
    return history.push(checkbox ? 'admin/orders' : '/products');
  } catch (err) {
    return setError('E-mail already in database.');
  }
}

export default function Register() {
  const {
    setError,
    error = ' ',
  } = useContext(ContextAplication);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const validEmailRegEx = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;
    const pLength = 6;
    const nameLength = 14;
    const testName = /^[ a-z]+$/i.test(name);

    if (!validEmailRegEx.test(email)
      || (password.length < pLength || name.length < nameLength || !testName)) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [name, email, password.length, setError]);
  const history = useHistory();

  return (
    <div className="page-register">
      <form className="form-register">
        <label htmlFor="error">
          <h3 name="error">{ error }</h3>
        </label>
        <label htmlFor="name">
          Nome
          {' '}
          <br />
          <input name="name" type="text" value={ name } onChange={ ({ target }) => setName(target.value) } data-testid="signup-name" />
        </label>
        <label htmlFor="email">
          Email
          {' '}
          <br />
          <input name="email" type="email" value={ email } onChange={ ({ target }) => setEmail(target.value) } data-testid="signup-email" />
        </label>
        <label htmlFor="password">
          Password
          {' '}
          <br />
          <input
            name="password"
            type="password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
            data-testid="signup-password"
          />
        </label>
        <label htmlFor="checkbox">
          <input name="checkbox" type="checkbox" value={ checkbox } onChange={ ({ target }) => setCheckbox(target.value) } data-testid="signup-seller" />
          Quero Vender
        </label>
        <button
          type="submit"
          disabled={ disabled }
          onClick={
            (e) => submitRegister(e, email, password, name, checkbox, history, setError, error)
          }
          data-testid="signup-btn"
          className="button-register"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
