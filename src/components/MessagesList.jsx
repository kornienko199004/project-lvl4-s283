import React from 'react';
import connect from '../connect';
import { messagesSelector, currentChannelIdSelector, channelsSelector } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    messages: messagesSelector(state),
    currentChannelId: currentChannelIdSelector(state),
    channels: channelsSelector(state),
  };
  return props;
};

@connect(mapStateToProps)
class MessagesList extends React.Component {
  render() {
    const { messages, currentChannelId, channels } = this.props;
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
          <p key={id} className="w-100" style={{ overflowWrap: 'break-word' }}>
            <b>{userName}</b>
            <b>: </b>
            {text}
          </p>
        ))}
      </div>
    );
  }
}

export default MessagesList;
