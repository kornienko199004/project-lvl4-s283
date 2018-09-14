import _ from 'lodash';

export const normalizeState = (state, item) => ({
  byId: {
    ...state.byId, [item.id]: item,
  },
  allIds: [...state.allIds, item.id],
  currentChannelId: state.currentChannelId,
});

export const normalizeInitState = (initialState, state, items) => {
  const newState = items
    .reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
  const allIds = items.map(({ id }) => id);
  const normalizedState = {
    byId: {
      ...state.byId, ...newState,
    },
    allIds: [...state.allIds, ...allIds],
    currentChannelId: initialState.currentChannelId,
  };
  return normalizedState;
};

export const normalizeStateAfterDelete = (state, currentId) => ({
  byId: {
    ..._.omit(state.byId, currentId),
  },
  allIds: state.allIds.filter(id => id !== currentId),
  currentChannelId: state.currentChannelId,
});

export const normalizeStateAfterRename = (state, currentId, currentChannel) => ({
  byId: {
    ...state.byId, [currentId]: currentChannel,
  },
  allIds: state.allIds,
  currentChannelId: state.currentChannelId,
});
