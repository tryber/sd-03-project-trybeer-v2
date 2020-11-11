/* eslint-disable react-hooks/exhaustive-deps */
import { Redirect } from 'react-router-dom';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AdminHeader from '../components/AdminHeader';

const AdminProfile = (props) => {
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const { history } = props;
    if (!user) return history.push('/login');
    return () => undefined;
  }, []);

  if (!user) return <Redirect to="/login" />;
  return (
    <div className="ProfileContainer">
      <AdminHeader title="Perfil" />
      <section className="FormContainer">
        <p>Nome</p>
        <p data-testid="profile-name">{`${user.name}`}</p>
        <br />
        <p>Email</p>
        <p data-testid="profile-email">{`${user.email}`}</p>
      </section>
    </div>
  );
};

AdminProfile.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AdminProfile;
