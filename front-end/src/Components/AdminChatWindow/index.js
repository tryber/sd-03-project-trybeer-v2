import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getChatMessages, updateChatMessages } from '../../services/api_endpoints';
import AdminSideBar from '../AdminSideBar/index';
import './style.css';

const { io } = window;
// Para usar o socket neste arquivo
// Depende do script inserido no arquivo index.html, que cria um io global

const AdminChat = () => {
  const socket = useRef();
  const location = useLocation();
  const { clientEmail, messages } = location.state;

  const [chatHistory, setChatHistory] = useState(messages);
  const [textMessage, setTextMessage] = useState('');

  // Carregamento de mensagens já existentes no banco
  useEffect(() => {
    try {
      const fetchChatHistory = async () => getChatMessages(clientEmail);
      fetchChatHistory().then((fetched) => {
        setChatHistory(fetched.messages);
      });
    } catch (error) {
      console.log(error);
    }
  }, [clientEmail]);

  // Conexão com o socket.io. Como back e front rodam em portas/endereços distintos,
  // deve ser declarado com o endereço.
  useEffect(() => {
    socket.current = io('http://localhost:3001');
    socket.current.emit('joinRoomAsAdmin', clientEmail);
  }, [clientEmail]);

  // Recebimento de mensagem
  useEffect(() => {
    socket.current.on('msgToAdmin', ({ msg }) => {
      setChatHistory((history) => [...history, msg]);
    });
  }, [socket]);

  useEffect(() => {
    updateChatMessages(clientEmail, chatHistory);
  }, [clientEmail, chatHistory]);

  const submitMessage = (event) => {
    event.preventDefault();
    setTextMessage('');
    const msg = {
      timeStamp: new Date().toLocaleString('pt-BR'),
      text: textMessage,
      isAdminMsg: true,
    };
    setChatHistory((history) => [...history, msg]);
    socket.current.emit('msgToCustomer', msg);
  };

  return (
    <div className="admin-chat">
      <AdminSideBar />
      <section className="admin-chats-aside">
        <h1>{`Conversa com ${clientEmail}`}</h1>
        {
          chatHistory.map(({ timeStamp, text, isAdminMsg }) => (
            <article key={ text } className={ isAdminMsg ? 'msg-admin' : 'msg-customer' }>
              <div data-testid="nickname">{ isAdminMsg ? 'Loja' : clientEmail }</div>
              <div data-testid="message-time">{timeStamp}</div>
              <div data-testid="text-message">{text}</div>
            </article>
          ))
        }
        <form>
          <input
            data-testid="chat-message"
            onChange={ (e) => setTextMessage(e.target.value) }
            value={ textMessage }
          />
          <button
            type="submit"
            data-testid="send-message-btn"
            onClick={ submitMessage }
          >
            Enviar
          </button>
        </form>
        <Link data-testid="back-button" to="/admin/chats/">Voltar</Link>
      </section>
    </div>
  );
};

export default AdminChat;
