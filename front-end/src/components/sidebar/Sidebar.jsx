import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <nav
      id="navbarToggleExternalContent"
      className="navbar-collapse collapse side-menu-container sidebar-nav"
    >
      <div id="sidebar-wrapper">
        <ul className="nav sidebar-nav flex-column">
          <li className="nav-item">
            <a
              className="nav-link"
              data-testid="side-menu-item-products"
              href="/products"
            >
              Produtos
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-testid="side-menu-item-my-orders"
              href="/orders"
            >
              Meus pedidos
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-testid="side-menu-item-my-profile"
              href="/profile"
            >
              Meu Perfil
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-testid="side-menu-chat"
              href="/chat"
            >
              Conversar com a loja
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-testid="side-menu-item-logout"
              href="/login"
            >
              Sair
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
