import React, { useState, useEffect, useRef } from 'react';
import SideMenuAdmin from '../../components/SideMenuAdmin';

const { io } = window;

const UserChat = () => {
  const [message, setMessage] = useState('');
  const [arrMessages, setArrMessages] = useState([]);
  const [email, setEmail] = useState('');
  const socket = useRef();

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem('user'));
    if(!actualUser) return window.location.assign('http://localhost:3000/login');
    const chatUser = JSON.parse(localStorage.getItem('chat'));
    setEmail(chatUser.data.email);
    socket.current = io('http://localhost:3001');
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.emit('joinChat', email);
      socket.current.on('history', (messages) => setArrMessages(messages));
      socket.current.on('message', (message) => setArrMessages([...arrMessages, message]));
    }
  }, [socket]);

  const sendMessage = async (userMessage) => {
    const role = 'administrador'
    socket.emit('newMessage', { email, userMessage, role });
    setMessage('');
  };

  return (
    <div>
      {SideMenuAdmin()}
      <div>
        {arrMessages.map(({nick, newEntry, message}, index) => {
          return (
            <div key={index}>
              <p data-testid="nickname">{nick}</p><p> - </p><p data-testid="message-time">{newEntry}</p>
              <p data-testid="text-message">{message}</p>
            </div>
          );
        })}
      </div>
      <div className="products-container-card">
        <input
          data-testid="message-input"
          type="text" value={ message }
          onChange={ (e) => setMessage(e.target.value) }
          placeholder="Digite..."
        />
        <button type="submit" data-testid="send-message" onClick={ () => sendMessage(message) }>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default UserChat;
