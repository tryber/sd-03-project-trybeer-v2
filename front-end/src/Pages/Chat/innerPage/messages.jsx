import React from 'react';

const Messages = ({ email, time, message }) => {
  const userEmail = localStorage.getItem('email');

  return (
    <div className={email === userEmail ? 'nos' : 'eles'}>
      <div className="nick">
        <h4 data-testid="nickname">{email === userEmail ? email : 'Loja'}</h4>
        <h4 data-testid="message-time">{time}</h4>
      </div>
      <p data-testid="text-message">{message}</p>
    </div>
  );
};

export default Messages;
