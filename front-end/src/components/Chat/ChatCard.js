import React from 'react';
import PropTypes from 'prop-types';

function ChatCard({ nickname, lastMessage }) {
  return (
    <li data-testid="containerChat" style={ { background: 'lightgrey' } }>
      <p data-testid="profile-name">{nickname}</p>
      <p data-testid="last-message">{lastMessage}</p>
    </li>
  );
}

ChatCard.propTypes = {
  nickname: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
};

export default ChatCard;
