import { createSelector } from 'reselect';

const getMessages = state => state.messages;
const getChannels = state => state.channels;
const getUserName = state => state.userName;
const getCurrentChannelId = state => state.currentChannelId;

export const messagesSelector = createSelector(
  getMessages,
  messages => messages,
);

export const channelsSelector = createSelector(
  getChannels,
  channels => channels,
);

export const userNameSelector = createSelector(
  getUserName,
  name => name,
);

export const currentChannelIdSelector = createSelector(
  getCurrentChannelId,
  id => id,
);
