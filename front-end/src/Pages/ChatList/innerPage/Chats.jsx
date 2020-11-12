import React from 'react';

const Chats = ({ email, lastMessageDate }) => {
  return (
    <div data-testid="containerChat">
      <h3 data-testid="profile-name">{email}</h3>
      <p data-testid="last-message">{lastMessageDate}</p>
    </div>
  )
}

export default Chats;
