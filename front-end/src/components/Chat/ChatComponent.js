import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';

function ChatComponent({ callback }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { userEmail } = user;
  const time = new Date().toLocaleTimeString('pt-br');
  const socket = useRef();

  const sliceInit = 0;
  const sliceEnd = 2;

  const [message, setMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState();
  const [refreshMessages, setRefreshMessages] = useState(false);

  const fetchMessageHistory = useCallback(
    async () => setMessageHistory(await callback(userEmail)), [userEmail, callback],
  );

  useEffect(() => {
    socket.current = io('http://localhost:3001', { transports: ['websocket'] });
    fetchMessageHistory();
  }, [userEmail, fetchMessageHistory, refreshMessages]);

  return (
    <div style={ { background: 'white' } }>
      <div
        style={ {
          display: 'flex', flexDirection: 'column', width: '360px', height: '520px', overflowY: 'scroll',
        } }
      >
        <ul>
          {messageHistory && messageHistory.history
            ? messageHistory.history.sent.map((item) => (
              <li style={ { textAlign: 'left', padding: '0', margin: '0' } } key={ item.timestamp }>
                <p data-testid="nickname" style={ { padding: '0', margin: '0' } }>
                  {userEmail}
                </p>
                <div
                  style={ {
                    display: 'flex', border: '1px solid black', width: '250px', padding: '15px', borderRadius: '15px', background: '#00af9c', borderTopLeftRadius: '0',
                  } }
                >
                  <p data-testid="message-time">
                    {item.timestamp.split(':').slice(sliceInit, sliceEnd).join(':')}
                  </p>
                  <p data-testid="text-message" style={ { marginLeft: '20px' } }>
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
          data-testid="send-message"
          onClick={ () => {
            socket.current.emit('message', { message, userEmail, time });
            setRefreshMessages(!refreshMessages);
            setMessage('');
          } }
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

ChatComponent.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default ChatComponent;
