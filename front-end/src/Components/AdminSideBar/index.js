import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';

const AdminSideBar = () => {
  const history = useHistory();
  const seconds = 500;
  return (
    <div className="admin-side-bar-container">
      <div>
        <h1>TryBeer</h1>
        {/* <Link to="/admin/orders"> */}
        <button
          type="button"
          className="btn-admin"
          data-testid="side-menu-item-orders"
          onClick={ () => {
            setTimeout(() => history.push('/admin/orders'), seconds);
          } }
        >
          Pedidos
        </button>
        {/* </Link> */}
        <Link to="/admin/profile">
          <button
            type="button"
            className="btn-admin"
            data-testid="side-menu-item-profile"
          >
            Perfil
          </button>
        </Link>
      </div>
      <Link to="/login">
        <button
          type="button"
          className="btn-admin"
          data-testid="side-menu-item-logout"
        >
          Sair
        </button>
      </Link>
    </div>
  );
};

export default AdminSideBar;
