import React from 'react';
import AdminSideBar from '../components/AdminSideBar';
import AdminOrders from '../components/AdminOrders';

function AdminOrdersPage () {
  return (
    <div>
      <AdminSideBar Children = { <AdminOrders />}/>
    </div>
  );
}

export default AdminOrdersPage;
