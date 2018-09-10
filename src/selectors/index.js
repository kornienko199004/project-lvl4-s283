import { createSelector } from 'reselect';

const getMessages = state => state.messages;
const getChannels = state => state.channels;
const getUserName = state => state.userName;
const getCurrentChannelId = state => state.currentChannelId;
const getModalWindowState = state => state.modalWindow;

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


export const messagesSelector = createSelector(
  currentChannelIdSelector,
  getMessages,
  (currentId, messages) => messages.filter(({ channelId }) => channelId === currentId),
);

export const modalWindowState = createSelector(
  getModalWindowState,
  modalWindow => modalWindow,
);
