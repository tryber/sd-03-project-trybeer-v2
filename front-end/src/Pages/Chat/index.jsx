import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TopMenu } from '../../Components';
import Messages from './innerPage/messages';
import './styles.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socket = useSelector(state => state.socketReducer.socket);
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    if (socket) {
      socket.emit('enterRoom', { token, dest: 'loja' });
      socket.on('lastMessages', (messages) => setMessages(messages));
      socket.on('message', (message) => setMessages((m) => [...m, message]));
    }
  }, [socket]);

  const sendMessage = () => socket.emit('message', { token, message });

  return (
    <div>
      <TopMenu />
      <div id="container-chat">
        {messages.map(({ email, time, message }, index) => (
          <Messages key={index} email={email} time={time} message={message} />
        ))}
        <div className="inputButton">
          <input
            type="text"
            onChange={({target: { value }}) => setMessage(value)}
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