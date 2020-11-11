/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminHeader from '../components/AdminHeader';
import { MainContext } from '../context/context';
import '../styles/Orders.css';

function AdminChatList(props) {
  const { setAdminChatRoom } = useContext(MainContext);
  const [chatsAdminList, setChatsAdminList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (!currentUser) return props.history.push('/login');
    const headers = new Headers({
      Authorization: currentUser.token,
    });

    fetch('http://localhost:3001/admin/chat', { headers })
      .then((response) => response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))))
      .then((data) => setChatsAdminList(data))
      .catch(() => setLoggedIn(false));
    return () => undefined;
  }, []);

  if (!loggedIn) return <Redirect to="/login" />;

  return (
    <div>
      <AdminHeader title="Conversas" />
      <section className="OrdersContainer">
        {!chatsAdminList || chatsAdminList.length < 1
          ? <h2>Nenhuma conversa por aqui</h2>
          : chatsAdminList.map((chatRoom) => (
            <Link to="/admin/chat/" onClick={ () => setAdminChatRoom(chatRoom.user) } key={ chatRoom.user }>
              <div data-testid="containerChat" className="OrdersCard">
                <h4 data-testid="profile-name">{chatRoom.user}</h4>
                <p>{chatRoom.messages[chatRoom.messages.length - 1].time}</p>
              </div>
            </Link>
          ))}
      </section>
    </div>
  );
}

AdminChatList.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AdminChatList;
