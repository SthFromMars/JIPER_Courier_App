import { SET_ORDERS, RESET_ORDERS } from './ordersTypes'

const initialState = {
  history: [] // Order history
}

export default function ordersReducer(state = initialState, action) {
  switch(action.type) {
    case SET_ORDERS:
      return {
        ...state,
        history: action.payload,
      }
    case RESET_ORDERS:
      return initialState
    default:
      return state
  }
}