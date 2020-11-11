import React, { useRef, useEffect, useState } from 'react';

const io = window.io;

function ChatPage() {
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    socket.current = io('http://localhost:3001');
    socket.current.emit('private-history', { id: 'militaorodrigo9@gmail.com' });
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.on('private-history', (data) => {
        setMessages(data);
      });
    }
  }, [socket]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageObj = {
      chatMessage: messageInput,
      nickname: 'militaorodrigo9@gmail.com',
      to: 'store',
    };
    socket.current.emit('private', messageObj);
    socket.current.emit('private-history', { id: 'militaorodrigo9@gmail.com' });

    setMessageInput('');
  }


  return (
    <div className="container">
      <fieldset>
        <span>Mensagens</span>
        <ul>
          {messages.map(({chatMessage, from, timestamp}, index) => (
            <li key={`${index}`}>
              <span data-testid="nickname">{from}</span> - 
              <span data-testid="message-time">{timestamp}</span> <br/> 
              <span data-testid="text-message">{chatMessage}</span>
            </li>
          ))}
        </ul>
      </fieldset>
      <input
        className="form-control"
        type="text"
        data-testid="message-input"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        id="message-box"
      />
      <button
        onClick={(e) => handleSendMessage(e)}
        className="btn btn-success"
        type="submit"
        id="send-button"
        data-testid="send-message">
          Enviar
      </button>
    </div>
  );
}

export default ChatPage;