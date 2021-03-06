import { SET_SERVICES } from './servicesTypes'

const initialState = {
  id: null, // provider id
  name: '', // provider name
  packageType: '', // 'SELECT' || 'MAX_WEIGHT
  packages: [],
  services: []
}

export default function servicesReducer(state = initialState, action) {
  switch(action.type) {
    case SET_SERVICES:
      return action.payload
    default:
      return state
  }
}