import React from 'react';

function ChatClient() {
  const { email } = JSON.parse(localStorage.getItem('user')) || [];
  const time = new Date().toLocaleTimeString().substring(5, '');

  console.log(time)

  return (
    <div>
      <p data-testid="nickname">{email}</p>
      <p data-testid="message-time">{time}</p>
      <p data-testid="text-message"></p>
      <input data-testid="message-input" />
      <button data-testid="send-message">&gt;</button>
    </div>
  );
}

export default ChatClient;
