import React from 'react';
import PropTypes from 'prop-types';

function ChatCard({ nickname }) {
  return (
    <div style={ { background: 'light-grey' } }>
      {nickname}
    </div>
  );
}

ChatCard.propTypes = {
  nickname: PropTypes.string.isRequired,
}

export default ChatCard;
