import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions({
}, {});

const userName = handleActions({
  [actions.setUserName](state, { payload: { name } }) {
    return name;
  },
}, '');

const currentChannelId = handleActions({
}, {});

const messageCreatingState = handleActions({
  [actions.addMessageRequest]() {
    return 'requested';
  },
  [actions.addMessageSuccess]() {
    return 'successed';
  },
  [actions.addMessageFailure]() {
    return 'failed';
  },
}, 'none');

const messages = handleActions({
  [actions.fetchMessage](state, { payload: { message } }) {
    return [...state, message];
  },
}, {});

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  userName,
  messageCreatingState,
  form: formReducer,
});
