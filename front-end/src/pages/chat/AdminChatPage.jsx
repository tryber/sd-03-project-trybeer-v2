import React, { useRef, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import AdminSideBar from '../../components/adminMenuSideBar/AdminMenuSideBar';
import './Chat.css';

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

  const chatWithNickAndTime = chats.map((e) => {
    const time = e.messagesArray.map((el) => el.timestamp);
    const last = time.pop();
    return { nickname: e.id1, time: last };
  });

  chatWithNickAndTime.sort((a, b) => (a.time > b.time ? -1 : 1));

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
          <h1 className="message text-center" data-testid="text-for-no-conversation">
            Nenhuma conversa por aqui
          </h1>
        ) : (
          <div>
            {chatWithNickAndTime.map(({ nickname, time }) => (
              <div
                className="card chats-list"
                key={nickname}
                data-testid="containerChat"
                onClick={() => onCardChatClick(nickname)}
              >
                <div className="card-body">
                  <h5
                    style={{ color: '#000' }}
                    data-testid="profile-name"
                    className="card-title"
                  >
                    {nickname}
                  </h5>
                  <p
                    style={{ color: '#000' }}
                    data-testid="last-message"
                    className="card-text"
                  >
                    {`Última mensagem às ${time}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminChatPage;
