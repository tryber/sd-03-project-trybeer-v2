import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './AdminMenu.css';

const logout = (e, history) => {
  e.preventDefault();
  localStorage.removeItem('user');
  return history.push('/login');
};

function AdminMenu() {
  const history = useHistory();
  return (
    <aside className="admin-side-bar-container">
      <h1>Trybeer</h1>
      <div>
        <Link to="/admin/orders" data-testid="side-menu-item-orders"><button type="button">Pedidos</button></Link>
        <Link to="/admin/profile" data-testid="side-menu-item-profile"><button type="button">Perfil</button></Link>
        <button type="submit" data-testid="side-menu-item-logout" onClick={ (e) => logout(e, history) }>Sair</button>
      </div>
    </aside>
  );
}

export default AdminMenu;
