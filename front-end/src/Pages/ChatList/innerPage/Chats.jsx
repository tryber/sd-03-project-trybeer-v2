import React from 'react';

const Chats = ({ email, time }) => {
  return (
    <div data-testid="containerChat">
      <h3 data-testid="profile-name">{email}</h3>
      <p data-testid="last-message">{time}</p>
    </div>
  )
}

export default Chats;
