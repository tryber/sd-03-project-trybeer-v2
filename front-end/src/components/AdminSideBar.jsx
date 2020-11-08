import React, { useState, Children } from 'react';
import { Redirect } from 'react-router-dom';
import ASideBar from './CSS/ASideBar.css';

const AdminSideBar = ({ Children }) => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const unlogging = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    user = {...user, token: []};
    localStorage.setItem('user', JSON.stringify(user));
    setRedirectToLogin(true);
  };
  return (
    <div className="menu">{ redirectToLogin && <Redirect to="/login" /> }
      <div className="side-bar">
        <div>
          <div className="divTitle">Trybeer</div>
          <div className="white-border"><a data-testid="side-menu-item-orders" href="/admin/orders">Pedidos</a></div>
          <div className="white-border"><a data-testid="side-menu-item-profile" href="/admin/profile">Perfil</a></div>
        </div>   
        <div className="menu-logout">
          <div className="white-border"><a
            data-testid="side-menu-item-logout" href="#"
            onClick={() => unlogging()}
          >Sair</a></div>
        </div>
      </div>
      <div className="content">{ Children }</div>
    </div>
  );
};

export default AdminSideBar;
