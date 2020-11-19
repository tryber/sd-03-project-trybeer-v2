import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getChatsList } from '../../services/api_endpoints';
import AdminSideBar from '../AdminSideBar/index';
import ChatTile from '../ChatTile';
import './style.css';

const AdminChatsPage = () => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const [chatList, setChatList] = useState([]);
  const randomNumber = parseInt(Math.random(), 10);
  const zero = 0;
  useEffect(() => {
    const fetchChatList = async () => getChatsList(token) || [];
    fetchChatList().then((chats) => setChatList(chats));
  }, [token]);

  return (
    <div className="admin-orders">
      <AdminSideBar />
      <div className="admin-orders-aside">
        <section className="admin-chats-aside">
          <h1>Conversas</h1>
          {
            chatList.length > zero
              ? chatList.map(({ clientEmail, messages }) => (
                <Link
                  data-testid="containerChat"
                  key={ randomNumber }
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
    </div>
  );
};

export default AdminChatsPage;
