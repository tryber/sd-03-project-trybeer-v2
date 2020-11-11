import React, { useRef, useEffect, useState } from 'react';

const io = window.io;

function ChatClient() {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);


  const { email } = JSON.parse(localStorage.getItem('user')) || [];
  const time = new Date().toLocaleTimeString().substring(5, '');

  const socket = useRef();

  useEffect(() => socket.current = io('http://localhost:3001'), []);

  let renderMessage;

  useEffect(() => {
    socket.current.on('message', ({ message }) => {
      renderMessage = message;
      console.log('dentro', socket)
      setAllMessages((current) => [...current, renderMessage]);
    });
  }, [renderMessage]);

  return (
    <div>
      {allMessages.map((elem) => (
        <div>
          <p data-testid="nickname">{email}</p>
          <div data-testid="message-time"><span>{time}</span></div>
          <p data-testid="text-message"> {elem} </p>
        </div>
      ))}
      <input data-testid="message-input" onChange={(e) => setMessage(e.target.value)} />
      <button
        onClick={() => socket.current.emit('message', { message, email, time })}
        data-testid="send-message">&gt;</button>
    </div>
  );
}

export default ChatClient;
