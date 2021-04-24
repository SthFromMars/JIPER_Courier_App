import { RESET_ORDER, UPDATE_ORDER } from './orderTypes'

const initialState = {
  // Tracked order state
  services: [],
  package: null,
  sender: {}, // address
  senderName: '',
  recipient: {}, // address
  recipientName: '',
}

export default function orderReducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_ORDER:
      return {
        ...state,
        [action.payload.path]: action.payload.value
      }
    case RESET_ORDER:
      return initialState
    default:
      return state
  }
}