import React from 'react';

function ChatPage() {
  return (
    <div>
      <fieldset>
        <span>Mensagens</span>
        <ul id="allMessages"></ul>
      </fieldset>
      <div id="send-to" data-value="public"></div>
      <input type="text" data-testid="message-input" id="message-box" />
      <button type="submit" id="send-button" data-testid="send-message">Enviar</button><br/>
    </div>
  );
}

export default ChatPage;