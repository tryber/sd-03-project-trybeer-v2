import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../../components/MenuTop';

const getTheLastDateMessage = (arr) => {
  const last = arr[arr.length - 1];

  return last.date;
}

const AdminChats = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:3001/chat',
    }).then((result) => setCards([...result.data]));
  }, []);

  return (
    <div>
      <Header title="Conversas" />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div data-testid="containerChat" >
        {console.log(cards)}
        {cards.length === 0 ? <h1 data-testid="text-for-no-conversation">Nenhuma conversa por aqui</h1> : cards.map(({ messages, email }, index) => {
          return (
            <div
              key={index + 1}
            >
              <h4 data-testid="profile-name">{email}</h4>
              <p data-testid="last-message">{`Última mensagem às ${getTheLastDateMessage(messages)}`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminChats;
