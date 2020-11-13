import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import AdminSideBar from '../AdminSideBar/index';
import './styles.css';

const { io } = window;
// Para usar o socket neste arquivo
// Depende do script inserido no arquivo index.html, que cria um io global

const AdminChat = () => {
  const socket = useRef();
  const location = useLocation();
  // const { token } = JSON.parse(localStorage.getItem('user'));
  const { clientEmail, messages } = location.state;

  const [chatHistory, setChatHistory] = useState(messages);
  const [textMessage, seTextMessage] = useState('');

  // useEffect(() => {
  //   setChatHistory(messages);
  // }, [token, messages]);

  // Conexão com o socket.io
  useEffect(() => {
    socket.current = io('http://localhost:3001');
  }, []);

  // Envio do histórico atualizado
  useEffect(() => {
    socket.current.emit('syncHistory', { chatHistory, clientEmail });
  }, [chatHistory, clientEmail]);

  // Recebimento de mensagem
  useEffect(() => {
    socket.current.on('msgToServer', ({ msg }) => {
      setChatHistory((history) => [...history, msg]);
    });
  }, [socket]);

  const submitMessage = (event) => {
    event.preventDefault();
    seTextMessage('');
    const msg = {
      timeStamp: new Date().toLocaleString('pt-BR'),
      text: textMessage,
      isClientMsg: false,
    };
    setChatHistory((history) => [...history, msg]);
    socket.current.emit('msgToClient', msg);
  };

  return (
    <div className="admin-chat">
      <AdminSideBar />
      <section className="admin-chats-aside">
        <h1>{`Conversa com ${clientEmail}`}</h1>
        {chatHistory.map(({ timeStamp, text, isClientMsg }) => (
          <article key={ text } className={ isClientMsg ? 'msg-customer' : 'msg-admin' }>
            <div id="userName" data-testid="nickname">
              { isClientMsg ? clientEmail : 'Loja' }
            </div>
            <div id="hours" data-testid="message-time">{timeStamp}</div>
            <div id="message-text" data-testid="text-message">{text}</div>
          </article>
        ))}
        <form>
          <input
            data-testid="chat-message"
            onChange={ (e) => seTextMessage(e.target.value) }
            value={ textMessage }
          />
          <button
            type="submit"
            data-testid="send-message"
            onClick={ submitMessage }
          >
            Enviar
          </button>
        </form>
      </section>
    </div>
  );
};

export default AdminChat;
