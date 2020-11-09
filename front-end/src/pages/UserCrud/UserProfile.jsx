import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import MenuTop from '../../components/MenuTop';
import Footer from '../../components/Footer';
import UserForm from './styles/UserForm.js';

const putUser = async (name, email, setMessage) => {
  try {
    const { status } = await axios.put(
      'http://localhost:3001/users',
      {
        name,
        email,
      },
      { headers: { Authorization: JSON.parse(localStorage.getItem('user')).token } },
    );
    const statusOk = 200;
    if (status === statusOk) {
      setMessage('Atualização concluída com sucesso');
    }
  } catch (err) {
    setMessage(err.message);
  }
};

const Profile = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [inputUserName, setInputUserName] = useState('');
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const { email, name } = JSON.parse(localStorage.getItem('user'));
    setUserEmail(email);
    setUserName(name);
    setInputUserName(name);
  }, []);
  return (
    <Fragment>
      <MenuTop title="Meu perfil" />
      <UserForm>
        <div className="body_form">
          <center>
            <div className="div_form">
              <form className="form">
                <div className="form-group">
                  <label htmlFor="name" className="txt_label">
                    Nome
                    <input
                      className="ipt_form"
                      placeholder="Nome Completo"
                      type="text"
                      data-testid="profile-name-input"
                      name="name"
                      value={userName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                        setBtnIsDisabled(
                          !(e.target.value.length > 12) && !(e.target.value !== inputUserName),
                        );
                      }}
                      required
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="txt_label">
                    Email
                    <input
                      data-testid="profile-email-input"
                      className="ipt_form"
                      placeholder="Email"
                      type="text"
                      name="email"
                      value={userEmail}
                      readOnly
                    />
                  </label>
                </div>
                <div className="div_btn">
                  <button
                    disabled={btnIsDisabled}
                    type="button"
                    data-testid="profile-save-btn"
                    profile-save-btn
                    className="btn_ok"
                    onClick={() => putUser(userName, userEmail, setMessage)}
                  >
                    Salvar
                  </button>
                  <span>{message}</span>
                </div>
              </form>
            </div>
          </center>
        </div>
      </UserForm>
      <Footer />
    </Fragment>
  );
};

export default Profile;
