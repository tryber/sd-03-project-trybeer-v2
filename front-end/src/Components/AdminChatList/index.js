import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getChatsList } from '../../services/api_endpoints';
import AdminSideBar from '../AdminSideBar/index';
import ChatTile from '../ChatTile';
import './styles.css';

const AdminChatsPage = () => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchChatList = async () => await getChatsList(token) || [];

    fetchChatList().then((chatList) => setChatList(chatList));
  }, [token]);

  return (
    <div className="admin-chats">
      <AdminSideBar />
      <section className="admin-chats-aside">
        <h1>Conversas</h1>
        {chatList.map(({clientEmail, messages}) => (
          <Link
            key={ clientEmail }
            to={{
              pathname: '/admin/chat/',
              state: { clientEmail, messages}
            }}
          >
            <ChatTile
              email={ clientEmail }
              time={ messages[messages.length - 1].timeStamp }
            />
          </Link>
        )) }
      </section>
    </div>
  );
};

export default AdminChatsPage;
