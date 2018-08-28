import React from 'react';

const MessagesList = ({ messages, currentChannelId, channels }) => {
  const currentChannelName = channels
    .filter(({ id }) => id === currentChannelId)
    .map(({ name }) => name);
  return (
    <div>
      <h4>
        #
        {currentChannelName}
      </h4>
      {messages.map(({ text, userName, id }) => (
        <p key={id}>
          <b>{userName}</b>
          <b>: </b>
          {text}
        </p>
      ))}
    </div>
  );
};

export default MessagesList;
