import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './index.css';
// import { GiHamburgerMenu } from 'react-icons/gi';

const cleanUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};

const SideMenu = () => {
  const role = localStorage.getItem('role');

  const history = useHistory();

  return (
    <aside className="side-menu-container" data-testid="side-menu-container">
      {role === 'administrator' ? (
        <>
          <button data-testid="side-menu-item-profile" onClick={ () => history.push('/admin/profile') }>Meu Perfil</button>
          <button data-testid="side-menu-item-orders" onClick={ () => history.push('/admin/orders') }>Pedidos</button>
          <button data-testid="side-menu-item-chat" onClick={ () => history.push('/admin/chats') }>Conversas</button>
        </>
      ) : (
        <>
          <Link to="/products">
            <button data-testid="side-menu-item-products">Produtos</button>
          </Link>
          <Link to="/orders">
            <button data-testid="side-menu-item-my-orders">Meus Pedidos</button>
          </Link>
          <Link to="/profile">
            <button data-testid="side-menu-item-my-profile">Meu Perfil</button>
          </Link>
          <Link to="/chat">
            <button data-testid="side-menu-chat">Conversar com a loja</button>
          </Link>
        </>
      )}
      <Link to="/login">
        <button
          data-testid="side-menu-item-logout"
          onClick={ cleanUser }
          type="button"
        >
          Sair
        </button>
      </Link>
    </aside>
  );
};

export default SideMenu;
