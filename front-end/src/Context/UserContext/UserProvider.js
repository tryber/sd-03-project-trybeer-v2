import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const context = {
    userData,
    setUserData,
  };
  return (
    <UserContext.Provider value={ context }>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = { children: PropTypes.node.isRequired };

export default UserProvider;
