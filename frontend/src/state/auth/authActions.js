import {LOGOUT, SET_USER_DATA} from './authTypes'
import { setError } from '../error/errorActions'
import { showSuccess } from '../notification/notificationActions'
import axios, {updateAxiosHeader} from '../../utils/axios'

export function login(payload) {
  return async dispatch => {
    try {
      const res = await axios.post('/User/login', payload);
      dispatch(setUserData(res.data.user));
      localStorage.setItem('token', res.data.token);
      updateAxiosHeader();
      dispatch(showSuccess('Logged in'));
      return res;
    } catch (error) {
      dispatch(setError({ error: true, message: `Login error: ${error}` }));
      return error;
    }
  }
}

export function logout() {
  localStorage.removeItem('token');
  updateAxiosHeader();
  return { type: LOGOUT };
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
      dispatch(setUserData(res.data.user));
      localStorage.setItem('token', res.data.token);
      updateAxiosHeader();
      dispatch(showSuccess('Account created'));
      return res;
    } catch (error) {
      dispatch(setError({ error: true, message: `Registration error: ${error}` }));
      return error;
    }
  }
}

export function setUserData(data) {
  return { type: SET_USER_DATA, payload: data }
}