import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { io } = window;

function Chat() {
  const [messages, setMessages] = useState();
  const [adminMessages, setAdminMessages] = useState([]);
  const [response, setResponse] = useState();
  const [nickname, setNickname] = useState();
  const [updatePage, setUpdatePage] = useState(false);
  const time = new Date().toLocaleTimeString('pt-br').substring(5, '');
  const socket = useRef();
  const receivedeMessage = [];

  useEffect(() => {
    socket.current = io('http://localhost:3001');
  },[]);

  useEffect(() => {
    socket.current.on('message', ({ message, email, time, adminNick }) => {
      receivedeMessage.push({ message, email, time, adminNick });
      setAdminMessages(receivedeMessage);
    });
  },[]);

  useEffect(() => {
    const user = localStorage.getItem('nickname');
    setNickname(JSON.parse(user));
  },[]);

  useEffect(() => {
    if (nickname) {
      axios.post('http://localhost:3001/chat/findOne', { nickname })
      .then(({ data }) => setMessages(data));
    }
  }, [nickname]);

  if (messages) {
    return (
      <div>
        <div>
        { (adminMessages.length > 0) &&
          adminMessages.map((e,i) => 
            <ul>
              <li key={`${e.nickname}-${i}`}>
                <p data-testid="nickname">{e.adminNick || e.email}</p>
                <p data-testid="message-time">Hora: {e.time}</p>
                <p data-testid="text-message">{e.message}</p>
              </li>
            </ul>
            )
          }
        </div>
        <div className="history">
          <p>Você está conversando com: {nickname}</p>
          {
            messages.history.map((e,i) => 
            <ul>
              <li key={`${e.nickname}-${i}`}>
                <p data-testid="nickname">{e.nickname}</p>
                <p data-testid="message-time">Hora: {e.timestamp}</p>
                <p data-testid="text-message">{e.chatMessage}</p>
              </li>
            </ul>
            )
          }
        </div>
        <div>
          <input type="text" data-testid="message-input" onChange={(e) => setResponse(e.target.value)} value={response} />
          <button
            type="button"
            data-testid="send-message"
            onClick={
              () => {
                socket.current.emit('adminMessage', { 
                  message: response,
                  email: nickname,
                  time,
                  adminNick: 'Loja',
                });
                setResponse('');
                // setUpdatePage(!updatePage);
              }
            }
          >Enviar</button>
        </div>
        <div>
          <Link to="/admin/chats" key="main-list">
            <button type="button" data-testid="back-button">Voltar</button>
          </Link>
        </div>
      </div>
    );
  }

  return (<div></div>);
}

export default Chat
