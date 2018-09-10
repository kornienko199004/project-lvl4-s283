import React from 'react';
import ChannelsList from './ChannelsList';
import MessagesForm from './MessagesForm';
import MessagesList from './MessagesList';
import Example from './Modal';

const App = () => (
  <div className="container">
    <div className="row">
      <ChannelsList />
      <div className="col-sm-8">
        <MessagesList />
        <MessagesForm />
        <Example />
      </div>
    </div>
  </div>
);

export default App;
