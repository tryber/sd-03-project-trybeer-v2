import React, { useState, useEffect, useRef } from 'react';
import SideMenuAdmin from '../../components/SideMenuAdmin';
import { useHistory } from 'react-router-dom';

const { io } = window;

const UserChat = () => {
  const [message, setMessage] = useState('');
  const [arrMessages, setArrMessages] = useState([]);
  const [email, setEmail] = useState('');
  const history = useHistory();
  const socket = useRef();

  useEffect(() => {
    if (socket.current) {
      const chatUser = JSON.parse(localStorage.getItem('chat'));
      socket.current.emit('joinChat', chatUser)
    }
  }, [email]);

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem('user'));
    if(!actualUser) return window.location.assign('http://localhost:3000/login');
    const chatUser = JSON.parse(localStorage.getItem('chat'));
    setEmail(chatUser);
    socket.current = io('http://localhost:3001');
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.on('history', (messages) => setArrMessages(messages));
      socket.current.on('message', (message) => setArrMessages((oldArr) => [...oldArr, message]));
    }
  }, [socket]);

  const sendMessage = async (userMessage) => {
    const role = 'administrador'
    socket.current.emit('newMessage', { email, message: userMessage, role });
    setMessage('');
  };

  const clickToBack = async (email) => {
    history.push(`/admin/chats`);
  };

  return (
    <div>
      {SideMenuAdmin()}
      <h3>{email}</h3>
      <div>
        {arrMessages.map(({nick, strgTime, message}, index) => {
          return (
            <div key={index}>
              <p data-testid="nickname">{nick}</p><p> - </p><p data-testid="message-time">{strgTime}</p>
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
        <button type="button" data-testid="back-button" onClick={ () => clickToBack() }>
          Voltar
        </button>
      </div>
    </div>
  );
};

export default UserChat;
