import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import openSocket from 'socket.io-client';
import ClientNavBar from '../../../components/Client/ClientNavBar/ClientNavBar';

function ClientChatPage() {
  const {
    id, token, email, name,
  } = JSON.parse(localStorage.getItem('user') || '{}');
  const socket = openSocket('http://localhost:3001');
  const time = new Date().toLocaleTimeString('pt-br');

  const [message, setMessage] = useState();

  useEffect(() => () => {
  }, [id, token]);

  if (!name) return <Redirect to="/login" />;

  return (
    <div style={ { display: 'flex', flexDirection: 'column', width: '360px' } }>
      <ClientNavBar title="Chat" />
      <input data-testid="message-input" onChange={ (e) => setMessage(e.target.value) } value={ message } />
      <button
        type="button"
        onClick={ () => socket.emit('message', { message, email, time }) }
        data-testid="send-message"
      >
        Enviar
      </button>
    </div>
  );
}

export default ClientChatPage;
