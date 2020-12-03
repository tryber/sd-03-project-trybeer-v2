import React from 'react';
import { Redirect } from 'react-router-dom';
import ClientNavBar from '../../../components/Client/ClientNavBar/ClientNavBar';
import ChatComponent from '../../../components/Chat/ChatComponent';
import { getMessageHistory } from '../../../services';

function ClientChatPage() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return <Redirect to="/login" />;

  return (
    <div style={ { display: 'flex', flexDirection: 'column', width: '360px' } }>
      <ClientNavBar title="Chat" />
      <ChatComponent callback={ getMessageHistory } />
    </div>
  );
}

export default ClientChatPage;
