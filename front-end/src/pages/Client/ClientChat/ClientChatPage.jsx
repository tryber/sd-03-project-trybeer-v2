import React from 'react';
import { Redirect } from 'react-router-dom';
import ClientNavBar from '../../../components/Client/ClientNavBar/ClientNavBar';
import ChatComponent from '../../../components/Chat/ChatComponent';

function ClientChatPage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { userEmail } = user;

  if (!user) return <Redirect to="/login" />;

  return (
    <div style={ { background: 'white' } }>
      <ClientNavBar title="Chat" />
      <ChatComponent from="client" userEmail={ userEmail } />
    </div>
  );
}

export default ClientChatPage;
