import React, { useState, useCallback, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AdminNavBar from '../../../components/Admin/AdminBar/AdminNavBar';
import { getAdminChatList } from '../../../services';
import ChatCard from '../../../components/Chat/ChatCard';

const minusOne = -1;

const sortMessagesByTimestamp = (a, b) => (a.messages[a.messages.length - 1].timestamp
  > b.messages[b.messages.length - 1].timestamp ? minusOne : 1);

function ClientChatPage() {
  const zero = 0;
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [chatList, setChatList] = useState('');

  const fetchChatList = useCallback(
    async () => setChatList(await getAdminChatList()), [],
  );

  useEffect(() => {
    fetchChatList();
  }, [fetchChatList]);

  useEffect(() => {
  }, [chatList]);

  if (!user) return <Redirect to="/login" />;

  return (
    <div style={ { background: 'white' } }>
      <AdminNavBar title="Chat List" />
      <ul>
        {chatList && chatList.length > zero
          ? chatList.sort(sortMessagesByTimestamp).map((data) => (<ChatCard
              key={ data.nickname }
              nickname={ data.nickname }
          />))
          : 'loading chat list...' }
      </ul>
    </div>
  );
}

export default ClientChatPage;
