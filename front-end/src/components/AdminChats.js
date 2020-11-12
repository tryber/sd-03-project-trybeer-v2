import React, { useEffect, useState } from 'react';
import axios from 'axios';

const getChats = (setChats) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const response = await axios.get('http://localhost:3001/admin/chat', { headers: { authorization: token } });
  const chats = response.data;
  console.log(chats)
}

export default function AdminChats() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    getChats(setChats)
  }, [])

  return <div>
    <ul>
    {chats.map(chat => (
      <li>
        {console.log('chat:', chat)}
        {JSON.stringify(chat)}
      </li>
    ))}
    </ul>
  </div>;
}
