import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import io from 'socket.io-client';
import cookie from 'js-cookie';
import faker from 'faker';
import reducers from './reducers';
import App from './components/App.jsx';
import * as actions from './actions';

export default (initialState) => {
  /* eslint-disable no-underscore-dangle */
  const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
  /* eslint-enable */

  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk),
      ext ? ext() : f => f,
    ),
  );

  let userName;
  if (!cookie.get('userName')) {
    const firstName = faker.fake('{{name.firstName}}');
    const lastName = faker.fake('{{name.lastName}}');
    userName = ` ${lastName} ${firstName}`;
    cookie.set('userName', userName);
  }

  userName = cookie.get('userName');
  store.dispatch(actions.setUserName({ name: userName }));

  const socket = io();
  socket
    .on('newMessage', ({ data: { attributes } }) => {
      store.dispatch(actions.fetchMessage({ message: attributes }));
    });

  socket
    .on('newChannel', ({ data: { attributes } }) => {
      store.dispatch(actions.fetchChannels({ channel: attributes }));
    });

  socket
    .on('removeChannel', ({ data: { id } }) => {
      store.dispatch(actions.fetchChannelsAfterDelete({ currentId: id }));
    });

  socket
    .on('renameChannel', ({ data: { id, attributes } }) => {
      store
        .dispatch(actions.fetchChannelsAfterRename({ currentId: id, currentChannel: attributes }));
    });

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('chat'),
  );
};
