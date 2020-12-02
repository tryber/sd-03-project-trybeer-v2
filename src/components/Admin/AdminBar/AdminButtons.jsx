import React from 'react';
import Button from './Button';

function AdminButtons() {
  return (
    <div>
      {Button('Pedidos', '/admin/orders', 'side-menu-item-orders')}
      {Button('Perfil', '/admin/profile', 'side-menu-item-profile')}
      {Button('Conversas', '/admin/chat', 'side-menu-item-chat')}
      {Button('Sair', '/login', 'side-menu-item-logout')}
    </div>
  );
}

export default AdminButtons;
