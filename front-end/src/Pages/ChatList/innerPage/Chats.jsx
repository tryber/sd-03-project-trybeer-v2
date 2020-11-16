import React from 'react';
import { Link } from 'react-router-dom';

const Chats = ({ messages, users }) => {
  const user = users.find((u) => u !== 'Loja') || {};
  const lastMessage = messages.slice(-1)[0];
  const { email = user.email, time = null } = lastMessage || {};

  return (
    <Link to={{ pathname: "/admin/chat", state: email }} data-testid="containerChat">
      <h3 data-testid="profile-name">{email}</h3>
      <p data-testid="last-message">Última mensagem às {time}</p>
    </Link>
  );
};

export default Chats;
