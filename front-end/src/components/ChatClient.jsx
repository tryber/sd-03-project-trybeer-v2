import React, { useRef, useEffect, useState } from 'react';
import MenuTop from './MenuTop';
import axios from 'axios';

const { io } = window;

function ChatClient() {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [oldMessages, setOldMessages] = useState();

  const { email } = JSON.parse(localStorage.getItem('user')) || [];
  const time = new Date().toLocaleTimeString('pt-br').substring(5, '');

  const socket = useRef();

  useEffect(() => {
    socket.current = io('http://localhost:3001');
  }, []);

  let renderMessage;
  let returnedTime;

  useEffect(() => {
    socket.current.on('message', ({ message, email, time }) => {
      renderMessage = message;
      returnedTime = time;
      console.log(returnedTime);
      console.log('dentro', socket);
      setAllMessages((current) => [...current, { renderMessage, nickname: email, returnedTime }]);
    });
  }, [renderMessage]);

  useEffect(() => {
    axios.post('http://localhost:3001/chat/findOne', { nickname: email })
      .then(({ data }) => {
        if (data) {
          setOldMessages(data);
        }
      });
  },[]);

  useEffect(() => {
    if (oldMessages) {
      const history = [];
      oldMessages.history.map((e) => {
        renderMessage = e.chatMessage;
        returnedTime = e.timestamp;
        history.push({ renderMessage, nickname: e.nickname, returnedTime });
      });
      console.log('Histórico: ', history);
      setAllMessages((current) => [...current, ...history]);
    }
  },[oldMessages]);

  return (
    <div>
      <MenuTop />
      {allMessages.map(({ renderMessage, nickname, returnedTime }) => (
        <div>
          <p data-testid="nickname">{nickname}</p>
          <p data-testid="message-time">{returnedTime}</p>
          <p data-testid="text-message">
            {' '}
            {renderMessage}
            {' '}
          </p>
        </div>
      ))}
      <input data-testid="message-input" onChange={(e) => setMessage(e.target.value)} value={message} />
      <button
        onClick={() => socket.current.emit('message', { message, email, time })}
        data-testid="send-message"
      >
        &gt;

      </button>
    </div>
  );
}

export default ChatClient;
