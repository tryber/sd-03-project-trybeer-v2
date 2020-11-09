import React from 'react';
import PropTypes from 'prop-types';
import AdminSideBar from './AdminSideBar';
import './adminBar.css';

function AdminNavBar({ title }) {
  return (
    <div>
      <div className="admin-nav-bar" >
        <h2 data-testid="top-title">{`${title}`}</h2>
      </div>
      <AdminSideBar />
    </div>
  );
}

AdminNavBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AdminNavBar;
