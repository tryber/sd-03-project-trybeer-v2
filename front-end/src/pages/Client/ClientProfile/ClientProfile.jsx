import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';
import ClientNavBar from '../../../components/Client/ClientNavBar/ClientNavBar';
import { updateUser } from '../../../services';
import '../../Login/loginPage.css';

const nameValidation = (name) => {
  const nameRegex = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/;
  return !!name && typeof name === 'string' && !!name.match(nameRegex);
};
const minimumNameLength = 12;
const isValidName = (name) => name.length >= minimumNameLength;

function ClientProfile() {
  const { setToken } = useContext(AuthContext);
  const userData = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState({ name: '', email: '' });
  const { name, email } = user || userData;
  const [updatedName, setUpdatedName] = useState(userData.name);
  const [isValid, setIsValid] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (nameValidation(updatedName) && isValidName(updatedName)) setIsValid(true);

    if (!nameValidation(updatedName) || !isValidName(updatedName)) setIsValid(false);

    return () => setIsValid(false);
  }, [updatedName]);

  useEffect(() => {
    if (!user.name) setUser((previousUser) => ({ ...previousUser, ...userData }));
    if (!isSubmit) return undefined;
    updateUser(updatedName, email).then(
      (response) => {
        setToken(response);
        setMessage('Atualização concluída com sucesso');
        return setIsSubmit(false);
      },
      (response) => {
        setError(response);
        return setIsSubmit(false);
      },
    );
    return () => {
      setIsValid(false);
      setIsSubmit(false);
    };
  }, [isSubmit, setToken, updatedName, email, userData, user]);

  if (!userData.name) return <Redirect to="/login" />;
  return (
    <div
      style={ {
        display: 'flex', flexDirection: 'column', margin: 'auto', height: '640px',
      } }
    >
      <ClientNavBar title="Meu perfil" />
      {error && <h4>{error}</h4>}
      {message && <h4>{message}</h4>}
      <form
        className="form-container"
        onSubmit={ (event) => {
          event.preventDefault();
          setIsSubmit(true);
        } }
      >
        <div className="login-div-inputs login-labels">
          <label className="login-labels" htmlFor="name">
            <p>Nome</p>
            <input
              className="inputs"
              id="name"
              name="name"
              data-testid="profile-name-input"
              placeholder="Nome"
              type="text"
              value={ updatedName }
              onChange={ (event) => setUpdatedName(event.target.value.trim()) }
              required
              maxLength={ 100 }
            />
          </label>
        </div>
        <div className="login-div-inputs login-labels">
          <label className="login-labels" htmlFor="email">
            <p>Email</p>
            <input
              className="inputs"
              id="email"
              data-testid="profile-email-input"
              type="email"
              value={ email }
              readOnly
            />
          </label>
        </div>
        <div>
          <button
            className="login-button"
            type="submit"
            disabled={ !isValid || name === updatedName }
            style={ { width: '150px', margin: 'auto' } }
            data-testid="profile-save-btn"
          >
            <p>Salvar</p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClientProfile;
