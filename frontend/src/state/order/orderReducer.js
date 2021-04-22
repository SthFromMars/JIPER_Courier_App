import { UPDATE_ORDER } from './orderTypes'

const initialState = {
  loading: false,
  // Tracked order state
  order: {
    services: [],
    package: {},
    address: {},
  }
}

export default function orderReducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_ORDER:
      state.order[action.payload.key] = action.payload.value
      return state
    default:
      return state
  }
}