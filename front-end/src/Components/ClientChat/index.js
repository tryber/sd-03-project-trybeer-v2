import React, { useRef, useState, useEffect } from 'react'
const moment = require('moment');
const io = window.io;

const ClientChat = () => {
  const [message, setMessage] = useState('');
  const [attMessage, setAttMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = useRef();

  const getUser = localStorage.getItem('user');
  const getEmail = JSON.parse(getUser);

  useEffect(() => {
    socket.current = io('http://localhost:3001');
  }, [])

  useEffect(() => {
    if (message !== '') {
      setMessages((msgs) => [...msgs, message]);
      setMessage('');
      setAttMessage('');
    }
    socket.current.emit('message', message);

  }, [message]);

  const clearPage = (event) => {
    event.preventDefault();
  };

  const newDate = moment().format('HH:mm');
  return (
    <div>
      <form onSubmit={clearPage}>
        <h1>Estou funcionando</h1>
        <div id="userName" data-testid="nickname">{getEmail.email}</div>
        <div id="hours" data-testid="message-time">Hora</div>
        <div id="message-text" data-testid="text-message">
          <ul>
            {messages.map((msg) => <li key={msg}>{msg} {newDate}</li>)}
          </ul>
        </div>
        <input
          onChange={(event) => setAttMessage(event.target.value)}
          value={attMessage}
          data-testid="message-input" />
        <button
          type="submit"
          data-testid="send-message"
          onClick={() => setMessage(attMessage)}
        >
          ENVIAR
          </button>
      </form>
    </div >
  )
};

export default ClientChat;
