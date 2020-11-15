import React, { useRef, useEffect, useState } from 'react';
import MenuTop from '../../components/menuTop/MenuTop';
import Sidebar from '../../components/sidebar/Sidebar';
import './Chat.css';

const io = window.io;

function ChatPage() {
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const { email } = JSON.parse(window.localStorage.getItem('user'));
    setUserEmail(email);
    socket.current = io('http://localhost:3001');
    socket.current.emit('private-history', { id: email, storeId: 'Loja' });
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.on('private-history', (data) => {
        setMessages(data);
      });
      socket.current.on('private', (data) => {
        setMessages((state) => [...state, data]);
      });
    }
  }, [socket]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageObj = {
      chatMessage: messageInput,
      nickname: userEmail,
      to: 'Loja',
    };
    socket.current.emit('private', messageObj);
    socket.current.emit('private-history', { id: userEmail, storeId: 'Loja' });

    setMessageInput('');
  };

  return (
    <div>
      <MenuTop />
      <div className="container">
        <Sidebar />
        <div id="wrapper">
          <div className="chat-content">
            {messages.map(({ chatMessage, from, timestamp }, index) => (
              <div
                className={from === 'Loja' ? 'left' : 'right'}
                key={`${index}`}
              >
                <span data-testid="nickname">{from}</span> -
                <span data-testid="message-time">{timestamp}</span> <br />
                <span data-testid="text-message">{chatMessage}</span>
              </div>
            ))}
          </div>
          <div className="message-form">
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
              className="btn btn-send"
              type="submit"
              id="send-button"
              data-testid="send-message"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
