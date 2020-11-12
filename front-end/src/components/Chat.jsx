import React from 'react'

function Chat() {
  return (
    <div>
      <div className="history">
        <ul>
          <li>
            <p data-testid="nickname">Email</p>
            <p data-testid="message-time">Hora</p>
            <p data-testid="text-message">Texto</p>
          </li>
        </ul>
      </div>
      <div>
        <input type="text" data-testid="chat-message" />
        <button type="button" data-testid="send-message">Enviar</button>
      </div>
      <div>
        <button type="button" data-testid="back-button">Voltar</button>
      </div>
    </div>
  )
}

export default Chat
