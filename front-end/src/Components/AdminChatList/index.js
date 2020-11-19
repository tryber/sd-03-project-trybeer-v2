import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getChatsList } from '../../services/api_endpoints';
import AdminSideBar from '../AdminSideBar/index';
import ChatTile from '../ChatTile';
import './style.css';

const AdminChatsPage = () => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchChatList = async () => await getChatsList(token) || [];
    fetchChatList().then((chats) => setChatList(chats));
  }, [token]);

  return (
    <div className="admin-chats">
      <AdminSideBar />
      <section className="admin-chats-aside">
        <h1>Conversas</h1>
        {console.log(chatList)}
        {
          chatList
            ? chatList.map(({ clientEmail, messages }) => (
              <Link
                data-testid="containerChat"
                key={ clientEmail }
                to={ {
                  pathname: '/admin/chat/',
                  state: { clientEmail, messages },
                } }
              >
                <ChatTile
                  email={ clientEmail }
                  time={ messages[messages.length - 1].timeStamp }
                />
              </Link>
            ))
            : <h2 data-testid="text-for-no-conversation">Nenhuma conversa por aqui</h2>
        }
      </section>
    </div>
  );
};

export default AdminChatsPage;
