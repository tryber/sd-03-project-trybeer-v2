import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { Redirect } from 'react-router-dom';
import { io } from 'socket.io-client';
import ClientNavBar from '../../../components/Client/ClientNavBar/ClientNavBar';

const getMessageHistory = async (userEmail) => {
  console.log('iniciando fetch');
  const messages = await fetch('http://localhost:3001/chat/history', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userEmail }),
  });
  const res = await messages.json();
  console.log(`retorno de getMessageHistory: ${res.history.nickname}`);
  return messages;
};

function ClientChatPage() {
  const { userEmail } = JSON.parse(localStorage.getItem('user'));
  const time = new Date().toLocaleTimeString('pt-br');
  const socket = useRef();

  const [message, setMessage] = useState();
  const [messageHistory, setMessageHistory] = useState();

  const fetchMessageHistory = useCallback(
    async () => setMessageHistory(await getMessageHistory(userEmail)), [userEmail],
  );

  useEffect(() => {
    socket.current = io('http://localhost:3001', { transports: ['websocket'] });
    fetchMessageHistory();
    console.log(`historico de mensagens ${messageHistory}`);
  }, [userEmail, fetchMessageHistory]);

  if (!userEmail) return <Redirect to="/login" />;

  return (
    <div style={ { display: 'flex', flexDirection: 'column', width: '360px' } }>
      <ClientNavBar title="Chat" />
      <input type="text" data-testid="message-input" onChange={ (e) => setMessage(e.target.value) } value={ message } />
      <button
        type="button"
        onClick={ () => { socket.current.emit('message', { message, userEmail, time }); } }
        data-testid="send-message"
      >
        Enviar
      </button>
    </div>
  );
}

export default ClientChatPage;
