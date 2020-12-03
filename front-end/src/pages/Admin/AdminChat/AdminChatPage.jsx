import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminNavBar from '../../../components/Admin/AdminBar/AdminNavBar';
import ChatComponent from '../../../components/Chat/ChatComponent';

function AdminChatPage({ match }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user) return <Redirect to="/login" />;

  const { nickname } = match.params;

  return (
    <div style={ { background: 'white' } }>
      <Link to="/admin/chats"><button type="button">Voltar</button></Link>
      <AdminNavBar title="Chat" />
      <ChatComponent from="Admin" userEmail={ nickname } />
    </div>
  );
}

AdminChatPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      nickname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default AdminChatPage;
