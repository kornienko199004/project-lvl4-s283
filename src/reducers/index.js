import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';
import * as actions from '../actions';

const channels = handleActions({
  [actions.fetchChannels](state, { payload: { channel } }) {
    return [...state, channel];
  },
  [actions.fetchChannelsAfterDelete](state, { payload: { currentId } }) {
    return state.filter(({ id }) => id !== currentId);
  },
  [actions.fetchChannelsAfterRename](state, { payload: { currentId, currentChannel } }) {
    const currentChannelIndex = _.findIndex(state, ['id', currentId]);
    const stateBefore = state.slice(0, currentChannelIndex);
    const stateAfter = state.slice(currentChannelIndex + 1);
    return [...stateBefore, currentChannel, ...stateAfter];
  },
}, []);

const userName = handleActions({
  [actions.setUserName](state, { payload: { name } }) {
    return name;
  },
}, '');

const currentChannelId = handleActions({
  [actions.changeCurrentChannelId](state, { payload: { id } }) {
    return id;
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    const newId = state === id ? 1 : state;
    return newId;
  },
}, '');

const messages = handleActions({
  [actions.fetchMessage](state, { payload: { message } }) {
    return [...state, message];
  },
}, {});

const modalWindow = handleActions({
  [actions.modalOpen](state, { payload: { name, id, channelName } }) {
    return {
      ...state, name, open: true, id, channelName,
    };
  },
  [actions.modalClose](state) {
    return { ...state, open: false };
  },
  [combineActions(
    actions.makeFormEnable,
    actions.addChannelRequest,
    actions.removeChannelRequest,
    actions.addMessageRequest,
  )](state) {
    return { ...state, formDisable: false };
  },
  [combineActions(
    actions.makeFormDisable,
    actions.addChannelFailure,
    actions.removeChannelFailure,
    actions.addMessageFailure,
  )](state) {
    return { ...state, formDisable: true };
  },
  [combineActions(
    actions.addChannelSuccess,
    actions.renameChannelSuccess,
    actions.removeChannelSuccess,
    actions.addMessageSuccess,
  )](state) {
    return { ...state, formDisable: true, open: false };
  },
}, {
  name: 'none', open: false, id: '', channelName: 'none', formDisable: true,
});

const channelFormFeducer = handleActions({
  [actions.addChannelSuccess]() {
    return undefined;
  },
}, {});

const messageFormFeducer = handleActions({
  [actions.addMessageSuccess]() {
    return undefined;
  },
}, {});

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  userName,
  modalWindow,
  form: formReducer.plugin({
    ChannelForm: channelFormFeducer,
    MessagesForm: messageFormFeducer,
  }),
});
