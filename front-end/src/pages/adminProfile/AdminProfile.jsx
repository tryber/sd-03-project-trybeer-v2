import React, { useEffect, useState } from 'react';
import AdminMenuSideBar from '../../components/adminMenuSideBar/AdminMenuSideBar';

function AdminProfile() {
  const [loggedName, setLoggedName] = useState('');
  const [loggedEmail, setLoggedEmail] = useState('');

  useEffect(() => {
    const storageUser = localStorage.getItem('user');
    if (!storageUser) window.location.href = '/login';
    const { name, email } = JSON.parse(storageUser) || {};
    setLoggedName(name);
    setLoggedEmail(email);
  }, []);

  return (
    <div className="d-flex">
      <AdminMenuSideBar />
      <div className="main-page flex-lg-fill">
        <form>
          <fieldset>
            <div className="mb-3">
              <p className="form-label">Nome:</p>
              <p data-testid="profile-name" className="form-control">
                {loggedName}
              </p>
            </div>
            <div className="mb-3">
              <p className="form-label">Email:</p>
              <p data-testid="profile-email" className="form-control">
                {loggedEmail}
              </p>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default AdminProfile;
