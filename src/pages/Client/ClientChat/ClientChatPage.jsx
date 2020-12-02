import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { Redirect } from 'react-router-dom';
import { io } from 'socket.io-client';
import ClientNavBar from '../../../components/Client/ClientNavBar/ClientNavBar';

const getMessageHistory = async (userEmail) => {
  const messages = await fetch('http://localhost:3001/chat/history', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userEmail }),
  });
  const res = await messages.json();
  return res;
};

function ClientChatPage() {
  const { userEmail } = JSON.parse(localStorage.getItem('user'));
  const time = new Date().toLocaleTimeString('pt-br');
  const socket = useRef();
  const formatEmail = userEmail.split('.');
  const formatUser = formatEmail[0].split('@')[0];

  const sliceInit = 0;
  const sliceEnd = 2;

  const [message, setMessage] = useState();
  const [messageHistory, setMessageHistory] = useState();
  const [refreshMessages, setRefreshMessages] = useState(false);

  const fetchMessageHistory = useCallback(
    async () => setMessageHistory(await getMessageHistory(userEmail)), [userEmail],
  );

  useEffect(() => {
    socket.current = io('http://localhost:3001', { transports: ['websocket'] });
    fetchMessageHistory();
  }, [userEmail, fetchMessageHistory, refreshMessages]);

  if (!userEmail) return <Redirect to="/login" />;

  return (
    <div style={ { background: 'white' } }>
      <ClientNavBar title="Chat" />
      <div
        style={ {
          display: 'flex', flexDirection: 'column', width: '360px', height: '520px', overflowY: 'scroll',
        } }
      >
        <ul>
          {messageHistory && messageHistory.history
            ? messageHistory.history.sent.map((item) => (
              <li style={ { textAlign: 'left', padding: '0', margin: '0' } } key={ item.timestamp }>
                <p style={ { padding: '0', margin: '0' } }>
                  {formatUser}
                </p>
                <div
                  style={ {
                    display: 'flex', border: '1px solid black', width: '250px', padding: '15px', borderRadius: '15px', background: '#00af9c', borderTopLeftRadius: '0',
                  } }
                >
                  <p>
                    {item.timestamp.split(':').slice(sliceInit, sliceEnd).join(':')}

                  </p>
                  <p style={ { marginLeft: '20px' } }>
                    {item.chatMessage}
                  </p>
                </div>
              </li>)) : 'Loading messages...'}
        </ul>
      </div>
      <div
        style={ {
          marginTop: '10px', width: '360px', background: 'red', height: '37px', paddingTop: '5px',
        } }
      >
        <input placeholder="Digite sua mensagem" type="text" data-testid="message-input" onChange={ (e) => setMessage(e.target.value) } value={ message } style={ { width: '250px', height: '25px' } } />
        <button
          style={ { width: '70px', height: '31px', marginLeft: '4px' } }
          type="button"
          onClick={ () => {
            socket.current.emit('message', { message, userEmail, time });
            setRefreshMessages(!refreshMessages);
            setMessage('');
          } }
          data-testid="send-message"
        >
          Enviar
        </button>
      </div>

    </div>
  );
}

export default ClientChatPage;
