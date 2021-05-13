import {LOGOUT, SET_USER_DATA} from './authTypes'

const initialState = {
  loggedIn: false,
  loading: false,
  user: {}
}

export default function authReducer(state = initialState, action) {
  switch(action.type) {
    case SET_USER_DATA:
      return {
        loggedIn: true,
        user: action.payload
      }
    case LOGOUT:
      return {
        loggedIn: false,
        user: {}
      }
    default:
      return state
  }
}