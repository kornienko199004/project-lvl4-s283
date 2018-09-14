import { createSelector } from 'reselect';

const getMessages = state => state.messages;
const getChannels = state => Object.values(state.channels.byId);
const getUserName = state => state.userName;
const getCurrentChannelId = state => state.channels.currentChannelId;
const getUiState = state => state.UiState;

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
  (currentId, messages) => Object.values(messages.byId)
    .filter(({ channelId }) => channelId === currentId),
);

export const UiStateSelector = createSelector(
  getUiState,
  uiState => uiState,
);
