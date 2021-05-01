import { RESET_ORDER, UPDATE_ORDER } from './orderTypes'
import paymentTypes from '../../containers/OrderCreation/paymentTypes';

const initialState = {
  // Tracked order state
  services: [],
  packageId: null,
  sender: { // address
    city: '',
    street: '',
    houseNr: '',
    zipCode: '',
  },
  recipientName: '',
  recipient: { // address
    city: '',
    street: '',
    houseNr: '',
    zipCode: '',
  },
  paymentType: paymentTypes[0].value,
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