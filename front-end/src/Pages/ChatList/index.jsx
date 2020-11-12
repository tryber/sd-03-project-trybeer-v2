import React, { useState, useEffect } from 'react';
import apiGetChats from '../../Services/apiGetChats';
import Chats from './innerPage/Chats';

const ChatList = () => {
  const [listOfChats, setListOfChats] = useState([]);

  useEffect(() => {
    apiGetChats().then((response) => {
      setListOfChats(response);
      console.log(response)
    })
    .catch((response) => {
      setListOfChats(response);
    });
  }, []);
  
  if (listOfChats.length <= 0 || typeof listOfChats === 'string') {
    return <div data-testid="text-for-no-conversation">Nenhuma conversa por aqui</div>
  }
  return (
    <div>
      {listOfChats.map(({ email, time }, index) => (
        <Chats key={index} email={email} time={time}  />
      ))}
    </div>
  );
};

export default ChatList;
