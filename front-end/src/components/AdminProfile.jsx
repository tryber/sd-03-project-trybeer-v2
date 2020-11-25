import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './CSS/OrdersAdmin.css';

const AdminProfile = () => {
  const [redirectLogin, setRedirectLogin] = useState(false);
  const { token, email, name } = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    axios.get('https://trybeerback.herokuapp.com/profile', {
      headers: {
        Authorization: token,
      }
    }).catch(() => setRedirectLogin(true));
  }, [token]);

  return (
    <div>
      <h1 className="title">Perfil</h1>
      {redirectLogin && <Redirect to="/login" />}
      <p data-testid="profile-name">Nome: {name}</p>
      <p data-testid="profile-email">Email: {email}</p>
    </div>
  );
}

export default AdminProfile;
