import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './ClientMenu.css';

const logout = (e, history) => {
  e.preventDefault();
  localStorage.removeItem('user');
  return history.push('/login');
};

const sidebarVisibility = (sidebar, setSidebar) => {
  if (sidebar === 'sidebar-hidden') return setSidebar('sidebar');
  return setSidebar('sidebar-hidden');
};

function ClientMenu() {
  const [sidebar, setSidebar] = useState('sidebar-hidden');
  const history = useHistory();
  return (
    <div>
      <navbar className="top-menu">
        <button type="button" onClick={ () => sidebarVisibility(sidebar, setSidebar) } className="menu-button">
          <FontAwesomeIcon icon={ faBars } size="2x" data-testid="top-hamburguer" />
        </button>
        <h1 data-testid="top-title">TryBeer</h1>
        <div />
      </navbar>
      <aside className={ `${sidebar} side-menu-container` }>
        <div className="menu-links">
          <Link to="/products" data-testid="side-menu-item-products"><button type="button">Produtos</button></Link>
          <Link to="/orders" data-testid="side-menu-item-my-orders"><button type="button">Meus Pedidos</button></Link>
          <Link to="/profile" data-testid="side-menu-item-my-profile"><button type="button">Meu Perfil</button></Link>
        </div>
        <button type="submit" data-testid="side-menu-item-logout" onClick={ (e) => logout(e, history) } className="logout-button">Sair</button>
      </aside>
    </div>
  );
}

export default ClientMenu;
