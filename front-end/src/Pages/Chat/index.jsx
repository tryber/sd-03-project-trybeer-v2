import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TopMenu } from '../../Components';
import { useLocation } from 'react-router-dom';
import Messages from './innerPage/messages';
import './styles.css';

const generatePass = (email, token, role) => {
  if (role !== 'administrator') return { token, dest: 'Loja ' };
  return { token, dest: { email } };
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socket = useSelector(state => state.socketReducer.socket);
  const { state } = useLocation();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (socket) {
      socket.emit('enterRoom', generatePass(state, token, role));
      socket.on('lastMessages', (messages) => setMessages(messages));
      socket.on('message', (message) => setMessages((m) => [...m, message]));
    }
  }, [socket]);

  const sendMessage = () => socket.emit('message', { token, message });

  return (
    <div>
      <TopMenu />
      {role === 'administrator'
        && <Link to="/admin/chats"><button data-testid="back-button">voltar</button></Link>
      }
      <div id="container-chat">
        {messages.map(({ email, time, message }, index) => (
          <Messages key={index} email={email} time={time} message={message} />
        ))}
        <div className="inputButton">
          <input
            type="text"
            onChange={({ target: { value } }) => setMessage(value)}
            data-testid="message-input"
            placeholder="Digite..."
          />
          <button data-testid="send-message" onClick={sendMessage}>Enviar</button>
        </div>
      </div>
    </div>
  )
}

export default Chat;