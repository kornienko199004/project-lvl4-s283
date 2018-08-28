import React from 'react';
import ChannelsList from '../containers/ChannelsList';
import MessagesForm from '../containers/MessagesForm';
import MessagesList from '../containers/MessagesList';

const App = () => (
  <div className="container">
    <div className="row">
      <ChannelsList />
      <div className="col-sm-8">
        <MessagesList />
        <MessagesForm />
      </div>
    </div>
  </div>
);

export default App;
