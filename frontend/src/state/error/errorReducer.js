import { SET_ERROR } from './errorTypes'

const initialState = {
  error: false,
  message: ''
}

export default function authReducer(state = initialState, action) {
  switch(action.type) {
  case SET_ERROR:
    return {
      error: action.payload.error,
      message: action.payload.message || '',
    }
  default:
    return state
  }
}