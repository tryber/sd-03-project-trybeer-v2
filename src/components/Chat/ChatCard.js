import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ChatCard({ nickname, lastMessage }) {
  return (
    <li data-testid="containerChat" style={ { background: 'lightgrey' } }>
      <Link to={ `/admin/chats/${nickname}` }>
        <p data-testid="profile-name">{nickname}</p>
        <p data-testid="last-message">{lastMessage}</p>
      </Link>
    </li>
  );
}

ChatCard.propTypes = {
  nickname: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
};

export default ChatCard;
