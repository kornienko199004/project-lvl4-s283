import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

export const initState = createAction('STATE_INITIALIZE');

export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');

export const fetchMessage = createAction('MESSAGE_FETCH');

export const fetchChannels = createAction('CHANNELS_FETCH');
export const fetchChannelsAfterDelete = createAction('CHANNELS_FETCH_AFTER_DELETE');
export const fetchChannelsAfterRename = createAction('CHANNELS_FETCH_AFTER_RENAME');

export const changeCurrentChannelId = createAction('CURRENT_CHANNEL_ID_CHANGE');

export const modalOpen = createAction('MODAL_SET_OPTIONS');
export const modalToggle = createAction('MODAL_TOGGLE_VISIBILITY');

export const makeFormEnable = createAction('MAKE_FORM_ENABLE');
export const makeFormDisable = createAction('MAKE_FORM_DISABLE');

export const addMessage = ({
  id, text, userName, reset,
}) => async (dispatch) => {
  const sendData = { data: { attributes: { text, userName } } };
  try {
    const response = await axios.post(routes.messageslUrl(id), sendData);
    dispatch(addMessageSuccess({ message: response.data }));
    reset();
  } catch (e) {
  /* eslint-disable no-console */
    console.log(e);
    dispatch(addMessageFailure());
  }
};

export const addChannel = ({ name }) => async (dispatch) => {
  const sendData = { data: { attributes: { name } } };
  try {
    const response = await axios.post(routes.channelsUrl(), sendData);
    dispatch(addChannelSuccess({ channel: response.data }));
  } catch (e) {
    console.log(e);
    dispatch(addChannelFailure());
  }
};

export const removeChannel = ({ id }) => async (dispatch) => {
  const sendData = { data: { attributes: { id } } };
  try {
    await axios.delete(routes.channelUrl(id), sendData);
    dispatch(removeChannelSuccess({ id }));
  } catch (e) {
    console.log(e);
    dispatch(removeChannelFailure());
  }
};

export const renameChannel = ({ id, name }) => async (dispatch) => {
  const sendData = { data: { attributes: { name } } };
  try {
    await axios.patch(routes.channelUrl(id), sendData);
    dispatch(renameChannelSuccess({ name }));
  } catch (e) {
    console.log(e);
    /* eslint-enable no-console */
    dispatch(renameChannelFailure());
  }
};
