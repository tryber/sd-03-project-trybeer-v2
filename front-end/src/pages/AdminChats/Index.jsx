import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { allChats } from "../../services/trybeerUserAPI";
import SideMenuAdmin from '../../components/SideMenuAdmin';

const chatsCards = (chats, clickToChatDetail) => {
  if (chats.length < 1) {
    return(
      <div>
        <h4 data-testid="text-for-no-conversation">Nenhuma conversa por aqui</h4>
      </div>
    );
  }
  
  return (
    <div>
      {chats.map((e, index) => {
        const length = e.messages.length;
        const time = e.messages[(length - 1)].strgTime
        return (
          <div
            key={index}
            onClick={() => clickToChatDetail(e.email)}
            data-testid="last-message"
          >
            <p data-testid="profile-name">{e.email}</p>
            <p
              data-testid={`${index}-order-status`}
            >
               {`Última mensagem às ${time}`}
            </p>
          </div>
        );
      })}
    </div>
  )
};

const getChatList = async (setChats) => {
  const chatList = await allChats();
  return setChats(chatList.data);
};

function AdminChats() {
  const [chats, setChats] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem('user'));
    if(!actualUser) return window.location.assign('http://localhost:3000/login');
    getChatList(setChats);
  }, []);

  const clickToChatDetail = async (email) => {
    localStorage.setItem('chat', JSON.stringify(email));
    history.push(`/admin/chat`);
  };

  return (
    <div>
      {SideMenuAdmin()}
      <div>
        <h2>Conversas</h2>
        {chatsCards(chats, clickToChatDetail)}
      </div>
    </div>
  );
}

export default AdminChats;
