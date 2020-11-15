import React, { useState, useEffect } from 'react';
import MenuTop from '../../components/menuTop/MenuTop';
import Sidebar from '../../components/sidebar/Sidebar';
import {
  getUserFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/localStorageFunctions';
import useForm from '../../hooks/useForm';
import { changeClientName } from '../../services/userService';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const { values, handleChange } = useForm({ name: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    setUser(getUserFromLocalStorage());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await changeClientName(
      { name: values.name, email: user.email },
      user.token,
    );
    saveToLocalStorage(res);
    setMsg('Atualização concluída com sucesso');
  };

  return (
    <div>
      <MenuTop pageTitle="Meu perfil" datatest="top-title" />
      <Sidebar />
      <div id="wrapper" className="profile-page">
        <form>
          <fieldset aria-label="Disabled fieldset example">
            <div className="mb-3">
              <label htmlFor="name" className="form-label profile-label">
                Nome:
                <input
                  data-testid="profile-name-input"
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder={ user.name }
                  onChange={ (event) => handleChange(event) }
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label profile-label">
                Email:
                <input
                  data-testid="profile-email-input"
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={ values.email }
                  placeholder={ user.email }
                  readOnly
                />
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-custom"
              onClick={ (e) => handleSubmit(e) }
              data-testid="profile-save-btn"
              disabled={ !values.name }
            >
              Salvar
            </button>
          </fieldset>
        </form>
        <p className="text-center message">{msg}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
