import { SET_USER_DATA } from './authTypes'
import { setError } from '../error/errorActions'
import { showSuccess } from '../../state/notification/notificationActions'
import axios from '../../utils/axios'

export function login(payload) {
  return async dispatch => {
    try {
      const res = await axios.post('/User/login', payload);
      dispatch({ type: SET_USER_DATA, payload: res.data });
      dispatch(showSuccess('Logged in'));
      return res;
    } catch (error) {
      dispatch(setError({ error: true, message: `Login error: ${error}` }));
      return error;
    }
  }
}

export function register(payload) {
  return async dispatch => {
    try {
      const res = await axios.post('/User/register', payload);
      dispatch({ type: SET_USER_DATA, payload: res.data });
      dispatch(showSuccess('Account created'));
      return res;
    } catch (error) {
      dispatch(setError({ error: true, message: `Registration error: ${error}` }));
      return error;
    }
  }
}

export function updateUserInfo(payload) {
  return async dispatch => {
    try {
      const res = await axios.post('/User/updateinfo', payload);
      dispatch({ type: SET_USER_DATA, payload: res.data });
      dispatch(showSuccess('Information updated'));
      return res;
    } catch (error) {
      dispatch(setError({ error: true, message: `Update error: ${error}` }));
      return error;
    }
  }
}