import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import UserForm from './styles/UserForm.js';
import Footer from '../../components/Footer';
import { Fragment } from 'react';

const login = async (email, password, setErrorMessage, setIsRedirect) => {
  try {
    const {
      data,
      status,
    } = await axios.post('http://localhost:3001/users/login', {
      email,
      password,
    });
    const statusOk = 200;
    if (status === statusOk) {
      localStorage.setItem('user', JSON.stringify(data));
      setIsRedirect({isRedirect: true, role: data.role});
    }
  } catch (err) {
    setErrorMessage(err.message);
  }
};

const regexEmail = /\S+@\w+\.\w{2,6}(\.\w{2})?/;
const regexPassword = /\d{6,}/;

const validateInputs = (state) => {
  const { email, password } = state;
  const response = {
    btnIsDisabled: false,
    emailMessage: '',
    passwordMessage: '',
  };
  if (email !== '' && !regexEmail.test(email)) {
    response.emailMessage = 'email is not valid';
    response.btnIsDisabled = true;
  }
  if (password !== '' && !regexPassword.test(password)) {
    response.passwordMessage = 'password is not valid';
    response.btnIsDisabled = true;
  }
  return response;
};

const Login = () => {
  const [inputsValues, setInputsValues] = useState({
    email: '',
    password: '',
  });
  const { email, password } = inputsValues;
  const [validations, setValidations] = useState({
    btnIsDisabled: true,
    emailMessage: '',
    passwordMessage: '',
  });
  const [isRedirect, setIsRedirect] = useState({isRedirect: false, role: ''});
  const [errorMessage, setErrorMessage] = useState('');
  const { btnIsDisabled, emailMessage, passwordMessage } = validations;
  const onChange = (e) => {
    const newState = { ...inputsValues, [e.name]: e.value };
    setInputsValues(newState);
    setValidations(validateInputs(newState));
  };
  if (isRedirect.isRedirect) {
    if (isRedirect.role === 'client') return <Redirect to="/products" />
    return <Redirect to="/admin/orders" />
  };
  return (
    <Fragment>
        <UserForm>
          <center>
            <h1 className="text-center">TRYBEER</h1>
            <h2>LOGIN</h2>
            <div className="div_form">
              <form className="form">
                <div className="form-group">
                  <label htmlFor="email" className="txt_label2">
                    Email <br />
                    <input
                      className="ipt_form"
                      placeholder="Email"
                      type="text"
                      data-testid="email-input"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e.target)}
                      required
                    />
                  </label><br />
                  <span className="txt_alert">{emailMessage}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="txt_label">
                    Password <br />
                    <input
                      className="ipt_form"
                      placeholder="Senha"
                      type="password"
                      data-testid="password-input"
                      name="password"
                      value={password}
                      onChange={(e) => onChange(e.target)}
                      required
                    />
                  </label><br />
                  <span className="txt_alert">{passwordMessage}</span>
                </div>
                <div className="div_btn">
                  <button
                    disabled={btnIsDisabled}
                    type="button"
                    data-testid="signin-btn"
                    className="btn_ok"
                    onClick={() => login(email, password, setErrorMessage, setIsRedirect)}
                  >
                    ENTRAR
                  </button>
                  <br />
                  <span className="txt_alert">{errorMessage}</span>
                </div>
                <div className="div_btn2">
                  <Link to="/register" data-testid="no-account-btn" className="btn_ok2">
                    Ainda não tenho conta
                  </Link>
                </div>
              </form>
            </div>
          </center>
        </UserForm>
      <Footer />
    </Fragment>
  );
};

export default Login;
