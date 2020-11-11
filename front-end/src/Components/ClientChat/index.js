import React, { useState } from 'react'

const ClientChat = () => {
/*   const [message, setMessage] = useState('');
  const [attMessage, setAttMessage] = useState([]); */

  const getUser = localStorage.getItem('user');
  const getEmail = JSON.parse(getUser);

  const submitMessage = (event) => {
    event.preventDefault()
  };

  return (
    <div>
      <form onClick={submitMessage}>
        <h1>Estou funcionando</h1>
        <div id="userName" data-testid="nickname">{getEmail.email}</div>
        <div id="hours" data-testid="message-time">Hora</div>
        <div id="message-text" data-testid="text-message">texto da mensagem</div>
        <input data-testid="message-input" />
        <button type="submit" data-testid="send-message">ENVIAR</button>
      </form>
    </div>
  )
}

export default ClientChat;