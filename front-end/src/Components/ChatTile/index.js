import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ChatTile = ({
  email,
  time,
}) => (
  <div className="chat">
    <div className="chat-info">
      <h3 data-testid="profile-name">
        {email}
      </h3>
      <h3 data-testid="last-message">
        {`Última mensagem às ${time}`}
      </h3>
    </div>
  </div>
);
ChatTile.propTypes = {
  email: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};
export default ChatTile;
