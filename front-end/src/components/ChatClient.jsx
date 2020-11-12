import React, { useRef, useEffect, useState } from 'react';
import MenuTop from '../components/MenuTop'

const io = window.io;

function ChatClient() {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);


  const { email } = JSON.parse(localStorage.getItem('user')) || [];
  const time = new Date().toLocaleTimeString('pt-br').substring(5, '');

  const socket = useRef();

  useEffect(() => {
    socket.current = io('http://localhost:3001');
  }, []);

  let renderMessage;
  let returnedTime;

  useEffect(() => {
    socket.current.on('message', ({ message, time }) => {
      renderMessage = message;
      returnedTime = time;
      console.log(returnedTime)
      console.log('dentro', socket)
      setAllMessages((current) => [...current, { renderMessage, returnedTime }]);
    });
  }, [renderMessage]);


  return (
    <div>
      <MenuTop />
      {allMessages.map(({ renderMessage, returnedTime }) => (
        <div>
          <p data-testid="nickname">{email}</p>
          <p data-testid="message-time">{returnedTime}</p>
          <p data-testid="text-message"> {renderMessage} </p>
        </div>
      ))}
      <input data-testid="message-input" onChange={(e) => setMessage(e.target.value)} value={message} />
      <button
        onClick={() => socket.current.emit('message', { message, email, time })}
        data-testid="send-message">&gt;</button>
    </div>
  );
}

export default ChatClient;
