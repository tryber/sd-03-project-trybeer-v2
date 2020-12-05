import React from 'react';
import { Link } from 'react-router-dom';
import AdminButtons from './AdminButtons';
import './adminBar.css';

function AdminSideBar() {
  return (
    <div className="admin-side-menu-container">
      <Link to="/admin/orders">
        <input
          className="top-icon-b"
          data-testid="top-hamburguer"
          type="button"
        />
      </Link>
      <AdminButtons />
    </div>
  );
}

export default AdminSideBar;
