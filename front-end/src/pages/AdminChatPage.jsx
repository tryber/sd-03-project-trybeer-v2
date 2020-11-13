import React from 'react';
import Chat from '../components/Chat';
import AdminSideBar from '../components/AdminSideBar';
import AdminTopBar from '../components/AdminTopBar';

function AdminChatPage () {
  return (
    <div>
      <AdminTopBar />
      <AdminSideBar Children={<Chat />} />
    </div>
  );
}

export default AdminChatPage;
