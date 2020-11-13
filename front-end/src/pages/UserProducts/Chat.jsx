import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

import Header from '../../components/MenuTop';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageValue, setMessageValue] = useState('');

  const { email, token } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios({
      method: 'POST',
      url: 'http://localhost:3001/chat',
      headers: { Authorization: token },
      data: {
        messages,
        email,
      }
    });
  }, [messages]);

  return (
    <div>
      <Header title="Chat" />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <ul>
        {messages.map((message, index) => {
          return <li key={index + 1}>
            <p data-testid="nickname">{email}</p>
            <p data-testid="message-time">{message.date}</p>
            <h4 data-testid="text-message">{message.messageValue}</h4>
          </li>
        })}
      </ul>
      <input data-testid="message-input" type="text" onChange={({ target: { value } }) => setMessageValue(value)}/>
      <button data-testid="send-message" onClick={() => {
          setMessages([...messages, { messageValue, date: moment(new Date()).format('HH:mm') }]);
        }}
        >
          Enviar
      </button>
    </div>
  );
}

export default Chat;
