import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const setUserName = createAction('SET_USER_NAME');

export const fetchMessage = createAction('MESSAGE_FETCH');

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
