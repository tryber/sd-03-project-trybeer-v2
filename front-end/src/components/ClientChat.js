import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

function ClientChat() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = socketIOClient('http://localhost:3001/socket.io/socket.io.js');
    socket.on('message', (data) => {
      setMessage(data);
    });
  }, []);

  return (
    <div>
      <p>Message:</p>
      <p>{ message }</p>
    </div>
  )
};

export default ClientChat;
