import React, { useState, useCallback, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ClientNavBar from '../../../components/Client/ClientNavBar/ClientNavBar';
import { getAdminChatList } from '../../../services';
import ChatCard from '../../../components/Chat/ChatCard';

function ClientChatPage() {
  const zero = 0;
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [chatList, setChatList] = useState('');

  const fetchChatList = useCallback(
    async () => setChatList(await getAdminChatList()), [],
  );

  useEffect(() => {
    fetchChatList();
  }, [user, fetchChatList]);

  useEffect(() => {
  }, [chatList]);

  if (!user) return <Redirect to="/login" />;

  return (
    <div style={ { background: 'white' } }>
      <ClientNavBar title="Chat List" />
      {chatList && chatList.length > zero
        ? chatList.map((data) => (<ChatCard
            key={ data.nickname }
            nickname={ data.nickname }
        />))
        : 'loading chat list...' }
    </div>
  );
}

export default ClientChatPage;
