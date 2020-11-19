import React, { useState, useEffect, useRef } from 'react';
import TopMenu from '../../components/TopMenu/Index';

const { io } = window;

const UserChat = () => {
  const [message, setMessage] = useState('');
  const [arrMessages, setArrMessages] = useState([]);
  const [email, setEmail] = useState('');
  const socket = useRef();

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem('user'));
    if(!actualUser) return window.location.assign('http://localhost:3000/login');
    setEmail(actualUser.data.email);
    socket.current = io('http://localhost:3001');
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.emit('joinChat', email);
    }
  }, [email]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on('history', (messages) => setArrMessages(messages));
      socket.current.on('message', (message) => setArrMessages((oldArr) => [...oldArr, message]));
    }
  }, [socket]);

  const sendMessage = async (userMessage) => {
    const role = 'user'
    socket.current.emit('newMessage', { email, message: userMessage, role });
    setMessage('');
  };

  return (
    <div>
      {TopMenu('TryBeer')}
      <div>
        {arrMessages.map(({ message, strgTime, nick }, index) => {
          return (
            <div key={index}>
              <h4 data-testid="nickname">{nick}</h4>
              <h4 data-testid="message-time">{strgTime}</h4>
              <p data-testid="text-message">{message}</p>
            </div>
          );
        })}
      </div>
      <div>
        <input
          data-testid="message-input"
          type="text" value={ message }
          onChange={ (e) => setMessage(e.target.value) }
          placeholder="Digite......."
        />
        <button type="submit" data-testid="send-message" onClick={ () => sendMessage(message) }>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default UserChat;
