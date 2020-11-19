import React, { useRef, useState, useEffect } from 'react';
import {
  createChatFile,
  getChatMessages,
  updateChatMessages,
} from '../../services/api_endpoints';
import MenuBar from '../MenuBar';
import './style.css';

const { io } = window;

const ClientChat = () => {
  const socket = useRef();
  const [textMessage, setTextMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const { email } = JSON.parse(localStorage.getItem('user'));

  // Carregamento de mensagens já existentes no banco, ou
  // criação de nova conversa (caso ainda não exista)
  useEffect(() => {
    try {
      const fetchChatHistory = async () => getChatMessages(email);
      fetchChatHistory().then((fetched) => {
        setChatHistory(fetched.messages);
      });
    } catch (error) {
      createChatFile(email);
    }

    socket.current = io('http://localhost:3001');
    socket.current.emit('joinRoomAsCustomer', email);
  }, [email]);

  // Recebimento de mensagem
  useEffect(() => {
    socket.current.on('msgToCustomer', ({ msg }) => {
      setChatHistory((history) => [...history, msg]);
    });
  }, [socket]);

  useEffect(() => {
    updateChatMessages(email, chatHistory);
  }, [email, chatHistory]);

  // Formatação e envio de mensagens + salvamento no banco
  const submitMessage = (event) => {
    event.preventDefault();
    setTextMessage('');
    const msg = {
      timeStamp: new Date().toLocaleString('pt-BR'),
      text: textMessage,
      isAdminMsg: false,
    };
    setChatHistory((history) => [...history, msg]);
    socket.current.emit('msgToAdmin', msg);
  };

  return (
    <div>
      <MenuBar titleName="Atendimento online" />
      <div id="message-text" data-testid="text-message">
        <ul>
          { chatHistory.map(
            ({ timeStamp, text, isAdminMsg }) => (
              <li key={ text } className={ isAdminMsg ? 'msg-admin' : 'msg-customer' }>
                <div data-testid="nickname">{ isAdminMsg ? 'Loja' : email }</div>
                <div data-testid="message-time">{timeStamp}</div>
                <div data-testid="text-message">{text}</div>
              </li>
            ),
          ) }
        </ul>
      </div>
      <form>
        <input
          onChange={ (event) => setTextMessage(event.target.value) }
          value={ textMessage }
          data-testid="message-input"
        />
        <button
          type="submit"
          disabled={ !textMessage }
          data-testid="send-message"
          onClick={ submitMessage }
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
export default ClientChat;
