import React, { useRef, useEffect, useState } from 'react';
import MenuTop from '../../components/menuTop/MenuTop';
import Sidebar from '../../components/sidebar/Sidebar';

const io = window.io;

function AdminChat() {
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [userNickName, setUserNickName] = useState('');

  useEffect(() => {
    const userNickName = window.localStorage.getItem('user');
    setUserNickName(userNickName);
    socket.current = io('http://localhost:3001');
    socket.current.emit('private-history', { id: userNickName });
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.on('private-history', (data) => {
        setMessages(data);
      });
    }
  }, [socket]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageObj = {
      chatMessage: messageInput,
      nickname: 'store',
      to: userNickName,
    };
    socket.current.emit('private', messageObj);
    socket.current.emit('private-history', { id: userNickName });

    setMessageInput('');
  }


  return (
    <div>
      <div className="container mt-5">
        <fieldset>
          <ul>
            {messages.map(({chatMessage, from, timestamp}, index) => (
              <li key={`${index}`}>
                <span data-testid="nickname">{from}</span> - 
                <span data-testid="message-time">{timestamp}</span> <br/> 
                <span data-testid="text-message">{chatMessage}</span>
              </li>
            ))}
          </ul>
        </fieldset>
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
          className="btn btn-success"
          type="submit"
          id="send-button"
          data-testid="send-message">
            Enviar
        </button>
      </div>
    </div>
  );
}

export default AdminChat;