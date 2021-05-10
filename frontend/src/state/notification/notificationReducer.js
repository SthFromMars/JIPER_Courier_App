import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from './notificationTypes'

const initialState = {
  show: false,
  message: '',
  header: '',
  color: '',
}

export default function notificationReducer(state = initialState, action) {
  switch(action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        ...action.payload
      }
    case CLEAR_NOTIFICATION:
      return initialState
    default:
      return state
  }
}