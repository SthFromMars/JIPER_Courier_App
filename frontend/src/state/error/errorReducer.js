import { SET_ERROR } from './errorTypes'

const initialState = {
  error: false,
  message: ''
}

export default function authReducer(state = initialState, action) {
  switch(action.type) {
  case SET_ERROR:
    return {
      ...state,
      ...action.payload
    }
  default:
    return state
  }
}