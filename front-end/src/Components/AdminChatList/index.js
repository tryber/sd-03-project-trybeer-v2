import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getChatsList } from '../../services/api_endpoints';
import AdminSideBar from '../AdminSideBar/index';
import ChatTile from '../ChatTile';
import './styles.css';

const AdminChatsPage = () => {
  // const { token } = JSON.parse(localStorage.getItem('user'));
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    // const fetchChatList = async () => await getOrderList(token) || [];
    const fetchChatList = async () => await getChatsList() || [];

    fetchChatList().then((chats) => setChatList(chats));
  }, []);
  //token no evento do hooks
  return (
    <div className="admin-chats">
      <AdminSideBar />
      <section className="admin-chats-aside">
        <h1>Conversas</h1>
        {chatList.map((userEmail, lastMsg) => (
          <Link
            key={ userEmail }
            to={ '/admin/chat/' }
          >
            <ChatTile
              email={ userEmail }
              time={ lastMsg }
            />
          </Link>
        )) }
      </section>
    </div>
  );
};

export default AdminChatsPage;
