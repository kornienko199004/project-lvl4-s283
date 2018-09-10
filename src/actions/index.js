import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');

export const setUserName = createAction('SET_USER_NAME');

export const fetchMessage = createAction('MESSAGE_FETCH');

export const fetchChannels = createAction('CHANNELS_FETCH');
export const fetchChannelsAfterDelete = createAction('CHANNELS_FETCH_AFTER_DELETE');
export const fetchChannelsAfterRename = createAction('CHANNELS_FETCH_AFTER_RENAME');

export const changeCurrentChannelId = createAction('CURRENT_CHANNEL_ID_CHANGE');

export const modalOpen = createAction('OPEN_MODAL');
export const modalClose = createAction('CLOSE_MODAL');

export const makeFormEnable = createAction('MAKE_FORM_ENABLE');
export const makeFormDisable = createAction('MAKE_FORM_DISABLE');

export const addMessage = ({ id, text, userName }) => async (dispatch) => {
  dispatch(addMessageRequest());
  const sendData = { data: { attributes: { text, userName } } };
  try {
    const response = await axios.post(routes.messageslUrl(id), sendData);
    dispatch(addMessageSuccess({ message: response.data }));
  } catch (e) {
    dispatch(addMessageFailure());
  }
};

export const addChannel = ({ name }) => async (dispatch) => {
  dispatch(addChannelRequest());
  const sendData = { data: { attributes: { name } } };
  try {
    const response = await axios.post(routes.channelsUrl(), sendData);
    dispatch(addChannelSuccess({ channel: response.data }));
  } catch (e) {
    dispatch(addChannelFailure());
  }
};

export const removeChannel = ({ id }) => async (dispatch) => {
  dispatch(removeChannelRequest());
  const sendData = { data: { attributes: { id } } };
  try {
    await axios.delete(routes.channelUrl(id), sendData);
    dispatch(removeChannelSuccess({ id }));
  } catch (e) {
    dispatch(removeChannelFailure());
  }
};

export const renameChannel = ({ id, name }) => async (dispatch) => {
  dispatch(renameChannelRequest());
  const sendData = { data: { attributes: { name } } };
  try {
    await axios.patch(routes.channelUrl(id), sendData);
    dispatch(renameChannelSuccess({ name }));
  } catch (e) {
    dispatch(renameChannelFailure());
  }
};
