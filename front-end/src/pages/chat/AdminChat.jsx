import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminSideBar from '../../components/adminMenuSideBar/AdminMenuSideBar';
import seta from './reply.svg';
import './Chat.css';

const io = window.io;

function AdminChat() {
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('nickname');
    setNickname(user);
    socket.current = io('http://localhost:3001');
    socket.current.emit('private-history', { id: user, storeId: 'Loja' });
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
      nickname: 'Loja',
      to: nickname,
    };
    socket.current.emit('private', messageObj);
    socket.current.emit('private-history', { id: nickname, storeId: 'Loja' });

    setMessageInput('');
  };

  return (
    <div className="d-flex">
      <AdminSideBar />
      <div className="container">
        <Link className="link-voltar" to="/admin/chats" data-testid="back-button">
          <img className="seta" src={seta} alt="seta" />
          {`Conversando com ${nickname}`}
        </Link>
        <div className="chat-content-admin">
          {messages.map(({ chatMessage, from, timestamp }, index) => (
            <div
              className={from === 'Loja' ? 'right' : 'left'}
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
  );
}

export default AdminChat;
