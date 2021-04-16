import { SET_USER_DATA } from './types'
import axios from 'axios'

function setUserData(data) {
  return {
    type: SET_USER_DATA,
    payload: data
  };
}

export function login(payload) {
  return function(dispatch) {
    return axios.post('', payload)
      .then(({ data }) => {
        dispatch(setUserData(data));
      })
      .catch((err) => {
        console.log('Failure while logging in', err)
      });
  };
}