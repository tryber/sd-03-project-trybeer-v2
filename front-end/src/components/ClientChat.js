import React, { useState } from 'react';
import './ClientChat.css';
const io = require('socket.io-client');
const socket = io('http://localhost:3001', { transports: ['websocket'] });

function ClientChat() {
  const [chat, setChat] = useState([]);

  socket.on('message', ({ message }) => setChat([...chat, message]));

  const displayMessage = () => {
    const message = document.getElementById('message-input').value;
    socket.emit('message', { message });
  }
  return (
    <div>
      <div className="chat-div">
        {chat.length > 0 && chat.map((message) =>
          <p>{message}</p>
        )}
      </div>
      <input id="message-input" />
      <button onClick={() => displayMessage()}>Enviar Mensagem</button>
    </div>
  )
};

export default ClientChat;
