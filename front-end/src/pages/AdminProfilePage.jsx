import React from 'react';
import AdminProfile from '../components/AdminProfile';
import AdminSideBar from '../components/AdminSideBar';

function AdminProfilePage () {
  return (
    <AdminSideBar Children={<AdminProfile />}/>
  );
}

export default AdminProfilePage;
