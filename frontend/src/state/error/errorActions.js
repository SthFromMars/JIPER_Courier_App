import { SET_ERROR } from './errorTypes'

export function setError({ error, message}) {
  return {
    type: SET_ERROR,
    payload: { error, message }
  };
}