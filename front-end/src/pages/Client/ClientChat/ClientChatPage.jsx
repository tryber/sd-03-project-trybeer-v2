import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { io } from 'socket.io-client';
import ClientNavBar from '../../../components/Client/ClientNavBar/ClientNavBar';

function ClientChatPage() {
  const {
    id, token, email, name,
  } = JSON.parse(localStorage.getItem('user') || '{}');
  const time = new Date().toLocaleTimeString('pt-br');
  const socket = useRef();

  const [message, setMessage] = useState();

  useEffect(() => {
    socket.current = io('http://localhost:3001', { transports: ['websocket'] });
    console.log('retorno de socket', socket);
  }, [id, token]);

  if (!name) return <Redirect to="/login" />;

  return (
    <div style={ { display: 'flex', flexDirection: 'column', width: '360px' } }>
      <ClientNavBar title="Chat" />
      <input type="text" data-testid="message-input" onChange={ (e) => setMessage(e.target.value) } value={ message } />
      <button
        type="button"
        onClick={ () => socket.current.emit('message', { message, email, time }) }
        data-testid="send-message"
      >
        Enviar
      </button>
    </div>
  );
}

export default ClientChatPage;
