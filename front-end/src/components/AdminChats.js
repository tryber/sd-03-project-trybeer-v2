import React, { useEffect, useState, useContext } from 'react';
import { ContextAplication } from '../context/ContextAplication';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

const one = 1;

export default function AdminChats() {

  const [chats, setChats] = useState([]);
  const { setUserChat } = useContext(ContextAplication)
  const history = useHistory();

  const getChats = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get('http://localhost:3001/admin/chat', { headers: { authorization: token } });
    const chats = await response.data;

    setChats(chats);
    setUserChat(chats.email);
  }

  useEffect(() => {
    getChats();
  })

  return <div >
    <ul>
    {chats.length && chats.map(chat => (
      <li>
        <button onClick={() => history.push('/admin/chat')}>

        <div data-testid="containerChat">
          <p data-testid="profile-name">{chat.email}</p>
          <p data-testid="last-message">{chat.messages[chat.messages.length - one].text}</p>
        </div>
        </button>
      </li>
    ))}
    </ul>
  </div>;
}
