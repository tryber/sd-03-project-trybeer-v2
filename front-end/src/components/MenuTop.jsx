import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Menu from './styles/MenuTop';

const logout = () => {
  localStorage.removeItem('user');
};

const renderClientList = () => (
  <ul className="side-menu-container">
    <li>
      <Link to="/products" className="menu-btn" data-testid="side-menu-item-products">
        Produtos
      </Link>
    </li>
    <li>
      <Link to="/orders" type="button" className="menu-btn" data-testid="side-menu-item-my-orders">
        Meus Pedidos
      </Link>
    </li>
    <li>
      <Link
        to="/profile"
        type="button"
        className="menu-btn"
        data-testid="side-menu-item-my-profile"
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

const MenuTop = ({ title }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  return (
    <Menu>
      <center>
        <h1 className="app-name" data-testid="top-title">
          {title}
        </h1>
      </center>
      <label htmlFor="hamburguer-input">
        <input
          id="hamburguer-input"
          className="hamburguer-input"
          data-testid="top-hamburguer"
          type="checkbox"
          onChange={ () => setIsMenuActive(!isMenuActive) }
        />
        <div className={ isMenuActive ? 'menu menuChecked' : 'menu' }>
          <span className={ isMenuActive ? 'hamburguerChecked hamburguer' : 'hamburguer' } />
        </div>
      </label>

      {isMenuActive ? renderClientList() : ''}
    </Menu>
  );
};

MenuTop.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MenuTop;
