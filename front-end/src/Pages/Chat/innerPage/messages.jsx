import React from 'react';

const Messages = ({ user = 'jafetguerra6@gmail.com', time = 'kkkk', message = 'React' }) => {
  const email = localStorage.getItem('email');
  
  return (
    <div className={email === user ? 'nos' : 'eles'}>
      <div className="nick">
        <h4 data-testid="nickname">{user}</h4>
        <h4 data-testid="message-time">{time}</h4>
      </div>
      <h2 data-testid="text-message">{message}</h2>
  </div>
  );
};

export default Messages;
