import React, { useRef, useState, useEffect } from 'react';
import { getChatMessages } from '../../services/api_endpoints';
import MenuBar from '../MenuBar';
import './style.css';

const { io } = window;

const ClientChat = () => {
  const [message, setMessage] = useState('');
  const [textMessage, setTextMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const socket = useRef();
  const { email } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchChatHistory = async (email) => await getChatMessages(email);
    fetchChatHistory().then((msgs) => setChatHistory(msgs || []));
    socket.current = io('http://localhost:3001');
  }, [email]);

  const submitMessage = (event) => {
    event.preventDefault();
    setTextMessage('');
    const msg = {
      timeStamp: new Date().toLocaleString('pt-BR'),
      text: textMessage,
      isClientMsg: false,
    };
    setChatHistory((history) => [...history, msg]);
    socket.current.emit('msgToServer', msg);
  };

  return (
    <div>
      <MenuBar titleName="Atendimento online" />
      <div id="message-text" data-testid="text-message">
        <ul>{ chatHistory.map(
          ({ timeStamp, text, isClientMsg }) => (
          <li key={ text } className={ isClientMsg ? 'msg-customer' : 'msg-admin' }>
            <div data-testid="nickname">{ isClientMsg ? email : 'Loja' }</div>
            <div data-testid="message-time">{timeStamp}</div>
            <div data-testid="text-message">{text}</div>
          </li>
          )) }
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
