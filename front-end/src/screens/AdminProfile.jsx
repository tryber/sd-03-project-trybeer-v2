import { Redirect } from 'react-router-dom';
import React, { useEffect } from 'react';
import AdminHeader from '../components/AdminHeader';

const AdminProfile = (props) => {

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) return props.history.push('/login');
  }, [])

  if (!user) return <Redirect to="/login" />
  return (
    <div className="ProfileContainer">
      <AdminHeader title="Perfil" />
      <section className="FormContainer">
        <p>Nome</p>
        <p data-testid="profile-name">{`${user.name}`}</p><br />
        <p>Email</p>
        <p data-testid="profile-email">{`${user.email}`}</p>
      </section>
    </div>
  )

};

export default AdminProfile;
