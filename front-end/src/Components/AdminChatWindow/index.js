import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminSideBar from '../AdminSideBar/index';
import './styles.css';

const AdminChat = () => {
  const location = useLocation();
  const { token } = JSON.parse(localStorage.getItem('user'));
  const { clientEmail, messages } = location.state;

  const [chatMsgs, setChatMsgs] = useState([]);

  useEffect(() => {
    setChatMsgs(messages);
  }, [token, messages]);

  const submitMessage = (event) => {
    event.preventDefault();
    setChatMsgs(chatMsgs.push(event.target.value));
  };

  return (
    <div className="admin-chat">
      <AdminSideBar />
      <section className="admin-chats-aside">
        <h1>
          Conversa com
          {clientEmail}
        </h1>
        {messages.map(({ timeStamp, text, isClientMsg }) => (
          <article key={ text } className={ isClientMsg ? 'msg-customer' : 'msg-admin' }>
            <div id="userName" data-testid="nickname">
              { isClientMsg ? clientEmail : 'Loja' }
            </div>
            <div id="hours" data-testid="message-time">{timeStamp}</div>
            <div id="message-text" data-testid="text-message">{text}</div>
          </article>
        ))}
        <form onSubmit={ submitMessage }>
          <input data-testid="chat-message" />
          <button type="submit" data-testid="send-message">Enviar</button>
        </form>
      </section>
    </div>
  );
};

export default AdminChat;
