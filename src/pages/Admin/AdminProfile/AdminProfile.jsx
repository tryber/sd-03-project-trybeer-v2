import React from 'react';
import { Redirect } from 'react-router-dom';
import AdminNavBar from '../../../components/Admin/AdminBar/AdminNavBar';
import './adminProfile.css';

function AdminProfile() {
  const userData = JSON.parse(localStorage.getItem('user'));
  if (!userData || userData.role !== 'administrator') return <Redirect to="/login" />;
  return (
    <div className="profile-hdr">
      <AdminNavBar title="Meu perfil" />
      <div className="profile-container">
          <h2>Perfil</h2>
        <div className="profile-info">
          <p data-testid="profile-name">{`Nome: ${userData.name}`}</p>
          <p data-testid="profile-email">{`Email: ${userData.email}`}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
