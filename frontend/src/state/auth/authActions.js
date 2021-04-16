import { SET_USER_DATA } from './authTypes'
import { setError } from '../error/errorActions'
import axios from 'axios'

export function login(payload) {
  return async dispatch => {
    try {
      const res = await axios.post('', payload);
      dispatch({ type: SET_USER_DATA, payload: res });
      return res;
    } catch (error) {
      dispatch(setError({ error: true, message: `Login error: ${error}` }));
      return error;
    }
  }
}