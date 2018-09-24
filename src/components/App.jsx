import React from 'react';
import ChannelsList from './ChannelsList';
import MessagesForm from './MessagesForm';
import MessagesList from './MessagesList';
import Modal from './Modal';
import UserNameContext from '../user-context';

const App = () => (
  <div className="container">
    <div className="row">
      <UserNameContext.Consumer>
        {userName => (
          <ChannelsList userName={userName} />
        )}
      </UserNameContext.Consumer>
      <div className="col-sm-8">
        <MessagesList />
        <UserNameContext.Consumer>
          {userName => (
            <MessagesForm userName={userName} />
          )}
        </UserNameContext.Consumer>
        <Modal />
      </div>
    </div>
  </div>
);
export default App;
