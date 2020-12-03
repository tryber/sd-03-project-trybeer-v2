import React, {
useState, useEffect, useRef, useCallback,
} from 'react';
import { io } from 'socket.io-client';

function ChatComponent({ callback }) {
  const { userEmail } = JSON.parse(localStorage.getItem('user'));
  const time = new Date().toLocaleTimeString('pt-br');
  const socket = useRef();

  const [message, setMessage] = useState();
  const [messageHistory, setMessageHistory] = useState();
  const [refreshMessages, setRefreshMessages] = useState(false);

  const fetchMessageHistory = useCallback(
    async () => setMessageHistory(await callback(userEmail)), [userEmail],
  );

  useEffect(() => {
    socket.current = io('http://localhost:3001', { transports: ['websocket'] });
    fetchMessageHistory();
  }, [userEmail, fetchMessageHistory, refreshMessages]);

  return (
    <div style={ { display: 'flex', flexDirection: 'column', width: '360px' } }>
      <ul>
        {messageHistory && messageHistory.history
          ? messageHistory.history.sent.map((item) => (
            <li key={ item.timestamp }>
              {userEmail}
              :
              { item.chatMessage }
              -
              {item.timestamp}
            </li>)) : 'Loading messages...'}
      </ul>
      <input type="text" data-testid="message-input" onChange={ (e) => setMessage(e.target.value) } value={ message } />
      <button
        type="button"
        onClick={ () => {
          socket.current.emit('message', { message, userEmail, time });
          setRefreshMessages(!refreshMessages);
        } }
        data-testid="send-message"
      >
        Enviar
      </button>
    </div>
  );
}

export default ChatComponent;
