import { SET_USER_DATA } from './authTypes'
import { setError } from '../error/errorActions'
import { showSuccess } from '../notification/notificationActions'
import axios from '../../utils/axios'

export function login(payload) {
  return async dispatch => {
    try {
      const res = await axios.post('/User/login', payload);
      dispatch({ type: SET_USER_DATA, payload: res.data.user });
      localStorage.setItem('token', res.data.token);
      dispatch(showSuccess('Logged in'));
      return res;
    } catch (error) {
      dispatch(setError({ error: true, message: `Login error: ${error}` }));
      return error;
    }
  }
}

export function getUserInfo() {
  return async dispatch => {
    try {
      const res = await axios.get('/User/userinfo');
      dispatch({ type: SET_USER_DATA, payload: res.data });
      return res;
    } catch (error) {
      dispatch(setError({ error: true, message: `Error getting user information: ${error}` }));
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