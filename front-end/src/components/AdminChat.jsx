import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdminChat() {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/chat').then(({ data }) => setChats(data));
  }, []);

  const chatWithNickAndTime = chats.map((e) => {
    const time = e.history.map((el) => el.timestamp);
    const last = time.pop();
    return { nickname: e.nickname, time: last };
  });
  chatWithNickAndTime.sort((a, b) => (a.time > b.time ? 1 : -1));

  return (
    <div>
      {(chats.length === 0)
        ? <p data-testid="text-for-no-conversation">Nenhuma conversa por aqui</p>
        : <div>
          {chatWithNickAndTime.map(({ nickname, time }) => (
            <Link
              to="/admin/chat"
              key={ nickname }
              data-testid="containerChat"
              onClick={() => localStorage.setItem('nickname', JSON.stringify(nickname))}
            >
              <p style={ { color: '#000' } } data-testid="profile-name">{nickname}</p>
              <p style={ { color: '#000' } } data-testid="last-message">{time}</p>
            </Link>))}
        </div>}
    </div>
  );
}

export default AdminChat;
