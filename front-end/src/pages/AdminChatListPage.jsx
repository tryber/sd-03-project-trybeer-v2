import React from 'react';
import AdminChat from '../components/AdminChat';
import AdminSideBar from '../components/AdminSideBar';
import AdminTopBar from '../components/AdminTopBar';

function AdminChatListPage () {
  return (
    <div>
      <AdminTopBar />
      <AdminSideBar Children={<AdminChat />} />
    </div>
  );
}

export default AdminChatListPage;
