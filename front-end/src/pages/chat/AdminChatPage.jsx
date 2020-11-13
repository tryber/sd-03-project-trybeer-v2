import React, { useRef, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import AdminSideBar from '../../components/adminMenuSideBar/AdminMenuSideBar';

const io = window.io;

function AdminChatPage() {
  const socket = useRef();
  const [chats, setChats] = useState([]);
  const [isChatOpened, setIsChatOpened] = useState(false);

  useEffect(() => {
    socket.current = io('http://localhost:3001');
    socket.current.emit('store-history');
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.on('store-history', (data) => {
        setChats(data);
      });
    }
  }, [socket]);

  console.log(chats);

  const chatWithNickAndTime = chats.map((e) => {
    const time = e.messagesArray.map((el) => el.timestamp);
    const last = time.pop();
    return { nickname: e.id1, time: last };
  });

  chatWithNickAndTime.sort((a, b) => (a.time > b.time ? 1 : -1));

  const onCardChatClick = (nickname) => {
    localStorage.setItem('nickname', nickname);
    setIsChatOpened(true);
  };

  if (isChatOpened) return <Redirect to="/admin/chat" />;

  return (
    <div className="d-flex">
      <AdminSideBar />
      <div className="container">
        {chats.length === 0 ? (
          <p data-testid="text-for-no-conversation">
            Nenhuma conversa por aqui
          </p>
        ) : (
          <div>
            {chatWithNickAndTime.map(({ nickname, time }) => (
              <div
                className="card"
                key={nickname}
                data-testid="containerChat"
                onClick={() => onCardChatClick(nickname)}
              >
                <p style={{ color: '#000' }} data-testid="profile-name">
                  {nickname}
                </p>
                <p style={{ color: '#000' }} data-testid="last-message">
                  {time}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminChatPage;
