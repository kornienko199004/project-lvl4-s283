import React from 'react';

const ChannelsList = ({ channels, userName, currentChannelId }) => (
  <div className="col-sm-3">
    <h4>{userName}</h4>
    <ul className="list-group">
      {channels.map(({ id, name }) => {
        const className = id === currentChannelId ? 'list-group-item active' : 'list-group-item';
        return (
          <li className={className} key={id}>{name}</li>
        );
      })}
    </ul>
  </div>
);
export default ChannelsList;
