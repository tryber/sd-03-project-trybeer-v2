import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/Footer';
import UserForm from './styles/UserForm.js';

function Register() {
  const [name, setName] = useState({ text: '', verif: false });
  const [email, setEmail] = useState({ text: '', verif: false });
  const [password, setPassword] = useState({ text: '', verif: false });
  const [seller, setSeller] = useState(false);
  const [activeSubmit, setActiveSubmit] = useState(false);
  const [error, setError] = useState('');
  const [redirectTo, setRedirectTo] = useState('/');

  useEffect(() => {
    if (name.verif && email.verif && password.verif) {
      setActiveSubmit(true);
    } else {
      setActiveSubmit(false);
    }
  }, [name.verif, email.verif, password.verif]);

  function handleNameChange(currentName) {
    const regex = new RegExp(/^[a-zA-Z\s]+$/);
    const minLength = 12;
    let verif = false;
    if (regex.test(currentName) && currentName.length >= minLength) {
      verif = true;
    }
    setName({
      text: currentName,
      verif,
    });
  }

  function handleEmailChange(currentEmail) {
    const regex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    let verif = false;
    if (regex.test(currentEmail)) {
      verif = true;
    }
    setEmail({
      text: currentEmail,
      verif,
    });
  }

  function handlePasswordChange(currentPassword) {
    let verif = false;
    const minLength = 6;
    if (currentPassword.length >= minLength) {
      verif = true;
    }
    setPassword({
      text: currentPassword,
      verif,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const role = seller ? 'administrator' : 'client';
    try {
      const { data } = await axios.post('http://localhost:3001/users', {
        name: name.text,
        email: email.text,
        password: password.text,
        role,
      });
      const page = data.role === 'administrator' ? '/admin/orders' : '/products';
      localStorage.setItem('user', JSON.stringify(data));
      setRedirectTo(page);
    } catch (err) {
      if (err.message === 'Request failed with status code 409') {
        setError('E-mail already in database.');
      } else {
        setError(err.message);
      }
    }
  }

  if (redirectTo !== '/') return <Redirect to={ redirectTo } />;

  return (
    <Fragment>
      <UserForm>
        <div className="body_form">
          <center>
            <h1 className="text-center">
              TRYBEER
            </h1>
            <h2>REGISTRO DE NOVO USUÁRIO</h2>
            <div className="div_form">
              <form className="form" method="POST" onSubmit={ handleSubmit }>
                <div className="form-group">
                  <label htmlFor="name" className="txt_label">
                    Nome Completo
                    <input
                      data-testid="signup-name"
                      className="ipt_form"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Nome Completo"
                      onChange={ (e) => handleNameChange(e.target.value) }
                      value={ name.text }
                      required
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="txt_label">
                    Email
                    <input
                      data-testid="signup-email"
                      className="ipt_form"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email Valido"
                      onChange={ (e) => handleEmailChange(e.target.value) }
                      value={ email.text }
                      required
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="txt_label">
                    Password
                    <input
                      data-testid="signup-password"
                      className="ipt_form"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Senha"
                      onChange={ (e) => handlePasswordChange(e.target.value) }
                      value={ password.text }
                      required
                    />
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label txt_seller" htmlFor="seller">
                    <input
                      data-testid="signup-seller"
                      className="seller"
                      type="checkbox"
                      name="seller"
                      id="seller"
                      onChange={ (e) => setSeller(e.target.checked) }
                      value={ seller }
                    />
                    Quero Vender
                  </label>
                </div>
                <div className="div_btn">
                  <input type="submit" value="Cadastrar" disabled={ !activeSubmit } data-testid="signup-btn" className="btn_ok" />
                </div>
              </form>
            </div>
          </center>
          <p className="text-muted">{error}</p>
        </div>
      </UserForm>
      <Footer />
    </Fragment>
  );
}

export default Register;
