import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './ClientChat.css';
import { ClientMenu, AdminMenu } from './Menu/index';

import { ContextAplication } from '../context/ContextAplication';

const io = require('socket.io-client');

const socket = io('http://localhost:3001', { transports: ['websocket'] });

const connectWithBack = async () => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const response = await axios.get('http://localhost:3001/products', { headers: { authorization: token } });
  return response;
};

function ClientChat() {
  const {
    userChat,
  } = useContext(ContextAplication);
  const [chat, setChat] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')) || null;

  socket.on('message', ({ newMessage }) => {
    const { from, time, text } = newMessage;
    setChat([...chat, { from, time, text }]);
  });

  socket.on('history', (previousMessages) => {
    setChat(previousMessages);
  });

  const displayMessage = () => {
    const message = document.getElementById('message-input').value;
    if (user.role === 'administrator') {
      socket.emit('message', { message, user, to: userChat });
    } else {
      socket.emit('message', { message, user, to: 'Loja' });
      document.getElementById('message-input').value = '';
    }
  };

  const getData = async () => {
    try {
      await connectWithBack();
      socket.emit('history', user);
    } catch (e) {
      return e;
    }
    return false;
  };

  useEffect(() => getData(), []);

  return (
    <div>
      { user === null && <Redirect to="/login" />}
      {user.role === 'administrator' ? <AdminMenu /> : <ClientMenu />}
      <div className="chat-div">
        {chat.length && chat.map((item) => (
          <div key={ item.time }>
            <p>{`${item.from} - ${item.time}`}</p>
            <p>{item.text}</p>
          </div>))}
      </div>
      <input id="message-input" />
      <button type="button" onClick={ () => displayMessage() }>Enviar Mensagem</button>
    </div>
  );
}

export default ClientChat;
