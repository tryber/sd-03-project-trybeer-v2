import React from 'react';
import { Redirect } from 'react-router-dom';
import AdminSideBar from '../AdminSideBar';
import './styles.css';

const AdminProfile = () => {
  const { name, email } = JSON.parse(localStorage.getItem('user')) || '';

  if (!name) return <Redirect to="/login" />;

  return (
    <div className="admin-profile">
      <AdminSideBar />
      <div className="admin-profile-aside">
        <h1>Perfil</h1>
        <h3>
          Nome:
          <span data-testid="profile-name">{name}</span>
        </h3>
        <h3>
          Email:
          <span data-testid="profile-email">{email}</span>
        </h3>
      </div>
    </div>
  );
};

export default AdminProfile;
