import { SET_USER_DATA } from './authTypes'
import { setError } from '../error/errorActions'
import axios from 'axios' // TODO replace with the import with configured axios object

export function login(payload) {
  return async dispatch => {
    try {
      const res = await axios.post('https://localhost:5001/api/User/login', payload); // change this when axios is configured
      dispatch({ type: SET_USER_DATA, payload: res });
      return res;
    } catch (error) {
      dispatch(setError({ error: true, message: `Login error: ${error}` }));
      return error;
    }
  }
}