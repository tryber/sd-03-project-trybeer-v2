import React, { useEffect, useState } from 'react';

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
    <div>
      <h1>Perfil</h1>
      <h5 data-testid="profile-name">
        Nome:
        { loggedName }
      </h5>
      <h5 data-testid="profile-email">
        Email:
        { loggedEmail }
      </h5>
    </div>
  );
}

export default AdminProfile;
