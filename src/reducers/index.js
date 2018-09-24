import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';
import {
  normalizeState, normalizeInitState, normalizeStateAfterDelete, normalizeStateAfterRename,
} from '../normalize';

const channels = handleActions({
  [actions.initState](state, { payload: { initialState } }) {
    return normalizeInitState(initialState, state, initialState.channels);
  },
  [actions.changeCurrentChannelId](state, { payload: { id } }) {
    return { ...state, currentChannelId: id };
  },
  [actions.fetchChannels](state, { payload: { channel } }) {
    return normalizeState(state, channel);
  },
  [actions.fetchChannelsAfterDelete](state, { payload: { currentId } }) {
    return normalizeStateAfterDelete(state, currentId);
  },
  [actions.fetchChannelsAfterRename](state, { payload: { currentId, currentChannel } }) {
    return normalizeStateAfterRename(state, currentId, currentChannel);
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    const newId = state.currentChannelId === id ? 1 : state.currentChannelId;
    return { ...state, currentChannelId: newId };
  },
}, {
  byId: {

  },
  allIds: [],
  currentChannelId: '',
});


const messages = handleActions({
  [actions.initState](state, { payload: { initialState } }) {
    return normalizeInitState(initialState, state, initialState.messages);
  },
  [actions.fetchMessage](state, { payload: { message } }) {
    return normalizeState(state, message);
  },
}, {
  byId: {

  },
  allIds: [],
});

const UiState = handleActions({
  [actions.modalOpen](state, { payload: { name, id, channelName } }) {
    return {
      ...state, name, open: true, id, channelName,
    };
  },
  [actions.modalToggle](state) {
    return {
      ...state, open: !state.open,
    };
  },
  [combineActions(
    actions.addChannelSuccess,
    actions.renameChannelSuccess,
    actions.removeChannelSuccess,
    actions.addMessageSuccess,
  )](state) {
    return { ...state, open: false };
  },
}, {
  name: 'none', open: false, id: '', channelName: 'none',
});

export default combineReducers({
  channels,
  messages,
  UiState,
  form: formReducer,
});
