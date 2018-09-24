import _ from 'lodash';
// import { normalize, schema } from 'normalizr';

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
/*
export const normalizeInitState = (initialState, states, items) => {
  console.log('initialState');
  console.log(initialState);
  const data = initialState;
  const channel = new schema.Entity('channels');
  const state = new schema.Array(channel);
  console.log(data.channels);
  const normalizedData = normalize(data.channels, state);
  console.log(normalizedData);
  console.log({ ...normalizedData, currentChannelId: initialState.currentChannelId });
  return normalizedData;
}
*/
export const normalizeStateAfterDelete = (state, currentId) => ({
  byId: {
    ..._.omit(state.byId, currentId),
  },
  allIds: state.allIds.filter(id => id !== currentId),
  currentChannelId: state.currentChannelId,
});

export const normalizeStateAfterRename = (state, currentId, currentChannel) => ({
  ...state,
  byId: {
    ...state.byId, [currentId]: currentChannel,
  },
});
