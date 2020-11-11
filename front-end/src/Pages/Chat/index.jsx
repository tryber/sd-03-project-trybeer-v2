import React from 'react';
import { TopMenu } from '../../Components';
import './styles.css';

const Chat = () => {

  return (
    <div>
      <TopMenu />
      <div id="container-chat">
        <div className="eles">
          <div className="nick">
            <h4 data-testid="nickname" >email@email.com </h4>
            <h4 data-testid="message-time" >17:32</h4>
          </div>
          <h2 data-testid="text-message" >Aqui vem as mensagens</h2>
        </div>
        <div className="nos">
          <div className="nick">
            <h4 data-testid="nickname" >Loja </h4>
            <h4 data-testid="message-time" >17:32</h4>
          </div>
          <h2 data-testid="text-message" >Aqui vem as mensagens</h2>
        </div>

        <div className="inputButton">
          <input type="text" data-testid="message-input" placeholder="Digite..." />
          <button data-testid="send-message" >Enviar</button>
        </div>
      </div>
    </div>
  )
}

export default Chat;