import React, { useRef, useEffect, useState, useContext } from 'react';
import MenuTop from './MenuTop';
import axios from 'axios';
import { BeerContext } from '../context/context';
import './CSS/Chat.css';

const { io } = window;

function ChatClient() {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [oldMessages, setOldMessages] = useState();
  const { setTitle } = useContext(BeerContext);

  const { email: userEmail } = JSON.parse(localStorage.getItem('user')) || [];
  const time = new Date().toLocaleTimeString('pt-br').substring(5, '');

  const socket = useRef();

  useEffect(() => {
    socket.current = io('https://trybeerback.herokuapp.com');
  }, []);

  let renderMessage;
  let returnedTime;

  useEffect(() => {
    setTitle('Chat');
    socket.current.on('message', ({ message, email, time, adminNick }) => {
      if (email === userEmail || adminNick) {
        renderMessage = message;
        returnedTime = time;
        console.log(returnedTime);
        setAllMessages((current) => [...current, { renderMessage, nickname: (adminNick || email), returnedTime }]);
      }
    });
  }, [renderMessage]);

  useEffect(() => {
    axios.post('https://trybeerback.herokuapp.com/chat/findOne', { nickname: userEmail })
      .then(({ data }) => {
        if (data) {
          setOldMessages(data);
        }
      });
  }, []);

  useEffect(() => {
    if (oldMessages) {
      const history = [];
      oldMessages.history.map((e) => {
        renderMessage = e.chatMessage;
        returnedTime = e.timestamp;
        history.push({ renderMessage, nickname: e.nickname, returnedTime });
      });
      setAllMessages((current) => [...current, ...history]);
    }
  }, [oldMessages]);

  console.log(oldMessages)

  return (
    <div>
      <MenuTop />
      <div className="chat-content">
        {allMessages.map(({ renderMessage, nickname, returnedTime }, i) => (
          <div key={`${i}`}>
            <div className="align-nick">
              <p className="nick-chat" data-testid="nickname">{nickname}</p>
              <p data-testid="message-time">{returnedTime}</p>
            </div>
            <p className="render-messages" data-testid="text-message">
              {' '}
              {renderMessage}
              {' '}
            </p>
          </div>
        ))}
        <div className="align-input">
          <input
            placeholder="type your message"
            className="input-message"
            data-testid="message-input" onChange={(e) => setMessage(e.target.value)} value={message} />
          <button
            className="btn-message"
            onClick={() => socket.current.emit('message', { message, email: userEmail, time })}
            data-testid="send-message"
          >
            &gt;
      </button>
        </div>
      </div>
    </div>
  );
}

export default ChatClient;
