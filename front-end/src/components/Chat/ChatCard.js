import React from 'react';
import PropTypes from 'prop-types';

function ChatCard({ nickname }) {
  return (
    <li style={ { background: 'light-grey' } }>
      {nickname}
    </li>
  );
}

ChatCard.propTypes = {
  nickname: PropTypes.string.isRequired,
};

export default ChatCard;
