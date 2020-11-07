import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import "../styles/Header.css";

function AdminHeader({ title }) {

  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push("/login");
  };

  return (
    <header className="Header">
      <div className="side-menu-container">
        <Link to="/admin/orders">
          <button data-testid="side-menu-item-orders" className="MenuItem">Meus Pedidos</button>
        </Link>
        <Link to="/admin/profile">
          <button data-testid="side-menu-item-profile" className="MenuItem">Meu Perfil</button>
        </Link>
        <button data-testid="side-menu-item-logout" className="MenuItem LogoutBtn" type="button" onClick={() => handleLogout()}>
          Sair
        </button>
      </div>
      <h1 data-testid="top-title" className="TopTitle TitleAdmin">{title}</h1>
    </header>
  )
};

export default AdminHeader;