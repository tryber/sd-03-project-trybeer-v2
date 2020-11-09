import React from 'react';
import { Link } from 'react-router-dom';

const logout = () => {
  localStorage.removeItem('user');
};

const AdminMenu = () => {
  return (
    <ul className="admin-side-bar-container">
      <li>
        <Link to="/admin/orders" className="menu-btn" data-testid="side-menu-item-orders">
          Meus Pedidos
        </Link>
      </li>
      <li>
        <Link
          to="/admin/profile"
          type="button"
          className="menu-btn"
          data-testid="side-menu-item-profile"
        >
          Meu Perfil
        </Link>
      </li>
      <li>
        <Link
          to="/login"
          onClick={() => logout()}
          className="menu-btn"
          data-testid="side-menu-item-logout"
        >
          Sair
        </Link>
      </li>
    </ul>
  );
};

export default AdminMenu;
