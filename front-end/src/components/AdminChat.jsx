import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminChat() {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/chat').then(({ data }) => setChats(data))
  }, [])

  console.log(chats)
  return (
    <div>
      {(chats.length === 0)
        ? <p data-testid="text-for-no-conversation">Nenhuma conversa por aqui</p>
        : <div data-testid="containerChat">
          {chats.map(({ nickname, history }) =>
            <div>
              <p data-testid="profile-name">{nickname}</p>
              <p data-testid="last-message">{history[history.length - 1].timestamp}</p>
            </div>)}
        </div>}
    </div>
  )
}

export default AdminChat
