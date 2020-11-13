import React, { useState, useEffect, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import './Chat.css';
import { ClientMenu, AdminMenu } from './Menu/index';

import { ContextAplication } from '../context/ContextAplication';

const io = require('socket.io-client');

const socket = io('http://localhost:3001', { transports: ['websocket'] });
const user = JSON.parse(localStorage.getItem('user')) || null;

const connectWithBack = async () => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const response = await axios.get('http://localhost:3001/chat', {
    headers: { authorization: token },
  });
  return response;
};

function ClientChat() {
  const { userChat } = useContext(ContextAplication);
  const [chat, setChat] = useState([]);
  const localUser = JSON.parse(localStorage.getItem('user'));

  const emitHistory = () => (localUser.role === 'administrator'
    ? socket.emit('history', { email: userChat })
    : socket.emit('history', user));

  useEffect(emitHistory, []);

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
    } catch (e) {
      return e;
    }
    return false;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {user === null && <Redirect to="/login" />}
      {user !== null && user.role === 'administrator' ? <AdminMenu /> : <ClientMenu />}
      <p id="hidden-text">b</p>
      {user !== null && user.role === 'administrator' && (
        <Link to="/admin/chats">
          <button data-testid="back-button" type="button">
            Voltar
          </button>
        </Link>)}
      <div className="chat-div">
        {chat.length
          && chat.map((item) => (
            <div key={ item.time }>
              <p data-testid="nickname">{item.from}</p>
              <p data-testid="message-time">{item.time}</p>
              <p data-testid="text-message">{item.text}</p>
            </div>
          ))}
      </div>
      <input
        id="message-input"
        data-testid="message-input"
      />
      <button
        data-testid="send-message"
        type="button"
        onClick={ () => displayMessage() }
      >
        Enviar Mensagem
      </button>
    </div>
  );
}

export default ClientChat;
