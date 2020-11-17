import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import TopMenu from '../../components/TopMenu/Index';

let socket;

const UserChat = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const asyncCall = async () => {
      socket = socketIOClient('http://localhost:3001');
      await socket.on('history', (el) =>console.log(el));
    };
    asyncCall();
    return () => socket.disconnect();
  }, []);

  const sendMessage = async (e, userMessage) => {
    e.preventDefault();
    console.log('oi')
    socket.emit('message', { user: 'xalau', userMessage });
    setMessage('');
  };

  return (
    <div>
      {TopMenu('TryBeer')}
      <div className="products-container-card">
        <input data-testid="message-input" type="text" value={ message } onChange={ (e) => setMessage(e.target.value) } placeholder="Digite..." />
        <button type="submit" data-testid="send-message" onClick={ (e) => sendMessage(e, message) }>Enviar</button>
      </div>
    </div>
  );
};

export default UserChat;
